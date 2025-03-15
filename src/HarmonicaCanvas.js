import React, { useRef, useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";


const HarmonicaCanvas = () => {
  const { nHoles, tab } = useContext(AppContext);
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const [tab2Clean, setTab2Clean] = useState(null);
  const lightColor = "#b2aeac";
  const darkColor = "#888685";
  const emptyColor = "#1e1e1e";
  const drawColor = "#00b49c";
  const blowColor = "#0076c9";
  const slideColor = "yellow";
  const bendColor = "red";
  const textColor = "#cccccc"
  const scale = .8;

  const drawScaledText = (text, x, y,font,fontSize,color,align,bold=false) => {
    const gl = glRef.current;
   
    let fontStr = Math.round(fontSize*scale).toString() +"px " + font
    fontStr = bold? "bold "+fontStr:fontStr
    gl.fillStyle = color;
    gl.font = fontStr
   
    gl.textAlign = align;
    x*=scale
    y*=scale
    gl.fillText(text, x, y);

  }

  const drawScaledRoundedRect = (
    x,
    y,
    width,
    height,
    radius,
    fillColor,
    borderColor = "#000000",
    borderWidth = 0
  ) => {
    const gl = glRef.current;

    gl.fillStyle = fillColor; // Fill color
    gl.strokeStyle = borderColor; // Border color
    gl.lineWidth = borderWidth; // Border width

    x*=scale
    y*=scale
    width*=scale
    height*=scale
    radius*=scale
    borderWidth*=scale

    gl.beginPath();
    gl.moveTo(x + radius, y);
    gl.lineTo(x + width - radius, y);
    gl.arcTo(x + width, y, x + width, y + radius, radius);
    gl.lineTo(x + width, y + height - radius);
    gl.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    gl.lineTo(x + radius, y + height);
    gl.arcTo(x, y + height, x, y + height - radius, radius);
    gl.lineTo(x, y + radius);
    gl.arcTo(x, y, x + radius, y, radius);
    gl.closePath();

    gl.fill(); // Fill the rectangle
    if (borderWidth) gl.stroke(); // Draw the border
  };

  const drawEllipse = (centerX, centerY, width, height) => {
    const gl = glRef.current;
    gl.beginPath();
    gl.moveTo(centerX, centerY - height / 2);
    gl.bezierCurveTo(
      centerX + width / 2,
      centerY - height / 2,
      centerX + width / 2,
      centerY + height / 2,
      centerX,
      centerY + height / 2
    );
    gl.bezierCurveTo(
      centerX - width / 2,
      centerY + height / 2,
      centerX - width / 2,
      centerY - height / 2,
      centerX,
      centerY - height / 2
    );
    gl.fillStyle = lightColor;
    gl.fill();
    gl.closePath();
  };

  const drawScaledSlide = (x, y, pressed = true) => {
    const gl = glRef.current;
    x*=scale
    y*=scale
    gl.clearRect(x, y, 80*scale, 55*scale);
    gl.fillStyle = darkColor; 


    if(pressed){
      x-=30*scale;
    }

    gl.beginPath();
    gl.moveTo(x, y);
    gl.bezierCurveTo(x + 20*scale, y + 15*scale, x + 60*scale, y + 20*scale, x + 70*scale, y + 5*scale);
    gl.lineTo(x + 70*scale, y + 55*scale);
    gl.bezierCurveTo(x + 60*scale, y + 40*scale, x + 20*scale, y + 46*scale, x + 0, y + 54*scale);
    gl.lineTo(x, y);
    gl.closePath();
    gl.fill();
    
    if (pressed) {
      drawScaledRoundedRect(672, 22, 41, 65, 10, slideColor);
      drawScaledRoundedRect(672, 22, 35, 65, 10, lightColor);
    } else {
      drawScaledRoundedRect(672, 22, 41, 65, 10, lightColor);
    }
    drawEllipse(x + 70*scale, y + 30*scale, 20*scale, 60*scale);
  };
  const decodeTab = (str) => {
    const match = str.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match)
      return {
        draw: false,
        hole: 0,
        slide: false,
        bend: false,
      };
    return {
      draw: match[1] == "-",
      hole: parseInt(match[2], 10),
      slide: match[3].includes("*"),
      bend: match[3].includes("'"),
    };
  };
  useEffect(() => {
    if (canvasRef.current) {
      glRef.current = canvasRef.current.getContext("2d");
      if (!glRef.current)
        console.error("WebGL not supported, falling back to Canvas 2D");
      else console.log("WebGL ok");
    }
  }, []);
  useEffect(() => {
    const gl = glRef.current;
    // Clear canvas
    gl.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw Harmonica body
    drawScaledRoundedRect(18, 0, nHoles * 56.7, 61, 30, darkColor); // Top
    drawScaledRoundedRect(22, 47, nHoles * 56, 50, 30, darkColor); // Bottom
    drawScaledRoundedRect(0, 22, 65 + nHoles * 54, 65, 10, lightColor); // Front

    // Draw Hole Labels
    for (let i = 0; i < nHoles; i++) {
      drawScaledText(i+1, 60 + i * 54,17,"Times New Roman",20,textColor,"center",false)
    }

    // Draw empty holes
    for (let i = 0; i < nHoles; i++) {
      const x = 41 + i * 54;
      const y = 35;
      drawScaledRoundedRect(x, y, 37, 37, 8, emptyColor); // Front
    }

    // Draw Legend
    const legendOffset = nHoles * 14;
    // Legend Items
    const legendItems = [
      { x: 10, text: "Blow", color: blowColor },
      { x: 100, text: "Draw (-)", color: drawColor },
    ];

    if (nHoles === 12) {
      legendItems.push({ x: 200, text: "", color: blowColor, border: true });
      legendItems.push({
        x: 220,
        text: "Side In (*)",
        color: drawColor,
        border: true,
      });
    } else if (nHoles === 10) {
      legendItems.push({ x: 170, text: "Bend (')", color: bendColor });
    }

    legendItems.forEach((item) => {
      drawScaledRoundedRect(
        legendOffset + item.x,
        102,
        13,
        13,
        2,
        item.color,
        slideColor,
        item.border ? 2 : 0
      ); // Front
     drawScaledText(item.text,legendOffset + item.x + 20,114,"Arial, Helvetica, sans-serif",16,textColor,"left",true)
    });

    drawScaledSlide(64 + nHoles * 54, 28, false);
    
  }, [nHoles]);

  useEffect(() => {
    const gl = glRef.current;
    let decodedTab, decodedTab2Clean;
    let x;
    const y = 35;

    if (tab2Clean) {
      decodedTab2Clean = decodeTab(tab2Clean);
      x = -13 + decodedTab2Clean.hole * 54;

      drawScaledRoundedRect(x, y, 37, 37, 8, emptyColor);
    }

    if (tab) {
      decodedTab = decodeTab(tab);
      x = -13 + decodedTab.hole * 54;

      const color = decodedTab.draw ? drawColor : blowColor;
      drawScaledRoundedRect(x, y, 37, 37, 8, color);
      drawScaledText(tab, x+18.5, y+24,"Arial, Helvetica, sans-serif",22,textColor,"center",true);

      if (nHoles == 12)
        if (
          decodedTab &&
          decodedTab2Clean &&
          decodedTab2Clean.slide == decodedTab.slide
        );
        else drawScaledSlide(64 + nHoles * 54, 28, decodedTab.slide);
    }

    setTab2Clean(tab);
  }, [tab]);

  return (
    <canvas ref={canvasRef} width={nHoles > 10 ? 794*scale : 606*scale} height={120*scale} />
  );
};

export default HarmonicaCanvas;

/* .bend {
  background: linear-gradient(to right, rgba(219, 17, 17, 1) 0%, rgba(219, 17, 17, 1) 50%, rgba(0, 118, 201, 1) 51%, rgba(0, 118, 201, 1) 100%);
}

.bend-alt {
  background: linear-gradient(to right, rgba(219, 17, 17, 1) 0%, rgba(219, 17, 17, 1) 50%, rgba(0, 180, 156, 1) 51%, rgba(0, 180, 156, 1) 100%);
} */
