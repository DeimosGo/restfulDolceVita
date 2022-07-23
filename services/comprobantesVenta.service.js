const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ComprobantesVentaService {
    constructor (){};

    async create(body){
        await models.ComprobantesVentas.create(body);
        return true;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {where:{
            deleted: false,
        }};
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.ComprobantesVentas.findAll(options);
        return rta;
    };

    async findOne(id){
        const rta = await models.ComprobantesVentas.findByPk(id, {
            where:{
                deleted: false
            },
            include: ['detalles_comprobante']
        });
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        }
    };
    async update(id, body){
        const data = await models.ComprobantesVentas.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: { id_comprobante: id } };
            await models.ComprobantesVentas.update(body,condition);
            return true;
        };
    };

    async delete(id){
        const data = await models.ComprobantesVentas.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: { id_comprobante: id } };
            await models.ComprobantesVentas.update({deleted: true},condition);
            return true;
        }
    }

};

module.exports = ComprobantesVentaService;
