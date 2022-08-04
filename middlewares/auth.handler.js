const boom = require('@hapi/boom');
const {config} = require('../config/config');

const checkApiKey = (request, response, next) => {
    const apiKey = request.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
};

const checkRoles = (roles) => {
    return (request, response, next) => {
        const user = request.user;
        if (roles.includes(user.rol)) {
            next();
        } else {
            next(boom.forbidden())
        }
    }
};
module.exports = {
    checkApiKey,
    checkRoles
};
