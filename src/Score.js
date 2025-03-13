import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./Context";
import ScoreCursor from "./ScoreCursor"; // Import the Cursor component
import ScoreSVG from "./ScoreSVG";
const Score = () => {
  const {svgs,svgPage,setSVGRect,setSVGScale,tab } = useContext(AppContext); 
  const svgContainerRef = useRef(null); 

  const updateScaleAndRect = () => {
    if (svgContainerRef.current) {
      const imgElement = svgContainerRef.current.querySelector("img");
      

      if (!imgElement) return; // Exit if there's no SVG loaded

      // Extract the viewBox attribute
      const viewBox =  "0 0 2977.2 4208.4"; // Default fallback
      const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(parseFloat);

      // Get the actual rendered size of the SVG
      const rect = imgElement.getBoundingClientRect();
      const renderedWidth = rect.width;
      const renderedHeight = rect.height;

      // Compute the scaling factors
      const scaleX = renderedWidth / vbWidth;
      const scaleY = renderedHeight / vbHeight;
      console.log(scaleX)

      const scrollX = window.scrollX ;
      const scrollY = window.scrollY ;

      const adjustedRect = {
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        right: rect.right + scrollX,
        bottom: rect.bottom + scrollY,
        width: rect.width,
        height: rect.height,
      };

      // Update state
      setSVGScale({ scaleX, scaleY });
      setSVGRect(adjustedRect);
    }
  };

  // Trigger effect when SVG content changes
  useEffect(() => {
    updateScaleAndRect();
  }, [svgs,svgPage]); // SVG content changes

  useEffect(() => {
    // Function to handle updates
    const handleUpdate = () => {
      updateScaleAndRect();
    };

    // Add event listeners
    window.addEventListener("resize", handleUpdate);
    window.addEventListener("scroll", handleUpdate);
    window.addEventListener("wheel", handleUpdate, { passive: true });
    window.addEventListener("mousemove", handleUpdate);
    window.addEventListener("touchmove", handleUpdate);
  
    return () => {
      // Cleanup event listeners on unmount
      window.removeEventListener("resize", handleUpdate);
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("wheel", handleUpdate);
      window.removeEventListener("mousemove", handleUpdate);
      window.removeEventListener("touchmove", handleUpdate);
    };
  }, []); // Empty dependency array ensures effect runs only once

  return (

    <div ref={svgContainerRef} style={{ width: "100%", height: "auto" }}>
       
       <ScoreSVG />
       <ScoreCursor />
    </div>

  );
};

export default Score;
