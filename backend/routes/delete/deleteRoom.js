// roomsApi.js
const express = require('express');
const { connection } = require('../../database/db');

const router = express.Router();



router.post('/deleteRoom/:id', (req, res) => {
  const roomId = req.body.id;
  const deleteQuery = 'DELETE FROM rooms WHERE room_id = ?';

  connection.query(deleteQuery, roomId, (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression : ' + err.stack);
      res.status(500).send('Erreur lors de la suppression.');
      return;
    }
    console.log('Suppression réussie.');
    res.status(200).send('Donnée supprimée avec succès.');
  });
});

module.exports = router;
