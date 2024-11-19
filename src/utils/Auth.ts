import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    console.log("token");
    if (token){
      
      const expiresAt = sessionStorage.getItem("expiresAt");

      setIsAuthenticated(token != null && expiresAt != null && new Date(expiresAt) > new Date());
    }
    else 
      setIsAuthenticated(false);
    
  }, []);

  return { isAuthenticated };
};

export default useAuth;
