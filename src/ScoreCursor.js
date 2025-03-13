
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";
const ScoreCursor = () => {
    const {cursorPosition} = useContext(AppContext); // Get cursor state from context
  return (
    <div 
      style={{
        top: `${cursorPosition.top}px`,
        left: `${cursorPosition.left}px`,
        width: `${cursorPosition.width}px`,
        height: `${cursorPosition.height}px`,
        position: "absolute",
        backgroundColor: "red",
        opacity: 0.4,
        pointerEvents: "none",
      }}
    />
  );
};

export default ScoreCursor;
