import React from 'react';

type Drawing = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  count: number;
}
type Figure = {
  id: number;
  x_pos: number;
  y_pos: number;
}

export enum Type {
  Poligone =  "poligone",
  Line = "line",
}

export type Layer = {
  id: number;
  type: Type,
  ref: React.RefObject<HTMLCanvasElement>;
  color: string;
  lineWidth: number;
  drawings: Drawing[];
  figures: Figure[];
};
