import React, { useEffect, useContext } from 'react';
import { AppContext } from "./Context"; // Import context
import './ChromaticHarmonica.css';

const ChromaticHarmonicaMoving = () => {

  const { tab } = useContext(AppContext);



  const tabs = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    "-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9", "-10", "-11", "-12",
    "1*", "2*", "3*", "4*", "5*", "6*", "7*", "8*", "9*", "10*", "11*", "12*",
    "-1*", "-2*", "-3*", "-4*", "-5*", "-6*", "-7*", "-8*", "-9*", "-10*", "-11*", "-12*",
    
    "1'", "2'", "3'", "4'", "5'", "6'", "7'", "8'", "9'", "10'", "-11'", "-12'",
    "1''", "2''", "3''", "4''", "5''", "6''", "7''", "8''", "9''", "10''", "-11''", "-12''",
    "-1'", "-2'", "-3'", "-4'", "-5'", "-6'", "-7'", "-8'", "-9'", "-10'", "-11'", "-12'",
    "-1''", "-2''", "-3''", "-4''", "-5''", "-6''", "-7''", "-8''", "-9''", "-10''", "-11''", "-12''",
    "-1'''", "-2'''", "-3'''", "-4'''", "-5'''", "-6'''", "-7'''", "-8'''", "-9'''", "-10'''", "-11'''", "-12'''",

    
  ];


  const holes = tabs.map((value, index) => {
    if(index<12){
      return { id: index, value: value, type: "blow" }
    }
    else if(index<24){
      return { id: index, value: value, type: "draw" }
    }
    else if(index<36){
      return { id: index, value: value, type: "blow slide" }
    }
    else if(index<48){
      return { id: index, value: value, type: "draw slide" }
    }
    else if(index<60){
      return { id: index, value: value, type: "blow bend" }
    }
    else if(index<72){
      return { id: index, value: value, type: "draw bend" }
    }
    else if(index<84){
      return { id: index, value: value, type: "blow bend double" }
    }
    else if(index<96){
      return { id: index, value: value, type: "draw bend double" }
    }
    else if(index<108){
      return { id: index, value: value, type: "draw bend triple" }
    }
  }
  );


  return (
    <div id="chromaticHarmonicaM" className="harmonica">
      <div className="wrap chromatic">


        {/* Slide */}
        <svg
            className='slide-bar'
          style={{ position: 'absolute', top: '21px', left: tab.includes("*")?'665px':'705px' }}
          width="110"
          height="60"
        >
          <path
            d="M 0 0, C 20 15,  60 20,  75 5, L 75 55 C 60 40, 20 46 0 61 L 0 0"
            style={{ fill: '#888685' }}
          ></path>
          <ellipse cx="75" cy="30" rx="10" ry="30" style={{ fill: '#b2aeac' }}></ellipse>
        </svg>

         {/* Slide Light */}
         <div className="slide-light" style={{display:tab.includes("*")?'flex':'none'}}></div>



      {holes.map(({ id, value, type }) => (
        <div
          key={id}
          className={`hole ${type}`}
          style={{
            left: `${41 + (id % 12) * 54}px`,
            display: tab === value ? "flex" : "none" // Show only the matching tab
          }}
        >
          {value}
        </div>
      ))}




      </div>
    </div>
  );
};

export default ChromaticHarmonicaMoving;
