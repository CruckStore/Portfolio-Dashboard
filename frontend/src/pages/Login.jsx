import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch {
      setErrorMessage('Identifiants incorrects.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Connexion Admin</h1>
        <p className="login-description">Connectez-vous pour accéder au tableau de bord.</p>

        <div className="login-form">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez le mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {error && <p className="error-message">{error}</p>}

          <button onClick={handleLogin} className="login-button">
            Se Connecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
