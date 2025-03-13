import React, { useState, useRef, useEffect, useContext } from "react";
import AudioTransport from "./AudioTransport";
import AudioControls from "./AudioControls";

const AudioPlayer = () => {

return (
    <div >
      <AudioTransport/>
      <AudioControls/>
    </div>
  );
};

export default AudioPlayer;

