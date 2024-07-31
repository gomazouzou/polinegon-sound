export const DEFAULT_LINE_WIDTH = 5;
export const MIN_LINE_WIDTH = 2;
export const MAX_LINE_WIDTH = 8;

//dBでの音量
export const DEFAULT_VOLUME = 0;
export const MIN_VOLUME = -6;
export const MAX_VOLUME = 6;

export const SIZE = 120; //図形のサイズ

export const CANVAS_HEIGHT = 480; //キャンバスの高さ
export const CANVAS_WIDTH = 960; //キャンバスの幅
export const MARGIN = 20; //図形の描画範囲のマージン

//何音符音符間隔で処理するか
export const PROCESS_SPAN = 64;
export const SPEED = SIZE / (PROCESS_SPAN / 4);
export const SPEED_2 = SIZE / 4;

export const RHYTHM_PATTERN_1 = [
  { time: "0:0:0" },
  { time: "0:0:2" },
  { time: "0:1:2" },
  { time: "0:2:0" },
  { time: "0:2:2" },
  { time: "0:3:2" },
];

export const RHYTHM_PATTERN_2 = [
  { time: "0:0:0" },
  { time: "0:0:2" },
  { time: "0:1:0" },
  { time: "0:1:2" },
  { time: "0:2:2" },
  { time: "0:3:2" },
];

export const RHYTHM_PATTERN_3 = [
  { time: "0:0:0" },
  { time: "0:1:0" },
  { time: "0:2:0" },
  { time: "0:3:0" },
];

export const RHYTHM_PATTERN_4 = [
  { time: "0:0:0" },
  { time: "0:0:1" },
  { time: "0:1:1" },
  { time: "0:2:0" },
  { time: "0:2:1" },
  { time: "0:3:1" },
];
