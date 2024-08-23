import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('userId'); // Check if userId is stored in session

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
