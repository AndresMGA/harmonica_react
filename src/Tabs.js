import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";


const Tabs = () => {
  const {events,setScoreElement,scoreStyle,cursorPosition,scoreScroll,svgScale} = useContext(AppContext); 
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      setScoreElement(svgRef.current); 
    }
  }, [events, setScoreElement])

  return (
    <div  style={{...scoreStyle,top:`${scoreScroll}px`,border: "1px solid black",backgroundColor:"lightGray",transition: "top 0.5s ease-in-out" }}>
    <svg ref={svgRef}
         viewBox="0 0 2977.2 4208.4">
    
    {events.filter(ev => ev.type === "note" && ev.page === 0).map((note, index) => (
     
        <text
        x={note.x}
        y={note.y}
        fontFamily="Arial" fontSize="60" fill="black"

        >{note.tabs}</text>
        
      ))}
      </svg>

      <svg ref={svgRef}
         viewBox="0 0 2977.2 4208.4">
    
    {events.filter(ev => ev.type === "note" && ev.page === 1).map((note, index) => (
     
        <text
        x={note.x}
        y={note.y}
        fontFamily="Arial" fontSize="60" fill="black"

        >{note.tabs}</text>
        
      ))}
      </svg>
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

export default Tabs;

