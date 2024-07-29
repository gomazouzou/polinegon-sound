import { Layer } from "../types/layer.tsx";


//色、太さの変更があった時にそのレイヤー内のすべての描画を再構成する関数
export const RedrawLayer = (layer: Layer) => {
  if (layer.drawings.length === 0) return;
  const canvas = layer.ref.current;
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height); // 既存の描画をクリア
  
  
  context.lineWidth = layer.lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = layer.color;

  context.beginPath();
  context.moveTo(layer.drawings[0].startX, layer.drawings[0].startY);
  let drawCountBefore = layer.drawings[0].count;

  layer.drawings.forEach(drawing => {
    context.strokeStyle = layer.color;

    if (drawCountBefore === drawing.count){
      context.lineTo(drawing.startX, drawing.startY);
    }
    
    context.moveTo(drawing.startX, drawing.startY);
    context.stroke();
    context.beginPath();
    context.lineTo(drawing.endX, drawing.endY);
    context.moveTo(drawing.endX, drawing.endY);
    context.stroke();
    drawCountBefore = drawing.count
  });
  context.beginPath();
};
