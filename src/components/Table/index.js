'use client'
import React, { useState, useMemo } from 'react';
import Carousel from '@/components/Carousel';

export default function Table({ data }) {
  const [hoveredCover, setHoveredCover] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toPublic = (s) => (typeof s === 'string' ? s.replace(/^\.\/+/, '/') : s);
  const rows = useMemo(
    () =>
      (data || []).map(it => ({
        ...it,
        cover: toPublic(it.cover),
        content: (it.content || []).map(toPublic),
      })),
    [data]
  );

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="table">
      <div className="image" style={{ backgroundImage: `url(${hoveredCover || ''})` }} />
      <table className="cinereousTable">
        <tbody>
          {rows.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <tr
                key={i}
                className={isOpen ? 'open' : 'closed'}
                onMouseEnter={() => setHoveredCover(item.cover)}
                onMouseLeave={() => setHoveredCover(null)}
              >
                <td className="row-td">
                  {/* ROW 1: header riga (click per aprire/chiudere) */}
                  <div className="row-1" onClick={() => toggle(i)}>
                    <div className="cell title"><span>{item.project}</span></div>
                    <div className="cell year"><span>{item.year}</span></div>
                    <div className="cell tag"><span>{item.tag || ''}</span></div>
                    <div className="cell client"><span>{item.client}</span></div>
                  </div>

                  {/* ROW 2: area espansa (descrizione + carosello) */}
                  <div className="row-2">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
