import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { Simulator } from './pages/Simulator';
import { AIEngine } from './pages/AIEngine';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="platform" element={<Home />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="simulator" element={<Simulator />} />
            <Route path="ai-engine" element={<AIEngine />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
