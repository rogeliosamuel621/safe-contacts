const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    const { token } = req.cookies;
    userService.GetMyInfo(token, (user) => {
        res.render('profile', { data: user });
    });
});

router.post('/AddContact', (req, res) => {
    const contact = req.body;
    const { token } = req.cookies;
    userService.CreateContacts(token, contact, (contactCreated)=> {
        res.send(contactCreated);
    });
})

module.exports = router;