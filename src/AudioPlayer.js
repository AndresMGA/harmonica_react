import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./Context"; // Import context
import AudioTransport from "./AudioTransport";
import AudioControls from "./AudioControls";

const AudioPlayer = ({ audioFiles,onTimeUpdate }) => {
  const { setCursor, setTime,setTab } = useContext(AppContext); // Use context
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volumes, setVolumes] = useState([1, 1, 1]);
  const audioRefs = useRef([null, null, null]); // References to audio elements

 
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const time = audioRefs.current[0] ? audioRefs.current[0].currentTime : 0;
       onTimeUpdate(time); // Update global playback time


      }, 50); // Update every 50ms

      return () => clearInterval(interval); // Cleanup interval
    }
  }, [isPlaying, setTime, setCursor]);

  const handlePlay = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.play();
      }
    });
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.pause();
      }
    });
    setIsPlaying(false);
  };

  const handleStop = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    });
    setIsPlaying(false);
  };

    // Handle Volume Change
    const handleVolumeChange = (index, value) => {
      setVolumes((prev) => ({ ...prev, [index]: value }));
      if (audioRefs.current[index]) {
        audioRefs.current[index].volume = value; // Update the volume of the specific audio
      }
    };
  
    // Handle Speed Change
    const handleSpeedChange = (value) => {
      setSpeed(value);
      audioRefs.current.forEach((audioRef) => {
        if (audioRef) {
          audioRef.playbackRate = value; // Apply the playback speed to each audio
        }
      });
    };

  return (
    <div className="audio-player">
      <AudioTransport onPlay={handlePlay} onPause={handlePause} onStop={handleStop} />
            {/* Volume & Speed Controls */}
      <AudioControls
        volumes={volumes}
        speed={speed}
        onVolumeChange={handleVolumeChange}
        onSpeedChange={handleSpeedChange}
      />
     
      
      {audioFiles.map((file, index) => (
        <audio key={index} ref={(el) => (audioRefs.current[index] = el)}>
          <source src={file} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
};

export default AudioPlayer;

