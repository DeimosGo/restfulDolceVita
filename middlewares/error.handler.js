const { ValidationError } = require("sequelize");

const boomErrorHandler = (error, request, response, next) => {
    if (error.isBoom) {
        const {output} = error;
        response.status(output.statusCode).json(output.payload);
    } else {
        next(error);
    }
}
const errorHandler = (error, request, response, next) => {
    response.status(500).json({
        message: error.message,
        stack: error.stack,
    });
};

const ormErrorHandler = (error, request, response, next) =>{
    if (error instanceof ValidationError) {
        response.status(409).json({
            statuscode: 409,
            message: error.name,
            error: error.errors
        });
    }
    next(error);
};

module.exports = { boomErrorHandler, errorHandler, ormErrorHandler };
