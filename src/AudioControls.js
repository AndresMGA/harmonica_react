import React from "react";

const volumeLabels = ["Harmonica", "Accompaniment", "Metronome"]; 
const AudioControls = ({ volumes, speed, onVolumeChange, onSpeedChange }) => {

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
              onChange={(e) => onVolumeChange(parseInt(key), parseFloat(e.target.value))}
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
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        />
        <label>Speed</label>
      </div>
    </div>
  );
};

export default AudioControls;
