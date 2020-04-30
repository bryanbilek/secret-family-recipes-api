const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

//routers go here
const authRouter = require('../auth/authRouter');
const recipesRouter = require('../recipes/recipesRouter');
const restricted = require('../middleware/restricted');


server.use(express.json());
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome To The Secret Family Recipes API!' });
});

//routers.use go here
server.use('/api/auth', authRouter);
server.use('/api/recipes', restricted, recipesRouter);

module.exports = server;