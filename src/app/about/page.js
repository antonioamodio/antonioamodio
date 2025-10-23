'use client';

import Link from 'next/link';
import FaceParticles from '../../components/FaceParticles';

export default function About() {
  return (
    <section className="about-face">
      <FaceParticles />
      <div className="about-face__overlay">
        <h1>Antonio Amodio</h1>
        <p>
          Scultura di particelle che ricostruisce il mio volto digitale. Trascina per modellare le scie e
          scopri le forme che emergono dal movimento.
        </p>
        <p className="about-face__cta">
          <Link href="/">Torna alla Home</Link>
        </p>
      </div>
    </section>
  );
}
