export enum Type {
  Poligone =  "poligone",
  Line = "line",
  Free = "free",
}

export type Position = {
  x: number;
  y: number;
};

export type LoopInfo = {
  id: number;
  type: Type,
  layer_id: number;
  color: string;
  lineWidth: number;
  instrument: number;
  figure_id: number;
  volume: number;
  midi: number[];
  ref: React.RefObject<HTMLCanvasElement>;
  animation: (Position | null)[];
};
