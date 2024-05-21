// roomsApi.js
const express = require('express');
const { connection } = require('../../database/db');

const router = express.Router();


router.post('/recu', (req, res) => {
    const id = req.body.lyricId;

    // Requête pour récupérer les chambres en fonction de l'ID du lyric
    const queryChapitre = 'SELECT * FROM chapitre WHERE lyric_id = ?';
    connection.query(queryChapitre, [id], (error, resultsChapitre) => {
        if (error) {
            console.error(error);
            res.send('Une erreur est survenue.');
        } else {
            // Vérifie s'il y a des résultats pour la requête chapitre
            if (resultsChapitre.length > 0) {
                // Requête pour récupérer les informations du lyric
                const queryLyric = 'SELECT * FROM lyric WHERE id = ?';
                connection.query(queryLyric, [id], (error, resultsLyric) => {
                    if (error) {
                        console.error(error);
                        res.send('Une erreur est survenue lors de la récupération du lyric.');
                    } else {
                        // Vérifie s'il y a des résultats pour la requête lyric
                        if (resultsLyric.length > 0) {
                            // Fusionnez les résultats de la requête chapitre et lyric
                            const mergedResults = { chapitre: resultsChapitre, lyric: resultsLyric };
                            res.json(mergedResults);
                        } else {
                            res.send('Aucun lyric trouvé pour cet ID.');
                        }
                    }
                });
            } else {
                res.send('Aucune chambre trouvée pour cet ID de lyric.');
            }
        }
    });
});



 
module.exports = router;
