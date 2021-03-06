// ハイスピ*BPM = 600でサドプラ無しだと緑数字292が基準

export const stateToHighSpeed = (
  state: {
    white: number;
    lift: number;
    green: number;
  },
  bpm: number
) =>
  (((600 * 292) / state.green / bpm) * (1000 - state.white - state.lift)) /
  1000;

export const stateToGreen = (
  state: {
    white: number;
    lift: number;
    highSpeed: number;
  },
  bpm: number
) =>
  ((600 / (bpm * state.highSpeed)) * 292 * (1000 - state.white - state.lift)) /
  1000;
