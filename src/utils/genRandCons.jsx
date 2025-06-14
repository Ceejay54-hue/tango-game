import { SIZING, EQ, DIFF } from "../constants";

export function genRandCons(size, sol) {
  const hCons = Array(size)
    .fill()
    .map(() => Array(size - 1).fill(null));
  const vCons = Array(size - 1)
    .fill()
    .map(() => Array(size).fill(null));

  // Use probabilities from SIZING
  const hConProb = SIZING[size].hConProb;
  const vConProb = SIZING[size].vConProb;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size - 1; c++) {
      if (Math.random() < hConProb) {
        hCons[r][c] = sol[r][c] === sol[r][c + 1] ? EQ : DIFF;
      }
    }
  }

  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size; c++) {
      if (Math.random() < vConProb) {
        vCons[r][c] = sol[r][c] === sol[r + 1][c] ? EQ : DIFF;
      }
    }
  }

  return { hCons, vCons };
}
