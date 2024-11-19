import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, refreshToken } from './authService';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          await refreshToken();
        } catch {
          logout();
        }
      }
    };
    checkToken();
  }, [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { token: newToken } = await loginService(username, password);
      setToken(newToken);
      sessionStorage.setItem('token', newToken);

      console.log(newToken)
      return true; // Login bem-sucedido
    } catch (error) {
      console.error('Login failed:', error);
      return false; // Login falhou
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
