// Context.js
import React, { createContext, useState } from "react";

// Create Context
export const AppContext = createContext();

export function AppProvider({ children }) {
  // Global State
  
  const [time, setTime] = useState(0.0);
  const [cursor, setCursor] = useState([0, 0, 100, 300]);
  const [tab, setTab] = useState("");
  const [htype, setHtype] = useState("");




  return (
    <AppContext.Provider value={{ time, setTime, cursor, setCursor, tab, setTab }}>
      {children}
    </AppContext.Provider>
  );
}
