import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const RoboticsHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00f2ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 4D Floating Geometry (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0xbc13fe,
      wireframe: true,
      emissive: 0xbc13fe,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.4
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Inner Glow Sphere
    const innerGeom = new THREE.SphereGeometry(0.8, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2ff,
      emissive: 0x00f2ff,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.2
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerSphere);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f2ff, 5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 6;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth rotation based on mouse
      torusKnot.rotation.x += 0.005 + mouseRef.current.y * 0.01;
      torusKnot.rotation.y += 0.005 + mouseRef.current.x * 0.01;
      
      innerSphere.rotation.y -= 0.01;
      innerSphere.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.1);
      
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.position.x += (mouseRef.current.x * 0.5 - particlesMesh.position.x) * 0.05;
      particlesMesh.position.y += (-mouseRef.current.y * 0.5 - particlesMesh.position.y) * 0.05;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10 opacity-60 pointer-events-none" />;
};
