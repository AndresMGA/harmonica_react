import React from "react";

import HarmonicaCanvas from "./HarmonicaCanvas";

const Harmonica = () => {
  

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <HarmonicaCanvas/>

     
    </div>
  );
};

export default Harmonica;
