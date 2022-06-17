const express = require('express');
const EmpleadosService = require('../services/empleados.service');
const { createEmpleadoSchema, updateEmpleadoSchema, getEmpleadoSchema, queryEmpleadoSchema } = require('../schemas/empleados.schema');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new EmpleadosService();

router.get('/', checkRoles([1]),
validatorHandler(queryEmpleadoSchema, 'query'),
async (request, response, next) =>{
    try {
        const ventas = await service.find(request.query);
        response.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', checkRoles([1]),
validatorHandler(getEmpleadoSchema, 'params'),
async (request, response, next) =>{
    try {
        const {id} = request.params;
        const respuesta = await service.findOne(id);
        response.status(200).json(respuesta);
    } catch (error) {
        next(error);
    };
});

router.post('/', checkRoles([1]),
validatorHandler(createEmpleadoSchema, 'body'),
async (request, response, next) => {
    try {
        const body = request.body;
        const rta = await service.create(body);
        response.status(201).json({created:rta});
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', checkRoles([1]),
validatorHandler(getEmpleadoSchema, 'params'),
validatorHandler(updateEmpleadoSchema, 'body'),
async (request, response, next) =>{
    try {
        const {id} = request.params;
        const body = request.body;
        const respuesta = await service.update(id, body);
        response.status(200).json({updated: respuesta});
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', checkRoles([1]),
validatorHandler(getEmpleadoSchema, 'params'),
async (request,response, next)=>{
    try {
        const {id} = request.params;
        const res = await service.delete(id);
        response.status(200).json({ deleted : res });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
