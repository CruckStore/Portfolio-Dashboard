import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Display loading state while verifying authentication
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Redirect if the user is not authenticated
  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default ProtectedRoute;
