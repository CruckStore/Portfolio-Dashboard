import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HashPassword from './pages/HashPassword';
import { AuthProvider } from './context/AuthContext'; 
import { ContentProvider } from './context/ContentContext';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './components/Error404';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Navbar />
          <div style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Routes>
              {/* Page d'accueil */}
              <Route path="/" element={<Home />} />

              {/* Page de connexion */}
              <Route path="/login" element={<Login />} />

              {/* Page sécurisée Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Page pour générer un mot de passe haché */}
              <Route path="/hash-password" element={<HashPassword />} />

              {/* Route 404 pour les chemins non définis */}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
