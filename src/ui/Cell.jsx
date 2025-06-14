import React from "react";
import { EMPTY, SUN, MOON } from "../constants";

const Cell = React.memo(({ val, locked, onClick, isComplete, sizing }) => {
  const displayVal = (v) => {
    switch (v) {
      case SUN:
        return "🌞";
      case MOON:
        return "🌛";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex ${sizing.cell} items-center justify-center rounded-lg border-2 font-bold transition-all select-none ${
        locked
          ? "cursor-default border-indigo-400 bg-indigo-50"
          : val === EMPTY
            ? "cursor-pointer border-gray-300 bg-gray-50 hover:scale-105 hover:bg-gray-100 hover:shadow-md"
            : "cursor-pointer border-purple-300 bg-purple-50 hover:scale-105 hover:shadow-md"
      } ${isComplete ? "cursor-default" : ""} `}
    >
      {displayVal(val)}
    </div>
  );
});

export default Cell;
