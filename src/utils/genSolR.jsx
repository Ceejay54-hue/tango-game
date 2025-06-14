import { SUN, MOON, EMPTY } from "../constants";
import { isValid } from "./isValid";

export function genSolR(size, grid, idx) {
  if (idx === size * size) return true;

  const r = Math.floor(idx / size);
  const c = idx % size;

  if (isValid(size, grid, r, c, SUN)) {
    grid[r][c] = SUN;
    if (genSolR(size, grid, idx + 1)) return true;
  }

  if (isValid(size, grid, r, c, MOON)) {
    grid[r][c] = MOON;
    if (genSolR(size, grid, idx + 1)) return true;
  }

  grid[r][c] = EMPTY;
  return false;
}
