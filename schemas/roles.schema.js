const Joi = require('joi');

const idRol = Joi.number().positive().integer();
const nombreRol = Joi.string().min(3).max(78);
const descripcion = Joi.string();
const deleted = Joi.boolean();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createRol = Joi.object({
    nombreRol: nombreRol.required(),
    descripcion: descripcion.required(),
    deleted: deleted
});

const updateRol = Joi.object({
    nombreRol: nombreRol,
    descripcion: descripcion,
    deleted: deleted
});

const getRol = Joi.object({
    idRol: idRol.required()
});

const queryRolSchema = Joi.object({
    limit,
    offset
});

module.exports = { createRol, updateRol, getRol, queryRolSchema };
