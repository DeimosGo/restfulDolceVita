const Joi = require('joi').extend(require('@joi/date'));
const idVenta = Joi.number().positive().integer();
const precioTotal = Joi.number().positive();
const fecha = Joi.date().format('YYYY-MM-DD').utc();
const idEmpleado = Joi.number().positive();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createVentaSchema = Joi.object({
    precioTotal: precioTotal.required(),
    fecha: fecha.required(),
    idEmpleado: idEmpleado.required()
});

const updateVentaSchema = Joi.object({
    precioTotal: precioTotal,
    fecha: fecha,
    idEmpleado: idEmpleado
});

const getVentaSchema = Joi.object({
    idVenta: idVenta.required()
});

const queryVentaSchema = Joi.object({
    limit,
    offset
});

module.exports = { createVentaSchema, updateVentaSchema, getVentaSchema ,queryVentaSchema };
