const Joi = require('joi').extend(require('@joi/date'));
const idVenta = Joi.number().positive().integer();
const precioTotal = Joi.number().positive();
const fecha = Joi.date().format('YYYY-MM-DD').utc();
const idEmpleado = Joi.number().positive();
const deleted = Joi.boolean();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();
const dateIn = Joi.date().format('YYYY-MM-DD').utc();
const dateOut = Joi.date().format('YYYY-MM-DD').utc();

const createVentaSchema = Joi.object({
    precioTotal: precioTotal.required(),
    fecha: fecha,
    idEmpleado: idEmpleado.required(),
    deleted: deleted
});

const updateVentaSchema = Joi.object({
    precioTotal: precioTotal,
    fecha: fecha,
    idEmpleado: idEmpleado,
    deleted: deleted
});

const getVentaSchema = Joi.object({
    idVenta: idVenta.required()
});

const rangeVenta = Joi.object({
    dateIn: dateIn.required(),
    dateOut: dateOut.required(),
});

const queryVentaSchema = Joi.object({
    limit,
    offset
});

module.exports = { createVentaSchema, rangeVenta, updateVentaSchema, getVentaSchema ,queryVentaSchema };
