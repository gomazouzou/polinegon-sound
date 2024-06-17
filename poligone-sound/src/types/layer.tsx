import React from 'react'

type Drawing = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isErasing: boolean;
  count: number;
}

export enum Type {
  Poligone =  "poligone",
  Line = "line",
}

export type Layer = {
  id: number;
  ref: React.RefObject<HTMLCanvasElement>;
  color: string;
  lineWidth: number;
  drawings: Drawing[];
  type: Type,
  isVisible: boolean;
};
