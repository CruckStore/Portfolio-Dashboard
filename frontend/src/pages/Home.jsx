import React, { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

function Home() {
  const { content, isHomePageActive } = useContext(ContentContext);

  // Afficher un message si la page d'accueil est désactivée
  if (!isHomePageActive) {
    return <p>La page d'accueil est actuellement désactivée.</p>;
  }

  const getHomePageData = (data) => {
    const homepage = data?.homepage || {};
    return {
      heroTitle: homepage.heroTitle || "Bienvenue sur notre Portfolio",
      heroSubtitle: homepage.heroSubtitle || "Découvrez nos projets et expériences",
      aboutText: homepage.aboutText || "Nous sommes des développeurs passionnés...",
      skills: homepage.skills || "HTML & CSS, JavaScript, React",
      contactText: homepage.contactText || "Vous avez un projet ou une idée en tête ?",
      contactEmail: homepage.contactEmail || "contact@email.com",
    };
  };
  
  const {
    heroTitle,
    heroSubtitle,
    aboutText,
    skills,
    contactText,
    contactEmail,
  } = getHomePageData(content);
  

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
