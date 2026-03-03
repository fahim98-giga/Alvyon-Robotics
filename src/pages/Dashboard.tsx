import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Box, 
  Code, 
  Cpu, 
  Settings, 
  Bell, 
  Search,
  Plus,
  TrendingUp,
  Clock,
  ExternalLink,
  Zap,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Dashboard = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2 uppercase tracking-tighter">Welcome back, <span className="text-neon-blue">Engineer</span></h1>
            <p className="text-white/40">Here's what's happening with your robotics projects.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/settings"
              className="glass p-3 rounded-2xl border-white/10 relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_rgba(0,242,255,0.8)]" />
            </Link>
            <Link 
              to="/projects"
              className="bg-neon-blue text-black px-6 py-3 rounded-2xl font-black shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Project
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Total Projects', value: '12', icon: Box, color: 'text-neon-blue' },
            { label: 'AI Tokens Used', value: '4.2K', icon: Cpu, color: 'text-neon-purple' },
            { label: 'Marketplace Sales', value: '৳15,400', icon: TrendingUp, color: 'text-neon-green' },
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border-white/5 relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 blur-3xl -mr-16 -mt-16 transition-all group-hover:opacity-10`} style={{ backgroundColor: 'currentColor' }} />
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Last 30 Days</span>
              </div>
              <div className="text-3xl font-display font-black mb-1">{stat.value}</div>
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-[40px] border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-display font-bold text-xl uppercase tracking-tighter">Recent Projects</h2>
                <Link to="/projects" className="text-xs font-bold text-neon-blue uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { id: 'quadruped-v1', name: 'Autonomous Quadruped', tech: 'ESP32', status: 'In Progress', date: '2h ago' },
                  { id: 'industrial-arm-x', name: 'Precision Industrial Arm', tech: 'ROS2', status: 'Completed', date: '1d ago' },
                  { id: 'autonomous-drone-bd', name: 'Sky-Scout Drone', tech: 'Pixhawk', status: 'In Progress', date: '3d ago' },
                ].map((project, i) => (
                  <Link 
                    key={i} 
                    to={`/projects/${project.id}`}
                    className="p-6 flex items-center justify-between hover:bg-white/5 transition-all group border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon-blue/50 transition-all">
                        <Code className="w-6 h-6 text-white/20 group-hover:text-neon-blue transition-all" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">{project.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{project.tech}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-widest",
                            project.status === 'Completed' ? 'text-neon-green' : 'text-neon-purple'
                          )}>{project.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{project.date}</span>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass rounded-[40px] border-white/5 p-8">
              <h2 className="font-display font-bold text-xl uppercase tracking-tighter mb-8">AI Usage</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-white/40">Tokens Remaining</span>
                    <span className="text-neon-blue">84%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)]" style={{ width: '84%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-white/40">Storage Used</span>
                    <span className="text-neon-purple">42%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.5)]" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => alert("Redirecting to subscription plans...")}
                className="w-full mt-8 py-4 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Upgrade Plan
              </button>
            </div>

            <div className="glass rounded-[40px] border-white/5 p-8 bg-gradient-to-br from-neon-blue/10 to-transparent">
              <Zap className="w-8 h-8 text-neon-blue mb-6" />
              <h3 className="font-display font-bold text-lg mb-2">Pro Feature</h3>
              <p className="text-white/40 text-xs mb-6 leading-relaxed">Unlock advanced AI code optimization and multi-robot simulation.</p>
              <Link 
                to="/settings"
                className="bg-white text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all inline-block text-center"
              >
                Try Pro Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
