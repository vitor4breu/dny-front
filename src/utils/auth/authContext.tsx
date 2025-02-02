import { ReactNode, useCallback, useState } from "react";
import { createContext, useContext } from 'react';
import { login } from "./authService";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
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
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      setRefreshTimer(null);
    }
  }, [refreshTimer]);

  
  const loginHandler = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await login(username, password);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      return true;
    } catch (error) {
      clearTokens();
      throw error;
    }
  };

  const logout = useCallback(() => {
    clearTokens();
  }, [clearTokens]);

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      refreshToken,
      login: loginHandler,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};