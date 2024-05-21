// roomsApi.js
const express = require('express');
const { connection } = require('../../database/db');

const router = express.Router();



// Récupérer les chambres en fonction de l'ID de l'utilisateur
router.post('/rooms/:username', (req, res) => {
  const creatorName = req.body.creatorName;
  const query = 'SELECT * FROM rooms WHERE creator_name = ?';
  connection.query(query, [creatorName], (error, results, fields) => {
    if (error) throw error;
    console.log(creatorName)
    res.json(results);
  });
});

module.exports = router;
