import React, { useContext } from "react";
import { ContentContext } from "../context/ContentContext";

function About() {
  const { content, isAboutPageActive } = useContext(ContentContext);

  // Afficher un message si la page À Propos est désactivée
  if (!isAboutPageActive) {
    return <p>La page À Propos est actuellement désactivée.</p>;
  }

  const getAboutPageData = (data) => {
    const aboutPage = data?.aboutPage || {};
    return {
      heroTitle: aboutPage.heroTitle || "À Propos",
      heroSubtitle:
        aboutPage.heroSubtitle || "Découvrez qui nous sommes et ce que nous faisons.",
      missionTitle: aboutPage.missionTitle || "Notre Mission",
      missionText:
        aboutPage.missionText ||
        "Nous visons à fournir des solutions innovantes et de haute qualité pour satisfaire les besoins de nos utilisateurs.",
      teamTitle: aboutPage.teamTitle || "Notre Équipe",
      teamText:
        aboutPage.teamText ||
        "Nous sommes une équipe passionnée de développeurs, designers et créateurs de contenu.",
      contactTitle: aboutPage.contactTitle || "Contactez-nous",
      contactText:
        aboutPage.contactText ||
        "Vous avez des questions ou souhaitez collaborer ? Envoyez-nous un e-mail.",
      contactEmail: aboutPage.contactEmail || "contact@email.com",
    };
  };

  const {
    heroTitle,
    heroSubtitle,
    missionTitle,
    missionText,
    teamTitle,
    teamText,
    contactTitle,
    contactText,
    contactEmail,
  } = getAboutPageData(content);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-abt">
        <div className="hero-content-abt">
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
        </div>
        <a href="#notremission" className="hero-button">
          Voir Plus
        </a>
      </section>

      <section className="about-content" id="notremission">
        <h2 className="projects-home-text-big">{missionTitle}</h2>
        <p className="abt-text-p">{missionText}</p>

        <h2 className="projects-home-text-big">{teamTitle}</h2>
        <p className="abt-text-p">{teamText}</p>

        <h2 className="projects-home-text-big">{contactTitle}</h2>
        <p className="abt-text-p">
          {contactText} <br />
          <a
            href={`mailto:${contactEmail}`}
            className="contact-button-abt"
          >
            {contactEmail}
          </a>
        </p>
      </section>
    </div>
  );
}

export default About;
