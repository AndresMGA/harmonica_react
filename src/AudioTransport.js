// AudioTransport.js
import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./AppContext"; // Import context

const AudioTransport = () => {
    const {handlePlay,handlePause,handleStop} = useContext(AppContext); // Use context
  return (
    <div className="audio-transport">
      <button onClick={handlePlay}>▶ Play</button>
      <button onClick={handlePause}>⏸ Pause</button>
      <button onClick={handleStop}>⏹ Stop</button>
    </div>
  );
};

export default AudioTransport;
