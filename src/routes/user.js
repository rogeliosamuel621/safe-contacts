const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    const { token } = req.cookies;
    userService.GetMyInfo(token, (user) => {
        res.render('profile', { data: user });
    })
});

module.exports = router;