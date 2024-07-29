import { DEFAULT_VOLUME, MAX_VOLUME, MAX_LINE_WIDTH, DEFAULT_LINE_WIDTH } from "../config/constants.tsx";
import { ChangeColorToInstrumentId } from "../hooks/useColorToInstrumentId.tsx";
import { RedrawFigure } from "../hooks/useDrawFigure.tsx";
import { Layer, Type } from "../types/layer.tsx";
import { LoopInfo } from "../types/loop.tsx";


//色、太さの変更があった時にそのレイヤー内のすべての描画を再構成する関数
export const RedrawLayer = (layer: Layer, setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>) => {
  //線の場合の再描画
  if (layer.type === Type.Line) {
    if (layer.drawings.length === 0) return;
    const canvas = layer.ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // 既存の描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height); 


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
  }

  //図形の場合の再描画
  if (layer.type === Type.Poligone) {
    if (layer.figures.length === 0) return;
    const canvas = layer.ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // 既存の描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height); 

    context.lineWidth = layer.lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = layer.color;

    // 再描画
    layer.figures.forEach(figure => {
      RedrawFigure(context, layer, figure.id, figure.x_pos, figure.y_pos);
    });

    // ループ情報の再設定
    setLoops(prevLoops => prevLoops.map(loop => {
      if (loop.layer_id === layer.id) {
        return {
          ...loop,
          instrument: ChangeColorToInstrumentId(layer.color),
          volume:  DEFAULT_VOLUME + MAX_VOLUME / (MAX_LINE_WIDTH - DEFAULT_LINE_WIDTH)* (layer.lineWidth - DEFAULT_LINE_WIDTH),
        };
      }
      return loop
    }));
  };
}
