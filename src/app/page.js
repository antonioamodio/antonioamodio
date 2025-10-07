'use client'
import RenderEnv from '@/components/RenderEnv';
import Link from 'next/link';
import Menu from '@/components/Menu';
import { useRef, useEffect, useState } from 'react';
import RandomText from '@/components/RandomText';


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

        <div className="main-contnet">

        <div className="home-menu">
          <Link href="/archive">archive</Link>
          <Link href="/archive">archive</Link>
          <Link href="/archive">archive</Link>
        </div>

        <div className="title-home">
          <h1 style={{pointerEvents: 'none'}}>KOWI'S</h1><br/>
          <h1>DIMENSION</h1>
        </div>

        <div className="info">
          <div className="slot">
            <span> antonio amodio</span>
            <span> 04 / 08 / 2004</span>
            <span>.</span>
          </div>
          <div className="slot ct">
            <span> creative coder</span>
            <span> graphic designer</span>
            <span> musician</span>
          </div>
          <div className="slot rg">
            <span> born in naples</span>
            <span> based in modena</span>
            <span>.</span>
          </div>
        </div>
        
        </div>

      </section>  
    </section>
  )
}
