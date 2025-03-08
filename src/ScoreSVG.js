import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "./Context";

const ScoreSVG = ({ svgContent }) => {
  const { cursor } = useContext(AppContext); // Get cursor state from context
  const svgContainerRef = useRef(null); // Reference to the SVG container (div)
  const rectRef = useRef(null); // Reference to the rectangle element

  // Update the rect position whenever the cursor state changes
  useEffect(() => {
    if (rectRef.current) {
      // Destructure the cursor array to get the values
      const [x, y, width, height] = cursor;

      // Update the rectangle's position and size
      rectRef.current.setAttribute("x", x);
      rectRef.current.setAttribute("y", y);
      rectRef.current.setAttribute("width", width);
      rectRef.current.setAttribute("height", height);
    }
  }, [cursor]); // Trigger the effect whenever cursor changes

  // Extract the existing SVG content
  const existingSvgContent = svgContent[0];

  // Insert the rectangle inside the existing SVG content
  const updatedSvgContent = existingSvgContent.replace(
    "</svg>", // Look for the closing </svg> tag
    `<rect id="cursor" x="${cursor[0]}" y="${cursor[1]}" width="${cursor[2]}" height="${cursor[3]}" fill="red" ref={rectRef} /> </svg>` // Insert <rect> before </svg>
  );

  return (
    <div
      ref={svgContainerRef} // Assign the ref to the container div
      dangerouslySetInnerHTML={{ __html: updatedSvgContent }}
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default ScoreSVG;
