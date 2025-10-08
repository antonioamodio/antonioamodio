'use client'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Logo from '../../public/main-logo.svg';
import { useRef, useEffect, useState } from 'react';

// dinamico: il chunk viene caricato SOLO se il componente viene renderizzato
const RenderEnvDesktop = dynamic(() => import('../components/RenderEnv'), {
  ssr: false,
  loading: () => null,
});

function getIsDesktop() {
  if (typeof window === 'undefined') return false;
  const mqWidth   = window.matchMedia('(min-width: 1024px)');
  const mqHover   = window.matchMedia('(hover: hover)');
  const mqPointer = window.matchMedia('(pointer: fine)');
  return mqWidth.matches && mqHover.matches && mqPointer.matches;
}

export default function Home() {
  const scrollRef = useRef(null);
  const [rotateArrow, setRotateArrow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  // rileva desktop e aggiorna se cambia (es. rotate screen / resize)
  useEffect(() => {
    const update = () => setIsDesktop(getIsDesktop());
    update();

    const mqWidth   = window.matchMedia('(min-width: 1024px)');
    const mqHover   = window.matchMedia('(hover: hover)');
    const mqPointer = window.matchMedia('(pointer: fine)');

    const handler = () => update();

    // addEventListener per browser moderni, fallback a addListener
    [mqWidth, mqHover, mqPointer].forEach(mq => {
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else mq.addListener?.(handler);
    });

    return () => {
      [mqWidth, mqHover, mqPointer].forEach(mq => {
        if (mq.removeEventListener) mq.removeEventListener('change', handler);
        else mq.removeListener?.(handler);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const shouldRotate = scrollTop >= window.innerHeight;
        setRotateArrow(shouldRotate);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleArrowClick = () => {
    if (!scrollRef.current) return;
    window.scrollTo({
      top: rotateArrow ? 0 : window.innerHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <section className="homee">
      {/* RenderEnv caricato SOLO su desktop */}
      {isDesktop && <RenderEnvDesktop />}

      <section className="section-standard" id="home" ref={scrollRef}>
        <div className="main-contnet">
          <div className="home-menu">
            <Link href="/">kowi</Link>
            <Link href="/archive">archive</Link>
            <Link href="/">contact</Link>
          </div>

          <div className="title-home">
            <Logo className="logo" aria-label="Brand logo" />
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
  );
}
