import React, { useContext, useState, useEffect } from 'react';
import { ContentContext } from '../context/ContentContext';
import { AuthContext } from '../context/AuthContext'; // Import du contexte d'authentification
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import imageCompression from 'browser-image-compression';

function Dashboard() {
  const { content, updateContent, logout, toggleHomePage, isHomePageActive } = useContext(ContentContext);
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('accueil');
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(content?.homepage?.homepage?.homepage || {});
    setProjects(content?.homepage?.homepage?.projects || []);
  }, [content]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showNotification('Aucun fichier sélectionné.', 'error');
      return;
    }
    if (!file.type.startsWith('image/')) {
      showNotification('Veuillez télécharger un fichier image valide.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showNotification("La taille de l'image est trop grande. Limite : 5 Mo.", 'error');
      return;
    }
    try {
      const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1024, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
      setNewProject({ ...newProject, image: base64 });
      showNotification('Image téléchargée et compressée avec succès !', 'success');
    } catch (error) {
      showNotification("Erreur lors du téléchargement de l'image.", 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      saveProjects(updatedProjects);
      setNewProject({ title: '', description: '', image: '' });
      showNotification('Projet ajouté avec succès !', 'success');
    } else {
      showNotification('Veuillez remplir tous les champs.', 'error');
    }
  };

  const handleSave = () => {
    saveProjects(projects);
    showNotification('Contenu mis à jour avec succès !', 'success');
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
    setNewProject(projects[index]);
  };

  const handleSaveEditProject = () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      showNotification('Veuillez remplir tous les champs et ajouter une image.', 'error');
      return;
    }
    const updatedProjects = projects.map((project, i) =>
      i === editingIndex ? newProject : project
    );
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    setNewProject({ title: '', description: '', image: '' });
    setEditingIndex(null);
    showNotification('Projet modifié avec succès !', 'success');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewProject({ title: '', description: '', image: '' });
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    showNotification('Projet supprimé avec succès !', 'success');
  };

  const saveProjects = (updatedProjects) => {
    const updatedContent = {
      ...content,
      homepage: {
        ...content.homepage,
        homepage: {
          ...content.homepage.homepage,
          projects: updatedProjects,
          homepage: formData,
        },
      },
    };
    updateContent(updatedContent);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        {user?.role === "admin" && (
          <button
            onClick={() => toggleHomePage()}
            className={`toggle-button ${
              isHomePageActive ? "active" : "inactive"
            }`}
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
        )}
      </header>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Modification de la page d'accueil */}
      {activeTab === "accueil" && (
        <div className="dashboard-section">
          {/* Formulaire pour accueil */}
          <h2>Modifier la Page d'Accueil</h2>
          <div className="dashboard-form">
            <label>
              <span>Titre :</span>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Sous-titre :</span>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>À propos :</span>
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
          </div>
        </div>
      )}

      {activeTab === "myProjects" && (
        <div className="dashboard-section">
          {/* Formulaire et gestion des projets */}
          <h2>Modifier la Page des Projets</h2>
          <div className="dashboard-form">
            <label>
              <span>Titre :</span>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>Sous-titre :</span>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              />
            </label>
            <label>
              <span>À propos :</span>
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                disabled={user?.role !== "admin"}
              ></textarea>
            </label>
            <h2>
              {editingIndex !== null
                ? "Modifier le Projet"
                : "Ajouter un Projet"}
            </h2>
            {/* Gestion des projets */}
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
                    <button
                      onClick={handleCancelEdit}
                      className="cancel-button"
                    >
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
          </div>
        </div>
      )}

      <button onClick={handleSave} className="save-button">
        Enregistrer les Modifications
      </button>
    </div>
  );
}

export default Dashboard;
