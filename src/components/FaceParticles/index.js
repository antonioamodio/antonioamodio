'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const MAX_PARTICLES = 6000;
const POINTER_RADIUS = 0.35;
const POINTER_INTENSITY = 0.32;
const NOISE_FREQUENCY = 3.2;
const NOISE_AMPLITUDE = 0.6;
const SURFACE_JITTER = 0.05;
const AUTO_ROTATION_SPEED = 0.25; // rad/s

export default function FaceParticles() {
  const containerRef = useRef(null);
  const noise3DRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    if (!noise3DRef.current) {
      noise3DRef.current = createNoise3D();
    }

    let disposed = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      32,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(2, 1, 3);
    scene.add(ambient, fill);

    const group = new THREE.Group();
    scene.add(group);

    const sampleSurface = (geometry) => {
      const geo = geometry.toNonIndexed().clone();
      geo.computeVertexNormals();
      geo.center();

      const positions = geo.attributes.position.array;
      const triCount = positions.length / 9;
      const cumulativeAreas = new Float32Array(triCount);

      const v0 = new THREE.Vector3();
      const v1 = new THREE.Vector3();
      const v2 = new THREE.Vector3();
      const edge1 = new THREE.Vector3();
      const edge2 = new THREE.Vector3();
      const cross = new THREE.Vector3();

      let totalArea = 0;
      for (let i = 0; i < triCount; i += 1) {
        const base = i * 9;
        v0.set(positions[base], positions[base + 1], positions[base + 2]);
        v1.set(positions[base + 3], positions[base + 4], positions[base + 5]);
        v2.set(positions[base + 6], positions[base + 7], positions[base + 8]);

        edge1.copy(v1).sub(v0);
        edge2.copy(v2).sub(v0);
        const area = cross.copy(edge1).cross(edge2).length() * 0.5;
        totalArea += area;
        cumulativeAreas[i] = totalArea;
      }

      const pickTriangle = (r) => {
        let low = 0;
        let high = triCount - 1;
        while (low < high) {
          const mid = (low + high) >> 1;
          if (r < cumulativeAreas[mid]) high = mid;
          else low = mid + 1;
        }
        return low;
      };

      const sampled = new Float32Array(MAX_PARTICLES * 3);
      const point = new THREE.Vector3();
      const normal = new THREE.Vector3();

      for (let i = 0; i < MAX_PARTICLES; i += 1) {
        const r = Math.random() * totalArea;
        const tri = pickTriangle(r);
        const base = tri * 9;

        v0.set(positions[base], positions[base + 1], positions[base + 2]);
        v1.set(positions[base + 3], positions[base + 4], positions[base + 5]);
        v2.set(positions[base + 6], positions[base + 7], positions[base + 8]);

        const u = Math.random();
        const v = Math.random();
        const sqrtU = Math.sqrt(u);
        const baryA = 1 - sqrtU;
        const baryB = sqrtU * (1 - v);
        const baryC = v * sqrtU;

        point
          .set(0, 0, 0)
          .addScaledVector(v0, baryA)
          .addScaledVector(v1, baryB)
          .addScaledVector(v2, baryC);

        edge1.copy(v1).sub(v0);
        edge2.copy(v2).sub(v0);
        normal.copy(edge1.cross(edge2)).normalize();
        point.addScaledVector(normal, (Math.random() - 0.5) * SURFACE_JITTER);

        const idx = i * 3;
        sampled[idx] = point.x * 0.8;
        sampled[idx + 1] = point.y * 0.8;
        sampled[idx + 2] = point.z * 0.8;
      }

      return sampled;
    };

    const sampledPositions = sampleSurface(new THREE.IcosahedronGeometry(1, 6));
    const livePositions = new Float32Array(sampledPositions);

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(livePositions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const points = new THREE.Points(particlesGeometry, material);
    group.add(points);

    const pointer = new THREE.Vector2();
    const pointerWorld = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const interactionSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 0.55);
    let pointerStrength = 0;

    const rotationTarget = { x: 0, y: 0 };
    const rotationCurrent = { x: 0, y: 0 };
    let lastDragX = 0;
    let lastDragY = 0;
    let dragging = false;
    let lastFrameTime = performance.now();

    let frameId = null;

    const animate = () => {
      if (disposed) return;

      const now = performance.now();
      const delta = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      if (!dragging) {
        rotationTarget.y += AUTO_ROTATION_SPEED * delta;
        rotationTarget.x = THREE.MathUtils.lerp(rotationTarget.x, 0, 0.08);
      }

      rotationTarget.y = THREE.MathUtils.euclideanModulo(rotationTarget.y, Math.PI * 2);

      rotationCurrent.x = THREE.MathUtils.lerp(rotationCurrent.x, rotationTarget.x, 0.15);
      rotationCurrent.y = THREE.MathUtils.lerp(rotationCurrent.y, rotationTarget.y, 0.15);
      group.rotation.set(rotationCurrent.x, rotationCurrent.y, 0);

      const positions = particlesGeometry.attributes.position.array;
      pointerStrength = THREE.MathUtils.lerp(pointerStrength, 0, 0.06);
      const time = performance.now() * 0.001;
      const noiseFn = noise3DRef.current;

      for (let i = 0; i < positions.length; i += 3) {
        const ox = sampledPositions[i];
        const oy = sampledPositions[i + 1];
        const oz = sampledPositions[i + 2];

        let nx = ox;
        let ny = oy;
        let nz = oz;

        if (pointerStrength > 0.001) {
          const dx = ox - pointerWorld.x;
          const dy = oy - pointerWorld.y;
          const dz = oz - pointerWorld.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < POINTER_RADIUS * POINTER_RADIUS) {
            const dist = Math.sqrt(distSq) + 1e-4;
            const falloff = Math.pow(Math.max(0, 1 - dist / POINTER_RADIUS), 2);
            const baseAmp = pointerStrength * POINTER_INTENSITY * falloff;

            const fx = noiseFn(ox * NOISE_FREQUENCY + time, oy * NOISE_FREQUENCY, time * 0.35);
            const fy = noiseFn(oy * NOISE_FREQUENCY - time * 0.2, oz * NOISE_FREQUENCY, time * 0.42);
            const fz = noiseFn(oz * NOISE_FREQUENCY, ox * NOISE_FREQUENCY + time * 0.18, time * 0.28);
            const swirlScale = baseAmp * NOISE_AMPLITUDE;

            nx += fx * swirlScale;
            ny += fy * swirlScale;
            nz += fz * swirlScale;

            const push = baseAmp * 0.35;
            nx += (dx / dist) * push;
            ny += (dy / dist) * push;
            nz += (dz / dist) * push;
          }
        }

        positions[i] = THREE.MathUtils.lerp(positions[i], nx, 0.32);
        positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], ny, 0.32);
        positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], nz, 0.32);
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const updatePointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.ray.intersectSphere(interactionSphere, new THREE.Vector3());
      if (hit) {
        pointerWorld.copy(hit);
        pointerStrength = 1;
      } else {
        pointerStrength = 0;
        pointerWorld.set(0, 0, 0);
      }
    };

    const handlePointerDown = (event) => {
      dragging = true;
      lastDragX = event.clientX;
      lastDragY = event.clientY;
      event.currentTarget.setPointerCapture?.(event.pointerId);
      updatePointer(event);
    };

    const handlePointerMove = (event) => {
      if (dragging) {
        const deltaX = event.clientX - lastDragX;
        const deltaY = event.clientY - lastDragY;
        lastDragX = event.clientX;
        lastDragY = event.clientY;

        rotationTarget.y += (deltaX / window.innerWidth) * Math.PI;
        rotationTarget.x = THREE.MathUtils.clamp(
          rotationTarget.x + (deltaY / window.innerHeight) * Math.PI,
          -Math.PI / 4,
          Math.PI / 4
        );

        pointerStrength = Math.min(1, pointerStrength + Math.hypot(deltaX, deltaY) * 0.004);
      }
      updatePointer(event);
    };

    const handlePointerUp = (event) => {
      dragging = false;
      event.currentTarget.releasePointerCapture?.(event.pointerId);
      pointerStrength = 0;
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    };

    onResize();
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(onResize)
      : null;

    if (resizeObserver) {
      resizeObserver.observe(document.body);
    } else {
      window.addEventListener('resize', onResize);
    }

    const canvas = renderer.domElement;
    canvas.style.touchAction = 'none';
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    frameId = requestAnimationFrame(animate);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', onResize);

      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      if (frameId !== null) cancelAnimationFrame(frameId);

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      if (points) {
        points.geometry.dispose();
        points.material.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className="face-particles" />;
}
