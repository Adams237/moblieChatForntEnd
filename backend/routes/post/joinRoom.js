// roomsApi.js
const express = require('express');
const { connection } = require('../../database/db');

const router = express.Router();



// Récupérer les chambres en fonction de l'ID de l'utilisateur
router.post('/joinRoom', (req, res) => {
  const roomName = req.body.roomName;
  const query = 'SELECT * FROM rooms WHERE room_name = ?';
  connection.query(query, [roomName], (error, results, fields) => {
    if (error) throw error;
    console.log(roomName)
    res.json(results);
  });
});

module.exports = router;
