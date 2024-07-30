import { DEFAULT_LINE_WIDTH, DEFAULT_VOLUME, MAX_LINE_WIDTH, MAX_VOLUME } from "../config/constants.tsx";
import { Layer } from "../types/layer.tsx";
import { LoopInfo, Type } from "../types/loop.tsx";
import { ChangeColorToInstrumentId } from "./useColorToInstrumentId.tsx";
import { drawFigure00, drawFigure01, drawFigure02, drawFigure03 } from "./useDrawFigure.tsx";

//線の描画を開始する関数
export const startDrawing = (
  event : MouseEvent,
  isDrawing: React.MutableRefObject<boolean>,
  prevX: number | null,
  prevY: number | null,
  drawCount: number,
  currentLayer: number,
  layer: Layer,
  context: CanvasRenderingContext2D | null,
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>,
  mousePositionRef: React.MutableRefObject<{ x: number, y: number }>
) => {
  isDrawing.current = true;
  prevX = event.offsetX;
  prevY = event.offsetY;
  draw(event, isDrawing, prevX, prevY, drawCount, currentLayer, layer, context, setLayers, mousePositionRef);
}

//線の描画をする関数
export const draw = (
  event: MouseEvent,
  isDrawing: React.MutableRefObject<boolean>,
  prevX: number | null,
  prevY: number | null,
  drawCount: number,
  currentLayer: number,
  layer: Layer,
  context: CanvasRenderingContext2D | null,
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>,
  mousePositionRef: React.MutableRefObject<{ x: number, y: number }>
) => {
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

//線の描画を終了する関数
export const  stopDrawing = (
  context: CanvasRenderingContext2D | null,
  isDrawing: React.MutableRefObject<boolean>,
  prevX: number | null,
  prevY: number | null,
  setDrawCount: React.Dispatch<React.SetStateAction<number>>,
  drawCount: number,
  currentLayer: number,
  layer: Layer,
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>,
  quantizeRef: React.MutableRefObject<number>,
  noteArrayRef2: React.MutableRefObject<number[]>,
  noteArrayRef4: React.MutableRefObject<number[]>,
  noteArrayRef8: React.MutableRefObject<number[]>,
  noteArrayRef16: React.MutableRefObject<number[]>,
) => {
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
      { type: Type.Line, 
        layer_id: currentLayer, 
        instrument: ChangeColorToInstrumentId(layer.color), 
        figure_id: 0, 
        volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
        midi: currentNoteArray
      }
    ];
    return newLoop;
  });

  noteArrayRef2.current = [0,0,0,0];
  noteArrayRef4.current = [0,0,0,0,0,0,0,0];
  noteArrayRef8.current = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  noteArrayRef16.current = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

//図形を描画する関数
export const drawFigureV2 = (
  event: MouseEvent,
  layer: Layer,
  currentFigure: number,
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>,
  currentLayer: number,
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>,
  context: CanvasRenderingContext2D | null
) => {
  console.log(currentFigure);
  switch (currentFigure) {
    case 0:
      drawFigure00(context, layer, event.offsetX, event.offsetY);
      console.log("drawFigure00");
      break;
    case 1:
      drawFigure01(context, layer, event.offsetX, event.offsetY);
      console.log("drawFigure01");
      break;
    case 2:
      drawFigure02(context, layer, event.offsetX, event.offsetY);
      console.log("drawFigure02");
      break;
    case 3:
      drawFigure03(context, layer, event.offsetX, event.offsetY);
      console.log("drawFigure03");
      break;
    default:
      break;
  }
  
  // 描画内容を保存
  setLayers(prevLayers => prevLayers.map(layer => {
    if (layer.id === currentLayer) {
      return {
        ...layer,
        figures: [...layer.figures, { id: currentFigure, x_pos: event.offsetX, y_pos: event.offsetY }]
      };
    }
    else{
      return layer;
    }
  }));

  //ループ情報の設定
  setLoops(prevLoop => {
    const newLoop = [...prevLoop, 
      { type: Type.Poligone, 
        layer_id: currentLayer, 
        instrument: ChangeColorToInstrumentId(layer.color), 
        figure_id: currentFigure, 
        volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
        midi: []
      }
    ];
    return newLoop;
  });
}

export const addEventToLayer = (
  layer: Layer,
  currentFigure: number,
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>,
  currentLayer: number,
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>,
) => {
  const canvas = layer.ref.current;
  console.log(canvas)
  if (!canvas) return;
  console.log("b")
  const context = canvas.getContext('2d');
  if (layer.type === Type.Poligone) {
    canvas.addEventListener('click', (event) => {
      drawFigureV2(event, layer, currentFigure, setLayers, currentLayer, setLoops, context)
    });
  }
}

export const removeEventToLayer = (
  layer: Layer,
  currentFigure: number,
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>,
  currentLayer: number,
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>,
) => {
  const canvas = layer.ref.current;
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (layer.type === Type.Poligone) {
    canvas.removeEventListener('click', (event) => {
      drawFigureV2(event, layer, currentFigure, setLayers, currentLayer, setLoops, context)
    });
  }
}

