'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export function Tech3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const particlesRef = useRef<THREE.Points>();
  const geometryRef = useRef<THREE.BufferGeometry>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    containerRef.current.appendChild(renderer.domElement);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create optimized particle system - reduced count for better performance
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Positions - distributed in a large cube
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;
      
      // Colors - grayscale with slight variations
      const intensity = Math.random() * 0.8 + 0.2;
      colors[i3] = intensity;
      colors[i3 + 1] = intensity;
      colors[i3 + 2] = intensity;
      
      // Sizes
      sizes[i] = Math.random() * 2 + 0.5;
      
      // Velocities for movement
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    geometryRef.current = geometry;

    // Advanced particle material with custom shader
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      
      void main() {
        float distance = length(gl_PointCoord - vec2(0.5));
        float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
        alpha *= 0.8;
        
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Create geometric structures
    const createTechStructures = () => {
      // Wireframe cubes - optimized count
      for (let i = 0; i < 3; i++) {
        const wireGeometry = new THREE.BoxGeometry(20, 20, 20);
        const wireMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        });
        
        const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
        wireframe.position.set(
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150
        );
        
        wireframe.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        scene.add(wireframe);
        
        // Animate rotation
        gsap.to(wireframe.rotation, {
          x: wireframe.rotation.x + Math.PI * 2,
          y: wireframe.rotation.y + Math.PI * 2,
          duration: 20 + Math.random() * 10,
          repeat: -1,
          ease: "none"
        });
      }

      // Tech lines connecting points - optimized
      for (let i = 0; i < 10; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(6);
        
        linePositions[0] = (Math.random() - 0.5) * 100;
        linePositions[1] = (Math.random() - 0.5) * 100;
        linePositions[2] = (Math.random() - 0.5) * 100;
        linePositions[3] = (Math.random() - 0.5) * 100;
        linePositions[4] = (Math.random() - 0.5) * 100;
        linePositions[5] = (Math.random() - 0.5) * 100;
        
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.1,
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
    };

    createTechStructures();

    // Camera positioning
    camera.position.z = 50;
    camera.position.y = 0;

    // Animation loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !particlesRef.current) return;

      // Animate particles
      const positions = geometryRef.current?.attributes.position.array as Float32Array;
      if (positions) {
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3] += velocities[i3];
          positions[i3 + 1] += velocities[i3 + 1];
          positions[i3 + 2] += velocities[i3 + 2];

          // Boundary wrapping
          if (Math.abs(positions[i3]) > 100) velocities[i3] *= -1;
          if (Math.abs(positions[i3 + 1]) > 100) velocities[i3 + 1] *= -1;
          if (Math.abs(positions[i3 + 2]) > 100) velocities[i3 + 2] *= -1;
        }
        if (geometryRef.current) {
          geometryRef.current.attributes.position.needsUpdate = true;
        }
      }

      // Rotate particle system
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }

      // Camera movement
      const time = Date.now() * 0.0001;
      camera.position.x = Math.cos(time) * 5;
      camera.position.y = Math.sin(time * 0.7) * 5;

      rendererRef.current.render(sceneRef.current, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!rendererRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
      geometryRef.current?.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 1 }}
    />
  );
}