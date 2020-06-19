const mysqlActions = require('../lib/MySQL');
const authJWT = require('../utils/auth/authJWT');
const bcryptjs = require('bcryptjs');

class UserServices{
    constructor() {
        this.MySQL = new mysqlActions();
    }

    async Register(user, callback) {
        const hashedPassword = await bcryptjs.hash(user.password, 10);
        const newUser = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: hashedPassword,
        }

        this.MySQL.Create('Users', newUser, (userCreated) => {
            callback(userCreated);
        });
    }

    LogIn(user, callback) {
        const { email, password } = user;
        this.MySQL.GetOne('Users', 'email', email, async (user) => {
            if(user.length) {
                if(await bcryptjs.compare(password, user[0].password)) {
                    const payload = {
                        id: user[0].id,
                        name: user[0].username,
                        rol: user[0].rol
                    }

                    authJWT.sign(payload, (token) => {
                        callback(token, 'succes');
                    });
                } else {
                    callback(null, 'wrong password');
                }
            } else {
                callback(null, 'None users');
            }
        })
    }

    GetMyInfo(token, callback) {
        authJWT.verify(token, (decoded) => {
            const { id } = decoded
            this.MySQL.GetOne('contacts', 'user_id', id, (contacts) => {
                callback(contacts, decoded.name);
            })
        });
        
    }

    ReadContacts() {

    }

    CreateContacts(token, data, callback) {
        const { name, lastName, tel, email  } = data;
        authJWT.verify(token, (decoded) => {
            const { id } = decoded;
            const newContact = {
                name,
                lastName,
                tel,
                email,
                user_id: id
            }
            this.MySQL.Create('contacts', newContact, (contact) => {
                callback(contact);
            });
        })
    }

    UpdateContacts() {

    }

    DeleteContacts(id, callback) {
        this.MySQL.Delete('contacts', 'id', id, (contactDelete) => {
            callback(contactDelete);
        });
    }
}

module.exports = UserServices;