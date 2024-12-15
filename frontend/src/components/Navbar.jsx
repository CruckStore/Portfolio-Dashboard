import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de navigate pour gérer les redirections

  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <nav>
      <ul className="navbar-container">
        {/* Liens centrés */}
        <div className="navbar-center">
          <li>
            <button
              className="logout-button"
              onClick={() => navigate('/')}
            >
              <FontAwesomeIcon icon={faHome} className="icon" /> Accueil
            </button>
          </li>
          <li>
            <button
              className="logout-button"
              onClick={() => navigate('/about')}
            >
              À Propos
            </button>
          </li>
        </div>

        {/* Bouton conditionnel aligné à droite */}
        <div className="navbar-right">
          <li>
            {user ? (
              isDashboardPage ? (
                // Affiche Déconnexion uniquement sur /dashboard
                <button onClick={logout} className="logout-button">
                  <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Déconnexion
                </button>
              ) : (
                // Affiche un bouton pour accéder au Dashboard sur les autres pages
                <button
                  className="logout-button"
                  onClick={() => navigate('/dashboard')}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="icon" /> Dashboard
                </button>
              )
            ) : (
              // Si non connecté, affiche le bouton Login
              <button
                className="logout-button"
                onClick={() => navigate('/login')}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Login
              </button>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
