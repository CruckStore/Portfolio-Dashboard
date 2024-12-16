import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageStates, setPageStates] = useState({
    isHomePageActive: true,
    isProjectsPageActive: true,
    isAboutPageActive: true,
  });

  const defaultContent = {
    homepage: {
      heroTitle: "Bienvenue sur notre Portfolio",
      heroSubtitle: "Découvrez nos projets et expériences",
      aboutText: "Nous sommes des développeurs passionnés par la création de sites web modernes et fonctionnels.",
      skills: "HTML & CSS, JavaScript, React, Node.js",
      contactText: "Vous avez un projet ou une idée en tête ?",
      contactEmail: "contact@email.com",
      projects: [],
    },
    myProjectsPage: {
      title: "Nos Projets",
      subtitle: "Découvrez nos projets récents",
      sectionTitle: "Nos Travaux",
      sectionDescription:
        "Découvrez nos projets récents et leurs descriptions.",
    },
    aboutPage: {
      heroTitle: "À Propos",
      heroSubtitle: "Apprenez-en plus sur nous",
      missionTitle: "Notre Mission",
      missionText: "Nous visons à fournir des solutions innovantes et de haute qualité pour satisfaire les besoins de nos utilisateurs. Notre objectif est de combiner créativité et performance dans tous nos projets.",
      teamTitle: "Notre Équipe",
      teamText: "Nous sommes une équipe passionnée de développeurs, designers et créateurs de contenu. Chaque membre apporte une expertise unique pour garantir la réussite du projet.",
      contactTitle: "Contactez-nous",
      contactText: "Vous avez des questions ou souhaitez collaborer ? Envoyez-nous un e-mail à",
      contactEmail: "contact@email.com",
    },
    other: {
      navHome: "Accueil",
      navProjects: "My Projects",
      navAbout: "À Propos",
      footerText: "© 2024 Arthur. Tous droits réservés.",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/content")
      .then((response) => {
        const loadedContent = response.data || {};
        setContent({
          homepage: { ...defaultContent.homepage, ...loadedContent.homepage },
          myProjectsPage: {
            ...defaultContent.myProjectsPage,
            ...loadedContent.myProjectsPage,
          },
          aboutPage: {
            ...defaultContent.aboutPage,
            ...loadedContent.aboutPage,
          },
          other: { ...defaultContent.other, ...loadedContent.other },
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du contenu :", error);
        setContent(defaultContent); 
      });

    const storedStates = JSON.parse(localStorage.getItem("pageStates"));
    if (storedStates) setPageStates(storedStates);
  }, []);

  const updateContent = (updatedContent) => {
    setContent(updatedContent);
    axios
      .post("http://localhost:5000/api/content", updatedContent)
      .then(() => {
        console.log("Contenu mis à jour :", updatedContent);
      })
      .catch((error) =>
        console.error("Erreur lors de la mise à jour du contenu :", error)
      );
  };

  const addProject = (newProject) => {
    const updatedProjects = [
      ...(content?.homepage?.projects || []),
      newProject,
    ];
    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        projects: updatedProjects,
      },
    };

    updateContent(updatedContent);
  };

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

  const deleteProject = (index) => {
    const updatedProjects = content.homepage.projects.filter(
      (_, i) => i !== index
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

  const togglePageState = (pageKey) => {
    setPageStates((prev) => {
      const newState = { ...prev, [pageKey]: !prev[pageKey] };
      localStorage.setItem("pageStates", JSON.stringify(newState));
      return newState;
    });
  };

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user"); 
    sessionStorage.clear(); 
  };
  

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
