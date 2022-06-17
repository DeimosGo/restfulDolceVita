const Joi = require('joi');

const idDetalle = Joi.number().positive();
const cantidad = Joi.number().positive().min(1);
const idComprobante = Joi.number().positive();
const idProducto = Joi.number().positive();

const createDetalleComprobante = Joi.object({
    cantidad: cantidad.required(),
    idComprobante: idComprobante.required(),
    idProducto: idProducto.required()
});

const updateDetalleComprobante = Joi.object({
    cantidad: cantidad,
    idComprobante: idComprobante,
    idProducto: idProducto
});

const getDetalleComprobante = Joi.object({
    idDetalle: idDetalle.required()
});

module.exports = { createDetalleComprobante, updateDetalleComprobante, getDetalleComprobante };
