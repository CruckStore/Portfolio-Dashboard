import React, { useContext, useState, useEffect } from "react";
import { ContentContext } from "../context/ContentContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import imageCompression from "browser-image-compression";

function Dashboard() {
  const {
    content,
    updateContent,
    logout,
    toggleHomePage,
    isAboutPageActive,
    toggleAboutPage,
    isHomePageActive,
    isProjectsPageActive,
    toggleProjectsPage,
  } = useContext(ContentContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("accueil");
  const navigate = useNavigate();

  useEffect(() => {
    if (content) {
      if (content.homepage) {
        setFormData((prevData) => ({
          ...prevData,
          homeHeroTitle:
            content.homepage.heroTitle || "Bienvenue sur notre Portfolio",
          homeHeroSubtitle:
            content.homepage.heroSubtitle ||
            "Découvrez nos projets et expériences",
          homeAboutText:
            content.homepage.aboutText ||
            "Nous sommes des développeurs passionnés par la création de sites web modernes et fonctionnels.",
          homeSkills:
            content.homepage.skills || "HTML & CSS, JavaScript, React, Node.js",
          homeContactText:
            content.homepage.contactText ||
            "Vous avez un projet ou une idée en tête ? N'hésitez pas à nous contacter !",
          homeContactEmail:
            content.homepage.contactEmail || "contact@email.com",
        }));
      }

      if (content.aboutPage) {
        setFormData((prevData) => ({
          ...prevData,
          aboutHeroTitle: content.aboutPage.heroTitle || "À Propos",
          aboutHeroSubtitle:
            content.aboutPage.heroSubtitle ||
            "Découvrez qui nous sommes et ce que nous faisons.",
          aboutMissionTitle: content.aboutPage.missionTitle || "Notre Mission",
          aboutMissionText:
            content.aboutPage.missionText ||
            "Nous visons à fournir des solutions innovantes et de haute qualité pour satisfaire les besoins de nos utilisateurs.",
          aboutTeamTitle: content.aboutPage.teamTitle || "Notre Équipe",
          aboutTeamText:
            content.aboutPage.teamText ||
            "Nous sommes une équipe passionnée de développeurs, designers et créateurs de contenu.",
          aboutContactTitle: content.aboutPage.contactTitle || "Contactez-nous",
          aboutContactText:
            content.aboutPage.contactText ||
            "Vous avez des questions ou souhaitez collaborer ? Envoyez-nous un e-mail.",
          aboutContactEmail:
            content.aboutPage.contactEmail || "contact@email.com",
        }));
      }

      if (content.homepage?.projects) {
        setProjects(content.homepage.projects); 
      }

      if (content.myProjectsPage) {
        setFormData((prevData) => ({
          ...prevData,
          myProjectsTitle: content.myProjectsPage.title || "Nos Projets",
          myProjectsSubtitle:
            content.myProjectsPage.subtitle || "Découvrez nos projets récents",
          myProjectsSectionDescription:
            content.myProjectsPage.sectionDescription ||
            "Découvrez nos projets récents et leurs descriptions.",
          myProjectsSectionTitle:
            content.myProjectsPage.sectionTitle || "Nos Travaux",
        }));
      }
    }
  }, [content]);

  const [refresh, setRefresh] = useState(false);

  const saveHomePageContent = () => {
    const updatedContent = {
      ...content,
      homepage: {
        heroTitle: formData.homeHeroTitle,
        heroSubtitle: formData.homeHeroSubtitle,
        aboutText: formData.homeAboutText,
        skills: formData.homeSkills,
        contactText: formData.homeContactText,
        contactEmail: formData.homeContactEmail,
        projects: content.homepage.projects,
      },
    };

    updateContent(updatedContent);
    showNotification("Page d'accueil mise à jour avec succès !", "success");
  };

  const saveOtherContent = () => {
    const updatedContent = {
      ...content,
      other: {
        footerText: formData.footerText,
      },
    };

    updateContent(updatedContent);
    showNotification(
      "Contenu de la navigation et du pied de page mis à jour avec succès !",
      "success"
    );
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showNotification("Aucun fichier sélectionné.", "error");
      return;
    }
    if (!file.type.startsWith("image/")) {
      showNotification(
        "Veuillez télécharger un fichier image valide.",
        "error"
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showNotification(
        "La taille de l'image est trop grande. Limite : 5 Mo.",
        "error"
      );
      return;
    }
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
      setNewProject({ ...newProject, image: base64 });
      showNotification(
        "Image téléchargée et compressée avec succès !",
        "success"
      );
    } catch (error) {
      showNotification("Erreur lors du téléchargement de l'image.", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProject = () => {
    if (!content || !content.homepage) {
      showNotification("Erreur : le contenu n'est pas encore chargé.", "error");
      return;
    }

    if (newProject.title && newProject.description && newProject.image) {
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      saveProjects(updatedProjects);

      setNewProject({ title: "", description: "", image: "" });
      showNotification("Projet ajouté avec succès !", "success");
    } else {
      showNotification(
        "Veuillez remplir tous les champs, y compris l'image.",
        "error"
      );
    }
  };

  const saveAboutPageContent = () => {
    const updatedContent = {
      ...content,
      aboutPage: {
        heroTitle: formData.aboutHeroTitle,
        heroSubtitle: formData.aboutHeroSubtitle,
        missionTitle: formData.aboutMissionTitle,
        missionText: formData.aboutMissionText,
        teamTitle: formData.aboutTeamTitle,
        teamText: formData.aboutTeamText,
        contactTitle: formData.aboutContactTitle,
        contactText: formData.aboutContactText,
        contactEmail: formData.aboutContactEmail,
      },
    };

    updateContent(updatedContent); 

    setFormData((prevData) => ({
      ...prevData,
      aboutHeroTitle: updatedContent.aboutPage.heroTitle,
      aboutHeroSubtitle: updatedContent.aboutPage.heroSubtitle,
      aboutMissionTitle: updatedContent.aboutPage.missionTitle,
      aboutMissionText: updatedContent.aboutPage.missionText,
      aboutTeamTitle: updatedContent.aboutPage.teamTitle,
      aboutTeamText: updatedContent.aboutPage.teamText,
      aboutContactTitle: updatedContent.aboutPage.contactTitle,
      aboutContactText: updatedContent.aboutPage.contactText,
      aboutContactEmail: updatedContent.aboutPage.contactEmail,
    }));

    showNotification("Page À Propos mise à jour avec succès !", "success");
  };

  const saveProjectsPageContent = () => {
    if (!content || !content.myProjectsPage) {
      console.error(
        "Content ou myProjectsPage est null. Impossible de sauvegarder les projets."
      );
      return;
    }

    const updatedContent = {
      ...content,
      myProjectsPage: {
        ...content.myProjectsPage,
        title: formData.myProjectsTitle,
        subtitle: formData.myProjectsSubtitle,
        sectionTitle: formData.myProjectsSectionTitle,
        sectionDescription: formData.myProjectsSectionDescription,
      },
    };

    updateContent(updatedContent); 
    showNotification("Page des projets mise à jour avec succès !", "success");
  };

  const handleSave = () => {
    saveProjects(projects);
    showNotification("Contenu mis à jour avec succès !", "success");
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
    setNewProject(projects[index]);
  };

  const handleSaveEditProject = () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      showNotification(
        "Veuillez remplir tous les champs et ajouter une image.",
        "error"
      );
      return;
    }

    const updatedProjects = projects.map((project, i) =>
      i === editingIndex ? newProject : project
    );

    setProjects(updatedProjects);
    saveProjects(updatedProjects); 

    setNewProject({ title: "", description: "", image: "" });
    setEditingIndex(null);
    showNotification("Projet modifié avec succès !", "success");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewProject({ title: "", description: "", image: "" });
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    showNotification("Projet supprimé avec succès !", "success");
  };

  const saveProjects = (updatedProjects) => {
    if (!content || !content.homepage) {
      console.error(
        "Content ou homepage est null. Impossible de sauvegarder les projets."
      );
      return;
    }

    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        projects: updatedProjects,
      },
    };

    updateContent(updatedContent); 
    setProjects(updatedProjects); 
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <button
          className={`nav-tab ${activeTab === "accueil" ? "active" : ""}`}
          onClick={() => setActiveTab("accueil")}
        >
          Accueil
        </button>
        <button
          className={`nav-tab ${activeTab === "myProjects" ? "active" : ""}`}
          onClick={() => setActiveTab("myProjects")}
        >
          My Projects
        </button>
        <button
          className={`nav-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          À Propos
        </button>
        <button
          className={`nav-tab ${activeTab === "other" ? "active" : ""}`}
          onClick={() => setActiveTab("other")}
        >
          Autre
        </button>
      </nav>

      <header className="dashboard-header">
        <h1>
          Tableau de Bord {user?.role === "admin" ? "(Admin)" : "(Lecteur)"} -{" "}
          {user?.username || "Utilisateur"}
        </h1>
      </header>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {activeTab === "accueil" && (
        <div className="dashboard-section">
          {/* Toggle pour la page d'accueil */}
          <div>
            <button
              onClick={() => toggleHomePage()}
              style={{
                backgroundColor: isHomePageActive ? "green" : "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isHomePageActive
                ? "Désactiver la Page d'Accueil"
                : "Activer la Page d'Accueil"}
            </button>
          </div>

          {/* Formulaire pour personnaliser l'accueil */}
          <h2>Modifier la Page d'Accueil</h2>
          <div className="dashboard-form">
            <label>
              <span>Titre de la Section Hero :</span>
              <input
                type="text"
                name="homeHeroTitle"
                value={formData.homeHeroTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Sous-titre de la Section Hero :</span>
              <input
                type="text"
                name="homeHeroSubtitle"
                value={formData.homeHeroSubtitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Texte de la Section À Propos :</span>
              <textarea
                name="homeAboutText"
                value={formData.homeAboutText || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
            <label>
              <span>Compétences (séparées par des virgules) :</span>
              <input
                type="text"
                name="homeSkills"
                value={formData.homeSkills || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Texte Contact :</span>
              <textarea
                name="homeContactText"
                value={formData.homeContactText || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
            <label>
              <span>Email Contact :</span>
              <input
                type="email"
                name="homeContactEmail"
                value={formData.homeContactEmail || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
          </div>
          <button
            className="save-button"
            onClick={saveHomePageContent}
            disabled={user?.role !== "admin"}
          >
            Enregistrer les Modifications
          </button>
        </div>
      )}

      {activeTab === "about" && (
        <div className="dashboard-section">
          {/* Toggle pour la page À Propos */}
          <div>
            <button
              onClick={() => toggleAboutPage()}
              style={{
                backgroundColor: isAboutPageActive ? "green" : "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isAboutPageActive
                ? "Désactiver la Page À Propos"
                : "Activer la Page À Propos"}
            </button>
          </div>

          {/* Formulaire pour personnaliser À Propos */}
          <h2>Modifier la Page À Propos</h2>
          <div className="dashboard-form">
            <label>
              <span>Titre de la Section Hero :</span>
              <input
                type="text"
                name="aboutHeroTitle"
                value={formData.aboutHeroTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Sous-titre de la Section Hero :</span>
              <input
                type="text"
                name="aboutHeroSubtitle"
                value={formData.aboutHeroSubtitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Titre de la Mission :</span>
              <input
                type="text"
                name="aboutMissionTitle"
                value={formData.aboutMissionTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Description de la Mission :</span>
              <textarea
                name="aboutMissionText"
                value={formData.aboutMissionText || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
            <label>
              <span>Titre de l'Équipe :</span>
              <input
                type="text"
                name="aboutTeamTitle"
                value={formData.aboutTeamTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Description de l'Équipe :</span>
              <textarea
                name="aboutTeamText"
                value={formData.aboutTeamText || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
            <label>
              <span>Titre de la Section Contact :</span>
              <input
                type="text"
                name="aboutContactTitle"
                value={formData.aboutContactTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Description de la Section Contact :</span>
              <textarea
                name="aboutContactText"
                value={formData.aboutContactText || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
            <label>
              <span>Email de Contact :</span>
              <input
                type="email"
                name="aboutContactEmail"
                value={formData.aboutContactEmail || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
          </div>
          <button
            className="save-button"
            onClick={saveAboutPageContent}
            disabled={user?.role !== "admin"}
          >
            Enregistrer les Modifications
          </button>
        </div>
      )}

      {activeTab === "other" && (
        <div className="dashboard-section">
          <h2>Modifier le Pied de Page</h2>
          <div className="dashboard-form">
            <label>
              <span>Texte du Pied de Page :</span>
              <textarea
                name="footerText"
                value={formData.footerText || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
          </div>

          <button
            className="save-button"
            onClick={saveOtherContent}
            disabled={user?.role !== "admin"}
          >
            Enregistrer les Modifications
          </button>
        </div>
      )}

      {activeTab === "myProjects" && (
        <div className="dashboard-section">
          {/* Toggle pour la page My Projects */}
          <div>
            <button
              onClick={() => toggleProjectsPage()}
              style={{
                backgroundColor: isProjectsPageActive ? "green" : "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isProjectsPageActive
                ? "Désactiver la Page Projets"
                : "Activer la Page Projets"}
            </button>
          </div>

          {/* Formulaire pour personnaliser My Projects */}
          <h2>Modifier la Page des Projets</h2>
          <div className="dashboard-form">
            <label>
              <span>Titre :</span>
              <input
                type="text"
                name="myProjectsTitle"
                value={formData.myProjectsTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Sous-titre :</span>
              <input
                type="text"
                name="myProjectsSubtitle"
                value={formData.myProjectsSubtitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Titre de la Section :</span>
              <input
                type="text"
                name="myProjectsSectionTitle"
                value={formData.myProjectsSectionTitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Description de la Section :</span>
              <textarea
                name="myProjectsSectionDescription"
                value={formData.myProjectsSectionDescription || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
          </div>

          {/* Gestion des projets */}
          <h2>
            {editingIndex !== null ? "Modifier le Projet" : "Ajouter un Projet"}
          </h2>
          {user?.role === "admin" && (
            <div className="dashboard-form">
              <label>
                <span>Titre :</span>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                />
              </label>
              <label>
                <span>Description :</span>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </label>
              <label>
                <span>Image :</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {editingIndex !== null ? (
                <div>
                  <button
                    onClick={handleSaveEditProject}
                    className="save-button"
                  >
                    Enregistrer les Modifications
                  </button>
                  <button onClick={handleCancelEdit} className="cancel-button">
                    Annuler
                  </button>
                </div>
              ) : (
                <button onClick={handleAddProject} className="save-button">
                  Ajouter le Projet
                </button>
              )}
            </div>
          )}

          {/* Liste des projets */}
          <h2>Gérer les Projets</h2>
          <div className="project-list">
            {projects.map((project, index) => (
              <div key={index} className="project-card-dashboard">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                )}
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                {user?.role === "admin" && (
                  <div className="project-card-button-dashboard">
                    <button
                      onClick={() => handleEditProject(index)}
                      className="edit-button"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="delete-button"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="save-button"
            onClick={saveProjectsPageContent}
            disabled={user?.role !== "admin"}
          >
            Enregistrer les Modifications
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
