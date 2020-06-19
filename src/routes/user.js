const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    const { token } = req.cookies;
    userService.GetMyInfo(token, (contacts, name) => {
        console.log(contacts, name)
        res.render('profile', { data: contacts, name: name});
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