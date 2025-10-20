'use client';

import { useEffect, useRef } from 'react';
import { useAnimate, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function TransitionLayout({ children }) {
  const pathname = usePathname() || '/';
  const reduceMotion = useReducedMotion();
  const firstRenderRef = useRef(true);
  const [scope, animate] = useAnimate();

  if (reduceMotion) {
    return <div ref={scope}>{children}</div>;
  }

  return (
    <AnimatedContainer
      scope={scope}
      animate={animate}
      pathname={pathname}
      firstRenderRef={firstRenderRef}
    >
      {children}
    </AnimatedContainer>
  );
}

function AnimatedContainer({ scope, animate, pathname, firstRenderRef, children }) {
  useEffect(() => {
    if (!scope.current) return;

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const node = scope.current;

    const controller = animate(
      node,
      { opacity: [0, 1], y: [18, 0], filter: ['blur(12px)', 'blur(0px)'] },
      { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
    );

    return () => {
      controller?.stop?.();
    };
  }, [animate, pathname, scope, firstRenderRef]);

  return (
    <div
      ref={scope}
      style={{
        minHeight: '100%',
        opacity: 1,
        transform: 'translateY(0)',
        filter: 'blur(0)',
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}
