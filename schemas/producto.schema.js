const Joi = require('joi');

const id = Joi.number().min(1).max(999999);
const nombre_producto =Joi.string().uppercase().min(2).max(74);
const descripcion = Joi.string().uppercase().min(2).max(100);
const precio = Joi.number().precision(2);
const stock = Joi.number().min(0).max(9999);
const cantidad_ventas = Joi.number().min(0).max(99999);
const id_categoria = Joi.number().min(0).max(999999);
const limit = Joi.number().positive().integer();
const offset = Joi.number().positive().integer();

const createProductoSchema = Joi.object({
    nombreProducto: nombre_producto.required(),
    descripcionProducto: descripcion.required(),
    precio: precio.required(),
    stock: stock.required(),
    cantidadVentas: cantidad_ventas.required(),
    idCategoria: id_categoria.required(),
});

const updateProductoSchema = Joi.object({
    nombreProducto: nombre_producto,
    descripcionProducto: descripcion,
    precio: precio,
    stock: stock,
    cantidadVentas: cantidad_ventas,
    idCategoria: id_categoria,
});

const getProductoSchema = Joi.object({
    id:id.required(),
});

const getNameProductoSchema = Joi.object({
    nombreProducto:nombre_producto.required(),
});

const getProductoCategoriaSchema = Joi.object({
    idCategoria: id_categoria.required(),
});

const queryProductoSchema = Joi.object({
    limit,
    offset
});

module.exports = { createProductoSchema, updateProductoSchema, getProductoSchema, queryProductoSchema, getNameProductoSchema, getProductoCategoriaSchema };
