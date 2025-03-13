// Context.js
import React, { createContext, useState } from "react";

// Create Context
export const AppContext = createContext();

export function AppProvider({ children }) {
  // Global State
  
  const [time, setTime] = useState(0.0);
  const [timerRef, setTimerRef] = useState(0);
  const [timerInterval, setTimerInterval] = useState(50);
  const [cursor, setCursor] = useState([0, 0, 0, 0]);
  const [tab, setTab] = useState("");
  const [htype, setHtype] = useState("");

  const [mp3s, setMP3s] = useState([]);
  const [event, setEvent] = useState({idx:0,time:0});
  const [events, setEvents] = useState([{idx:0,time:0},{idx:1,time:1000}]);

  const [svgs, setSVGs] = useState([]);
  const [svgPage, setSVGPage] = useState(0);
  const [svgRect, setSVGRect] = useState({});
  const [svgScale, setSVGScale] = useState({});


  return (
    <AppContext.Provider value={{
                                time, setTime, 
                                timerInterval, setTimerInterval,
                                timerRef, setTimerRef,
                                event,setEvent,
                                cursor, setCursor, 
                                tab, setTab,
                                mp3s, setMP3s,
                                events, setEvents,
                                svgs,setSVGs,
                                svgPage, setSVGPage,
                                svgRect, setSVGRect, 
                                svgScale, setSVGScale
                               }}>
      {children}
    </AppContext.Provider>
  );
}
