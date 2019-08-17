const express = require('express');
const helmet = require('helmet');
const server = express();

const projectsRouter = require('./routers/projectsRouter.js');
const tasksRouter = require('./routers/tasksRouter.js');

server.use(helmet());
server.use(express.json());

//Applying routes
server.use('/api/projects', projectsRouter);
server.use('/api/actions', tasksRouter);

server.get('/', (req, res) => {
    res.send('<h3>SERVER IS ALIVE!!!</h3>');
});

module.exports = server;