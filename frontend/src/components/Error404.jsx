import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.text}>Oups ! La page que vous cherchez n'existe pas.</p>
      <Link to="/" style={styles.button}>
        Retour à l'accueil
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  header: {
    fontSize: '6rem',
    color: '#ff4b4b',
    margin: '0',
  },
  text: {
    fontSize: '1.5rem',
    margin: '20px 0',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#075ab3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default Error404;
