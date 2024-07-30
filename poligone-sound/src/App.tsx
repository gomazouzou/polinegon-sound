import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { CANVAS_HEIGHT, CANVAS_WIDTH, DEFAULT_LINE_WIDTH, DEFAULT_VOLUME, MAX_LINE_WIDTH, MAX_VOLUME, PROCESS_SPAN } from './config/constants.tsx';
import { ChangeColorToInstrumentId } from './hooks/useColorToInstrumentId.tsx';
import { ChangeFigureToAnimation, DrawAnimation, drawFigure00, drawFigure01, drawFigure02, drawFigure03 } from './hooks/useDrawFigure.tsx';
import { noteMapping } from './hooks/useInstrumentIdToPlayer.tsx';
import { ChangeMousePosToNoteId } from './hooks/useMousePosToNoteId.tsx';
import { DrawingPannel } from './modules/DrawingPannel/index.tsx';
import { LayerTab } from './modules/LayerTab/index.tsx';
import { Player } from './modules/Player/index.tsx';
import { Layer, Type } from "./types/layer.tsx";
import { LoopInfo } from './types/loop.tsx';

function App() {
  const canvasColor = 'white';
  const isDrawing= useRef(false);

  //キャンバスに反映されるすべてのレイヤー
  const [layers, setLayers] = useState<Layer[]>([{id: 0, ref: React.createRef(), color:"black", lineWidth: DEFAULT_LINE_WIDTH, drawings: [], figures: [], type: Type.Line}]); 
  //削除したものも含めたレイヤーの通し番号
  const [totalLayer, setTotalLayer] = useState(1); 
  //現在描画を行うレイヤーの番号
  const [currentLayerId, setCurrentLayerId] = useState(0); 
  //現在描画してるレイヤーの分かれたブロックの数
  const [drawCount, setDrawCount] = useState(0);
  //現在描画する図形の番号 
  const [currentFigure, setCurrentFigure] = useState(0);
  //現在鳴るループ再生の情報
  const [loops, setLoops] = useState<LoopInfo[]>([]);
  const beatCountRef = useRef<number>(0);
  const [totalLoop, setTotalLoop] = useState(0);
  //マウスのX,Y座座標
  const mousePositionRef = useRef({ x: 0, y: 0 });
  //音階の配列
  const noteArrayRef2 = useRef<number[]>([0,0,0,0]);
  const noteArrayRef4 = useRef<number[]>([0,0,0,0,0,0,0,0]);
  const noteArrayRef8 = useRef<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const noteArrayRef16 = useRef<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  //クオンタイズの設定
  const quantizeRef = useRef<number>(16);
  //自由図形描画を使うかどうか
  const [startFigureDrawing, setStartFigureDrawing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentColorRef = useRef<string>("black");

  //クリックの状態管理
  const isClicking = useRef(false);

  const [metronomeAudioBuffer, setMetronomeAudioBuffer] = useState <AudioBuffer>();
  const [figureAudioBuffers, setFigureAudioBuffers] = useState <AudioBuffer[]>([]);

  const [lineAudioSamplers, setLineAudioSamplers] = useState <Tone.Sampler[] | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch('/audio/metronome.wav');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await Tone.context.decodeAudioData(arrayBuffer);
      setMetronomeAudioBuffer(buffer);

      const figureBuffers: AudioBuffer[] = [];
      for (let i = 1; i <= 8; i++) {
        const response = await fetch(`/audio/figure_${i}.wav`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await Tone.context.decodeAudioData(arrayBuffer);
        figureBuffers.push(buffer);
      }
      setFigureAudioBuffers(figureBuffers);

      const lineBuffers: Tone.Sampler[] = [];
      for (let i = 1; i <= 8; i++) {
        const lineAudioSampler = new Tone.Sampler({
          urls: {
            C4: `line_${i}.wav`,
          },
          baseUrl: "/audio/"
        }).toDestination();
        await lineAudioSampler.loaded;
        lineBuffers.push(lineAudioSampler);
      }
      setLineAudioSamplers(lineBuffers);
    };

    loadAudio();
  }, []);

  useEffect(() => {
    const layer = layers.find(layer => layer.id === currentLayerId);
    currentColorRef.current = layer?.color || "black";
  }, [layers, currentLayerId]);


  const UpdateBeatCount = () => {
    const layer = layers.find(layer => layer.id === currentLayerId);
    const canvas = layer?.ref.current;

    //線の時の処理
    if (isDrawing.current && beatCountRef.current % (PROCESS_SPAN / quantizeRef.current) === 0 && layer && canvas && lineAudioSamplers) {
      
      const index = beatCountRef.current / (PROCESS_SPAN / quantizeRef.current);
      const noteId = ChangeMousePosToNoteId(mousePositionRef.current.y); 
      const note = noteMapping[noteId];

      //描画中の音符を鳴らす
      const sampler = lineAudioSamplers[ChangeColorToInstrumentId(currentColorRef.current)];
      if (note){
        sampler.triggerAttackRelease(note, `${quantizeRef.current}n`);
      }

      //ループ音階の設定
      switch (quantizeRef.current) {
        case 2:
          noteArrayRef2.current[index] = noteId;
          break;
        case 4:
          noteArrayRef4.current[index] = noteId;
          break;
        case 8:
          noteArrayRef8.current[index] = noteId;
          break;
        case 16:
          noteArrayRef16.current[index] = noteId;
          break;
      }
    }
    
    //自由描画の時の処理
    if( beatCountRef.current % (PROCESS_SPAN / 16) === 0 && startFigureDrawing){
      console.log(isClicking.current);
    }

    //アニメーションの描画
    loops.forEach(loop => {
      const canvas = loop.ref.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      const position = loop.animation[beatCountRef.current];
      DrawAnimation(context, position, loop.color, loop.lineWidth);
    });
    
    beatCountRef.current = (beatCountRef.current + 1) % (PROCESS_SPAN * 2);
  }

  useEffect(() => {
    if (layers.length === 0) return;
    const layer = layers.find(layer => layer.id === currentLayerId);
    if(layer && isPlaying){

      //線レイヤーの場合の描画処理
      if(layer.type === Type.Line && !startFigureDrawing){
        const canvas =layer.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        let prevX: number | null = null;
        let prevY: number | null = null;

        const draw = (event: MouseEvent) => {
          if (!isDrawing.current || !context || !layer) return;

          // ペンのスタイルを設定
          context.lineWidth = layer.lineWidth; 
          context.lineCap = 'round'; 
          context.strokeStyle = layer.color;

          const currentX: number = event.offsetX;
          const currentY: number = event.offsetY;

          mousePositionRef.current = { x: currentX, y: currentY };
          
          // マウスの位置に線を描画
          context.lineTo(currentX, currentY);
          context.stroke();
          context.beginPath();
          context.moveTo(currentX, currentY);

          // 描画内容を保存
          setLayers(prevLayers => prevLayers.map(layer => {
            if (layer.id === currentLayerId && prevX && prevY) {
              return {
                ...layer,
                drawings: [...layer.drawings, { startX: prevX, startY: prevY, endX: currentX, endY: currentY, count: drawCount }]
              };
            }
            else{
              return layer;
            }
          }));
          
          prevX = currentX;
          prevY = currentY;
        }

        const startDrawing = (event : MouseEvent) => {
          isDrawing.current = true;
          prevX = event.offsetX;
          prevY = event.offsetY;
          draw(event);
        }

        const  stopDrawing = () => {
          if (!context) return;
          isDrawing.current = false;
          context.beginPath();
          prevX = null;
          prevY = null;
          setDrawCount(drawCount + 1); 

          let currentNoteArray: number[] = [];
          
          switch (quantizeRef.current) {
            case 2:
              currentNoteArray = [...noteArrayRef2.current];
              break;
            case 4:
              currentNoteArray = [...noteArrayRef4.current];
              break;
            case 8:
              currentNoteArray = [...noteArrayRef8.current];
              break;
            case 16:
              currentNoteArray = [...noteArrayRef16.current];
              break;
          }

          setLoops(prevLoop => {
            const newLoop = [...prevLoop, 
              { 
                id: totalLoop,
                type: Type.Line, 
                layer_id: currentLayerId, 
                color: layer.color,
                lineWidth: layer.lineWidth,
                instrument: ChangeColorToInstrumentId(layer.color), 
                figure_id: 0, 
                volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
                midi: currentNoteArray,
                ref: React.createRef<HTMLCanvasElement>(),
                animation: [] //後で追記
              }
            ];
            return newLoop;
          });
          setTotalLoop(totalLoop + 1);

          noteArrayRef2.current = [0,0,0,0];
          noteArrayRef4.current = [0,0,0,0,0,0,0,0];
          noteArrayRef8.current = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
          noteArrayRef16.current = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        return () => {
          canvas.removeEventListener('mousedown', startDrawing);
          canvas.removeEventListener('mousemove', draw);
          canvas.removeEventListener('mouseup', stopDrawing);
          canvas.removeEventListener('mouseout', stopDrawing);
        };
      };

      //図形レイヤーの場合の描画処理
      if(layer.type === Type.Poligone && !startFigureDrawing){
        const canvas = layer.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        const drawFigure = (event: MouseEvent) => {
          const centerX = event.offsetX;
          const centerY = event.offsetY;

          switch (currentFigure) {
            case 0:
              drawFigure00(context, layer, centerX, centerY);
              break;
            case 1:
              drawFigure01(context, layer, centerX, centerY);
              break;
            case 2:
              drawFigure02(context, layer, centerX, centerY);
              break;
            case 3:
              drawFigure03(context, layer, centerX, centerY);
              break;
            default:
              break;
          }
          
          // 描画内容を保存
          setLayers(prevLayers => prevLayers.map(layer => {
            if (layer.id === currentLayerId) {
              return {
                ...layer,
                figures: [...layer.figures, { id: currentFigure, x_pos: centerX, y_pos: centerY }]
              };
            }
            else{
              return layer;
            }
          }));

          //ループ情報の設定
          setLoops(prevLoop => {
            const newLoop = [...prevLoop, 
              { 
                id: totalLoop,
                type: Type.Poligone, 
                layer_id: currentLayerId, 
                color: layer.color,
                lineWidth: layer.lineWidth,
                instrument: ChangeColorToInstrumentId(layer.color), 
                figure_id: currentFigure, 
                volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
                midi: [],
                ref: React.createRef<HTMLCanvasElement>(),
                animation: ChangeFigureToAnimation(currentFigure, centerX, centerY),
              }
            ];
            setTotalLoop(totalLoop + 1);
            return newLoop;
          });
        }
        
        canvas.addEventListener('click', drawFigure);

        return () => {
          canvas.removeEventListener('click', drawFigure);
        };
      };

      //自由図形レイヤーの場合の描画処理
      if(layer.type === Type.Free && startFigureDrawing){
        const canvas = layer.ref.current;
        if (!canvas) return;

        canvas.addEventListener('click', () => { isClicking.current = true});

        return () => {
          canvas.removeEventListener('click', () => { isClicking.current = true});
        };

      }
    };  
  }, [isDrawing, canvasColor, currentLayerId, layers, drawCount, currentFigure, startFigureDrawing, isPlaying, totalLoop, isClicking]);

  return (
    <>
      <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', width:'60%'}}>
        <Player 
          loops={loops}
          UpdateBeatCount={UpdateBeatCount}
          beatCountRef={beatCountRef}
          metronomeAudioBuffer={metronomeAudioBuffer}
          figureAudioBuffers={figureAudioBuffers}
          lineAudioSamplers={lineAudioSamplers}
          setIsPlaying={setIsPlaying}
          setStartFigureDrawing={setStartFigureDrawing}
          startFigureDrawing={startFigureDrawing}
        />
      </div>

      <div style={{ position: 'absolute', top: '105px', left: '30px' }}>
        {
          layers.map((layer, index) => (
              <canvas
                key={layer.id}
                ref={layer.ref}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                style={{
                  border: '1px solid black',
                  backgroundColor: "transparent",
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
          )) 
        }
      </div>

      <div style={{ position: 'absolute', top: '105px', left: '1020px' }}>
        <LayerTab
          canvasColor={canvasColor}
          layers={layers}
          setLayers={setLayers}
          currentLayerId={currentLayerId}
          setCurrentLayerId={setCurrentLayerId}
          totalLayer={totalLayer}
          setTotalLayer={setTotalLayer}
          setLoops={setLoops}
          startFigureDrawing={startFigureDrawing}
        />
      </div>

      <div style={{ position: 'absolute', top: '615px', left: '30px'}}>
        <DrawingPannel
          setCurrentFigure={setCurrentFigure}
          currentFigure={currentFigure}
          layers={layers}
          setLayers={setLayers}
          currentLayerId={currentLayerId}
          canvasColor={canvasColor}
          setLoops={setLoops}
          quantizeRef={quantizeRef}
          startFigureDrawing={startFigureDrawing}
          setStartFigureDrawing={setStartFigureDrawing}
          isPlaying={isPlaying}
        />
      </div>
    </>
  );
}

export default App;
