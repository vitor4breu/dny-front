import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoute: React.FC = () => {
  const { accessToken } = useAuth();
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;