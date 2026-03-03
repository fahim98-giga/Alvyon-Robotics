import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIAssistant } from '../AIAssistant';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-blue selection:text-black">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};
