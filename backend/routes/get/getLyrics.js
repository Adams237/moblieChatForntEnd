const express = require('express');
const router = express.Router();
const { connection } = require('../../database/db');
const path = require('path');



router.get('/', (req, res) => {
  const query = 'SELECT * FROM lyric';
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des données.');
    } else {
      res.json(results);
       

    }
  });
});

module.exports = router;
