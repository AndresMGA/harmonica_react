import React, { useEffect, useContext } from 'react';
import HarmonicaStatic from "./HarmonicaStatic";
import HarmonicaMoving from "./HarmonicaMoving";


const Harmonica = () => {


  return (
    <div>
      <HarmonicaStatic />
      <HarmonicaMoving />
    </div>
  );
};

export default Harmonica;
