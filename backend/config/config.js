
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express')
function configureApp(app) {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname));
}

module.exports = { configureApp };
