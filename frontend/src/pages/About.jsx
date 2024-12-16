import React from 'react';

function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-abt">
        <div className="hero-content-abt">
          <h1>À Propos</h1>
          <p>Découvrez qui nous sommes et ce que nous faisons.</p>
        </div>
      </section>

      <section className="about-content">
        <h2>Notre Mission</h2>
        <p>
          Nous visons à fournir des solutions innovantes et de haute qualité
          pour satisfaire les besoins de nos utilisateurs. Notre objectif est de
          combiner créativité et performance dans tous nos projets.
        </p>

        <h2>Notre Équipe</h2>
        <p>
          Nous sommes une équipe passionnée de développeurs, designers et
          créateurs de contenu. Chaque membre apporte une expertise unique pour
          garantir la réussite du projet.
        </p>

        <h2>Contactez-nous</h2>
        <p>
          Vous avez des questions ou souhaitez collaborer ? <br />
          Envoyez-nous un e-mail à{" "}
          <a href="mailto:contact@example.com">contact@example.com</a>.
        </p>
      </section>
    </div>
  );
}

export default About;
