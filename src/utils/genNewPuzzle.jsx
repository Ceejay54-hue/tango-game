import { SIZING, EMPTY } from "../constants";
import { genFullSol } from "./genFullSol";
import { genRandCons } from "./genRandCons";

export function genNewPuzzle(size) {
  const sol = genFullSol(size);
  const { hCons, vCons } = genRandCons(size, sol);

  const initialGrid = sol.map((row) => [...row]);
  const locked = Array(size)
    .fill()
    .map(() => Array(size).fill(false));

  const numLocked = SIZING[size].lockedCells;

  const positions = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      positions.push([r, c]);
    }
  }

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  for (let i = 0; i < numLocked && i < positions.length; i++) {
    const [r, c] = positions[i];
    locked[r][c] = true;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!locked[r][c]) {
        initialGrid[r][c] = EMPTY;
      }
    }
  }

  return {
    initialGrid,
    locked,
    hCons,
    vCons,
    sol,
  };
}
