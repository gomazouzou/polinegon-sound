export enum Type {
  Poligone =  "poligone",
  Line = "line",
  Free = "free",
}

export type LoopInfo = {
  type: Type,
  layer_id: number;
  instrument: number;
  figure_id: number;
  volume: number;
  midi: number[];
};
