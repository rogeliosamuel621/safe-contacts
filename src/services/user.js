const mysqlActions = require('../lib/MySQL');
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
            password: hashedPassword
        }

        this.MySQL.Create('Users', newUser, (userCreated) => {
            callback(userCreated);
        });
    }

    LogIn() {

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