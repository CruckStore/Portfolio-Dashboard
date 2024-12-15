import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/content')
      .then((response) => setContent(response.data))
      .catch((error) => console.error('Erreur lors du chargement du contenu :', error));
  }, []);

  const updateContent = (updatedContent) => {
    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => {
        console.log('Contenu mis à jour :', response.data.message);
        setContent(updatedContent);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du contenu :', error);
      });
  };

  const addProject = (newProject) => {
    const updatedProjects = [...(content?.homepage?.homepage?.projects || []), newProject];
    
    setContent((prevContent) => ({
      ...prevContent,
      homepage: {
        ...prevContent.homepage,
        homepage: {
          ...prevContent.homepage.homepage,
          projects: updatedProjects,
        },
      },
    }));
  
    axios
      .post('http://localhost:5000/api/content', {
        ...content,
        homepage: {
          ...content.homepage,
          homepage: {
            ...content.homepage.homepage,
            projects: updatedProjects,
          },
        },
      })
      .then((response) => {
        console.log('Projet ajouté avec succès:', response.data.message);
      })
      .catch((error) => {
        console.error('Erreur lors de l’ajout du projet:', error);
      });
  };
  
  const deleteProject = (index) => {
    const updatedProjects = content.projects.filter((_, i) => i !== index);
    const updatedContent = { ...content, projects: updatedProjects };

    setContent(updatedContent);

    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => {
        console.log('Projet supprimé avec succès:', response.data.message);
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du projet:', error);
      });
  };

  const editProject = (index, updatedProject) => {
    const updatedProjects = content.projects.map((project, i) =>
      i === index ? updatedProject : project
    );
    const updatedContent = { ...content, projects: updatedProjects };

    setContent(updatedContent);

    axios
      .post('http://localhost:5000/api/content', updatedContent)
      .then((response) => {
        console.log('Projet modifié avec succès:', response.data.message);
      })
      .catch((error) => {
        console.error('Erreur lors de la modification du projet:', error);
      });
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
