import React, { useState, useRef, useEffect } from "react";
import AudioTransport from "./AudioTransport";
import AudioControls from "./AudioControls";

const AudioPlayer = ({ audioFiles }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([null,null,null]); // Static empty array as a reference
  const [speed, setSpeed] = useState(1);
  const [volumes, setVolumes] = useState([1,1,1])


  // Handle Play
  const handlePlay = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.play(); // Play each audio file
      }
    });
    setIsPlaying(true);
  };

  // Handle Pause
  const handlePause = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.pause(); // Pause each audio file
      }
    });
    setIsPlaying(false);
  };

  // Handle Stop (Pause and Reset Time)
  const handleStop = () => {
    audioRefs.current.forEach((audioRef) => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0; // Reset the time to 0
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

  useEffect(() => {
    // Initialize refs when audioFiles changes
    audioRefs.current = audioFiles.map((_, index) => audioRefs.current[index] || React.createRef());
  }, [audioFiles]);

  return (
    <div className="audio-player">
      {/* Transport Controls */}
      <AudioTransport onPlay={handlePlay} onPause={handlePause} onStop={handleStop} />

      {/* Volume & Speed Controls */}
      <AudioControls
        volumes={volumes}
        speed={speed}
        onVolumeChange={handleVolumeChange}
        onSpeedChange={handleSpeedChange}
      />

      {/* Hidden Audio Elements */}
      {audioFiles.map((file, index) => (
        <audio key={index} ref={(el) => audioRefs.current[index] = el}>
          <source src={file} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
};

export default AudioPlayer;