'use client'
import React, { useState } from 'react';
import Menu from "@/component/Menu";
import RenderEnv from "@/component/RenderEnv";
import Image from "next/image";

export default function Table({ data }) {
  const [hoveredCover, setHoveredCover] = useState(null);

  return (
    <section className="table">
      <div className="image" style={{ backgroundImage: `url(${hoveredCover})` }}></div>
      <table className="cinereousTable">

        <tbody>
          {data.map((item, index) => (
            <tr key={index} onMouseEnter={() => setHoveredCover(item.cover)} onMouseLeave={() => setHoveredCover(null)}>
              <td>{item.project}</td>
              <td>{item.year}</td>
              <td></td>
              <td>{item.client}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
