import {useEffect,useContext } from "react";
import { AppContext } from "./AppContext"; // Import context

import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";
import Score from "./Score";
import Harmonica from "./Harmonica";
import Background from "./Background";
//import CountIn from "./CountIn";


function HarmonicaScorePlayer() {
  const {downloadFiles} = useContext(AppContext); 

  useEffect(() => {

    downloadFiles();
    
  }, []); 

  return (
    <div>
      <VideoPlayer/>
      <Score/>
      <Background/>
      <Harmonica/>
      
      <AudioPlayer/>
    </div>
  );
}

export default HarmonicaScorePlayer;
