import { CANVAS_HEIGHT, CANVAS_WIDTH, MARGIN, PROCESS_SPAN, SIZE, SPEED, SPEED_2 } from "../config/constants.tsx";
import { Direction } from "../types/direction.tsx";
import { Layer } from "../types/layer.tsx";
import { Position } from "../types/loop.tsx";

export const drawFigure00 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE; // 正方形のサイズ
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

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

export const drawFigure01 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE;
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

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

export const drawFigure02 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE;
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

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

export const drawFigure03 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE;
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

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

export const drawFrame = (layer?: Layer, x?: number, y?: number) => {
  if (!layer) return { x: 0, y: 0 };
  const canvas = layer.ref.current;
  if (!canvas) return { x: 0, y: 0 };
  const context = canvas.getContext("2d");
  if (!context) return { x: 0, y: 0 };

  const size = SIZE * 2;
  const halfSize = size / 2;
  const centerX = x || Math.floor(Math.random() * ((CANVAS_WIDTH - halfSize - MARGIN) - (halfSize + MARGIN) + 1)) + halfSize + MARGIN;
  const centerY = y || Math.floor(Math.random() * ((CANVAS_HEIGHT - halfSize - MARGIN) - (halfSize + MARGIN) + 1)) + halfSize + MARGIN;

  context.strokeStyle = "#F0F0F0";
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX - halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY - halfSize);
  context.stroke();
  return { x: centerX, y: centerY };
}

export const RedrawFigure = (context: CanvasRenderingContext2D | null, layer: Layer, figure_id: number, x:number, y:number) => {
  switch (figure_id) {
    case 0:
      drawFigure00(context, layer, x, y);
      break;
    case 1:
      drawFigure01(context, layer, x, y);
      break;
    case 2:
      drawFigure02(context, layer, x, y);
      break;
    case 3:
      drawFigure03(context, layer, x, y);
      break;
    default:
      break;
  }
}

export const RedrawFreeFigure = (context: CanvasRenderingContext2D | null, directionArray: (Direction | null)[], layer: Layer, x:number, y:number) => {
  console.log(directionArray);
  if (!context) return;

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  drawFrame(layer, x, y);

  console.log("finish drawFrame"); 
  console.log(SPEED_2)  

  let currentX = x - SIZE;
  let currentY = y - SIZE;
  
  context.strokeStyle = layer.color;
  context.lineWidth = layer.lineWidth;

  context.beginPath();
  context.moveTo(currentX, currentY);

  for (let i = 0; i < directionArray.length; i++) {
    if(directionArray[i] === Direction.Down){
      currentY += SPEED_2;
      context.lineTo(currentX, currentY);
    }
    else if(directionArray[i] === Direction.Up){
      currentY -= SPEED_2;
      context.lineTo(currentX, currentY);
    }
    else if(directionArray[i] === Direction.Right){
      currentX += SPEED_2;
      context.lineTo(currentX, currentY);
    }
    else if(directionArray[i] === Direction.Left){
      currentX -= SPEED_2;
      context.lineTo(currentX, currentY);
    }
    if(directionArray[i] == null){
      break;
    }
  }
  context.stroke();
}





//こっから下はアニメーション関係(未完成)

const ChangeFigure02ToAnimation = (x:number, y:number) => {
  const animation: Position[] = new Array(PROCESS_SPAN * 2).fill({ x: 0, y: 0 });
  const changeSpan = PROCESS_SPAN / 4;
  for (let i = 0; i < PROCESS_SPAN * i; i++) {
    if (i < changeSpan) { 
      animation[i] = { x: x - SIZE / 2, y: y + SIZE / 2 + SPEED * i  };
    }
    if (i >= changeSpan && i < changeSpan * 2) {
      animation[i] = { x: x - SIZE / 2 + SPEED * (i - changeSpan), y: y + SIZE / 2 };
    }
    if (i >= changeSpan * 2 && i < changeSpan * 3) {
      animation[i] = { x: x + SIZE / 2, y: y - SIZE / 2 - SPEED * (i - changeSpan * 2)};
    }
    if (i >= changeSpan * 3 && i < changeSpan * 4) {
      animation[i] = { x: x + SIZE / 2 - SPEED * (i - changeSpan * 3), y: y - SIZE / 2 };
    }
    if (i >= changeSpan * 4) {
      animation[i] = animation[i - changeSpan * 4];
    }
  }
  return animation;
}



//左上から
export const ChangeFigureToAnimation = (figure_id: number, x:number, y:number) => {
  switch (figure_id) {
    case 0:
      return ChangeFigure02ToAnimation(x, y);
    case 1:
      return ChangeFigure02ToAnimation(x, y);
    case 2:
      return ChangeFigure02ToAnimation(x, y);
    case 3:
      return ChangeFigure02ToAnimation(x, y);
    default:
      return new Array(PROCESS_SPAN * 2).fill({ x: 0, y: 0 });
  }
}

export const DrawAnimation = (context: CanvasRenderingContext2D | null, position: Position | null, color: string, lineWidth: number) => {
  if (!context || !position) return;

  context.strokeStyle = color;
  context.lineCap = 'round'; 
  context.lineWidth = lineWidth * 2;

  // 指定した座標に点を描画
  context.beginPath();
  context.moveTo(position.x, position.y);
  context.lineTo(position.x, position.y);
  context.stroke();
}

