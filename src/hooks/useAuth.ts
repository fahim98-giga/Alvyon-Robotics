import { useAuth } from '../context/AuthContext';

export const useUser = () => {
  const { user, isAuthenticated, logout } = useAuth();
  return { user, isAuthenticated, logout };
};
