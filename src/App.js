const express = require('express');
const path = require('path');
const { port } = require('./config');

const app = express();

//SETINGS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTES
const userRoutes = require('./routes/main');
app.use('/', userRoutes)

//SERVER
app.listen(port, (req, res) => {
    console.log('server on http://localhost:3000');
});