const {Strategy} = require('passport-local');
const EmpleadosService = require('../../../services/empleados.service');
const boom = require('@hapi/boom');
const verifyPassword = require('../../pass-verify');
const service = new EmpleadosService();

const LocalStrategy = new Strategy({
    usernameField:'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await service.findEmail(email);
        if (!user) {
            throw boom.unauthorized('No autorizado'), false;
        } else if (!user.activo) {
            done(boom.forbidden('No activo'), false);
        }
        else {
            const match = await verifyPassword(password, user.password);
            if (!match) {
                throw boom.unauthorized('No autorizado'), false;
            } else if(user.sesion){
                console.log('Sesion');
                done(boom.locked('sesion'), false);
            }else {
                delete user.dataValues.password;
                service.changeSesion(user.idEmpleado);
                return done(null, user);
            }
        }
    } catch (error) {
        done(error, false);
    };
});

module.exports = LocalStrategy;
