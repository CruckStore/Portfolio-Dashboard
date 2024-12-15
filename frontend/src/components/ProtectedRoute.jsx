import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(ContentContext);

  const isLoggedIn = isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('isAuthenticated'); 
    }
  }, [isLoggedIn]);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
