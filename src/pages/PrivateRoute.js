import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/constants.js';

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser.userData) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
}
