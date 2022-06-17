const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class VentasService {
    constructor() {};
    async create(body){
        await models.Ventas.create(body);
        return true;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {}
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Ventas.findAll(options);
        return rta;
    };

    async findOne(id){
        const rta = await models.Ventas.findByPk(id, {
            include: ['detalles_venta']
        });
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        }
    };

    async update(id, body){
        const data = await models.Ventas.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where : { id_venta: id} };
            await models.Categorias.update(body,condition);
            return true;
        };
    };
    async delete(id){
        const data = await models.Ventas.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            data.destroy(data);
            return true;
        }
    }
};

module.exports = VentasService;
