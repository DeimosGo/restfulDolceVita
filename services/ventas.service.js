const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class VentasService {
    constructor() {};
    async create(body){
        const rta = await models.Ventas.create(body);
        return rta;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {
            where: {deleted: false,}
        }
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Ventas.findAll(options);
        return rta;
    };

    async findMain(query){
        let lmt = 10;
        let oft = 10;
        const { limit, offset } = query;
        if (limit && offset) {
            lmt = limit;
            oft = offset;
        }
        const rta = await models.Ventas.sequelize.query('select * from listventas(:limit, :offset);',
        {
            replacements: {
                limit: lmt, offset: oft,
                }
        });
        if (rta[0].length <= 0) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta[0];
        }
    }

    async findEmpleados(dateIn, dateOut){
        const rta = await models.Ventas.sequelize.query('SELECT * from ventas_empleado(:fechain, :fechaout);',
        {
            replacements: {
                fechain: dateIn, fechaout: dateOut,
                }
        });
        if (rta[0].length <= 0) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta[0];
        }
    }

    async findChart(){
        const rta = await models.Ventas.sequelize.query(`SELECT COUNT(*) AS cantidad, TO_CHAR(date_trunc('month', ventas.fecha), 'MM') AS mes,
        SUM(ventas.precio_total) as total
        FROM ventas
        GROUP BY mes ORDER BY mes DESC LIMIT 6 OFFSET 0;`);
        if (rta[0].length <= 0) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta[0];
        }
    }

    async findRange(dateIn, dateOut){
        const firstDate = dateIn;
        const lastDate = dateOut;
        const rta = await models.Ventas.findAll({
            where: {
                deleted: false,
                "fecha": {
                    [Op.between]: [firstDate, lastDate]
                }
            }
        });
        if (rta.length <= 0) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        }
    };

    async findOne(id){
        const rta = await models.Ventas.findByPk(id, {
            deleted: false,
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
            let condition = { where : { id_venta: id} };
            await models.Ventas.update({deleted: true}, condition);
            return true;
        }
    }
};

module.exports = VentasService;
