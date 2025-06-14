import React from "react";
import { EQ } from "../constants";

const VConstraint = React.memo(({ con, sizing }) => {
  const displayCon = (c) => (c === EQ ? "=" : "×");

  return (
    <div className={`flex ${sizing.vConCont} items-center justify-center`}>
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

export default VConstraint;
