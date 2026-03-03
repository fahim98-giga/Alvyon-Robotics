import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  geminiKey: string | null;
  login: (user: User) => void;
  logout: () => void;
  setGeminiKey: (key: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('alvyon_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [geminiKey, setGeminiKeyInternal] = useState<string | null>(() => {
    return localStorage.getItem('alvyon_gemini_key');
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('alvyon_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alvyon_user');
  };

  const setGeminiKey = (key: string) => {
    setGeminiKeyInternal(key);
    localStorage.setItem('alvyon_gemini_key', key);
  };

  return (
    <AuthContext.Provider value={{ user, geminiKey, login, logout, setGeminiKey, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
