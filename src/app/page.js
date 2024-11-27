'use client'
import RenderEnv from '@/component/RenderEnv';
import Link from 'next/link';
import Menu from '@/component/Menu';
import { useRef, useEffect, useState } from 'react';
import RandomText from '@/component/RandomText';


export default function Home() {
  const scrollRef = useRef(null);
  const [rotateArrow, setRotateArrow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const shouldRotate = scrollTop >= window.innerHeight;
        setRotateArrow(shouldRotate);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleArrowClick = () => {
    if (scrollRef.current) {
      if (rotateArrow) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(loadingTimer);
  }, []);


  return (
    <section className="homee">
      <RenderEnv/>
      <section className="section-standard" id='home'>
      <div className="title">
        <h1>ANTONIO</h1>
        <h1>AMODIO</h1>
      </div>
      <div/>
      <div/>
      <div className="description">
        {/* <p>Web Developer and Graphic Designer based in Modena, focused on delivering cohesive and engaging digital experiences.</p> */}
      <p> My website is currently under development. Check back soon to discover all the updates!</p>  
      </div>
      </section>    
    </section>
  )
}
