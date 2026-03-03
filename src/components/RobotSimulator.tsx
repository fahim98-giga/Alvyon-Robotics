import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Terminal } from 'lucide-react';

export const RobotSimulator = ({ code, isExecuting }: { code?: string, isExecuting?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const robotRef = useRef<THREE.Group | null>(null);
  const [logs, setLogs] = useState<string[]>(["Simulator initialized...", "Waiting for code..."]);
  const [commands, setCommands] = useState<any[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);

  // Parse code into commands
  useEffect(() => {
    if (isExecuting && code) {
      const lines = code.split('\n');
      const newCommands: any[] = [];
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('moveForward')) {
          const val = parseFloat(trimmed.match(/\(([^)]+)\)/)?.[1] || '1');
          newCommands.push({ type: 'move', value: val });
        } else if (trimmed.startsWith('moveBackward')) {
          const val = parseFloat(trimmed.match(/\(([^)]+)\)/)?.[1] || '1');
          newCommands.push({ type: 'move', value: -val });
        } else if (trimmed.startsWith('turnLeft')) {
          const val = parseFloat(trimmed.match(/\(([^)]+)\)/)?.[1] || '90');
          newCommands.push({ type: 'rotate', value: (val * Math.PI) / 180 });
        } else if (trimmed.startsWith('turnRight')) {
          const val = parseFloat(trimmed.match(/\(([^)]+)\)/)?.[1] || '90');
          newCommands.push({ type: 'rotate', value: -(val * Math.PI) / 180 });
        } else if (trimmed.startsWith('stop')) {
          newCommands.push({ type: 'stop' });
        } else if (trimmed.startsWith('delay')) {
          const val = parseInt(trimmed.match(/\(([^)]+)\)/)?.[1] || '1000');
          newCommands.push({ type: 'delay', value: val });
        }
      });

      if (newCommands.length > 0) {
        setCommands(newCommands);
        setCurrentCommandIndex(0);
        setIsRunning(true);
        setLogs(prev => [...prev, "Executing script...", `Found ${newCommands.length} commands.`]);
      }
    }
  }, [isExecuting, code]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Grid helper
    const grid = new THREE.GridHelper(40, 40, 0x00f2ff, 0x111111);
    scene.add(grid);

    // Robot body (Simplified)
    const robot = new THREE.Group();
    
    const bodyGeom = new THREE.BoxGeometry(1, 0.5, 1.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.1 });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    robot.add(body);

    // Add some "tech" details to the robot
    const sensorGeom = new THREE.BoxGeometry(0.4, 0.2, 0.2);
    const sensorMat = new THREE.MeshStandardMaterial({ color: 0x00f2ff, emissive: 0x00f2ff, emissiveIntensity: 2 });
    const sensor = new THREE.Mesh(sensorGeom, sensorMat);
    sensor.position.set(0, 0.2, 0.7);
    robot.add(sensor);

    const wheelGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00f2ff, 2, 10);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    camera.position.set(5, 5, 8);
    camera.lookAt(0, 0, 0);

    let lastTime = 0;
    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;
      
      requestAnimationFrame(animate);
      
      if (isRunning && robotRef.current && currentCommandIndex >= 0 && currentCommandIndex < commands.length) {
        const cmd = commands[currentCommandIndex];
        
        if (cmd.type === 'move') {
          const moveStep = cmd.value * deltaTime * 2;
          robotRef.current.translateZ(moveStep);
          // Simple completion check (this is a mock simulation)
          if (Math.random() > 0.99) setCurrentCommandIndex(prev => prev + 1);
        } else if (cmd.type === 'rotate') {
          const rotateStep = cmd.value * deltaTime;
          robotRef.current.rotation.y += rotateStep;
          if (Math.random() > 0.98) setCurrentCommandIndex(prev => prev + 1);
        } else if (cmd.type === 'delay') {
          // Delay is handled by a timeout usually, but here we just skip after some time
          if (Math.random() > 0.95) setCurrentCommandIndex(prev => prev + 1);
        } else if (cmd.type === 'stop') {
          setCurrentCommandIndex(prev => prev + 1);
        }
      } else if (currentCommandIndex >= commands.length && isRunning) {
        setIsRunning(false);
        setLogs(prev => [...prev, "Execution complete."]);
      }
      
      renderer.render(scene, camera);
    };

    animate(0);

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
  }, [isRunning, commands, currentCommandIndex]);

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
