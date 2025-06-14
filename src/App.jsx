import React, { useState, useEffect, useCallback } from "react";
import { RotateCcwIcon, UndoIcon } from "lucide-react";

import { SIZING } from "./constants";
import Cell from "./ui/Cell";
import HConstraint from "./ui/HConstraint";
import VConstraint from "./ui/VConstraint";
import { genNewPuzzle } from "./utils/genNewPuzzle";

export default function TangoGame() {
  const [size, setSize] = useState(4);
  const [puzzle, setPuzzle] = useState(() => genNewPuzzle(4));
  const [grid, setGrid] = useState(puzzle.initialGrid.map((row) => [...row]));
  const [history, setHistory] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [isComplete, setComplete] = useState(false);

  const sizing = SIZING[size];

  useEffect(() => {
    let interval;
    if (playing && !isComplete) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [playing, isComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const checkSolved = useCallback(
    (currentGrid) => {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (currentGrid[i][j] !== puzzle.sol[i][j]) {
            return false;
          }
        }
      }
      return true;
    },
    [size, puzzle.sol],
  );

  const handleCellClick = (r, c) => {
    if (isComplete || puzzle.locked[r][c]) return;
    if (!playing) setPlaying(true);

    setHistory((prev) => [...prev, grid.map((row) => [...row])]);

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = (newGrid[r][c] + 1) % 3;

    setGrid(newGrid);

    if (checkSolved(newGrid)) {
      setComplete(true);
      setPlaying(false);
    }
  };

  const resetGame = () => {
    setGrid(puzzle.initialGrid.map((row) => [...row]));
    setHistory([]);
    setPlaying(false);
    setTime(0);
    setComplete(false);
  };

  const newGame = (newSize) => {
    const s = newSize || size;
    setSize(s);
    const newPuzzle = genNewPuzzle(s);
    setPuzzle(newPuzzle);
    setGrid(newPuzzle.initialGrid.map((row) => [...row]));
    setHistory([]);
    setPlaying(false);
    setTime(0);
    setComplete(false);
  };

  const undo = () => {
    if (history.length === 0) return;

    const prevGrid = history[history.length - 1];
    setGrid(prevGrid);
    setHistory((prev) => prev.slice(0, -1));
    setComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Tango Puzzle
          </h1>
          <p className="mx-auto max-w-md text-sm text-gray-600">
            Fill the empty cells with suns and moons.
            <br />
            Pre-filled cells cannot be changed!
          </p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => newGame(4)}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              size === 4
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Easy (4x4)
          </button>
          <button
            onClick={() => newGame(6)}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              size === 6
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Hard (6x6)
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-4 shadow-lg">
          <div className="mx-auto flex items-center gap-4">
            <div className="font-mono text-2xl font-bold text-indigo-600">
              {formatTime(time)}
            </div>
            {isComplete && (
              <div className="animate-pulse rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                🎉 Complete!
              </div>
            )}
          </div>

          <div className="mx-auto flex gap-2">
            <button
              onClick={undo}
              disabled={history.length === 0 || isComplete}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-1 font-medium text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <UndoIcon size={16} />
              Undo
            </button>

            <button
              onClick={resetGame}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-1 font-medium text-white transition-colors hover:bg-red-600"
            >
              <RotateCcwIcon size={16} />
              Reset
            </button>
            <button
              onClick={() => newGame(size)}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1 font-medium text-white transition-colors hover:bg-blue-600"
            >
              <RotateCcwIcon size={16} />
              New
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 text-center shadow-xl sm:p-8">
          <div className="mx-auto max-w-sm">
            <div className="inline-block">
              {Array.from({ length: size }, (_, rIdx) => (
                <div key={rIdx}>
                  <div className="flex items-center justify-center">
                    {Array.from({ length: size }, (_, cIdx) => (
                      <React.Fragment key={cIdx}>
                        <Cell
                          val={grid[rIdx][cIdx]}
                          locked={puzzle.locked[rIdx][cIdx]}
                          onClick={() => handleCellClick(rIdx, cIdx)}
                          isComplete={isComplete}
                          sizing={sizing}
                        />

                        {cIdx < size - 1 && (
                          <HConstraint
                            con={puzzle.hCons[rIdx][cIdx]}
                            sizing={sizing}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {rIdx < size - 1 && (
                    <div className="flex items-center justify-center">
                      {Array.from({ length: size }, (_, cIdx) => (
                        <React.Fragment key={cIdx}>
                          <VConstraint
                            con={puzzle.vCons[rIdx][cIdx]}
                            sizing={sizing}
                          />

                          {cIdx < size - 1 && (
                            <div className={`${sizing.vSpcr}`}></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm max-[390px]:grid-cols-1">
            <div className="mx-auto flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-indigo-400 bg-indigo-50">
                🌞
              </div>
              <span className="text-gray-600">Pre-filled (locked)</span>
            </div>
            <div className="mx-auto flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg border-2 border-gray-300 bg-gray-50"></div>
              <span className="text-gray-600">Empty (clickable)</span>
            </div>
            <div className="mx-auto flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                =
              </div>
              <span className="text-gray-600">Must be same</span>
            </div>
            <div className="mx-auto flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                ×
              </div>
              <span className="text-gray-600">Must be different</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            How to Play
          </h3>
          <ul className="list-disc space-y-2 px-5 text-sm text-gray-600">
            <li>
              Click empty cells to cycle through 🌞 and 🌛 (pre-filled cells are
              locked)
            </li>
            <li>
              No more than 2 consecutive identical symbols in any row or column
            </li>
            <li>
              Each row and column must have exactly {sizing.balance} suns and{" "}
              {sizing.balance} moons
            </li>
            <li>
              Cells with <span className="font-bold">=</span> between them must
              be the same
            </li>
            <li>
              Cells with <span className="font-bold">×</span> between them must
              be different
            </li>
            <li>
              Each puzzle has one right answer and can be solved via deduction
              (No need to make a guess).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
