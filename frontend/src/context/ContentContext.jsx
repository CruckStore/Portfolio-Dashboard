import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null); // Contenu des pages
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification
  const [pageStates, setPageStates] = useState({
    isHomePageActive: true,
    isProjectsPageActive: true,
    isAboutPageActive: true,
  }); // Activation des pages

  // Valeurs par défaut pour les pages
  const defaultContent = {
    homepage: {
      heroTitle: "Bienvenue sur notre Portfolio",
      heroSubtitle: "Découvrez nos projets et expériences",
      aboutText: "Nous sommes des développeurs passionnés...",
      skills: "HTML & CSS, JavaScript, React, Node.js",
      contactText: "Vous avez un projet ou une idée en tête ? N'hésitez pas à nous contacter !",
      contactEmail: "contact@email.com",
      projects: [],
    },
    myProjectsPage: {
      title: "Nos Projets",
      subtitle: "Découvrez nos projets récents",
      sectionTitle: "Nos Travaux",
      sectionDescription: "Découvrez nos projets récents et leurs descriptions.",
    },
    aboutPage: {
      heroTitle: "À Propos",
      heroSubtitle: "Apprenez-en plus sur nous",
      missionTitle: "Notre Mission",
      missionText:
        "Nous visons à fournir des solutions innovantes et de haute qualité pour satisfaire les besoins de nos utilisateurs.",
      teamTitle: "Notre Équipe",
      teamText:
        "Nous sommes une équipe passionnée de développeurs, designers et créateurs de contenu.",
      contactTitle: "Contactez-nous",
      contactText:
        "Vous avez des questions ou souhaitez collaborer ? Envoyez-nous un e-mail.",
      contactEmail: "contact@email.com",
    },
  };

  // Charger le contenu et les états des pages depuis l'API et le localStorage
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content")
      .then((response) => {
        const loadedContent = response.data || {};
        setContent({
          homepage: { ...defaultContent.homepage, ...loadedContent.homepage },
          myProjectsPage: { ...defaultContent.myProjectsPage, ...loadedContent.myProjectsPage },
          aboutPage: { ...defaultContent.aboutPage, ...loadedContent.aboutPage },
        });
      })
      .catch((error) => console.error("Erreur lors du chargement du contenu :", error));

    const storedStates = JSON.parse(localStorage.getItem("pageStates"));
    if (storedStates) setPageStates(storedStates);
  }, []);

  // Mettre à jour le contenu
  const updateContent = (updatedContent) => {
    setContent(updatedContent); // Mettez à jour immédiatement
    axios
      .post("http://localhost:5000/api/content", updatedContent)
      .then(() => {
        console.log("Contenu mis à jour :", updatedContent);
      })
      .catch((error) => console.error("Erreur lors de la mise à jour du contenu :", error));
  };
  

  // Ajouter un projet
  const addProject = (newProject) => {
    const updatedProjects = [...(content?.homepage?.projects || []), newProject];
    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        projects: updatedProjects,
      },
    };

    updateContent(updatedContent);
  };

  // Modifier un projet
  const editProject = (index, updatedProject) => {
    const updatedProjects = content.homepage.projects.map((project, i) =>
      i === index ? updatedProject : project
    );
    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        projects: updatedProjects,
      },
    };

    updateContent(updatedContent);
  };

  // Supprimer un projet
  const deleteProject = (index) => {
    const updatedProjects = content.homepage.projects.filter((_, i) => i !== index);
    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        projects: updatedProjects,
      },
    };

    updateContent(updatedContent);
  };

  // Fonction générique pour toggler les états des pages (active/inactive)
  const togglePageState = (pageKey) => {
    setPageStates((prev) => {
      const newState = { ...prev, [pageKey]: !prev[pageKey] };
      localStorage.setItem("pageStates", JSON.stringify(newState));
      return newState;
    });
  };

  // Login
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  // Fournir les valeurs dans le contexte
  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        addProject,
        editProject,
        deleteProject,
        isAuthenticated,
        login,
        logout,
        isHomePageActive: pageStates.isHomePageActive,
        toggleHomePage: () => togglePageState("isHomePageActive"),
        isProjectsPageActive: pageStates.isProjectsPageActive,
        toggleProjectsPage: () => togglePageState("isProjectsPageActive"),
        isAboutPageActive: pageStates.isAboutPageActive,
        toggleAboutPage: () => togglePageState("isAboutPageActive"),
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};
