import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentContext } from '../context/ContentContext';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(ContentContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin') {
      login();
      navigate('/dashboard');
    } else {
      setError('Mot de passe incorrect. Veuillez réessayer.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Connexion Admin</h1>
        <p className="login-description">Accédez au tableau de bord pour gérer votre contenu.</p>

        <div className="login-form">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez le mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
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
