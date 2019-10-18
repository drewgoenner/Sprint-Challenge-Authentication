const jwt = require('jsonwebtoken');
const thesecret = require('./secrets.js')

module.exports = generateToken;

function generateToken(user) {
    const payload = {
        username: user.username,
        subject: user.id
    };

    const secret = 'the secrets of men are known to few';

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
};