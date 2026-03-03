import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Rocket, Menu, X, User, LogIn } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Platform', path: '/platform' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Simulator', path: '/simulator' },
    { name: 'AI Engine', path: '/ai-engine' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between border-white/10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-neon-blue rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.4)]">
            <Rocket className="text-black w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">ALVYON <span className="text-neon-blue">BD</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={cn(
                "hover:text-neon-blue transition-colors",
                location.pathname === link.path && "text-neon-blue"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-neon-blue transition-colors">
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link 
            to="/signup" 
            className="bg-neon-blue text-black px-5 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:brightness-110 transition-all"
          >
            Get Started
          </Link>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 glass rounded-2xl p-6 border-white/10 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-neon-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-white/10" />
          <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-lg font-medium hover:text-neon-blue transition-colors">
            <LogIn className="w-5 h-5" /> Login
          </Link>
        </motion.div>
      )}
    </nav>
  );
};
