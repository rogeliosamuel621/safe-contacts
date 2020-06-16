const express = require('express');
const { port } = require('./config');

const app = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
const userRoutes = require('./routes/user');
app.use('/', userRoutes)

//SERVER
app.listen(port, (req, res) => {
    console.log('server on http://localhost:3000');
});