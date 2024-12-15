import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

function HashPassword() {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');

  const handleHashPassword = async () => {
    try {
      const salt = await bcrypt.genSalt(10); // Générer un "sel" pour le hachage
      const hash = await bcrypt.hash(password, salt); // Hasher le mot de passe
      setHashedPassword(hash);
    } catch (error) {
      console.error('Erreur lors du hachage du mot de passe', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hachage de Mot de Passe</h1>
      <div style={{ margin: '20px' }}>
        <input
          type="password"
          placeholder="Entrez le mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <button
        onClick={handleHashPassword}
        style={{
          padding: '10px 20px',
          backgroundColor: '#075ab3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Hacher le Mot de Passe
      </button>

      {hashedPassword && (
        <div style={{ marginTop: '20px' }}>
          <h3>Mot de passe haché :</h3>
          <textarea
            readOnly
            value={hashedPassword}
            rows="3"
            style={{
              width: '400px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default HashPassword;
