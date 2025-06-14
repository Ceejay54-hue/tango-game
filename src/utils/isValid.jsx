import { EMPTY, SUN, MOON } from "../constants";

export function isValid(size, grid, r, c, val) {
  grid[r][c] = val;
  const balanceCount = size / 2;

  for (let col = 0; col <= size - 3; col++) {
    if (
      grid[r][col] === val &&
      grid[r][col + 1] === val &&
      grid[r][col + 2] === val
    ) {
      grid[r][c] = EMPTY;
      return false;
    }
  }

  for (let row = 0; row <= size - 3; row++) {
    if (
      grid[row][c] === val &&
      grid[row + 1][c] === val &&
      grid[row + 2][c] === val
    ) {
      grid[r][c] = EMPTY;
      return false;
    }
  }

  let rSuns = 0;
  let rMoons = 0;
  for (let col = 0; col < size; col++) {
    if (grid[r][col] === SUN) rSuns++;
    if (grid[r][col] === MOON) rMoons++;
  }
  if (rSuns > balanceCount || rMoons > balanceCount) {
    grid[r][c] = EMPTY;
    return false;
  }
  if (
    rSuns + rMoons === size &&
    (rSuns !== balanceCount || rMoons !== balanceCount)
  ) {
    grid[r][c] = EMPTY;
    return false;
  }

  let cSuns = 0;
  let cMoons = 0;
  for (let row = 0; row < size; row++) {
    if (grid[row][c] === SUN) cSuns++;
    if (grid[row][c] === MOON) cMoons++;
  }
  if (cSuns > balanceCount || cMoons > balanceCount) {
    grid[r][c] = EMPTY;
    return false;
  }
  if (
    cSuns + cMoons === size &&
    (cSuns !== balanceCount || cMoons !== balanceCount)
  ) {
    grid[r][c] = EMPTY;
    return false;
  }

  grid[r][c] = EMPTY;
  return true;
}
