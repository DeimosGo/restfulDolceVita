const jwt = require('jsonwebtoken');

const secret = 'dolceVita';

const payload = {
    sub: 1,
    scope:'vendedor'
}

const signToken = (payload, secret) => {
    return jwt.sign(payload, secret);
};
const token = signToken(payload, secret);

console.log(token);
