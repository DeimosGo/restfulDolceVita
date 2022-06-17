const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => {

    if (property === 'body') {
        return (request, response, next) => {
            const data = request[property];
            const {
                error
            } = schema.validate(data);
            if (error) {
                next(boom.badRequest(error));
            } else {
                next();
            }
        };
    } else {
        return (request, response, next) => {
            const {data} = request[property];
            const {error} = schema.validate(data);
            if (error) {
                next(boom.badRequest(error));
            } else {
                next();
            }
        };
    }
};

module.exports = validatorHandler;
