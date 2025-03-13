import { useState, useEffect,useContext } from "react";
import { AppContext } from "./Context"; // Import context

import AudioPlayer from "./AudioPlayer";
import Score from "./Score";
import Harmonica from "./Harmonica";

import { downloadAll } from "./downloadUtils"; // Import utility functions
function HarmonicaScorePlayer() {
  const { 
          setEvents,
          setMP3s,
          setSVGs,
         
        } = useContext(AppContext); // Use context

  

  useEffect(() => {

    downloadAll(setMP3s,setSVGs,setEvents);
    
  }, []); // Empty dependency array → Runs only once when component mounts

  return (
    <div>
      <AudioPlayer/>
      <Score/>
      <Harmonica/>
    </div>
  );
}

export default HarmonicaScorePlayer;
