import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";


const ScoreSVG = () => {
  const {svgs,svgPage} = useContext(AppContext); 


  return (

    <img src={svgs[svgPage]} alt="SVG" style={{ width: "100%", height: "auto" }} />
  );
};

export default ScoreSVG;
