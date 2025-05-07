import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/register" replace />; // Redirect if not logged in
  }

  return children;
};

export default ProtectedRoute;
