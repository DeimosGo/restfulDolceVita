const express = require('express');
const ComprobantesVentaService = require('../services/comprobantesVenta.service');
const { checkRoles } = require('../middlewares/auth.handler');
const { createComprobante, updateComprobante, getComprobante, queryComprobanteSchema } = require('../schemas/comprobantesVenta.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new ComprobantesVentaService();

router.get('/', checkRoles([1,2]),
validatorHandler(queryComprobanteSchema, 'query'),
async (request, response, next) =>{
    try {
        const ventas = await service.find(request.query);
        response.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', checkRoles([1,2]),
validatorHandler(getComprobante, 'params'),
async (request, response, next) =>{
    try {
        const {id} = request.params;
        const respuesta = await service.findOne(id);
        response.status(200).json(respuesta);
    } catch (error) {
        next(error);
    };
});

router.post('/', checkRoles([1,2]),
validatorHandler(createComprobante, 'body'),
async (request, response, next) => {
    try {
        const body = request.body;
        const rta = await service.create(body);
        response.status(201).json(rta);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id',checkRoles([1]),
validatorHandler(getComprobante, 'params'),
validatorHandler(updateComprobante, 'body'),
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
validatorHandler(getComprobante, 'params'),
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
