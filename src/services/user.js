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

    ReadContacts() {

    }

    CreateContacts() {

    }

    UpdateContacts() {

    }

    DeleteContacts() {

    }
}

module.exports = UserServices;