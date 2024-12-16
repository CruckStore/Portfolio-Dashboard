import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HashPassword from './pages/HashPassword';
import MyProjects from './pages/MyProjects';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider, ContentContext } from './context/ContentContext';
import ProtectedRoute from './components/ProtectedRoute';
import Error404 from './components/Error404';

// Animation uniforme
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeInOut' },
};

function AnimatedRoutes() {
  const location = useLocation();
  const { isHomePageActive, isProjectsPageActive, isAboutPageActive } = useContext(ContentContext);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Page d'accueil conditionnelle */}
        {isHomePageActive && (
          <Route
            path="/"
            element={
              <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                <Home />
              </motion.div>
            }
          />
        )}

        {/* Page My Projects conditionnelle */}
        {isProjectsPageActive && (
          <Route
            path="/my-projects"
            element={
              <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                <MyProjects />
              </motion.div>
            }
          />
        )}

        {/* Page À Propos conditionnelle */}
        {isAboutPageActive && (
          <Route
            path="/about"
            element={
              <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                <About />
              </motion.div>
            }
          />
        )}

        {/* Page de connexion */}
        <Route
          path="/login"
          element={
            <motion.div
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              <Login />
            </motion.div>
          }
        />

        {/* Page sécurisée Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <motion.div
                initial={pageTransition.initial}
                animate={pageTransition.animate}
                exit={pageTransition.exit}
                transition={pageTransition.transition}
              >
                <Dashboard />
              </motion.div>
            </ProtectedRoute>
          }
        />

        {/* Page pour hacher un mot de passe */}
        <Route
          path="/hash-password"
          element={
            <motion.div
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              <HashPassword />
            </motion.div>
          }
        />

        {/* Page 404 */}
        <Route
          path="*"
          element={
            <motion.div
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              exit={pageTransition.exit}
              transition={pageTransition.transition}
            >
              <Error404 />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Navbar />
          <div style={{ minHeight: 'calc(100vh - 80px)' }}>
            <AnimatedRoutes />
          </div>
          <Footer />
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
