'use client'
import React, { useEffect } from 'react';
import Swup from 'swup';

const SwupWrapper = ({ children }) => {
  useEffect(() => {
    const swup = new Swup();
    console.log("Swup initialized");

    return () => {
      swup.destroy();
      console.log("Swup destroyed");
    };
  }, []);

  return <div id="swup" className="transition-fade">{children}</div>;
};

export default SwupWrapper;
