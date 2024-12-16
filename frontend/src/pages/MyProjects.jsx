import React, { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

function MyProjects() {
  const { content, isProjectsPageActive } = useContext(ContentContext);

  // Afficher un message si la page des projets est désactivée
  if (!isProjectsPageActive) {
    return <p>La page des projets est actuellement désactivée.</p>;
  }

  const getProjectsData = (data) => {
    const projects = data?.homepage?.homepage?.projects || [];
    const myProjectsPage = data?.myProjectsPage || {};
    return {
      projects,
      title: myProjectsPage.title || "Nos Projets",
      subtitle: myProjectsPage.subtitle || "Découvrez nos projets récents",
      sectionTitle: myProjectsPage.sectionTitle || "Nos Travaux",
      sectionDescription:
        myProjectsPage.sectionDescription ||
        "Découvrez nos projets récents et leurs descriptions.",
    };
  };

  const { projects, title, subtitle, sectionTitle, sectionDescription } =
    getProjectsData(content);

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
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <a href="#myprojects-p" className="hero-button">
            Voir Plus
          </a>
        </div>
      </section>

      {/* Projects Grid */}
      {/* Projects Grid */}
      <div className="my-projects-container" id="myprojects-p">
        <header className="my-projects-header">
          <h2 className="projects-home-text-big">{sectionTitle}</h2>
          <p>{sectionDescription}</p>
        </header>

        <section className="my-projects-grid">
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
        </section>
      </div>
    </div>
  );
}

export default MyProjects;
