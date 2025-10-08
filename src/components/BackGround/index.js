'use client';
import React, { useEffect, useState } from 'react';

export default function BackGround() {
  const [isIosLike, setIsIosLike] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const ua = navigator.userAgent || '';
    // iPhone/iPad/iPod + iPadOS che si finge Mac
    const isiOSDevice =
      /iPad|iPhone|iPod/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIosLike(isiOSDevice);
  }, []);

  return (
    <div className={`gradient-bg fixed-background ${isIosLike ? 'ios-fallback' : ''}`}>
      {/* Definizioni SVG usate solo su desktop/browser compatibili */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="gradients-container">
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
        <div className="g4" />
        <div className="g5" />
        <div className="interactive" />
      </div>
    </div>
  );
}
