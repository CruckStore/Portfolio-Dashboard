import React from "react";

function Spotify() {
  const spotifyTracks = [
    "https://open.spotify.com/embed/track/4GRFzKI7jTZ3kbMfouc7bn?utm_source=generator",
    "https://open.spotify.com/embed/track/4bArJbevzjgIfbPupg9GEl?utm_source=generator",
    "https://open.spotify.com/embed/track/3nbh5VQkQMLPuoHtpt6N5c?utm_source=generator",
  ];

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`spotify-card-${index}`);
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15; // Ajustement X
    const y = (e.clientY - rect.top - rect.height / 2) / 15; // Ajustement Y

    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`spotify-card-${index}`);
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Spotify Tracks</h1>
          <p>Découvrez les morceaux du moment</p>
        </div>
      </section>

      {/* Spotify Tracks Grid */}
      <div className="spotify-container">
        <section className="spotify-grid">
          {spotifyTracks.map((track, index) => (
            <div
              key={index}
              id={`spotify-card-${index}`}
              className="spotify-card"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <iframe
                style={{ borderRadius: "12px" }}
                src={track}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          ))}
        </section>
      </div>

      {/* Styling */}
      <style jsx>{`
        .hero {
          background-color: #1db954;
          color: white;
          text-align: center;
          padding: 50px 20px;
        }
        .spotify-container {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .spotify-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }
        .spotify-card {
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
          background: #111;
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        .spotify-card iframe {
          border-radius: 12px;
        }
        .spotify-card:hover {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}

export default Spotify;
