export enum Type {
  Poligone =  "poligone",
  Line = "line",
}

export type LoopInfo = {
  type: Type,
  layer_id: number;
  instrument: number;
  figure_id: number;
  volume: number;
};
