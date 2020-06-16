const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.post('/signIn', (req, res) => {
    const newUser = req.body;

    userService.Register(newUser, (userCreated) => {
        res.status(200).json({
            message: 'you are registred',
            data: userCreated
        });
    });
});

router.post('/logIn', (req, res) => {
    const user = req.body;

    userService.LogIn(user, (token, message) => {
        res.status(200).json({
            token: token,
            message: message
        });
    });
});

module.exports = router;