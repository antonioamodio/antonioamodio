'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Carousel from '../Carousel';

function Row({ item, isOpen, onToggle }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  // misura e anima l'altezza reale del contenuto
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const update = () => {
      if (isOpen) {
        setHeight(el.scrollHeight);
      } else {
        setHeight(0);
      }
    };

    update();

    // aggiorna l'altezza quando il contenuto cambia dimensione
    const ro = new ResizeObserver(() => {
      if (isOpen) setHeight(el.scrollHeight);
    });
    ro.observe(el);

    // aggiorna anche al resize della finestra
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [isOpen, item]);

  return (
    <tr className={isOpen ? 'open' : 'closed'}>
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
            height,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-4px)',
          }}
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
              <Carousel media={item.content || []} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function Table({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toPublic = (s) => (typeof s === 'string' ? s.replace(/^\.\/+/, '/') : s);

  const rows = useMemo(
    () =>
      (data || []).map((it) => ({
        ...it,
        cover: toPublic(it.cover),
        content: (it.content || []).map(toPublic),
      })),
    [data]
  );

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="table">
      <table className="cinereousTable">
        <tbody>
          {rows.map((item, i) => (
            <Row
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
