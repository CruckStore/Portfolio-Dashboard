import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ContentProvider } from './context/ContentContext';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './components/Error404';

function App() {
  return (
    <ContentProvider>
      <Router>
        <Navbar />
        <div style={{ minHeight: 'calc(100vh - 80px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Route 404 pour les chemins non définis */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ContentProvider>
  );
}

export default App;
