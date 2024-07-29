import { SIZE } from "../config/constants.tsx";
import { Layer } from "../types/layer.tsx";

export const drawFigure00 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE; // 正方形のサイズ
  const halfSize = size / 2;
  const centerX = x;
  const centerY = y;

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
  const centerX = x;
  const centerY = y;

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
  const centerX = x;
  const centerY = y;

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
  const centerX = x;
  const centerY = y;

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
