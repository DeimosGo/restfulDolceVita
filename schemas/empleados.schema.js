const Joi = require('joi').extend(require('@joi/date'));

const idEmpleado = Joi.number().positive().integer();
const nombres = Joi.string().min(2).max(100);
const apellidos = Joi.string().min(2).max(100);
const telefono = Joi.string().length(9);
const fechaNacimiento = Joi.date().format('YYYY-MM-DD').utc();
const email = Joi.string().email();
const password = Joi.string().min(12);
const activo = Joi.boolean();
const idRol = Joi.number().positive().integer();
const deleted = Joi.boolean();
const sesion = Joi.boolean();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createEmpleadoSchema = Joi.object({
    nombres: nombres.required(),
    apellidos: apellidos.required(),
    telefono: telefono.required(),
    fechaNacimiento: fechaNacimiento.required(),
    email: email.required(),
    password: password.required(),
    activo: activo.required(),
    idRol: idRol.required(),
    deleted: deleted,
    sesion: sesion
});

const updateEmpleadoSchema = Joi.object({
    nombres: nombres,
    apellidos: apellidos,
    telefono: telefono,
    fechaNacimiento: fechaNacimiento,
    email: email,
    password: password,
    activo: activo,
    idRol: idRol,
    deleted: deleted,
    sesion:sesion
});

const getEmpleadoSchema = Joi.object({
    idEmpleado: idEmpleado.required()
});

const queryEmpleadoSchema = Joi.object({
    limit,
    offset
});


module.exports = {createEmpleadoSchema, updateEmpleadoSchema, getEmpleadoSchema, queryEmpleadoSchema };
