import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./AppContext"; // Import context


const AudioControls = () => {

    const { 
      speed, 
      volumes,
      handleVolumeChange,
      handleSpeedChange
    } = useContext(AppContext); 

    const volumeLabels = ["Harmonica", "Accompaniment", "Metronome"]; 

  return (
    <div className="audio-controls">
      <div className="volume-control">
        
        {/* Volume controls for each audio file */}
        {Object.keys(volumes).map((key) => (
          <div key={key}>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes[key] || 1} 
              onChange={(e) => handleVolumeChange(parseInt(key), parseFloat(e.target.value))}
            />
            <label>{`${volumeLabels[parseInt(key)]}`}</label>
          </div>
        ))}
      </div>

      <div className="speed-control">
        
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
        />
        <label>Speed</label>
      </div>
    </div>
  );
};

export default AudioControls;
