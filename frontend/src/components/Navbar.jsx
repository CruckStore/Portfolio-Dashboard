import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav>
      <ul className="navbar-container">
        {/* Liens centrés */}
        <div className="navbar-center">
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} className="icon" /> Accueil
            </Link>
          </li>
          <li>
            <Link to="/about">À Propos</Link>
          </li>
        </div>

        {/* Bouton Login aligné à droite */}
        <div className="navbar-right">
          <li>
            <Link to="/dashboard" className="login-button-nav">
              <FontAwesomeIcon icon={faSignInAlt} className="icon" /> Login
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
