import React, { useEffect, useState } from 'react';
import { DrawingPannel } from './modules/DrawingPannel/index.tsx';
import { LayerTab } from './modules/LayerTab/index.tsx';
import { Player } from './modules/Player/index.tsx';
import { Layer, Type } from "./types/layer.tsx";
import { context } from 'tone';

function App() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const canvasColor = 'white';

  const [layers, setLayers] = useState<Layer[]>([{id: 0, ref: React.createRef(), color:"black", lineWidth: 3, drawings: [], type: Type.Line, isVisible:true}]); //キャンバスに反映されるすべてのレイヤー
  const [totalLayer, setTotalLayer] = useState(0); //削除したものも含めたレイヤーの通し番号
  const [currentLayer, setCurrentLayer] = useState(0); //現在描画を行うレイヤーの番号
  const [drawCount, setDrawCount] = useState(0); //現在描画してるレイヤーの分かれたブロックの数
  const [currentFigure, setCurrentFigure] = useState(0);

  useEffect(() => {
    if (layers.length === 0) return;
    const layer = layers.find(layer => layer.id === currentLayer);
    if(layer){
      //線レイヤーの場合の描画処理
      if(layer.type === Type.Line){
        const canvas =layer.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        let prevX: number | null = null;
        let prevY: number | null = null;

        const draw = (event: MouseEvent) => {
          if (!isDrawing || !context || !layer) return;

          // ペンのスタイルを設定
          context.lineWidth = layer.lineWidth; 
          context.lineCap = 'round'; 

          context.strokeStyle = layer.color; 
          const currentX: number = event.offsetX;
          const currentY: number = event.offsetY;
          
          // マウスの位置に線を描画
          context.lineTo(currentX, currentY);
          context.stroke();
          context.beginPath();
          context.moveTo(currentX, currentY);

          // 描画内容を保存
          setLayers(prevLayers => prevLayers.map(layer => {
            if (layer.id === currentLayer && prevX && prevY) {
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
          setIsDrawing(true);
          prevX = event.offsetX;
          prevY = event.offsetY;
          draw(event);
        }

        const  stopDrawing = () => {
          if (!context) return;
          setIsDrawing(false);
          context.beginPath();
          prevX = null;
          prevY = null;
          setDrawCount(drawCount + 1); 
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
      if(layer.type === Type.Poligone){
        const canvas = layer.ref.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        const drawFigure00 = (event: MouseEvent) => {
          if (!context || !layer) return;

          const size = 100; // 正方形のサイズ
          const halfSize = size / 2;
          const centerX = event.offsetX;
          const centerY = event.offsetY;

          context.strokeStyle = layer.color;
          context.lineWidth = layer.lineWidth;
          context.beginPath();
          context.moveTo(centerX + halfSize, centerY);
          context.lineTo(centerX - halfSize, centerY);
          context.lineTo(centerX - halfSize, centerY - halfSize);
          context.lineTo(centerX, centerY - halfSize);
          context.lineTo(centerX, centerY + halfSize);
          context.lineTo(centerX + halfSize, centerY + halfSize);
          context.lineTo(centerX + halfSize, centerY);
          context.stroke();
        }

        const drawFigure01 = (event: MouseEvent) => {
          if (!context || !layer) return;

          const size = 100; // 正方形のサイズ
          const halfSize = size / 2;
          const centerX = event.offsetX;
          const centerY = event.offsetY;

          context.strokeStyle = layer.color;
          context.lineWidth = layer.lineWidth;
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.lineTo(centerX - halfSize, centerY);
          context.lineTo(centerX - halfSize, centerY + halfSize);
          context.lineTo(centerX + halfSize, centerY + halfSize);
          context.lineTo(centerX + halfSize, centerY - halfSize);
          context.lineTo(centerX, centerY - halfSize);
          context.lineTo(centerX, centerY);
          context.stroke();
        }

        const drawFigure02 = (event: MouseEvent) => {
          if (!context || !layer) return;

          const size = 100; // 正方形のサイズ
          const halfSize = size / 2;
          const centerX = event.offsetX;
          const centerY = event.offsetY;

          context.strokeStyle = layer.color;
          context.lineWidth = layer.lineWidth;
          context.beginPath();
          context.moveTo(centerX - halfSize, centerY - halfSize);
          context.lineTo(centerX + halfSize, centerY - halfSize);
          context.lineTo(centerX + halfSize, centerY + halfSize);
          context.lineTo(centerX - halfSize, centerY + halfSize);
          context.lineTo(centerX - halfSize, centerY - halfSize);
          context.stroke();
        }

        const drawFigure03 = (event: MouseEvent) => {
          if (!context || !layer) return;

          const size = 100; // 正方形のサイズ
          const halfSize = size / 2;
          const centerX = event.offsetX;
          const centerY = event.offsetY;

          context.strokeStyle = layer.color;
          context.lineWidth = layer.lineWidth;
          context.beginPath();
          context.moveTo(centerX + halfSize, centerY - halfSize);
          context.lineTo(centerX + halfSize/2, centerY - halfSize);
          context.lineTo(centerX + halfSize/2, centerY + halfSize);
          context.lineTo(centerX - halfSize, centerY + halfSize);
          context.lineTo(centerX - halfSize, centerY + halfSize / 2);
          context.lineTo(centerX + halfSize, centerY + halfSize / 2);
          context.lineTo(centerX + halfSize, centerY - halfSize);
          context.stroke();
        }

        const drawFigure = (event: MouseEvent) => {
          switch (currentFigure) {
            case 0:
              drawFigure00(event);
              break;
            case 1:
              drawFigure01(event);
              break;
            case 2:
              drawFigure02(event);
              break;
            case 3:
              drawFigure03(event);
              break;
            default:
              break;
          }
        }
        
        canvas.addEventListener('click', drawFigure);

        return () => {
          canvas.removeEventListener('click', drawFigure);
        };
      };
    };  
  }, [isDrawing, isErasing, canvasColor, currentLayer, layers, drawCount, currentFigure]);

  return (
    <>
      <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', width:'60%'}}>
        <Player/>
      </div>

      <div style={{ position: 'absolute', top: '105px', left: '30px' }}>
        {
          layers.map((layer, index) => (
            layer.isVisible && (
              <canvas
                key={layer.id}
                ref={layer.ref}
                width={960}
                height={480}
                style={{
                  border: '1px solid black',
                  backgroundColor: "transparent",
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: index,
                }}
              />
            )
          ))
        }
      </div>

      <div style={{ position: 'absolute', top: '105px', left: '1020px' }}>
        <LayerTab
          canvasColor={canvasColor}
          layers={layers}
          setLayers={setLayers}
          currentLayer={currentLayer}
          setCurrentLayer={setCurrentLayer}
          totalLayer={totalLayer}
          setTotalLayer={setTotalLayer}
        />
      </div>

      <div style={{ position: 'absolute', top: '615px', left: '30px'}}>
        <DrawingPannel
          setCurrentFigure={setCurrentFigure}
          layers={layers}
          setLayers={setLayers}
          currentLayer={currentLayer}
          canvasColor={canvasColor}
        />
      </div>
    </>
  );
}

export default App;
