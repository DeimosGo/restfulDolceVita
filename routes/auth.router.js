const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const router = express.Router();


router.post('/login',
passport.authenticate('local', {session: false}),
async (request, response, next) =>{
    try {
        const usuario = request.user;
        let = payload = {
            sub: usuario.id,
            rol:usuario.idRol
        };
        const token = jwt.sign(payload, config.jwtSecret);
        response.status(200).json({
            usuario,
            token
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
