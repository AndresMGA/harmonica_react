import React, { createContext, useState, useEffect } from "react";
import { downloadAll } from "./AppContextDownload"; // Import utility functions
import Background from "./Background";
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [tab, setTab] = useState("");
  const [nHoles, setNHoles] = useState(12);

  const [mp3s, setMP3s] = useState([]);
  const [video, setVideo] = useState(null);

  const [audioTracks, setAudioTracks] = useState([null, null, null]);
  const [videoTrack, setVideoTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerInterval, setTimerInterval] = useState(50);
  const [timerTick, setTimerTick] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [volumes, setVolumes] = useState([1, 1, 1]);

  const [event, setEvent] = useState({ idx: 0, time: 0 });
  const [events, setEvents] = useState([
    { idx: 0, time: 0 },
    { idx: 1, time: 1000 },
  ]);
  const [settings, setSettings] = useState({});

  const [svgs, setSVGs] = useState([]);
  const [svg, setSVG] = useState(null);
  const [svgPage, setSVGPage] = useState(0);
  const [svgScale, setSVGScale] = useState({});
  const [scoreElement, setScoreElement] = useState(null);
  const [scoreScroll, setscoreScroll] = useState(0);

  const [videoStyle, setVideoStyle] = useState(null);
  const [videoContainerStyle, setVideoContainerStyle] = useState(null);
  const [scoreStyle, setScoreStyle] = useState(null);

  const mscorePageHeight = 4208.4
  const mscorePageWidth = 2977.2


  const downloadFiles= () => {
    if(window.location.pathname.toLowerCase().includes("/chromatic/"))
      setNHoles(12);
    else if(window.location.pathname.toLowerCase().includes("/diatonic/"))
      setNHoles(10);
    downloadAll(setMP3s,setSVGs,setEvents,setSettings,setVideo);
   
  };

  /* Handle Play */
  const handlePlay = () => {
    audioTracks.forEach((audioTrack) => audioTrack?.play());

    if(videoTrack)videoTrack.play()
    setIsPlaying(true);
  };
  /* Handle Pause */
  const handlePause = () => {
    audioTracks.forEach((audioTrack) => audioTrack?.pause());
    if(videoTrack)videoTrack.pause()
    setIsPlaying(false);
  };

  /* Handle Stop */
  const handleStop = () => {
    audioTracks.forEach((audioTrack) => {
      if (audioTrack) audioTrack.pause();
      audioTrack.currentTime = 0;
    });

    if(videoTrack){
      videoTrack.pause()
      videoTrack.currentTime=0;
    }

    setEvent(events[0]);
    setSVGPage(0);
    setIsPlaying(false);
  };

  /* Handle Volume Change*/
  const handleVolumeChange = (index, value) => {
    setVolumes((prev) => ({ ...prev, [index]: value }));
    if (audioTracks[index]) {
      audioTracks[index].volume = value;
    }
  };

  /* Handle Speed Change */
  const handleSpeedChange = (value) => {
    setSpeed(value);
    audioTracks.forEach((audioRef) => {
      if (audioRef) {
        audioRef.playbackRate = value;
      }
    });
  };

  /* Set states according to the new event*/
  useEffect(() => {
    //setscoreScroll(scoreScroll-10)

    if (!event) return;

    if (event.tabs) setTab(event.tabs);
    if (event.page) setSVGPage(event.page);
    if (event.x) updateCursor();
    else {
      event.w=event.h=event.x=event.y=0;
      updateCursor();
    }
  }, [event]);

  useEffect(() => {
    setAudioTracks(
      mp3s.map((file) => {
        return new Audio(file);
      })
    );
  }, [mp3s]);

  useEffect(() => {
    setSVG(svgs[svgPage]);
  }, [svgPage,svgs]);


  /* This function runs if we didn´t find an event where expected,
    it should not get called often */

  function findNearest(time) {
    let left = 0;
    let right = events.length - 1;
    let closest = event;
    let tries = 0;
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
    //console.log(tries);
    return closest;
  }

  /* When transport buttons are clicked looks for new events and sets
    a timeout for when next event is due */

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        if (!event) setEvent(findNearest(time));

        const time = audioTracks[0] ? audioTracks[0].currentTime : 0;

        if(event.idx==event.size-1)handlePause();
        let nextEvent = events[event.idx + 1];

        

        let newEvent;
        let msg = "";

        if (nextEvent.time <= time) {
          let timeDiffMs = Math.floor((nextEvent.time - time) * 1000);
          msg = "delay " + timeDiffMs;
          newEvent = events[event.idx + 1];
        } else {
          newEvent = findNearest(time);
        }

        if (newEvent.idx != event.idx) {
          nextEvent = events[newEvent.idx + 1];
          let timeDiffToNextMs = Math.floor((nextEvent.time - time) * 1000);
          msg += " next in " + timeDiffToNextMs;
          setTimerTick(!timerTick);
          setTimerInterval(timeDiffToNextMs);
          setEvent(newEvent);
        } else {
          msg += " waste";
          setTimerTick(!timerTick);
          setTimerInterval(50);
        }
        // console.log(msg)
      }, timerInterval);
    }
  }, [isPlaying, timerTick]);

  let s=1;
  /* Update Cursor location accounting for <ScoreSVG> position and scaling */
  function updateCursor() {
    if (!scoreElement) return;
  
    const rect = scoreElement.getBoundingClientRect();
    const renderedWidth = rect.width;
    const renderedHeight = rect.height;

    const scaleX = renderedWidth / mscorePageWidth; // SVG width of as exported from MuseScore
    const scaleY = renderedHeight / mscorePageHeight; // SVG height of as exported from MuseScore

    
    setSVGScale({ scaleX, scaleY });
    console.log(svgScale)
    const newCursorTop = event.y * svgScale.scaleY + event.page*mscorePageHeight*scaleY
    if(Math.abs(cursorPosition.top-newCursorTop)>10){
      if(newCursorTop>renderedHeight*.3)
        setscoreScroll(-newCursorTop+renderedHeight*.3)
      else 
        setscoreScroll(0)

    }


    setCursorPosition({
      top: event.y * svgScale.scaleY + event.page*mscorePageHeight*scaleY,
      left: event.x * svgScale.scaleX,
      width: event.w * svgScale.scaleX,
      height: event.h * svgScale.scaleY,
    }); 

   

  }

  /* Update Cursor if scoreElement coordinates change */
  useEffect(() => {
    console.log(scoreElement)
    if (scoreElement) {
      window.addEventListener("resize", updateCursor);
      window.addEventListener("scroll", updateCursor);
      window.addEventListener("wheel", updateCursor);
      window.addEventListener("mousemove", updateCursor);
      window.addEventListener("touchmove", updateCursor);
    }

    return () => {
      window.removeEventListener("resize", updateCursor);
      window.removeEventListener("scroll", updateCursor);
      window.removeEventListener("wheel", updateCursor);
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("touchmove", updateCursor);
    };
  }, [scoreElement]);

  /* Prevents user zoom */
  useEffect(() => {
    const handleKeydown = (e) => {
      if (
        e.ctrlKey &&
        (e.keyCode == "61" ||
          e.keyCode == "107" ||
          e.keyCode == "173" ||
          e.keyCode == "109" ||
          e.keyCode == "187" ||
          e.keyCode == "189")
      ) {
        e.preventDefault();
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);


  /* Set styles according to settings*/
  useEffect(() => {

    if(!settings.videoPosition)return



    if(settings.videoPosition.includes("cen")){
      setVideoContainerStyle({})
      setVideoStyle(
        {
          position: "fixed",
          width:"100%",
          height:"auto",
          left: "0px",
        }
      )
    }


    if(settings.videoPosition.includes("left")){
        setVideoContainerStyle(
          {
            position: "fixed",
            width:"50%",
            height: "100vh", 
            left: "0px",
            overflow:"hidden"
          }
        )
        setVideoStyle(
          {
            position: "absolute",
            width: "200%",
            height: "100%",
            left: "-50%",
            objectFit: "cover",
            
          }
        )
      }
    else if(settings.videoPosition.includes("right")){
      setVideoContainerStyle(
        {
          position: "fixed",
          width:"50%",
          height: "100vh", 
          right: "0px",
          overflow:"hidden"
        }
      )
      setVideoStyle(
        {
          position: "absolute",
          width: "200%",
          height: "100%",
          left: "-50%",
          objectFit: "cover",
          
        }
      )
    }

    if(settings.scorePosition.includes("cen")){
        setScoreStyle(
          { 
            position:"fixed",
            
            left: "50%",
            transform: "translateX(-50%)",
            height: "auto" 
          }
        )
        setscoreScroll(-30)
    }

    if(settings.scorePosition.includes("left")){
      setScoreStyle(
        { 
          position:"fixed",
          width:"50%",
          left: "0px",
          height: "auto",
          margin: "0px",
          padding: "0px" 
        }
      )
    }

  if(settings.scorePosition.includes("right")){
    setScoreStyle(
      { 
        position:"fixed",
        width:"50%",
        right: `0px`,
        height: "auto" ,
        margin: "0px",
        padding: "0px"
      }
    )
  }



  }, [settings]);

  return (
    <AppContext.Provider
      value={{
        /* Shared with <HarmonicaScorePlayer> */
        downloadFiles,
        /* Shared with <AudioTransport> */
        handlePlay,
        handlePause,
        handleStop,
        /* Shared with <AudioControls> */
        handleVolumeChange,
        handleSpeedChange,
        speed,
        volumes,
        /* Shared with <Harmonica> */
        nHoles,
        /* Shared with <HarmonicaMoving> */
        tab,
        /* Shared with <ScoreSVG> */
        svgs,
        setScoreElement,
        scoreScroll,
        /* Shared with <ScoreCursor> */
        cursorPosition,
        video,setVideo,
        setVideoTrack,


        videoStyle,videoContainerStyle,scoreStyle,
        events,svgScale
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
