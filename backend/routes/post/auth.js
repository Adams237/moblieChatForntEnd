const express = require('express');
const router = express.Router();
const User = require('../../models/User'); // Assurez-vous d'avoir un modèle User configuré avec Mongoose

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Créer un nouvel utilisateur dans MongoDB
    const newUser = await User.create({ username, password });
    console.log('User registered successfully.');
    
    // Répondre avec l'utilisateur nouvellement enregistré
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user.');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Rechercher l'utilisateur dans MongoDB par nom d'utilisateur
    const user = await User.findOne({ username });
    
    if (user) {
      // Vérifier si le mot de passe correspond
      if (user.password === password) {
        const connected = { id: user._id, username: user.username };
        console.log(connected);
        res.status(200).json(connected);
      } else {
        res.status(401).send('Incorrect password.');
      }
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user.');
  }
});

module.exports = router;
