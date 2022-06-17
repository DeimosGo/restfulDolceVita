const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class RolesService {
    constructor(){};
    async create(body){
        await models.Roles.create(body);
        return true;
    }
    async find(query){
        const { limit, offset } = query;
        const options = {};
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        };
        const rta = await models.Roles.findAll(options);
        return rta;
    }
    async findOne(id){
        const rta = await models.Roles.findByPk(id, {
            include: ['empleados']
        });
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    }
    async update(id, body){
        const data = await models.Roles.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let  condition = { where: { id_rol: id } };
            await models.Roles.update(body, condition);
            return true;
        };
    }
    async delete(id){
        const data = await models.Roles.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            data.destroy(data);
            return true;
        }
    }
};

module.exports= RolesService;
