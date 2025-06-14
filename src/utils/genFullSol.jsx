import { SIZING, EMPTY, SUN, MOON } from "../constants";
import { genSolR } from "./genSolR";

export function genFullSol(size) {
  let solGrid = null;
  let attempts = 0;
  const maxAttempts = SIZING[size].maxAttempts;

  while (!solGrid && attempts < maxAttempts) {
    const grid = Array(size)
      .fill()
      .map(() => Array(size).fill(EMPTY));
    grid[0][0] = Math.random() < 0.5 ? SUN : MOON;

    if (genSolR(size, grid, 1)) {
      solGrid = grid;
    }
    attempts++;
  }

  if (!solGrid) {
    console.error("Failed to generate a full solution. Using fallback.");
    if (size === 4) {
      return [
        [SUN, SUN, MOON, MOON],
        [MOON, MOON, SUN, SUN],
        [SUN, MOON, SUN, MOON],
        [MOON, SUN, MOON, SUN],
      ];
    } else if (size === 6) {
      return [
        [SUN, SUN, SUN, MOON, MOON, MOON],
        [MOON, MOON, MOON, SUN, SUN, SUN],
        [SUN, MOON, SUN, MOON, SUN, MOON],
        [MOON, SUN, MOON, SUN, MOON, SUN],
        [SUN, SUN, MOON, MOON, MOON, SUN],
        [MOON, MOON, SUN, SUN, SUN, MOON],
      ];
    }
  }
  return solGrid;
}
