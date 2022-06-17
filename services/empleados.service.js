const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class EmpleadosService {
    constructor(){};
    async create(body){
        const hash = await bcrypt.hash(body.password, 12);
        await models.Empleados.create({
            ...body,
            password: hash
        });
        return true;
    };

    async find(query){
        const { limit, offset } = query;
        const options = {};
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Empleados.findAll(options);
        return rta;
    };
    async findOne(id){
        const rta = await models.Empleados.findByPk(id, {
            include: ['ventas']
        });
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    };
    async findEmail(email){
        const rta = await models.Empleados.findOne({
            where: {
                email: email
            }
        });
            return rta;
    };
    async update(id, body){
        const data = await models.Empleados.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: {id_empleado: id} };
            await models.Empleados.update(body, condition);
            return true;
        };
    }
    async delete(id){
        const data = await models.Empleados.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            data.destroy(data);
            return true;
        }
    }
}
module.exports=EmpleadosService;
