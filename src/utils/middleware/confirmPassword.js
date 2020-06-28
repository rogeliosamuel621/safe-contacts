const express = require('express');
const confirmPassword = express.Router();

confirmPassword.use((req, res, next) => {
    const { password, confirmPassword } = req.body;
    if(password === confirmPassword) {
        next();
    } else {
        res.render('signUp', { message: 'Las contraseñas deben de coincidir' });
    }
});

module.exports = confirmPassword;