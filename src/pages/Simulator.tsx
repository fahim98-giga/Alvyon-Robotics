import React, { useState } from 'react';
import { RobotSimulator } from '../components/RobotSimulator';
import { motion } from 'motion/react';
import { Code, Play, Terminal, Zap, Info } from 'lucide-react';

export const Simulator = () => {
  const [code, setCode] = useState(`// Alvyon Robot Control Script
// Available commands:
// moveForward(speed);
// moveBackward(speed);
// turnLeft(angle);
// turnRight(angle);
// stop();

function loop() {
  moveForward(1);
  delay(1000);
  turnRight(90);
  delay(500);
  moveForward(0.5);
  stop();
}

loop();`);

  const [isExecuting, setIsExecuting] = useState(false);

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 100); // Trigger a re-run in the simulator
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase">4D <span className="text-neon-green">SIMULATOR</span></h1>
            <p className="text-white/50 text-lg max-w-2xl">Test your AI-generated code in a virtual robotics environment with real-time physics.</p>
          </div>
          <div className="flex gap-4">
            <div className="glass p-4 rounded-2xl border-white/10 flex items-center gap-3">
              <Zap className="w-5 h-5 text-neon-blue" />
              <div>
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Physics Engine</div>
                <div className="text-xs font-bold">Vortex v4.2 Active</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
          {/* Code Editor */}
          <div className="lg:col-span-1 glass rounded-[40px] border-white/5 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-neon-purple" />
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Script Editor</span>
              </div>
              <button 
                onClick={handleRun}
                className="bg-neon-green text-black px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:brightness-110 transition-all flex items-center gap-2"
              >
                <Play className="w-3 h-3" /> Run Script
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-black/40 p-6 font-mono text-xs text-white/70 focus:outline-none resize-none scrollbar-hide"
              spellCheck={false}
            />
            <div className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-2 text-[10px] text-white/30">
              <Info className="w-3 h-3" />
              <span>Press Run to execute code in the 3D environment.</span>
            </div>
          </div>

          {/* 3D View */}
          <div className="lg:col-span-2 glass rounded-[40px] border-white/5 overflow-hidden neon-border shadow-2xl relative">
            <RobotSimulator code={code} isExecuting={isExecuting} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Real-time Physics', desc: 'Simulate gravity, friction, and motor torque with high accuracy.' },
            { title: 'Sensor Feedback', desc: 'Get virtual data from ultrasonic, IR, and IMU sensors.' },
            { title: 'Code Injection', desc: 'Directly upload your Arduino or MicroPython code to the virtual robot.' },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-white/5 group hover:border-neon-green/30 transition-all"
            >
              <h3 className="font-display font-bold text-xl mb-3 text-neon-green group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
