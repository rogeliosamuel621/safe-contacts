const express = require('express');
const { validationResult } = require('express-validator');
const schema = express.Router();

schema.use((req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log('err in schema', errors.array);
        res.render('signIn', { message: 'El formato de los datos no es el correcto' });
        return
    }

    req.user = {
        email: req.body.email,
        password: req.body.password
    }
    next();
});

module.exports = schema;