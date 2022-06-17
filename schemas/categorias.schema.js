const Joi = require('joi');

const id = Joi.number().positive().integer();
const nombreCategoria = Joi.string().min(2).max(68).uppercase();
const descripcion = Joi.string().min(2).max(100).uppercase();
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createCategoriaSchema = Joi.object({
    nombreCategoria: nombreCategoria.required(),
    descripcion: descripcion.required()
});

const updateCategoriaSchema = Joi.object({
    nombreCategoria: nombreCategoria,
    descripcion: descripcion
});

const getCategoriaSchema = Joi.object({
    id:id.required(),
});

const queryCategoriaSchema = Joi.object({
    limit,
    offset
});

module.exports = { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema, queryCategoriaSchema };
