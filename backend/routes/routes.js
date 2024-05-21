const auth = require('./post/auth');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
require('../config/config')
const userRoutes = require('./post/auth')
const lyricRoutes = require('./get/getLyrics');
const createRoomRoutes = require('./post/createRoom')
const roomsApi = require('./get/getRooms')
const roomByIdApi = require('./get/getRoomById')
const lyricByCatApi = require('./get/getLyricByCat')
const chapitreApi = require('./get/getChapitre')
const joinRoomApi = require('./post/joinRoom')
const deleteRoomApi = require('./delete/deleteRoom')
function routes(app, connection, io) {
    app.use(bodyParser.json());




    //API pour récupérer les données
   app.use('/lyric', lyricRoutes);
   app.use('/', roomsApi);
   app.use('/', roomByIdApi);
   app.use('/', lyricByCatApi);
    app.use('/', lyricByCatApi);
   app.use('/', chapitreApi);
    app.use('/', joinRoomApi);


   //API pour insérer les données 
   app.use('/api/users', userRoutes);
     app.use('/api', createRoomRoutes);

  //API pour supprimer lesdonnées
   app.use('/', deleteRoomApi)

}

module.exports = { routes };
