import React from "react";
import { EQ } from "../constants";

const HConstraint = React.memo(({ con, sizing }) => {
  const displayCon = (c) => (c === EQ ? "=" : "×");

  return (
    <div className={`flex ${sizing.hConCont} items-center justify-center`}>
      {con && (
        <div
          className={`flex ${sizing.conCircle} items-center justify-center rounded-full bg-gray-200 font-bold text-gray-700`}
        >
          {displayCon(con)}
        </div>
      )}
    </div>
  );
});

export default HConstraint;
