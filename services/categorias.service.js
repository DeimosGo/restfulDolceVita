const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const sequelize = require('sequelize');
const Op = sequelize.Op;

class  CategoriasService {
    constructor() {};
    async create(body){
        await models.Categorias.create(body);
        return true;
    };

    async count(){
        const cantidad = await models.Categorias.count({
            where:{
            deleted: false
        }
    });
        return cantidad;
    }

    async findName(name){
        const nameCategoria = name;
        const rta = await models.Categorias.findAll({
            where: {
                deleted: false,
                "nombreCategoria": {
                    [Op.like]: `%${nameCategoria.toUpperCase()}%`
                }
            }
        });
        return rta;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {where:{
            deleted: false,
        }}
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Categorias.findAll(options);
        return rta;

    };
    async findOne(id){
        const data = await models.Categorias.findByPk(id, {
            where:{
                deleted: false
            },
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
            let condition = { where :{id_categoria: id} };
            await models.Categorias.update(body, condition);
            return true;
        }
    };
    async delete(id){
        const data = await models.Categorias.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where :{id_categoria: id} };
            await models.Categorias.update({deleted: true}, condition);
            return true;
        }
    };
};

module.exports = CategoriasService;
