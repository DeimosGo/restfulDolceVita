const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class  CategoriasService {
    constructor() {};
    async create(body){
        await models.Categorias.create(body);
        return true;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {}
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Categorias.findAll(options);
        return rta;

    };
    async findOne(id){
        const data = await models.Categorias.findByPk(id, {
            include: 'productos'
        });
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        }
        return data;
    };
    async update (id, body){
        const data = await models.Categorias.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            var condition = { where :{id_categoria: id} };
            await models.Categorias.update(body, condition);
            return true;
        }
    };
    async delete(id){
        const data = await models.Categorias.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            data.destroy(data);
            return true;
        }
    };
};

module.exports = CategoriasService;
