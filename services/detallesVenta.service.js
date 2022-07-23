const boom = require('@hapi/boom');
const {
    models
} = require('../libs/sequelize');

class DetallesVentaService {
    constructor() {};
    async create(body) {
        await models.detallesVenta.create(body);
        return true;
    }
    async find() {
        return models.detallesVenta.findAll();
    }
    async findOne(id) {
        const rta = await models.detallesVenta.findByPk(id);
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    };
    async findDetalles(idVenta) {
        const rta = await models.detallesVenta.sequelize.query(`SELECT * from list_detalles_venta(:id);`, {
            replacements: {
                id: idVenta,
            }
        });
        if (rta[0].length <= 0) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta[0];
        }
    };
    async update(id, body) {
        const data = models.detallesVenta.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = {
                where: {
                    id_detalle: id
                }
            };
            await models.detallesVenta.update(body, condition);
        };
    };
    async delete(id) {
        const rta = await models.detallesVenta.findByPk(id);
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return true;
        };
    };
};

module.exports = DetallesVentaService;
