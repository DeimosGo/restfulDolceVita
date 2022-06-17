const express = require('express');
const RolesService = require('../services/roles.service');
const { checkRoles } = require('../middlewares/auth.handler');
const { createRol, updateRol, getRol, queryRolSchema } = require('../schemas/roles.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new RolesService();

router.get('/', checkRoles([1]),
validatorHandler(queryRolSchema, 'query'),
async (request, response, next) =>{
    try {
        const ventas = await service.find(request.query);
        response.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', checkRoles([1]),
validatorHandler(getRol, 'params'),
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
validatorHandler(createRol, 'body'),
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
validatorHandler(getRol, 'params'),
validatorHandler(updateRol, 'body'),
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
validatorHandler(getRol, 'params'),
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
