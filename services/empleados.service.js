const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Op = sequelize.Op;

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

    async count(){
        const cantidad = await models.Empleados.count({
            where:{
                deleted: false
            }
    });
        return cantidad;
    }

    async find(query){
        const { limit, offset } = query;
        const options = {where:{
            deleted: false
        }};
        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }
        const rta = await models.Empleados.findAll(options);
        return rta;
    };
    async findOne(id){
        const rta = await models.Empleados.findByPk(id, {
            where:{
                deleted: false
            },
            include: ['ventas']
        });
        if (!rta) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            return rta;
        };
    };
    async findName(name){
        const nameEmpleado = name;
        const rta = await models.Empleados.findAll({
            where: {
                deleted: false,
                "nombres": {
                    [Op.like]: `%${nameEmpleado.toUpperCase()}%`
                }
            }
        });
        return rta;
    };
    async findEmail(email){
        const rta = await models.Empleados.findOne({
            where: {
                email: email,
                deleted: false
            }
        });
            return rta;
    };
    async update(id, body){
        const data = await models.Empleados.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let bodyUpdate ={}
            if (body.password) {
                const hash = await bcrypt.hash(body.password, 12);
                bodyUpdate ={
                    ...body,
                    password: hash
                };
            }else {
                bodyUpdate={
                    ...body,
                };
            }
            let condition = { where: {id_empleado: id} };
            await models.Empleados.update(bodyUpdate, condition);
            return true;
        };
    }
    async delete(id){
        const data = await models.Empleados.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: {id_empleado: id} };
            await models.Empleados.update({deleted: true}, condition);
            return true;
        }
    }
    async changeSesion(id){
        const data = await models.Empleados.findByPk(id);
        if (!data) {
            throw boom.notFound('Elemento no encontrado');
        } else {
            let condition = { where: {id_empleado: id} };
            await models.Empleados.update({sesion: !data.sesion}, condition);
            return !data.sesion;
        }
    }
}
module.exports=EmpleadosService;
