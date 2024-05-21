const mongoose = require('mongoose');

// URL de connexion à votre base de données MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/ride-school';

// Configuration de la connexion à MongoDB
mongoose.connect(MONGODB_URI, {
 

});

// Événements liés à la connexion MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

module.exports = db;
