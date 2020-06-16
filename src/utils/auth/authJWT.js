const jwt = require('jsonwebtoken');
const { secret_token } = require('../../config');

const authJWT = {
    sign(payload, callback) {
        jwt.sign(payload, secret_token, { expiresIn: '15m' }, (err, token) => {
            if(err) {
                return console.log(err)
            }

            callback(token);
        })
    },  

    verify(token, callback) {
        jwt.verify(token, secret_token, (err, decoded) => {
            if(err) {
                return console.log(err);
            }

            callback(decoded)
        })
    }
}

module.exports = authJWT;