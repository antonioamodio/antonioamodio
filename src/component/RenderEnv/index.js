'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

export default function RenderEnv() {
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const rendererRef = useRef(null);
    const particlesRef = useRef(null);
    const noise3D = createNoise3D();

    const radius = 50;
    const height = 20;
    const particleCount = 3000;
    const particleSize = 0.3;
    const particleColor = 0xFFFFFF;
    let noiseFactor = 0;

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        if (!rendererRef.current) {
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            containerRef.current.appendChild(renderer.domElement);
            rendererRef.current = renderer;
        }

        const renderer = rendererRef.current;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const createParticles = (count) => {
            const particlesGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const y = Math.random() * height - height / 2;
                positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 10;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 10;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particlesMaterial = new THREE.PointsMaterial({ color: particleColor, size: particleSize, sizeAttenuation: true });
            return new THREE.Points(particlesGeometry, particlesMaterial);
        };

        particlesRef.current = createParticles(particleCount);
        scene.add(particlesRef.current);

        camera.position.set(0, 100, 0);
        camera.lookAt(0, 0, 0);
        
        setIsLoading(false);

        const initialPositions = particlesRef.current.geometry.attributes.position.array.slice();

        const animate = () => {
            requestAnimationFrame(animate);

            if (particlesRef.current) {
                const positions = particlesRef.current.geometry.attributes.position.array;
                const time = performance.now() * 0.001;
                const scale = 0.1;

                for (let i = 0; i < positions.length; i += 3) {
                    const x = positions[i];
                    const y = positions[i + 1];
                    const z = positions[i + 2];

                    const curlX = noise3D(x * scale, y * scale, z * scale + time) * noiseFactor;
                    const curlY = noise3D(x * scale + time, y * scale, z * scale) * noiseFactor;
                    const curlZ = noise3D(x * scale, y * scale + time, z * scale) * noiseFactor;

                    positions[i] += curlX;
                    positions[i + 1] += curlY;
                    positions[i + 2] += curlZ;

                    positions[i] = THREE.MathUtils.lerp(positions[i], initialPositions[i], 0.1 * (1 - noiseFactor));
                    positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], initialPositions[i + 1], 0.1 * (1 - noiseFactor));
                    positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], initialPositions[i + 2], 0.1 * (1 - noiseFactor));
                }

                particlesRef.current.geometry.attributes.position.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (event) => {
            // Calcola il noiseFactor in base alla posizione verticale del mouse
            const windowHeight = window.innerHeight;
            const mouseY = event.clientY; // Posizione Y del mouse
            noiseFactor = 1 - mouseY / windowHeight; // Normalizza e inverte (alto: 1, basso: 0)
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            renderer.dispose();
        };
    }, [radius, height, particleCount, particleSize]);

    return (
        <div ref={containerRef} className={`three-container`}>
            {isLoading && <div className="loading-screen">Loading...</div>}
        </div>
    );
}
