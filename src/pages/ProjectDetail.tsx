import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Box, 
  Code, 
  Cpu, 
  Layers, 
  Zap, 
  Play, 
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Terminal
} from 'lucide-react';
import { RobotSimulator } from '../components/RobotSimulator';

const projectData: Record<string, any> = {
  'quadruped-v1': {
    title: 'ALVYON QUAD-1',
    category: 'Bio-Inspired Robotics',
    desc: 'The QUAD-1 is a high-performance quadruped robot platform designed for research in locomotion and autonomous navigation. It features 12 high-torque brushless motors and a custom IMU-based stabilization system.',
    longDesc: 'Our team developed the QUAD-1 to bridge the gap between expensive commercial quadrupeds and low-cost hobbyist kits. The robot uses a custom Inverse Kinematics (IK) engine written in C++ that runs on an ESP32-S3, allowing for smooth movement across uneven surfaces. The simulation environment allows users to test gait patterns before deploying them to the physical hardware.',
    code: `#include <AlvyonQuad.h>

QuadRobot robot;

void setup() {
  robot.begin();
  robot.setGait(GAIT_TROT);
  robot.setSpeed(0.5); // m/s
}

void loop() {
  robot.update();
  if (robot.obstacleDetected()) {
    robot.stop();
    robot.turn(90);
  }
}`,
    stats: [
      { label: 'Weight', value: '2.4kg' },
      { label: 'Runtime', value: '45 mins' },
      { label: 'Payload', value: '1.5kg' },
      { label: 'Connectivity', value: 'WiFi/BLE' }
    ],
    circuit: `
[ESP32-S3] --- (I2C) --- [PCA9685 PWM Driver]
    |                        |
    |--- (SPI) --- [IMU]     |--- [Servo 1-12]
    |                        |
    |--- [LiPo 4S] <---------|
    `,
    simulationCode: `moveForward(2);
turnRight(90);
moveForward(1);
stop();`
  }
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectData[id || ''] || projectData['quadruped-v1'];
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'code' | 'circuit'>('overview');
  const [isExecuting, setIsExecuting] = useState(false);

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 text-white/40 hover:text-neon-blue transition-all mb-8 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-[40px] overflow-hidden border-white/5">
              <div className="aspect-video relative bg-black/40">
                {activeTab === 'simulation' ? (
                  <div className="w-full h-full">
                    <RobotSimulator code={project.simulationCode} isExecuting={isExecuting} />
                    <div className="absolute bottom-6 right-6 flex gap-3">
                      <button 
                        onClick={() => setIsExecuting(!isExecuting)}
                        className="bg-neon-blue text-black px-6 py-3 rounded-xl font-black shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center gap-2 hover:scale-105 transition-all"
                      >
                        {isExecuting ? 'Stop Sim' : 'Run Simulation'} <Play className={`w-4 h-4 ${isExecuting ? 'animate-pulse' : ''}`} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <img 
                    src="https://picsum.photos/seed/robot-detail/1200/800" 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              
              <div className="p-8 border-t border-white/10 flex items-center gap-4 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: Box },
                  { id: 'simulation', label: '3D Simulation', icon: Play },
                  { id: 'code', label: 'Source Code', icon: Code },
                  { id: 'circuit', label: 'Circuit Design', icon: Layers },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab.id ? 'bg-neon-blue text-black' : 'text-white/40 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-10 rounded-[40px] border-white/5"
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6 uppercase tracking-tighter">Project <span className="text-neon-blue">Description</span></h2>
                    <p className="text-white/60 text-lg leading-relaxed">{project.longDesc}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {project.stats.map((stat: any, i: number) => (
                      <div key={i} className="glass p-6 rounded-3xl border-white/5 text-center">
                        <div className="text-white/30 text-[10px] uppercase font-bold mb-2 tracking-widest">{stat.label}</div>
                        <div className="text-xl font-display font-black text-white">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Production <span className="text-neon-purple">Code</span></h2>
                    <button className="text-xs font-bold text-neon-purple uppercase tracking-widest flex items-center gap-2 hover:underline">
                      <Download className="w-4 h-4" /> Download .ino
                    </button>
                  </div>
                  <div className="bg-black/60 p-8 rounded-3xl border border-white/5 font-mono text-sm text-white/70 overflow-x-auto relative group">
                    <pre>{project.code}</pre>
                    <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
                      <Terminal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'circuit' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Circuit <span className="text-neon-green">Architecture</span></h2>
                  <div className="bg-black/60 p-8 rounded-3xl border border-white/5 font-mono text-sm text-neon-green/70 overflow-x-auto">
                    <pre>{project.circuit}</pre>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <h4 className="text-sm font-bold mb-4">Bill of Materials (BOM)</h4>
                    <ul className="space-y-3">
                      {['ESP32-S3 DevKit', 'PCA9685 PWM Driver', 'MG996R High Torque Servos (x12)', 'MPU6050 6-Axis IMU'].map((item, i) => (
                        <li key={i} className="flex items-center justify-between text-xs text-white/50">
                          <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                            {item}
                          </span>
                          <span className="font-mono">৳{Math.floor(Math.random() * 5000 + 500)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'simulation' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Simulation <span className="text-neon-blue">Controls</span></h2>
                  <p className="text-white/50 text-sm">The simulation environment uses a physics-based model of the {project.title}. You can modify the gait parameters and test obstacle avoidance algorithms.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 glass rounded-3xl border-white/5">
                      <div className="text-xs font-bold text-white/30 uppercase mb-4">Active Script</div>
                      <div className="font-mono text-xs text-neon-blue bg-black/40 p-4 rounded-xl">
                        {project.simulationCode}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4" /> Reset Environment
                      </button>
                      <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <Settings className="w-4 h-4" /> Physics Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-[40px] border-white/5">
              <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-tighter">Project Metadata</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30 uppercase font-bold">Status</span>
                  <span className="px-3 py-1 rounded-full bg-neon-green/10 text-neon-green text-[10px] font-bold uppercase tracking-widest border border-neon-green/20">Production Ready</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30 uppercase font-bold">Version</span>
                  <span className="text-sm font-mono">v1.4.2-stable</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30 uppercase font-bold">License</span>
                  <span className="text-sm font-mono">MIT Open Source</span>
                </div>
                <hr className="border-white/5" />
                <div className="flex gap-4">
                  <button className="flex-1 glass py-3 rounded-xl border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button className="flex-1 glass py-3 rounded-xl border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Repo
                  </button>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[40px] border-white/5 bg-gradient-to-br from-neon-purple/10 to-transparent">
              <Cpu className="w-8 h-8 text-neon-purple mb-6" />
              <h3 className="font-display font-bold text-lg mb-2">AI Optimization</h3>
              <p className="text-white/40 text-xs mb-6 leading-relaxed">Our AI engine has optimized the IK calculations for this project, reducing latency by 24% on ESP32 hardware.</p>
              <button className="w-full bg-neon-purple text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:brightness-110 transition-all">
                Run AI Debugger
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
