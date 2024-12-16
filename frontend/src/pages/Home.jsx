import React, { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

function Home() {
  const { content, isHomePageActive } = useContext(ContentContext);

  if (!isHomePageActive) {
    return <p>La page d'accueil est actuellement désactivée.</p>;
  }

  const getHomePageData = (data) => {
    const homepage = data?.homepage || {};
    const projects = homepage.projects || []; 
    return {
      heroTitle: homepage.heroTitle || "Bienvenue sur notre Portfolio",
      heroSubtitle: homepage.heroSubtitle || "Découvrez nos projets et expériences",
      aboutText: homepage.aboutText || "Nous sommes des développeurs passionnés par la création de sites web modernes et fonctionnels.",
      skills: homepage.skills || "HTML & CSS, JavaScript, React",
      contactText: homepage.contactText || "Vous avez un projet ou une idée en tête ?",
      contactEmail: homepage.contactEmail || "contact@email.com",
      projects,
    };
  };

  const {
    heroTitle,
    heroSubtitle,
    aboutText,
    skills,
    contactText,
    contactEmail,
    projects,
  } = getHomePageData(content);

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
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <a href="#contact" className="hero-button">
            Nous Contacter
          </a>
        </div>
      </section>

      {/* À Propos Section */}
      <section className="about">
        <h2 className="projects-home-text-big a-propos-text-p">À Propos</h2>
        <p>{aboutText}</p>
        <button
          className="logout-button"
          onClick={() => (window.location.href = "/about")}
        >
          Voir Plus
        </button>
      </section>


{/* Projets Section */}
<section className="projects">
  <h2 className="projects-home-text-big">Nos Projets</h2>
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
    onClick={() => (window.location.href = "/my-projects")}
  >
    Voir Plus
  </button>
</section>


      {/* Compétences Section */}
      <section className="skills">
        <h2 className="projects-home-text-big">Compétences</h2>
        <div className="skills-list">
          {skills.split(",").map((skill, index) => (
            <div key={index} className="skill-item">
              {skill.trim()}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <h2 className="projects-home-text-big">Nous Contacter</h2>
        <p>{contactText}</p>
        <a href={`mailto:${contactEmail}`} className="contact-button">
          Envoyer un Email
        </a>
      </section>
    </div>
  );
}

export default Home;
