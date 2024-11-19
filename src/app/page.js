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
      <div className={`arrow ${rotateArrow ? 'rotate' : ''}`} onClick={handleArrowClick}></div>

      <section className="section-standard home" id='home'>
        <div className="slot-25 social no-mobile">
          <Link href={'https://www.instagram.com/kowi.303/'}>Instagram</Link>
          <Link href={'https://www.linkedin.com/in/antonio-amodio-066400277/'}>Linkedin</Link>
        </div>
        <div className="container">
          <div className="info only-mobile">
            <div className="slot-info"><p>Sound Maker.</p><p>Dj.</p></div>
            <div className="slot-info right-mobile"><p>04/08/2004</p></div>
          </div>
          <h1 className="damn">ANTONIO AMODIO</h1>
          <div className="info">
            <div className="slot-info"><p>Born in <b>Naples</b>.</p><p>Based in <b>Modena</b>.</p></div>
            <div className="slot-info right-mobile"><p>Web Developer.</p><p>2D/3D Designer.</p></div>
            <div className="slot-info no-mobile"><p>Sound Maker.</p><p>Dj.</p></div>
            <div className="slot-info no-mobile"><p>04/08/2004</p></div>
          </div>

        </div>
        <div className="slot-25 no-mobile"></div>
      </section>

      <section className="section-standard about-me">
            <div className="slot-25"></div>
            <div className="container">
              <div className="top">
                    <h1 className="damn">ABOUT ME</h1>
                    <div className="top2"></div>
                </div>
                <div className="glass">
                  <RandomText/>
                </div>
            </div>
            <div className="slot-25"></div>
      </section>

      <section className="section-standard"></section>
      <section className="section-standard"></section>
    </section>
  )
}
