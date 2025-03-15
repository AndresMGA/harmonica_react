import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./AppContext"; // Import context

const VideoPlayer = () => {
      const {video,setVideoTrack } = useContext(AppContext); 
      const videoRef = useRef(null)

      useEffect(() => {
        if (videoRef.current) {
           
          setVideoTrack(videoRef.current); // Set the video URL when the blob URL is provided
        }
      }, [video]);

  return (
    <div
    style={{
        position: "fixed",
        top: "-40px",
        left: "0px",
        width: "50%",
        

        
      }}
    >
      {video ? (
        <video  
         ref={videoRef}
          src={video} 
          width="200%"
          height= "auto"
          type="video/mp4"  

          style={{
            position: "absolute",
            top: "-10%",
            left: "-50%",
          }}
          >
          
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;