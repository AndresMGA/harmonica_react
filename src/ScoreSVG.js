import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";


const ScoreSVG = () => {
  const {svg,setImgElement} = useContext(AppContext); 
  const imgRef = useRef(null)
  
  useEffect(() => {
    if (imgRef.current) {
      setImgElement(imgRef.current); 
    }
  }, [])

  return (
    <img ref={imgRef} src={svg}  alt="SVG" style={{ width: "100%", height: "auto" }} />
  );
};

export default ScoreSVG;
