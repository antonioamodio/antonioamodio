'use client';
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Carousel from '../Carousel';

const rowVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.08,
    },
  }),
};

function Row({ item, isOpen, onToggle, index, reduceMotion }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [hasOpened, setHasOpened] = useState(isOpen);
  const resizeObserverRef = useRef(null);
  const frameRef = useRef(null);

  // misura e anima l'altezza reale del contenuto
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return undefined;

    const measure = () => {
      if (!el) return;
      setHeight(isOpen ? el.scrollHeight : 0);
    };

    measure();

    const handleResize = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        if (isOpen) measure();
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    if (isOpen && typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(measure);
      resizeObserverRef.current = ro;
      ro.observe(el);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  }, [isOpen, item]);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
    }
  }, [isOpen, hasOpened]);

  const rowHeight = isOpen ? Math.max(0, height) : 0;

  const MotionRow = reduceMotion ? 'tr' : motion.tr;
  const motionProps = reduceMotion
    ? {}
    : {
        variants: rowVariants,
        initial: 'hidden',
        animate: 'visible',
        custom: index,
      };

  return (
    <MotionRow className={isOpen ? 'open' : 'closed'} {...motionProps}>
      <td className="row-td">
        {/* ROW 1: header riga (click per aprire/chiudere) */}
        <div className="row-1" onClick={onToggle} role="button" aria-expanded={isOpen}>
          <div className="cell title"><span>{item.project}</span></div>
          <div className="cell year"><span>{item.year}</span></div>
          <div className="cell tag"><span>{item.tag || ''}</span></div>
          <div className="cell client"><span>{item.client}</span></div>
        </div>

        {/* ROW 2: area espansa (descrizione + carosello) */}
        <div
          className="row-2"
          style={{
            height: `${rowHeight}px`,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-4px)',
          }}
          aria-hidden={!isOpen}
        >
          <div ref={innerRef} className="row-2-inner">
            <div className="desc">
              {Array.isArray(item.description) ? (
                item.description.map((p, idx) => (
                  <div key={idx}>
                    <span>{p}</span>
                    <br />
                  </div>
                ))
              ) : item.description ? (
                <div>
                  <span>{item.description}</span>
                  <br />
                </div>
              ) : (
                <span className="muted">—</span>
              )}
            </div>

            <div className="carousel-slot">
              {hasOpened && <Carousel media={item.content || []} />}
            </div>
          </div>
        </div>
      </td>
    </MotionRow>
  );
}

export default function Table({ data }) {
  const [openId, setOpenId] = useState(null);
  const reduceMotion = useReducedMotion();

  const toPublic = (s) => (typeof s === 'string' ? s.replace(/^\.\/+/, '/') : s);

  const rows = useMemo(
    () =>
      (Array.isArray(data) ? data : []).map((it, index) => ({
        ...it,
        id: it.id ?? `${it.project ?? 'row'}-${index}`,
        description: Array.isArray(it.description)
          ? it.description.filter(Boolean)
          : it.description,
        content: (it.content || []).map(toPublic),
      })),
    [data]
  );

  const toggle = useCallback(
    (id) => {
      setOpenId((prev) => (prev === id ? null : id));
    },
    []
  );

  return (
    <section className="table">
      <table className="cinereousTable">
        <tbody>
          {rows.map((item, index) => (
            <Row
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
