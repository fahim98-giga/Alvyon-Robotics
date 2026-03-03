import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Cpu, 
  Code, 
  Layers, 
  Zap, 
  ArrowRight, 
  Eye,
  Activity,
  Globe
} from 'lucide-react';

const projects = [
  {
    id: 'quadruped-v1',
    title: 'ALVYON QUAD-1',
    category: 'Bio-Inspired Robotics',
    desc: 'A 12-DOF quadruped robot with real-time inverse kinematics and terrain adaptation.',
    image: 'https://picsum.photos/seed/robot1/800/600',
    stats: { motors: 12, sensors: 8, battery: '4S LiPo' },
    tags: ['ESP32', 'Inverse Kinematics', '3D Printed']
  },
  {
    id: 'industrial-arm-x',
    title: 'ARM-X PRECISION',
    category: 'Industrial Automation',
    desc: '6-Axis robotic arm designed for high-precision assembly and computer vision integration.',
    image: 'https://picsum.photos/seed/robot2/800/600',
    stats: { motors: 6, sensors: 4, battery: '24V DC' },
    tags: ['Raspberry Pi', 'OpenCV', 'ROS2']
  },
  {
    id: 'autonomous-drone-bd',
    title: 'SKY-SCOUT BD',
    category: 'Aerial Systems',
    desc: 'Autonomous delivery drone with obstacle avoidance and GPS-based waypoint navigation.',
    image: 'https://picsum.photos/seed/robot3/800/600',
    stats: { motors: 4, sensors: 12, battery: '6S LiPo' },
    tags: ['Pixhawk', 'MAVLink', 'AI Vision']
  },
  {
    id: 'humanoid-assistant',
    title: 'ALVYON H-1',
    category: 'Humanoid Robotics',
    desc: 'Advanced humanoid assistant with natural language processing and bipedal stabilization.',
    image: 'https://picsum.photos/seed/robot4/800/600',
    stats: { motors: 24, sensors: 18, battery: 'Custom Ion' },
    tags: ['Gemini AI', 'TensorFlow', 'Bipedal']
  }
];

export const Projects = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-[10px] font-bold text-neon-blue mb-4 uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              Advanced Research Lab
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 uppercase">COMPLEX <span className="text-neon-blue">PROJECTS</span></h1>
            <p className="text-white/50 text-lg max-w-2xl">Explore our most advanced robotics systems, complete with 3D designs, simulation data, and production-ready code.</p>
          </div>
          <div className="flex gap-4">
            <div className="glass p-4 rounded-2xl border-white/10">
              <Globe className="w-6 h-6 text-neon-purple" />
            </div>
            <div className="glass p-4 rounded-2xl border-white/10">
              <Zap className="w-6 h-6 text-neon-green" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="glass rounded-[40px] overflow-hidden border-white/5 hover:border-neon-blue/30 transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute top-6 right-6">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold text-neon-blue uppercase tracking-widest border border-white/10">
                      {project.category}
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h2 className="text-3xl font-display font-black mb-2 uppercase tracking-tighter">{project.title}</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-2">{project.desc}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="glass p-4 rounded-2xl border-white/5 text-center">
                      <div className="text-neon-blue font-display font-black text-xl mb-1">{project.stats.motors}</div>
                      <div className="text-[9px] text-white/30 uppercase font-bold">Actuators</div>
                    </div>
                    <div className="glass p-4 rounded-2xl border-white/5 text-center">
                      <div className="text-neon-purple font-display font-black text-xl mb-1">{project.stats.sensors}</div>
                      <div className="text-[9px] text-white/30 uppercase font-bold">Sensors</div>
                    </div>
                    <div className="glass p-4 rounded-2xl border-white/5 text-center">
                      <div className="text-neon-green font-display font-black text-xl mb-1">{project.stats.battery}</div>
                      <div className="text-[9px] text-white/30 uppercase font-bold">Power</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/projects/${project.id}`}
                      className="flex items-center gap-2 text-sm font-bold text-neon-blue hover:gap-4 transition-all uppercase tracking-widest"
                    >
                      View Project Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Box className="w-4 h-4 text-white/40" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <Code className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
