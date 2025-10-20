'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const PARTICLE_SETTINGS = Object.freeze({
  radius: 50,
  height: 20,
  count: 3000,
  size: 0.3,
  color: 0xffffff,
});

const SETTLE_DURATION = 1600; // ms

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function RenderEnv() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);
  const noiseFactorRef = useRef(0);
  const initialPositionsRef = useRef(null);
  const noise3DRef = useRef(null);
  const settleStartRef = useRef(null);
  const settleCompleteRef = useRef(false);

  if (!noise3DRef.current) {
    noise3DRef.current = createNoise3D();
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) {
      setIsLoading(false);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer =
      rendererRef.current ??
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    if (!rendererRef.current) {
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const createParticles = () => {
      const particlesGeometry = new THREE.BufferGeometry();
      const targetPositions = new Float32Array(PARTICLE_SETTINGS.count * 3);

      for (let i = 0; i < PARTICLE_SETTINGS.count; i += 1) {
        const angle = (i / PARTICLE_SETTINGS.count) * Math.PI * 2;
        const y = Math.random() * PARTICLE_SETTINGS.height - PARTICLE_SETTINGS.height / 2;
        targetPositions[i * 3] =
          Math.cos(angle) * PARTICLE_SETTINGS.radius + (Math.random() - 0.5) * 10;
        targetPositions[i * 3 + 1] = y;
        targetPositions[i * 3 + 2] =
          Math.sin(angle) * PARTICLE_SETTINGS.radius + (Math.random() - 0.5) * 10;
      }

      const startPositions = new Float32Array(PARTICLE_SETTINGS.count * 3);

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(startPositions, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        color: PARTICLE_SETTINGS.color,
        size: PARTICLE_SETTINGS.size,
        sizeAttenuation: true,
      });

      return {
        mesh: new THREE.Points(particlesGeometry, particlesMaterial),
        targetPositions,
      };
    };

    const { mesh: particles, targetPositions } = createParticles();
    particlesRef.current = particles;
    initialPositionsRef.current = targetPositions;
    scene.add(particles);

    camera.position.set(0, 100, 0);
    camera.lookAt(0, 0, 0);

    setIsLoading(false);
    settleStartRef.current = null;

    const animate = (timestamp) => {
      const particlesMesh = particlesRef.current;
      if (particlesMesh) {
        const positions = particlesMesh.geometry.attributes.position.array;
        const original = initialPositionsRef.current;
        if (original) {
          const startTime = settleStartRef.current ?? timestamp;
          settleStartRef.current = startTime;
          const elapsed = timestamp - startTime;
          const settleProgress = Math.min(elapsed / SETTLE_DURATION, 1);
          const easedProgress = easeOut(settleProgress);

          if (settleProgress < 1) {
            settleCompleteRef.current = false;
            for (let i = 0; i < positions.length; i += 1) {
              positions[i] = original[i] * easedProgress;
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;
          } else {
            if (!settleCompleteRef.current) {
              positions.set(original);
              settleCompleteRef.current = true;
            }

            const time = performance.now() * 0.001;
            const scale = 0.1;
            const noise3D = noise3DRef.current;
            const noiseFactor = THREE.MathUtils.clamp(noiseFactorRef.current, 0, 1);

            for (let i = 0; i < positions.length; i += 3) {
              const x = positions[i];
              const y = positions[i + 1];
              const z = positions[i + 2];
              const targetX = original[i];
              const targetY = original[i + 1];
              const targetZ = original[i + 2];

              const curlX = noise3D(x * scale, y * scale, z * scale + time) * noiseFactor;
              const curlY = noise3D(x * scale + time, y * scale, z * scale) * noiseFactor;
              const curlZ = noise3D(x * scale, y * scale + time, z * scale) * noiseFactor;

              const nextX = x + curlX;
              const nextY = y + curlY;
              const nextZ = z + curlZ;

              positions[i] = THREE.MathUtils.lerp(
                nextX,
                targetX,
                0.1 * (1 - noiseFactor)
              );
              positions[i + 1] = THREE.MathUtils.lerp(
                nextY,
                targetY,
                0.1 * (1 - noiseFactor)
              );
              positions[i + 2] = THREE.MathUtils.lerp(
                nextZ,
                targetZ,
                0.1 * (1 - noiseFactor)
              );
            }

            particlesMesh.geometry.attributes.position.needsUpdate = true;

            noiseFactorRef.current = noiseFactor;
          }
        }
      }

      renderer.render(scene, camera);
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      const windowHeight = window.innerHeight || 1;
      const next = 1 - event.clientY / windowHeight;
      noiseFactorRef.current = THREE.MathUtils.clamp(next, 0, 1);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (particlesRef.current) {
        const mesh = particlesRef.current;
        mesh.geometry.dispose();
        mesh.material.dispose();
        scene.remove(mesh);
        particlesRef.current = null;
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentElement === container) {
          container.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }

      initialPositionsRef.current = null;
      noiseFactorRef.current = 0;
      settleStartRef.current = null;
      settleCompleteRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`three-container${isLoading ? '' : ' hidden'}`}
    >
      <div className="absolute-span">
        <span className="phrase">
          move your mouse up and down to see the magic!
        </span>

        <div className="arrows" aria-hidden="true">
          {/* freccia su */}
          <svg className="icon arrow-up" viewBox="0 0 24 24">
            <path
              d="M12 19V5m0 0-6 6m6-6 6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* freccia giù */}
          <svg className="icon arrow-down" viewBox="0 0 24 24">
            <path
              d="M12 5v14m0 0-6-6m6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isLoading && <div className="loading-screen">Loading...</div>}
    </div>
  );
}
