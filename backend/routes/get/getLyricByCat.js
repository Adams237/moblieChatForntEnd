const express = require('express');
const router = express.Router();
const { connection } = require('../../database/db');
const path = require('path');



router.get('/lyrics/:category', (req, res) => {
  const category = req.params.category;
  connection.query('SELECT * FROM lyric WHERE categori = ?', category, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
    console.log(results)
  });
});

module.exports = router;
