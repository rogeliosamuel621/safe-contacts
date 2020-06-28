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
                    callback(null, 'el email o la contraseña son incorrectos');
                }
            } else {
                callback(null, 'el email o la contraseña son incorrectos');
            }
        })
    }

    GetMyInfo(id, table, condition, callback) {

        this.MySQL.GetOne(table, condition, id, (myInfo) => {
            callback(myInfo);
        });
        
    }

    updateMyInfo(id, data, callback) {
        this.MySQL.Update('users', 'id', data, id, () => {
            callback();
        })
    }

    ReadContacts() {

    }

    CreateContacts(id, data, callback) {
        const { name, lastName, tel, email  } = data;
        const newContact = {
            name,
            lastName,
            tel,
            email,
            user_id: id
        }
        this.MySQL.Create('contacts', newContact, () => {
            callback();
        });
    }

    getContactInfo(contactId, callback) {
        this.MySQL.GetOne('contacts', 'id', contactId, (contact) => {
            callback(contact);
        })
    }

    UpdateContacts(id, Contact, callback) {
        this.MySQL.Update('contacts', 'id', Contact, id, () => {
            callback();
        })
    }

    DeleteContacts(id, callback) {
        this.MySQL.Delete('contacts', 'id', id, (contactDelete) => {
            callback(contactDelete);
        });
    }
}

module.exports = UserServices;