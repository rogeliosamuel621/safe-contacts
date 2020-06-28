const express = require('express');
const verifyUsers = express.Router();
const MySQL = require('../../lib/MySQL');
const MySQLActions = new MySQL();

verifyUsers.use((req, res, next) => {
    const { email } = req.body;
    MySQLActions.GetMany('users', 'email', email, (users) => {
        if(users.length > 0) {
            res.render('signUp', { message: 'Ya hay una cuenta asociada a ese email' });
        } else if(!users.length) {
            next();
        }
    });
});

module.exports = verifyUsers;