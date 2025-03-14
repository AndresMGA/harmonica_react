import React, { createContext, useState, useEffect } from "react";
import { downloadAll } from "./AppContextDownload"; // Import utility functions
export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [tab, setTab] = useState("");
  const [htype, setHtype] = useState("");

  const [mp3s, setMP3s] = useState([]);
  const [audioTracks, setAudioTracks] = useState([null, null, null]);
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

  const [svgs, setSVGs] = useState([]);
  const [svg, setSVG] = useState(null);
  const [svgPage, setSVGPage] = useState(0);
  const [svgRect, setSVGRect] = useState({});
  const [svgScale, setSVGScale] = useState({});
  const [svgElement, setSVGElement] = useState(null);

  const downloadFiles= () => {
    downloadAll(setMP3s,setSVGs,setEvents);
  };

  /* Handle Play */
  const handlePlay = () => {
    audioTracks.forEach((audioTrack) => audioTrack?.play());
    setIsPlaying(true);
  };
  /* Handle Pause */
  const handlePause = () => {
    audioTracks.forEach((audioTrack) => audioTrack?.pause());
    setIsPlaying(false);
  };

  /* Handle Stop */
  const handleStop = () => {
    audioTracks.forEach((audioTrack) => {
      if (audioTrack) audioTrack.pause();
      audioTrack.currentTime = 0;
    });

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

  /* Update Cursor location accounting for <ScoreSVG> position and scaling */
  function updateCursor() {
    if (!svgElement) return;

    const rect = svgElement.getBoundingClientRect();
    const renderedWidth = rect.width;
    const renderedHeight = rect.height;

    const scaleX = renderedWidth / 2977.2; // SVG width of as exported from MuseScore
    const scaleY = renderedHeight / 4208.4; // SVG height of as exported from MuseScore

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const adjustedRect = {
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      right: rect.right + scrollX,
      bottom: rect.bottom + scrollY,
      width: rect.width,
      height: rect.height,
    };

    setSVGScale({ scaleX, scaleY });
    setSVGRect(adjustedRect);
    setCursorPosition({
      top: svgRect.top + event.y * svgScale.scaleY,
      left: svgRect.left + event.x * svgScale.scaleX,
      width: event.w * svgScale.scaleX,
      height: event.h * svgScale.scaleY,
    });
  }

  /* Update Cursor if svgElement coordinates change */
  useEffect(() => {
    if (svgElement) {
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
  }, [svgElement]);

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
        /* Shared with <HarmonicaMoving> */
        tab,
        /* Shared with <ScoreSVG> */
        svg,
        setSVGElement,
        /* Shared with <ScoreCursor> */
        cursorPosition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
