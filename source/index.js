const express = require('express');
const server = express()
const {join} = require('path');

//To save data json and use apis from the frontend
const cors = require('cors')
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors())

//SERVER
const {port, start} = require("./modules/server");
server.listen(port, start());

// EJS 
server.set("views", join(__dirname, "./views"));
server.set("view engine", "ejs");

// STATICS
const statics = require("./modules/static");
server.use(statics(join(__dirname, "../public")));

//ROUTES
server.use('/pacman', (require('./routes/pacman.routes')))
server.use('/pacman/api', (require('./routes/api/score.api.routes')))