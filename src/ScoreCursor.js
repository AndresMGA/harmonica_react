
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";
const ScoreCursor = () => {
    const { cursor,svgRect,svgScale } = useContext(AppContext); // Get cursor state from context
    const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    
      // Destructure the cursor array
      const [x, y, width, height] = cursor;

      // Apply scaling to cursor position and size
      setCursorPosition({
        top: svgRect.top + y * svgScale.scaleY,
        left: svgRect.left + x * svgScale.scaleX,
        width: width * svgScale.scaleX,
        height: height * svgScale.scaleY,
      });
    
  }, [cursor]); // Update when cursor changes
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
