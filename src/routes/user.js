const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const userService = new UserServices();

router.get('/', (req, res) => {
    const { token } = req.cookies;
    userService.GetMyInfo(token, (contacts, name) => {
        res.render('profile', { data: contacts, name: name});
    });
});

router.get('/addContact', (req, res) => {
    res.render('addContact')
})
router.post('/addContact', (req, res) => {
    const contact = req.body;
    const { token } = req.cookies;
    userService.CreateContacts(token, contact, (contactCreated)=> {
        res.redirect('/profile')
    });
});

router.get('/delete/:contactId', (req, res) => {
    const { contactId } = req.params;
    userService.DeleteContacts(contactId, () => {
        res.redirect('/profile');
    })
});

module.exports = router;