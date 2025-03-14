import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";


const ScoreSVG = () => {
  const {svg,setSVGElement} = useContext(AppContext); 
  const svgRef = useRef(null)
  
  useEffect(() => {
    if (svgRef.current) {
      setSVGElement(svgRef.current); 
    }
  }, [])

  return (
    <img ref={svgRef} src={svg}  alt="SVG" style={{ width: "100%", height: "auto" }} />
  );
};

export default ScoreSVG;
