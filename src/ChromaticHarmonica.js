import React, { useEffect, useContext } from 'react';

import './ChromaticHarmonica.css';

const ChromaticHarmonica = () => {


  return (
    <div id="chromaticHarmonica" className="harmonica">
      <div className="wrap chromatic">
        <div className="top"></div>
        <div className="bottom"></div>


        {/* Front */}
        <div className="front"></div>

       

        {/* Holes */}
        {[...Array(12)].map((_, index) => (
          <div key={index} className="hole empty" style={{ left: `${41 + index * 54}px` }}></div>
        ))}



        {/* Hole Labels */}
        {[...Array(12)].map((_, index) => (
          <div key={index} className="hole-label" style={{ left: `${41 + index * 54}px` }}>
            {index + 1}
          </div>
        ))}

        {/* Legend */}
        <div className="legend">
          <div className="box blow" style={{ left: '200px' }}></div>
          <div style={{ position: 'absolute', left: '220px' }}>Blow</div>
          <div className="box draw" style={{ left: '300px' }}></div>
          <div style={{ position: 'absolute', left: '320px' }}>Draw (-)</div>
          <div className="box slide blow" style={{ left: '400px' }}></div>
          <div className="box slide draw" style={{ left: '418px' }}></div>
          <div style={{ position: 'absolute', left: '440px' }}>Side In (*)</div>
        </div>
      </div>
    </div>
  );
};

export default ChromaticHarmonica;
