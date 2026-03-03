import React from 'react';
import { Github, Twitter, Linkedin, Rocket } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center">
                <Rocket className="text-black w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tighter uppercase">ALVYON BD</span>
            </div>
            <p className="text-white/40 max-w-sm mb-8">
              Bangladesh's premier AI-powered robotics platform. Empowering the next generation of engineers with AI-driven design and simulation tools.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:text-neon-blue transition-colors border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">AI Designer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Code Editor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Simulator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-bold uppercase tracking-widest">
          <div>© 2026 ALVYON ROBOTICS BANGLADESH. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
