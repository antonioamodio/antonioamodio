'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function RandomText() {
  const paragraphRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const originalTextRef = useRef('');

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(paragraph);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;
    const paragraph = paragraphRef.current;
    if (!paragraph) return undefined;

    if (!originalTextRef.current) {
      originalTextRef.current = paragraph.textContent ?? '';
    }

    const originalText = originalTextRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!originalText || prefersReducedMotion) {
      paragraph.textContent = originalText;
      return undefined;
    }

    const shuffleText = (text) => text.split('').sort(() => Math.random() - 0.5).join('');

    const intervalId = window.setInterval(() => {
      paragraph.textContent = shuffleText(originalText);
    }, 100);

    const timeoutId = window.setTimeout(() => {
      clearInterval(intervalId);
      paragraph.textContent = originalText;
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      paragraph.textContent = originalText;
    };
  }, [isVisible]);

  return (
    <div className='random-text'>
      <p ref={paragraphRef} style={{ whiteSpace: 'pre-line' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, esse suscipit fugit incidunt aliquam aliquid obcaecati rerum maxime tenetur optio, dolores sint! Quaerat harum molestias aut, fugiat adipisci quidem illum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur ducimus beatae, delectus placeat consequuntur quam quod voluptates molestias, asperiores dolorem repellendus ab. Est tenetur ipsum eligendi itaque sint aut!      
      </p>
    </div>
  );
}
