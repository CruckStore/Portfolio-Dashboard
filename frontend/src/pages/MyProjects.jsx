import React, { useContext } from 'react';
import { ContentContext } from '../context/ContentContext';

function MyProjects() {
  const { content } = useContext(ContentContext);

  const projects = content?.homepage?.homepage?.projects || [];

  return (
    <div className="my-projects-container">
      <header className="my-projects-header">
        <h1>My Projects</h1>
        <p>Découvrez mes projets récents et leurs descriptions.</p>
      </header>

      <section className="my-projects-grid">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="project-card">
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
  );
}

export default MyProjects;
