// AudioTransport.js
import React from "react";

const AudioTransport = ({ onPlay, onPause, onStop }) => {
  return (
    <div className="audio-transport">
      <button onClick={onPlay}>▶ Play</button>
      <button onClick={onPause}>⏸ Pause</button>
      <button onClick={onStop}>⏹ Stop</button>
    </div>
  );
};

export default AudioTransport;
