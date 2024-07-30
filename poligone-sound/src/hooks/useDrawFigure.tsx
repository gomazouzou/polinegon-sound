import { CANVAS_HEIGHT, CANVAS_WIDTH, MARGIN, SIZE } from "../config/constants.tsx";
import { Layer } from "../types/layer.tsx";

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

export const drawFrame = (layer?: Layer) => {
  if (!layer) return;
  const canvas = layer.ref.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const size = SIZE * 2;
  const halfSize = size / 2;
  const centerX = Math.floor(Math.random() * ((CANVAS_WIDTH - halfSize - MARGIN) - (halfSize + MARGIN) + 1)) + halfSize + MARGIN;
  const centerY = Math.floor(Math.random() * ((CANVAS_HEIGHT - halfSize - MARGIN) - (halfSize + MARGIN) + 1)) + halfSize + MARGIN;

  context.strokeStyle = "#F0F0F0";
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX - halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY - halfSize);
  context.stroke();
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
