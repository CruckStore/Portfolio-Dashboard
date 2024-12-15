import React, { useContext, useState, useEffect } from 'react';
import { ContentContext } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import imageCompression from 'browser-image-compression';


function Dashboard() {
  const { content, updateContent, logout } = useContext(ContentContext);
  const [formData, setFormData] = useState({});
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', image: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState(null); 
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
      showNotification('La taille de l\'image est trop grande. Limite : 5 Mo.', 'error');
      return;
    }
  
    try {
      const options = {
        maxSizeMB: 0.5, // Taille maximale (500 KB)
        maxWidthOrHeight: 1024, // Dimension maximale (1024px)
        useWebWorker: true,
      };
  
      const compressedFile = await imageCompression(file, options);
  
      console.log('Taille après compression :', compressedFile.size / 1024, 'Ko'); // Log la taille de l'image compressée
  
      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
  
      setNewProject({ ...newProject, image: base64 });
      showNotification('Image téléchargée et compressée avec succès !', 'success');
    } catch (error) {
      console.error('Erreur lors de la compression de l\'image:', error);
      showNotification('Erreur lors du téléchargement de l\'image.', 'error');
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
      setNewProject({ title: '', description: '' });
      showNotification('Projet ajouté avec succès !', 'success');
    } else {
      showNotification('Veuillez remplir tous les champs.', 'error');
    }
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
    setNewProject(projects[index]);
  };

  const handleSaveEditProject = () => {
    if (!newProject.title || !newProject.description) {
      showNotification('Veuillez remplir tous les champs.', 'error');
      return;
    }
  
    if (!newProject.image) {
      showNotification('Veuillez ajouter une image.', 'error');
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
    setNewProject({ title: '', description: '' }); 
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

  const handleSave = () => {
    saveProjects(projects);
    showNotification('Contenu mis à jour avec succès !', 'success');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Tableau de Bord Admin</h1>
        <button onClick={handleLogout} className="logout-button">
          Déconnexion
        </button>
      </header>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Modification de la page d'accueil */}
      <div className="dashboard-section">
        <h2>Modifier la Page d'Accueil</h2>
        <div className="dashboard-form">
          <label>
            <span>Titre :</span>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Sous-titre :</span>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>À propos :</span>
            <textarea
              name="about"
              value={formData.about || ''}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
      </div>

      {/* Gestion des projets */}
      <div className="dashboard-section">
        <h2>Gérer les Projets</h2>
        <div className="dashboard-form">
          <h3>{editingIndex !== null ? 'Modifier le Projet' : 'Ajouter un Projet'}</h3>
          <label>
            <span>Titre :</span>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
          </label>
          <label>
            <span>Description :</span>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
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
              <button onClick={handleSaveEditProject} className="save-button">Enregistrer les Modifications</button>
              <button onClick={handleCancelEdit} className="cancel-button">Annuler</button>
            </div>
          ) : (
            <button onClick={handleAddProject} className="save-button">Ajouter le Projet</button>
          )}
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <div key={index} className="project-card-dashboard">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              )}
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <div className="project-card-button-dashboard">
                <button onClick={() => handleEditProject(index)} className="edit-button">
                  Modifier
                </button>
                <button onClick={() => handleDeleteProject(index)} className="delete-button">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="save-button">Enregistrer les Modifications</button>
    </div>
  );
}

export default Dashboard;
