const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ClientesService {
    constructor(){};
    async create(body){
        await models.Clientes.create(body);
        return true;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {};
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Clientes.findAll(options);
        return rta;
    }
    async findOne(id){
        const rta = await models.Clientes.findByPk(id);
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    }
    async update(id, body){
        const data = await models.Clientes.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: { dni_cliente: id } };
            await models.Clientes.update(body, condition);
            return true;
        };
    }
    async delete(id){
        const data = await models.Clientes.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            data.destroy(data);
            return true;
        }
    }
};

module.exports = ClientesService;
