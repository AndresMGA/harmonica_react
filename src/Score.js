import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";


const Score = () => {
  const {svgs,setScoreElement,scoreStyle,cursorPosition,scoreScroll} = useContext(AppContext); 
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      setScoreElement(svgRef.current); 
    }
  }, [svgs, setScoreElement])

  return (
    <div  style={{...scoreStyle,top:`${scoreScroll}px`,transition: "top 0.5s ease-in-out" }}>
    {svgs.map((svg, index) => (
        <img
          key={index}
          ref={svgRef}
          src={svg}
          alt={`SVG ${index + 1}`}
          style={{ width: "100%" ,
          
            
            marginTop: `${-(index>0)*4}px`,
            padding: "0px"
          }}
        />
      ))}
    <div 
          style={{
            top: `${cursorPosition.top}px`,
            left: `${cursorPosition.left-3}px`,
            width: `${cursorPosition.width+3}px`,
            height: `${cursorPosition.height}px`,
            position: "absolute",
            backgroundColor: "red",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />
    </div>
  );
};

export default Score;

