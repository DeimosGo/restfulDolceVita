const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class ProductoService {

    constructor() {
        this.products = [];
    }
    async count(){
        const cantidad = await models.Productos.count();
        return cantidad;
    }
    async create(body) {
        await models.Productos.create(body);
        return true
    };
    async find(query){
        const { limit, offset } = query;
        const options = {};
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Productos.findAll(options);
        return rta;
    };
    async findName(name){
        const nameProducto = name;
        console.log(nameProducto);
        const rta = await models.Productos.findAll({
            where: {
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
            }
        });
        return rta;
    };
    async findOne(id){
        const data = await models.Productos.findByPk(id);
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
            data.destroy(data);
            return true;
        }
    };
}

module.exports = ProductoService;
