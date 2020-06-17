const express = require('express');
const path = require('path')
const exhbs = require('express-handlebars');
const { port } = require('./config');

const app = express();

//SETINGS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'styles')));

//MIDDLEWARES
app.use(express.json());

//ROUTES
const userRoutes = require('./routes/main');
app.use('/', userRoutes)

//SERVER
app.listen(port, (req, res) => {
    console.log('server on http://localhost:3000');
});