const express = require('express');
const helmet = require('helmet');
const server = express();

const projectsRouter = require('./routers/projectsRouter.js');
const tasksRouter = require('./routers/tasksRouter.js');
const resourcesRouter = require('./routers/resourcesRouter.js');

server.use(helmet());
server.use(express.json());

//Applying routes
server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);
server.use('/api/resources',resourcesRouter);

server.get('/', (req, res) => {
    res.send('<h3>SERVER IS ALIVE!!!</h3>');
});

module.exports = server;