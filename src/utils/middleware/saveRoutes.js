const mysqlActions = require('../../lib/MySQL');
const MySQL = new mysqlActions();
const express = require('express');
const authJWT = require('../auth/authJWT');
const saveRoutes = express.Router();

saveRoutes.use((req, res, next) => {
    const { token } = req.cookies;

    if(token) {

        authJWT.verify(token, (decoded) => {
            MySQL.GetOne('users', 'id', decoded.id, (user) => {
                if(user.length === 1) {
                    req.decoded = decoded;
                    next();
                } else {
                    res.redirect('/');
                }
            });
        });
    } else {
        res.redirect('/');
    }
});

module.exports = saveRoutes;