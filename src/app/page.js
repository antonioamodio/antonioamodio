'use client'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Logo from '../../public/main-logo.svg';
import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
  const [isDesktop, setIsDesktop] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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
    let rafId = null;

    const updateArrow = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const shouldRotate = scrollTop >= window.innerHeight;
      setRotateArrow((prev) => (prev === shouldRotate ? prev : shouldRotate));
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateArrow);
    };

    updateArrow();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleArrowClick = () => {
    if (!scrollRef.current) return;
    window.scrollTo({
      top: rotateArrow ? 0 : window.innerHeight,
      behavior: 'smooth',
    });
  };

  const infoSlots = useMemo(
    () => [
      [' antonio amodio', ' 04 / 08 / 2004', '.'],
      [' creative coder', ' graphic designer', ' musician'],
      [' born in naples', ' based in modena', '.'],
    ],
    []
  );

  const animationsEnabled = !shouldReduceMotion;

  const mainVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const infoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const infoItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const mainAnimationProps = animationsEnabled
    ? { variants: mainVariants, initial: 'hidden', animate: 'visible' }
    : { initial: false, animate: false };

  return (
    <section className="homee">
      {/* RenderEnv caricato SOLO su desktop */}
      {!shouldReduceMotion && isDesktop && <RenderEnvDesktop />}

      <section className="section-standard" id="home" ref={scrollRef}>
        <motion.div className="main-contnet" {...mainAnimationProps}>
          <motion.div className="home-menu" variants={blockVariants}>
            <Link href="/">kowi</Link>
            <Link href="/archive">archive</Link>
            <Link href="/contact">contact</Link>
          </motion.div>

          <motion.div className="title-home" variants={blockVariants}>
            <Logo className="logo" aria-label="Brand logo" />
          </motion.div>

          <motion.div className="info" variants={infoContainerVariants}>
            {infoSlots.map((slot, index) => (
              <motion.div
                key={index}
                className={`slot${index === 1 ? ' ct' : index === 2 ? ' rg' : ''}`}
                variants={infoItemVariants}
              >
                {slot.map((text, spanIdx) => (
                  <span key={spanIdx}>{text}</span>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </section>
  );
}
