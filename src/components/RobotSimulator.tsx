import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Terminal } from 'lucide-react';

export const RobotSimulator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const robotRef = useRef<THREE.Group | null>(null);
  const [logs, setLogs] = useState<string[]>(["Simulator initialized...", "Waiting for code..."]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Grid helper
    const grid = new THREE.GridHelper(20, 20, 0x00f2ff, 0x222222);
    scene.add(grid);

    // Robot body (Simplified)
    const robot = new THREE.Group();
    
    const bodyGeom = new THREE.BoxGeometry(1, 0.5, 1.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.2 });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    robot.add(body);

    const wheelGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x00f2ff });
    
    const wheels = [
      { x: 0.6, y: -0.1, z: 0.5 },
      { x: -0.6, y: -0.1, z: 0.5 },
      { x: 0.6, y: -0.1, z: -0.5 },
      { x: -0.6, y: -0.1, z: -0.5 },
    ];

    wheels.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeom, wheelMat);
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.rotation.z = Math.PI / 2;
      robot.add(wheel);
    });

    robot.position.y = 0.4;
    scene.add(robot);
    robotRef.current = robot;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    camera.position.set(3, 3, 5);
    camera.lookAt(0, 0, 0);

    let frame = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (isRunning && robotRef.current) {
        frame += 0.02;
        robotRef.current.position.z += Math.sin(frame) * 0.05;
        robotRef.current.rotation.y += Math.cos(frame) * 0.01;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [isRunning]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
    setLogs(prev => [...prev, isRunning ? "Simulation paused." : "Simulation started: Executing code..."]);
  };

  const resetSimulation = () => {
    if (robotRef.current) {
      robotRef.current.position.set(0, 0.4, 0);
      robotRef.current.rotation.set(0, 0, 0);
    }
    setIsRunning(false);
    setLogs(["Simulator reset.", "Waiting for code..."]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSimulation}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              isRunning ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-neon-green/20 text-neon-green border border-neon-green/50'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Stop' : 'Run Code'}
          </button>
          <button 
            onClick={resetSimulation}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        <div className="text-xs font-mono text-white/30 uppercase tracking-widest">
          Alvyon Sim v1.0
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div ref={containerRef} className="absolute inset-0" />
        
        {/* Overlay HUD */}
        <div className="absolute top-4 right-4 w-64 glass rounded-2xl p-4 border-white/10 pointer-events-none">
          <div className="flex items-center gap-2 mb-3 text-neon-blue">
            <Terminal className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Console Output</span>
          </div>
          <div className="font-mono text-[10px] space-y-1 h-32 overflow-y-auto scrollbar-hide">
            {logs.map((log, i) => (
              <div key={i} className="text-white/50">{`> ${log}`}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
