import React, { useEffect, useState } from "react";
import ScoreCursor from "./ScoreCursor"; // Import the Cursor component
import ScoreSVG from "./ScoreSVG"; // Import the SVG component

const Score = () => {


  return (
    <div>
      <ScoreSVG />
      <ScoreCursor />
    </div>
  );
};

export default Score;

