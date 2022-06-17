const Joi = require('joi');

const dniCliente = Joi.number().positive().integer();
const telefonoCliente = Joi.string().min(7).max(9);
const cantidadCompras =  Joi.number().positive().min(0).max(999);
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createCliente = Joi.object({
    dniCliente: dniCliente.required(),
    telefonoCliente: telefonoCliente.required(),
    cantidadCompras: cantidadCompras.required()
});

const updateCliente = Joi.object({
    telefonoCliente: telefonoCliente,
    cantidadCompras: cantidadCompras
});

const getCliente = Joi.object({
    dniCliente: dniCliente.required()
});

const queryClienteSchema = Joi.object({
    limit,
    offset
});

module.exports = { createCliente, updateCliente, getCliente, queryClienteSchema };
