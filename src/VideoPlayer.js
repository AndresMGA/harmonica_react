import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./AppContext"; // Import context

const VideoPlayer = () => {
      const {video,setVideoTrack,videoStyle,videoContainerStyle } = useContext(AppContext); 
      const videoRef = useRef(null)

      useEffect(() => {
        if (videoRef.current) {
           
          setVideoTrack(videoRef.current); // Set the video URL when the blob URL is provided
          videoRef.current.volume = 0
        }
      }, [video]);

  return (
    <div style={videoContainerStyle}>
      {video ? (<video ref={videoRef} src={video} type="video/mp4" style={videoStyle}></video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;