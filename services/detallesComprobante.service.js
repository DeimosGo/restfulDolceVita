const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class DetallesComprobantesService {
    constructor(){};
    async create(body){
        await models.DetallesComprobante.create(body);
        return true;
    };
    async find(){
        const rta = await models.DetallesComprobante.findAll();
        return rta;
    };
    async findOne(id){
        const rta = await models.DetallesComprobante.findByPk(id);
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    };
    async update(id, body){
        const data = await models.DetallesComprobante.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: {id_detalle: id} };
            await models.DetallesComprobante.update(body, condition);
            return true;
        };
    };
    async delete(id){
        const rta = await models.DetallesComprobante.findByPk(id);
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            rta.destroy(rta);
            return true;
        }
    }
};
module.exports = DetallesComprobantesService;
