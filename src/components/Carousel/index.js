'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

export default function Carousel({
  media = [],
  startIndex = 0,
  className = '',
  onIndexChange,
}) {
  const [i, setI] = useState(startIndex);
  const total = media.length;
  const idx = useMemo(() => (total ? (i + total) % total : 0), [i, total]);
  const current = total ? media[idx] : null;

  const go = (delta) => {
    setI((v) => {
      const next = v + delta;
      if (typeof onIndexChange === 'function') {
        const safe = total ? (next % total + total) % total : 0;
        onIndexChange(safe);
      }
      return next;
    });
  };

  if (!total) {
    return (
      <div className={"frame"}>
        <div className={"empty"}>Nessun media</div>
      </div>
    );
  }

  return (
    <div
      className={"wrap"}
      aria-roledescription="carousel"
      aria-label="Media carousel"
    >
      <div className={"frame"}>
        {isVideo(current) ? (
          <video
            key={current}
            src={current}
            className={"video"}
            controls
            playsInline
          />
        ) : (
          <div className={"imageWrap"}>
            <Image
              key={current}
              src={current}
              alt="carousel item"
              fill
              className={"image"}
              sizes="100vw, 400px"
              priority={false}
            />
          </div>
        )}
      </div>

      <div className={"indicator"}>
      <button
          type="button"
          aria-label="Precedente"
          onClick={() => go(-1)}
          className={"ctrl left"}
        >
          ‹
        </button>
        
        <span>{idx + 1} / {total}</span>
        
        <button
          type="button"
          aria-label="Successiva"
          onClick={() => go(1)}
          className={"ctrl right"}
        >
          ›
        </button>
        
        </div>
    </div>
  );
}

function isVideo(url) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}
