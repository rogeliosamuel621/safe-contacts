const express = require('express');
const router = express.Router();
const UserServices = require('../services/user');
const saveRoutes = require('../utils/middleware/saveRoutes');
const { route } = require('../utils/middleware/saveRoutes');
const userService = new UserServices();

//Profile
router.get('/', saveRoutes, (req, res) => {
    const { id } = req.decoded;
    const { name } = req.decoded;
    userService.GetMyInfo(id, 'contacts', 'user_id', (contacts) => {
        res.render('profile', { data: contacts, name: name});
    });
});

//Add a contact
router.get('/addContact', saveRoutes, (req, res) => {
    res.render('addContact');
});
router.post('/addContact', saveRoutes, (req, res) => {
    const contact = req.body;
    const { id } = req.decoded;
    userService.CreateContacts(id, contact, () => {
        res.redirect('/profile');
    });
});

//Delete a contact
router.get('/delete/:contactId', saveRoutes, (req, res) => {
    const { contactId } = req.params;
    userService.DeleteContacts(contactId, () => {
        res.redirect('/profile');
    })
});

//edit a contact
router.get('/edit/:contactId', saveRoutes, (req, res) => {
    const { contactId } = req.params;
    userService.getContactInfo(contactId, (contact) => {
        res.render('edit', { data: contact });
    });
});
router.post('/edit/:contactId', saveRoutes, (req, res) => {
    const { contactId } = req.params;
    const contact = req.body;
    userService.UpdateContacts(contactId, contact, () => {
        res.redirect('/profile');
    });
});


//edit my Profile
router.get('/editMyProfile', saveRoutes, (req, res) => {
    const { id } = req.decoded;
    userService.GetMyInfo(id, 'users', 'id', (myInfo) => {
        res.render('editProfile', { data: myInfo });
    });
});
router.post('/editMyProfile', saveRoutes, (req, res) => {
    const data = req.body;
    const { id } = req.decoded;
    userService.updateMyInfo(id, data, () => {
        res.redirect('/profile');
    });
});
module.exports = router;