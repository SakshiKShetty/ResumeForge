import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, setTokens, clearTokens, setUser, getUser, getToken } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to restore session from localStorage
    const token = getToken();
    const storedUser = getUser();
    if (token && storedUser) {
      setUserState(storedUser);
      // Verify token is still valid
      authAPI.getMe()
        .then((freshUser) => {
          setUserState(freshUser);
          setUser(freshUser);
        })
        .catch(() => {
          clearTokens();
          setUserState(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authAPI.login(email, password);
    setTokens(res.token, res.refreshToken);
    setUser(res.user);
    setUserState(res.user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await authAPI.register(name, email, password);
    setTokens(res.token, res.refreshToken);
    setUser(res.user);
    setUserState(res.user);
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
