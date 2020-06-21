const auth = require('../auth/authJWT');
const express = require('express');
const saveRoutes = express.Router();

saveRoutes.use((req, res, next) => {
    const { token } = req.cookies;

    if(token) {
        next();
    } else {
        res.redirect('/');
    }
});