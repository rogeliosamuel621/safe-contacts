const express = require('express');
const { validationResult } = require('express-validator');
const schema = express.Router();

schema.use((req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log('err');
        return res.status(422).json({erorrs: errors.array() });
    }

    req.user = {
        email: req.body.email,
        password: req.body.password
    }
    next();
});

module.exports = schema;