const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs'); // Pour le hachage des mots de passe
const app = express();
const PORT = 5000;

// Chemins des fichiers JSON
const contentFilePath = './content.json';
const usersFilePath = './users.json';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// Fonction pour lire un fichier JSON en toute sécurité
const readJSONFile = (filePath, res) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, err);
    res.status(500).json({ message: 'Erreur serveur' });
    return null;
  }
};

// Fonction pour écrire dans un fichier JSON en toute sécurité
const writeJSONFile = (filePath, data, res) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Erreur lors de l'écriture dans le fichier ${filePath}:`, err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Routes pour le contenu
app.get('/api/content', (req, res) => {
  const content = readJSONFile(contentFilePath, res);
  if (content) {
    res.json(content);
  }
});

app.post('/api/content', (req, res) => {
  const newContent = req.body;
  console.log('Données reçues du frontend :', JSON.stringify(newContent, null, 2));

  writeJSONFile(contentFilePath, newContent, res);
  res.json({ message: 'Contenu mis à jour avec succès' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Tentative de connexion avec :', username);

  const users = readJSONFile(usersFilePath, res);
  if (!users) return;

  const user = users.find((u) => u.username === username);

  if (!user) {
    console.warn(`Utilisateur "${username}" non trouvé.`);
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  // Comparaison simple pour les tests sans bcrypt
  if (user.password !== password) {
    console.warn(`Mot de passe incorrect pour l'utilisateur "${username}".`);
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  console.log(`Connexion réussie pour l'utilisateur "${username}".`);
  res.json({ message: 'Connexion réussie', role: user.role });
});


// Route pour ajouter un utilisateur
app.post('/api/users', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const users = readJSONFile(usersFilePath, res);
  if (!users) return;

  if (users.find((u) => u.username === username)) {
    console.warn(`L'utilisateur "${username}" existe déjà.`);
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });

  writeJSONFile(usersFilePath, users, res);
  console.log(`Utilisateur "${username}" ajouté avec succès.`);
  res.json({ message: 'Utilisateur ajouté avec succès' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
