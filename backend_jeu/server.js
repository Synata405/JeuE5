const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'JeuE5',
  connectionLimit: 5
});

pool.getConnection()
  .then(conn => {
    console.log('Connexion réussie à la base de données');
    conn.release();
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

app.post('/addpersonnage', async (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    res.status(400).send('Le champ nom est requis');
    return;
  }
  try {
    const conn = await pool.getConnection();
    console.log('Connexion à la base de données réussie.');
    const result = await conn.query('INSERT INTO personnage (nom) VALUES (?)', [nom]);
    console.log('Requête exécutée avec succès.');
    conn.release();
    res.send('Personnage ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'insertion dans la base de données :', err);
    res.status(500).send('Erreur du serveur');
  }
});

app.get('/personnages', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const personnages = await conn.query('SELECT * FROM personnage');
    conn.release();
    res.json(personnages);
  } catch (err) {
    console.error('Erreur lors de la récupération des personnages :', err);
    res.status(500).send('Erreur du serveur');
  }
});

app.post('/addmonstre', async (req, res) => {
  const { nom, exp, vie, attaque } = req.body;
  console.log('test');
  if (!nom) {
    res.status(400).send('Le champ nom est requis');
    return;
  }
  try {
    const conn = await pool.getConnection();
    console.log('Connexion à la base de données réussie.');
    const result = await conn.query('INSERT INTO monstre (nom, exp, vie_max, attaque) VALUES (?,?,?,?)', [nom, exp, vie, attaque]);

    console.log('Requête exécutée avec succès.');
    conn.release();
    res.send('Monstre ajouté avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'insertion dans la base de données :', err);
    res.status(500).send('Erreur du serveur');
  }
});


app.get('/monstres', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM monstre');
    connection.release();
    res.json(rows); // Renvoie les monstres au format JSON
  } catch (error) {
    console.error('Erreur lors de la récupération des monstres:', error);
    res.status(500).send('Erreur du serveur');
  }
});

app.listen(3001, () => {
  console.log('Serveur démarré sur le port 3001');
});
