import React from 'react';
import { RobotSimulator } from '../components/RobotSimulator';

export const Simulator = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 uppercase">LIVE 3D <span className="text-neon-green">SIMULATOR</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Test your AI-generated code in a virtual robotics environment before deploying to hardware.</p>
        </div>
        
        <div className="h-[700px] glass rounded-[40px] border-white/5 overflow-hidden neon-border shadow-2xl">
          <RobotSimulator />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Real-time Physics', desc: 'Simulate gravity, friction, and motor torque with high accuracy.' },
            { title: 'Sensor Feedback', desc: 'Get virtual data from ultrasonic, IR, and IMU sensors.' },
            { title: 'Code Injection', desc: 'Directly upload your Arduino or MicroPython code to the virtual robot.' },
          ].map((item, i) => (
            <div key={i} className="glass p-8 rounded-3xl border-white/5">
              <h3 className="font-display font-bold text-xl mb-3 text-neon-green">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
