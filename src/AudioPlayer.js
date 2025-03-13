import React, { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "./Context"; // Import context
import AudioTransport from "./AudioTransport";
import AudioControls from "./AudioControls";

const AudioPlayer = () => {
  const { 
    
    timerInterval,setTimerInterval,
    setCursor,setTab,
    event,setEvent,
    events,
    mp3s,
    setSVGPage,
    setPNGpage,
  } = useContext(AppContext); // Use context
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [toogle, setToogle] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volumes, setVolumes] = useState([1, 1, 1]);
  const audioRefs = useRef([null, null, null]); // References to audio elements
  
  function  findNearest(time){

    let left = 0; // Start searching from given index
    let right = events.length - 1;
    let closest = event; 
    let tries=0;
    while (left <= right) {
      tries++;
      let mid = Math.floor((left + right) / 2);
      let event = events[mid];
  
      // Update closest if this event is nearer
      if (Math.abs(event.time - time) < Math.abs(closest.time - time)) {
        closest = event;
      }
  
      if (event.time < time) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    console.log(tries)
    return closest;
  }
  
  useEffect(() => {
    

    if(isPlaying){
      
     setTimeout(() => {

      if(!event)
        event = findNearest(time)
      
      const time = audioRefs.current[0] ? audioRefs.current[0].currentTime : 0;
      let nextEvent = events[event.idx+1]
      
      let newEvent;
      let msg = ""

      if (nextEvent.time<=time){
        let timeDiffMs = Math.floor((nextEvent.time-time)*1000);
        msg = "delay " + timeDiffMs
        newEvent = events[event.idx+1]
      }
      else{
        newEvent = findNearest(time)
      }


      if(newEvent.idx!=event.idx){
      nextEvent = events[newEvent.idx+1]
      let timeDiffToNextMs = Math.floor((nextEvent.time-time)*1000)
      msg +=" next in "+timeDiffToNextMs
      setToogle(!toogle)
      setTimerInterval(timeDiffToNextMs)   
      setEvent(newEvent);
      }
      else{
        msg+=" waste"
        setToogle(!toogle)
        setTimerInterval(50)
      }

     // console.log(msg)
      

    }, timerInterval);
    
  }




}, [isPlaying,toogle]);
 


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
    //setTime(0); 
    setEvent(events[0])
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

      if(!event)return
  
  
  
        if(event.x)
        setCursor([event.x, event.y, event.w, event.h]);
        if(event.tabs)
        setTab(event.tabs);
        if(event.page)
        setSVGPage(event.page);
  
           
    }, [event]);


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
     
      
      {mp3s.map((file, index) => (
        <audio key={index} ref={(el) => (audioRefs.current[index] = el)}>
          <source src={file} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      ))}
    </div>
  );
};

export default AudioPlayer;

