import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { ContentContext } from "../context/ContentContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { isHomePageActive } = useContext(ContentContext);
  const { isProjectsPageActive } = useContext(ContentContext);
  const { isAboutPageActive } = useContext(ContentContext);
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <nav>
      <ul className="navbar-container">
        {/* Liens centrés */}
        <div className="navbar-center">
          {isHomePageActive && (
            <li>
              <button className="logout-button" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHome} className="icon" /> Accueil
              </button>
            </li>
          )}
          {isProjectsPageActive && (
            <li>
              <button
                className="logout-button"
                onClick={() => navigate("/my-projects")}
              >
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className="icon"
                  style={{ marginRight: "8px" }}
                />
                My Projects
              </button>
            </li>
          )}
          {isAboutPageActive && (
            <li>
              <button
                className="logout-button"
                onClick={() => navigate("/about")}
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="icon"
                  style={{ marginRight: "8px" }}
                />
                À Propos
              </button>
            </li>
          )}
        </div>

        {/* Bouton conditionnel aligné à droite */}
        <div className="navbar-right">
          <li>
            {user ? (
              isDashboardPage ? (
                <button onClick={logout} className="logout-button">
                  <FontAwesomeIcon icon={faSignOutAlt} className="icon" />{" "}
                  Déconnexion
                </button>
              ) : (
                <button
                  className="logout-button"
                  onClick={() => navigate("/dashboard")}
                >
                  <FontAwesomeIcon icon={faTachometerAlt} className="icon" />{" "}
                  Dashboard
                </button>
              )
            ) : (
              <button
                className="logout-button"
                onClick={() => navigate("/login")}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="icon" />{" "}
                Connexion
              </button>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
