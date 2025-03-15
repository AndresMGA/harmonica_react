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
    <img ref={svgRef} src={svg}  alt="SVG" 
    style={{ 
      position:"fixed",
      left:"50%",
      top:"0px",
      width: "50%",
     height: "auto" }} />
  );
};

export default ScoreSVG;
