// roomsApi.js
const express = require('express');
const { connection } = require('../../database/db');

const router = express.Router();



// Récupérer les chambres en fonction de l'ID de l'utilisateur
router.post('/recu-lyric', (req, res) => {
    const id = req.body.lyricId;
  
    const query = 'SELECT * FROM lyric WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        console.error(error);
        res.send('Une erreur est survenue.');
      } else {
        
        if (results.length > 0) {
          // Authentification réussie
          
          res.json(results);
          //res.render('utilisateurs', { data: results });
         // res.send({ utilisateurs: results });
        } else {
          // Authentification échouée
          res.send('Nom d\'utilisateur ou mot de passe incorrect.');
        }
      }
    });
  });
module.exports = router;
