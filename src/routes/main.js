const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    res.render('main')
});

router.get('/signUp', (req, res) => {
    res.render('signUp');
});

router.post('/signUp', (req, res) => {
    
    const newUser = req.body;

    userService.Register(newUser, (userCreated) => {
        res.redirect('/SignIn');
    });
});

router.get('/signIn', (req, res) => {
    res.render('signIn')
});

router.post('/signIn', (req, res) => {
    const user = req.body;

    userService.LogIn(user, (token, message) => {
        console.log(message)
        res.cookie('token', token, {
            // maxAge: 900000
        });
        res.redirect('/profile')
    });
});

module.exports = router;