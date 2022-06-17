const jwt = require('jsonwebtoken');

const secret = 'dolceVita';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjoidmVuZGVkb3IiLCJpYXQiOjE2NTQ1NTg4MjN9.TiApKY2iMQyuC5wQy87qiZbIIagqohns2Y6u4vEiETw';

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
const payload = verifyToken(token, secret);

console.log(payload);
