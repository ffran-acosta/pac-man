const express = require('express');
const server = express()
const {join} = require('path');

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