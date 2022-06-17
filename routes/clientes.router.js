const express = require('express');
const ClientesService = require('../services/clientes.service');
const { createCliente, updateCliente, getCliente, queryClienteSchema } = require('../schemas/cliente.schema');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const router = express.Router();
const service = new ClientesService();

router.get('/',checkRoles([1,2]),
validatorHandler(queryClienteSchema, 'query'),
async (request, response, next) =>{
    try {
        const ventas = await service.find(request.query);
        response.status(200).json(ventas);
    } catch (error) {
        next(error);
    };
    const ventas = await service.find(request.query);
    response.status(200).json(ventas);
});

router.get('/:id', checkRoles([1,2]),
validatorHandler(getCliente, 'params'),
async (request, response, next) =>{
    try {
        const {id} = request.params;
        const respuesta = await service.findOne(id);
        response.status(200).json(respuesta);
    } catch (error) {
        next(error);
    };
});

router.post('/',checkRoles([1]),
validatorHandler(createCliente, 'body'),
async (request, response, next) => {
    try {
        const body = request.body;
        const rta = await service.create(body);
        response.status(201).json({created:rta});
    } catch (error) {
        next(error);
    }
});

router.patch('/:id',checkRoles([1]),
validatorHandler(getCliente, 'params'),
validatorHandler(updateCliente, 'body'),
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

router.delete('/:id',checkRoles([1]),
validatorHandler(getCliente, 'params'),
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
