import React, { useContext } from 'react';
import { ContentContext } from '../context/ContentContext';

function Home() {
  const { content } = useContext(ContentContext);

  if (!content) {
    return <p>Chargement en cours...</p>;
  }

  const getHomepageAndProjects = (data) => {
    let current = data?.homepage;
    while (current?.homepage) {
      current = current.homepage;
    }
    return {
      homepage: current || {}, 
      projects: data?.homepage?.homepage?.projects || [],
    };
  };

  const { homepage, projects } = getHomepageAndProjects(content);

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`project-card-${index}`);
    const rect = card.getBoundingClientRect();
  
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; 
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; 
  
    const rotateX = y * -20; 
    const rotateY = x * 20;  
  
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.00)`;
  };
  

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`project-card-${index}`);
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{homepage.title || "Bienvenue sur mon Portfolio"}</h1>
          <p>{homepage.subtitle || "Découvrez mes projets et expériences"}</p>
          <a href="#contact" className="hero-button">
            Me Contacter
          </a>
        </div>
      </section>

      {/* À Propos Section */}
      <section className="about">
        <h2 className="projects-home-text-big">À Propos</h2>
        <p>
          {homepage.about ||
            "Je suis un développeur passionné par la création de sites web modernes et fonctionnels."}
        </p>
        <button
          className="logout-button"
          onClick={() => (window.location.href = "/about")}
        >
          Voir Plus
        </button>
      </section>

      {/* Projets Section */}
      <section className="projects">
        <h2 className="projects-home-text-big">Mes Projets</h2>
        <div className="project-grid">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={index}
                id={`project-card-${index}`}
                className="project-card"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))
          ) : (
            <p>Aucun projet disponible pour le moment.</p>
          )}
        </div>
        <button
          className="logout-button"
          onClick={() => (window.location.href = "/about")}
        >
          Voir Plus
        </button>
      </section>

      {/* Compétences Section */}
      <section className="skills">
        <h2 className="projects-home-text-big">Compétences</h2>
        <div className="skills-list">
          <div className="skill-item">HTML & CSS</div>
          <div className="skill-item">JavaScript</div>
          <div className="skill-item">React</div>
          <div className="skill-item">Node.js</div>
          <div className="skill-item">Responsive Design</div>
          <div className="skill-item">Git & GitHub</div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2 className="projects-home-text-big">Me Contacter</h2>
        <p>
          Vous avez un projet ou une idée en tête ? N'hésitez pas à me contacter
          !
        </p>
        <a href="mailto:contact@email.com" className="contact-button">
          Envoyer un Email
        </a>
      </section>
    </div>
  );
}

export default Home;
