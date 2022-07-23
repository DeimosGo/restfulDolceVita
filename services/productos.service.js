const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class ProductoService {

    constructor() {
        this.products = [];
    }
    async count(){
        const cantidad = await models.Productos.count({
            where:{
                deleted: false
            }
    });
        return cantidad;
    }
    async create(body) {
        await models.Productos.create(body);
        return true
    };
    async find(query){
        const { limit, offset } = query;
        const options = {
            where:{
                deleted: false
            },
        };
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Productos.findAll(options);
        return rta;
    };

    async findChart(query){
        const { limit, offset } = query;
        const options = {
            where:{
                deleted: false
            },
            order: [
                ['cantidadVentas', 'DESC'],
            ]
        };
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Productos.findAll(options);
        return rta;
    };

    async findForVenta(){
        const options = {
            where:{
            deleted: false,
            'stock':{
                [Op.gt] : 0
            }
        },
        order: [
            ['cantidadVentas', 'DESC'],
        ],
    };
            options.limit = 5;
            options.offset = 0;
        const rta = await models.Productos.findAll(options);
        return rta;
    };
    async findNameVenta(name){
        const options = {
            where:{
            deleted: false,
            'stock':{
                [Op.gt] : 0
            },
            "nombreProducto": {
                [Op.like]: `%${name.toUpperCase()}%`
            }
        }};
        const rta = await models.Productos.findAll(options);
        if (rta.length <= 0) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    };
    async findName(name){
        const nameProducto = name;
        const rta = await models.Productos.findAll({
            where: {
                deleted: false,
                "nombreProducto": {
                    [Op.like]: `%${nameProducto.toUpperCase()}%`
                }
            }
        });
        return rta;
    };

    async findCategoria(id){
        const idCategoria = id;
        const rta = await models.Productos.findAll({
            where: {
                "idCategoria": idCategoria,
                deleted: false
            }
        });
        return rta;
    };
    async findOne(id){
        const data = await models.Productos.findByPk(id,{
            where:{
                deleted: false
            }
        });
        if (!data) {
            throw boom.notFound('Producto no encontrado');
        }
        return data;
    };
    async update(id, body){
        const data = await models.Productos.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let  condition = { where: { id_producto: id } };
            await models.Productos.update(body, condition);
            return true;
        };
    };
    async delete(id){
        const data = await models.Productos.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let  condition = { where: { id_producto: id } };
            await models.Productos.update({deleted: true}, condition);
            return true;
        }
    };
}

module.exports = ProductoService;
