const Joi = require('joi').extend(require('@joi/date'));

const idComprobante = Joi.number().positive().integer();
const dniCliente = Joi.number().min(11111111).max(99999999);
const nombreCliente = Joi.string().min(3).max(200);
const fecha = Joi.date().format('YYYY-MM-DD').utc();
const totalVenta = Joi.number().positive();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createComprobante = Joi.object({
    dniCliente: dniCliente.required(),
    nombreCliente: nombreCliente.required(),
    fecha: fecha.required(),
    totalVenta: totalVenta.required()
});

const updateComprobante = Joi.object({
    idComprobante: idComprobante,
    dniCliente: dniCliente,
    nombreCliente: nombreCliente,
    fecha: fecha,
    totalVenta: totalVenta
});

const getComprobante = Joi.object({
    idComprobante: idComprobante.required()
});

const queryComprobanteSchema = Joi.object({
    limit,
    offset
});

module.exports = { createComprobante, updateComprobante, getComprobante, queryComprobanteSchema };
