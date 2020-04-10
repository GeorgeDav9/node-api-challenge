// Express import
const express = require('express');
// Router import
const projectRouter = require('./data/helpers/projectRouter');
const actionRouter = require('./data/helpers/actionRouter');
// Set server with express
const server = express();

// Middleware
server.use(express.json());
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

// Routes
server.get('/', (req, res) => {
  res.send(`What it do baaabyyyyy?`);
});

// Server export
module.exports = server;