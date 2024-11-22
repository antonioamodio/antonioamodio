'use client'
import Vector from '@/../public/shapes/Vector.svg'

export default function BackGround() {
  const vectors = Array.from({ length: 4 }, (_, index) => (
    <Vector key={index} className={`vector vector-${index + 1}`} />
  ));

  return (
    <section className="background">
      <div className="blue-box-container">
        {vectors}
      </div>
      <div className="blurred-overlay"></div>
    </section>
  )
}
