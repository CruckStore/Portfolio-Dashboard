import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke les informations de l'utilisateur
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Vérifie si l'utilisateur est connecté via localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fonction pour se connecter
  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data)); // Sauvegarde dans le localStorage
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
      throw err;
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
