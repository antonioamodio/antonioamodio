'use client'
import React, { useEffect, useRef, useState } from 'react';

export default function RandomText() {
  const paragraphRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (paragraphRef.current) {
        const paragraphPosition = paragraphRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Controlla se il componente è nella finestra di visualizzazione
        if (paragraphPosition < windowHeight) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const animateText = () => {
        const paragraph = paragraphRef.current;
        const originalText = paragraph.textContent;

        // Funzione per generare una combinazione casuale del testo
        const shuffleText = (text) => {
          return text.split('').sort(() => Math.random() - 0.5).join('');
        };

        // Visualizza combinazioni casuali ogni 0,1 secondi
        const intervalId = setInterval(() => {
          paragraph.textContent = shuffleText(originalText);
        }, 100);

        // Dopo 3,5 secondi, mostra il testo ordinato
        setTimeout(() => {
          clearInterval(intervalId); // Arresta l'aggiornamento casuale
          paragraph.textContent = originalText;
        }, 1500);
      };

      animateText(); // Avvia l'animazione quando il componente è visibile
    }
  }, [isVisible]);

  return (
    <div className='random-text'>
      <p ref={paragraphRef} style={{ whiteSpace: 'pre-line' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, esse suscipit fugit incidunt aliquam aliquid obcaecati rerum maxime tenetur optio, dolores sint! Quaerat harum molestias aut, fugiat adipisci quidem illum!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error aspernatur ducimus beatae, delectus placeat consequuntur quam quod voluptates molestias, asperiores dolorem repellendus ab. Est tenetur ipsum eligendi itaque sint aut!      
      </p>
    </div>
  );
}
