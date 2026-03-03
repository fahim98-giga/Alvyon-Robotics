import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Code, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Globe, 
  ChevronRight,
  Bot
} from 'lucide-react';
import { RoboticsHero } from '../components/RoboticsHero';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="glass p-8 rounded-3xl border-white/5 hover:border-neon-blue/30 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 blur-3xl -mr-16 -mt-16 group-hover:bg-neon-blue/10 transition-all" />
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-neon-blue/50 transition-all">
      <Icon className="w-7 h-7 text-neon-blue" />
    </div>
    <h3 className="font-display font-bold text-xl mb-3">{title}</h3>
    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export const Home = () => {
  return (
    <div className="min-h-screen relative">
      <RoboticsHero />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-neon-blue mb-8"
          >
            <Zap className="w-3 h-3" />
            <span>MADE IN BANGLADESH 🇧🇩</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.9]"
          >
            BUILD THE <br />
            <span className="gradient-text">IMPOSSIBLE.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl mb-12 leading-relaxed"
          >
            Alvyon is Bangladesh's first AI-integrated robotics platform. 
            Design, code, and simulate advanced robotics systems with the power of Gemini AI.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Link to="/dashboard" className="bg-neon-blue text-black px-8 py-4 rounded-2xl text-lg font-black shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:scale-105 transition-all flex items-center gap-2">
              Launch Dashboard <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/marketplace" className="glass px-8 py-4 rounded-2xl text-lg font-bold border-white/10 hover:bg-white/10 transition-all">
              Explore Marketplace
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Users', value: '50K+' },
            { label: 'Projects Built', value: '120K+' },
            { label: 'AI Generations', value: '2M+' },
            { label: 'Robots Sold', value: '15K+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-display font-black text-neon-blue mb-1">{stat.value}</div>
              <div className="text-white/40 text-sm uppercase tracking-widest font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">ENGINEERED FOR <br /><span className="text-neon-blue">PERFECTION.</span></h2>
              <p className="text-white/50 max-w-md">Our platform provides everything you need to take a robotics project from concept to hardware.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass p-4 rounded-2xl border-white/10">
                <Shield className="w-6 h-6 text-neon-purple" />
              </div>
              <div className="glass p-4 rounded-2xl border-white/10">
                <Globe className="w-6 h-6 text-neon-green" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Cpu} 
              title="AI Circuit Design" 
              desc="Generate optimized circuit diagrams and BOMs for your robotics projects instantly using Gemini AI."
              delay={0.1}
            />
            <FeatureCard 
              icon={Code} 
              title="Smart Code Editor" 
              desc="Write, debug and compile code for Arduino, ESP32, and Raspberry Pi with real-time AI assistance."
              delay={0.2}
            />
            <FeatureCard 
              icon={ShoppingCart} 
              title="Robotics Store" 
              desc="Access a curated marketplace of high-quality robotics kits, sensors, and pre-built code modules."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[40px] p-8 md:p-16 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 pointer-events-none" />
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center mb-8">
                <Bot className="w-8 h-8 text-neon-blue" />
              </div>
              <h2 className="text-4xl font-display font-bold mb-6">MEET YOUR NEW <br /><span className="text-neon-blue">CO-ENGINEER.</span></h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Alvyon AI isn't just a chatbot. It's a specialized robotics engine trained on millions of lines of hardware code and circuit designs.
              </p>
              <ul className="space-y-4">
                {[
                  'Debug complex I2C/SPI communication issues',
                  'Optimize PID control loops for stability',
                  'Suggest alternative parts based on availability',
                  'Generate full project documentation automatically'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-3xl p-6 border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-[10px] font-mono text-white/30 ml-2 uppercase tracking-widest">alvyon_terminal_v2.0</span>
              </div>
              <div className="font-mono text-sm space-y-4">
                <div className="text-neon-blue"># Request: Line Follower PID Code</div>
                <div className="text-white/40">Generating optimized C++ for ESP32...</div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-xs text-white/70 overflow-x-auto">
                  <pre>{`void loop() {
  float error = readSensors();
  float P = error * Kp;
  float I = integral * Ki;
  float D = (error - lastError) * Kd;
  
  float output = P + I + D;
  applyMotors(output);
}`}</pre>
                </div>
                <div className="flex items-center gap-2 text-neon-green text-xs">
                  <Zap className="w-3 h-3" /> Analysis complete: Stability optimized for 12V DC motors.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
