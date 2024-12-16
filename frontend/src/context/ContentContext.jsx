import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHomePageActive, setIsHomePageActive] = useState(true); // État pour activer/désactiver la page d'accueil

  // Chargement initial
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/content')
      .then((response) => setContent(response.data))
      .catch((error) => console.error('Erreur lors du chargement du contenu :', error));

    // Récupération de l'état de la page d'accueil depuis le localStorage
    const storedHomePageState = JSON.parse(localStorage.getItem('isHomePageActive'));
    if (storedHomePageState !== null) {
      setIsHomePageActive(storedHomePageState);
    }
  }, []);

  // Mise à jour du contenu
  const updateContent = (updatedContent) => {
    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => {
        console.log('Contenu mis à jour :', response.data.message);
        setContent(updatedContent);
      })
      .catch((error) => console.error('Erreur lors de la mise à jour du contenu :', error));
  };

  // Ajouter un projet
  const addProject = (newProject) => {
    const updatedProjects = [...(content?.homepage?.homepage?.projects || []), newProject];
    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        homepage: {
          ...content.homepage.homepage,
          projects: updatedProjects,
        },
      },
    };

    setContent(updatedContent);
    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => console.log('Projet ajouté avec succès:', response.data.message))
      .catch((error) => console.error('Erreur lors de l’ajout du projet:', error));
  };

  // Supprimer un projet
  const deleteProject = (index) => {
    const updatedProjects = content.projects.filter((_, i) => i !== index);
    const updatedContent = { ...content, projects: updatedProjects };

    setContent(updatedContent);
    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => console.log('Projet supprimé avec succès:', response.data.message))
      .catch((error) => console.error('Erreur lors de la suppression du projet:', error));
  };

  // Modifier un projet
  const editProject = (index, updatedProject) => {
    const updatedProjects = content.projects.map((project, i) =>
      i === index ? updatedProject : project
    );
    const updatedContent = { ...content, projects: updatedProjects };

    setContent(updatedContent);
    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => console.log('Projet modifié avec succès:', response.data.message))
      .catch((error) => console.error('Erreur lors de la modification du projet:', error));
  };

  // Fonction pour activer/désactiver la page d'accueil
  const toggleHomePage = () => {
    setIsHomePageActive((prev) => {
      const newState = !prev;
      localStorage.setItem('isHomePageActive', JSON.stringify(newState));
      return newState;
    });
  };

  // Login
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        addProject,
        deleteProject,
        editProject,
        isAuthenticated,
        login,
        logout,
        isHomePageActive, // Expose l'état de la page d'accueil
        toggleHomePage,   // Expose la fonction pour activer/désactiver la page
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
