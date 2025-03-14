import {useEffect,useContext } from "react";
import { AppContext } from "./AppContext"; // Import context

import AudioPlayer from "./AudioPlayer";
import Score from "./Score";
import Harmonica from "./Harmonica";


function HarmonicaScorePlayer() {
  const {downloadFiles} = useContext(AppContext); 

  useEffect(() => {

    downloadFiles();
    
  }, []); 

  return (
    <div>
      <AudioPlayer/>
      <Score/>
      <Harmonica/>
    </div>
  );
}

export default HarmonicaScorePlayer;
