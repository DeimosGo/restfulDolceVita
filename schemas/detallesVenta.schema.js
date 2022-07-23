const Joi = require('joi');

const idDetalleVenta = Joi.number().positive().integer();
const cantidad = Joi.number().positive().integer().min(1).max(99999);
const idVenta = Joi.number().positive().integer();
const idProducto = Joi.number().positive().integer();

const createDetallesVentaSchema = Joi.object({
    cantidad: cantidad.required(),
    idVenta: idVenta.required(),
    idProducto: idProducto.required()
});
const updateDetallesVentaSchema = Joi.object({
    cantidad: cantidad,
    idVenta: idVenta,
    idProducto: idProducto
});
const getDetallesVentaSchema = Joi.object({
    idDetalleVenta: idDetalleVenta.required(),
});

module.exports = { createDetallesVentaSchema, updateDetallesVentaSchema, getDetallesVentaSchema };
