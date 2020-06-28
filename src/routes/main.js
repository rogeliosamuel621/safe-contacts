const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const schema = require('../utils/middleware/shema');
const verifyUsers = require('../utils/middleware/verifyUsers');
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/signUp', (req, res) => {
    res.render('signUp', { message: null });
});

router.post('/signUp', verifyUsers, (req, res) => {
    
    const newUser = req.body;

    userService.Register(newUser, (userCreated) => {
        res.redirect('/SignIn');
    });
});

router.get('/signIn', (req, res) => {
    res.render('signIn', { message: null });
});

router.post('/signIn', [body('email').isEmail()], schema, (req, res) => {
    const user = req.body;

    userService.LogIn(user, (token, message) => {
        if(!token) {
            res.render('signIn', { message: message });
            return
        }
        console.log(message)
        res.cookie('token', token, {
            // maxAge: 900000
        });
        res.redirect('/profile');
    });
});

module.exports = router;