const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const contentFilePath = './content.json';

app.get('/api/content', (req, res) => {
  fs.readFile(contentFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier JSON :', err);
      return res.status(500).send('Erreur serveur');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/content', (req, res) => {
  console.log('Données reçues du frontend :', JSON.stringify(req.body, null, 2));
  const newContent = req.body;

  fs.writeFile('./content.json', JSON.stringify(newContent, null, 2), (err) => {
    if (err) {
      console.error("Erreur lors de l'écriture dans le fichier JSON :", err);
      return res.status(500).send('Erreur serveur');
    }
    res.json({ message: 'Contenu mis à jour avec succès' });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
