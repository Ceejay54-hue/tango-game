export const EMPTY = 0;
export const SUN = 1;
export const MOON = 2;

export const EQ = "=";
export const DIFF = "x";

export const SIZING = {
  4: {
    cell: "h-11 w-11 text-xl sm:h-14 sm:w-14 sm:text-2xl",
    hConCont: "h-11 w-6 sm:h-14 sm:w-8",
    vConCont: "h-6 w-11 sm:h-8 sm:w-14",
    conCircle: "h-5 w-5 text-xs sm:h-6 sm:w-6 sm:text-sm",
    vSpcr: "h-6 w-6 sm:h-8 sm:w-8",
    balance: "2",
    lockedCells: 4,
    hConProb: 0.3,
    vConProb: 0.3,
    maxAttempts: 100,
  },
  6: {
    cell: "h-8 w-8 text-lg sm:h-10 sm:w-10 sm:text-xl",
    hConCont: "h-8 w-5 sm:h-10 sm:w-6",
    vConCont: "h-5 w-8 sm:h-6 sm:w-10",
    conCircle: "h-4 w-4 text-xs sm:h-5 sm:w-5 sm:text-xs",
    vSpcr: "h-4 w-5 sm:h-5 sm:w-6",
    balance: "3",
    lockedCells: 6,
    hConProb: 0.35,
    vConProb: 0.35,
    maxAttempts: 500,
  },
};
