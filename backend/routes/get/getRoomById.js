// roomApi.js
const express = require('express');
const { connection } = require('../../database/db');

const router = express.Router();

// Récupérer une chambre en fonction de son ID
router.get('/room/:id', (req, res) => {
  const roomId = req.params.id;
  const query = 'SELECT * FROM rooms WHERE room_id = ?';
  connection.query(query, [roomId], (error, results, fields) => {
    if (error) throw error;
    console.log(roomId);
    console.log(results)
    res.json(results);
  });
});

module.exports = router;
