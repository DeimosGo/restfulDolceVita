const Joi = require('joi');

const idRol = Joi.number().positive().integer();
const nombreRol = Joi.string().min(3).max(78);
const descripcion = Joi.string();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createRol = Joi.object({
    nombreRol: nombreRol.required(),
    descripcion: descripcion.required()
});

const updateRol = Joi.object({
    nombreRol: nombreRol,
    descripcion: descripcion
});

const getRol = Joi.object({
    idRol: idRol.required()
});

const queryRolSchema = Joi.object({
    limit,
    offset
});

module.exports = { createRol, updateRol, getRol, queryRolSchema };
