const express = require('express');
const VentasService = require('../services/ventas.service');
const {
    getVentaSchema,
    createVentaSchema,
    updateVentaSchema,
    queryVentaSchema
} = require('../schemas/ventas.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new VentasService();

router.get('/', validatorHandler(queryVentaSchema, 'query'),
    async (request, response, next) => {
        try {
            const ventas = await service.find(request.query);
            response.status(200).json(ventas);
        } catch (error) {
            next(error);
        }

    });

router.get('/:id', validatorHandler(getVentaSchema, 'params'),
    async (request, response, next) => {
        try {
            const {
                id
            } = request.params;
            const respuesta = await service.findOne(id);
            response.status(200).json(respuesta);
        } catch (error) {
            next(error);
        };
    });

router.post('/', validatorHandler(createVentaSchema, 'body'),
    async (request, response, next) => {
        try {
            const body = request.body;
            const rta = await service.create(body);
            response.status(201).json({
                created: rta
            });
        } catch (error) {
            next(error);
        }
    });

router.patch('/:id', validatorHandler(getVentaSchema, 'params'),
    validatorHandler(updateVentaSchema, 'body'),
    async (request, response, next) => {
        try {
            const {
                id
            } = request.params;
            const body = request.body;
            const respuesta = await service.update(id, body);
            response.status(200).json({
                updated: respuesta
            });
        } catch (error) {
            next(error);
        }
    });

router.delete('/:id', validatorHandler(getVentaSchema, 'params'),
    async (request, response, next) => {
        try {
            const {
                id
            } = request.params;
            const res = await service.delete(id);
            response.status(200).json({
                deleted: res
            });
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
