// roomController.js

const express = require('express');
const router = express.Router();

const { connection } = require('../../database/db');



router.post('/create-room', (req, res) => {
    const roomName = req.body.roomName;
    const creatorId = req.body.creatorId;
    const creatorName = req.body.creatorName;
    const roomId = req.body.roomId;

    const checkQuery = 'SELECT * FROM rooms WHERE room_name = ?';
    connection.query(checkQuery, [roomName], (error, results) => {
        if (error) {
            console.error('Une erreur est survenue lors de la vérification du salon :', error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la vérification du salon.' });
        } else if (results.length > 0) {
            res.status(400).json({ message: 'Un salon avec le même nom existe déjà.' });
        } else {
            const insertQuery = 'INSERT INTO rooms (room_name, creator_id, creator_name, room_id) VALUES (?, ?, ?, ?)';
            connection.query(insertQuery, [roomName, creatorId, creatorName, roomId], (error, results) => {
                if (error) {
                    console.error('Une erreur est survenue lors de la création du salon :', error);
                    res.status(500).json({ message: 'Une erreur est survenue lors de la création du salon.' });
                } else {
                    console.log('Salon créé avec succès !');
                    res.status(200).json({ message: 'Salle créée avec succès !' });
                }
            });
        }
    });
});


module.exports = router;
