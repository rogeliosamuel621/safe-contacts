const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    res.render('main')
});

router.get('/signUp', (req, res) => {
    res.render('signUp');
})

router.post('/signUp', (req, res) => {
    console.log(req.body)
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