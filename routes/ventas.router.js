const express = require('express');
const VentasService = require('../services/ventas.service');
const {
    getVentaSchema,
    createVentaSchema,
    updateVentaSchema,
    queryVentaSchema,
    rangeVenta
} = require('../schemas/ventas.schema');
const validatorHandler = require('../middlewares/validator.handler');
const {
    checkRoles
} = require('../middlewares/auth.handler');

const router = express.Router();
const service = new VentasService();

router.get('/', checkRoles([1, 2]), validatorHandler(queryVentaSchema, 'query'),
    async (request, response, next) => {
        try {
            const ventas = await service.find(request.query);
            response.status(200).json(ventas);
        } catch (error) {
            next(error);
        }

    });

router.get('/employes/:fechaIn/:fechaOut', checkRoles([1, 2]),
    async (request, response, next) => {
        try {
            const {
                fechaIn,
                fechaOut
            } = request.params;
            const rta = await service.findEmpleados(fechaIn, fechaOut);
            response.status(200).json(rta);
        } catch (error) {
            next(error);
        }
    });

router.get('/semester', checkRoles([1, 2]),
    async (request, response, next) => {
        try {
            const rta = await service.findChart();
            response.status(200).json(rta);
        } catch (error) {
            next(error);
        }
    });

router.get('/raw', checkRoles([1, 2]), validatorHandler(queryVentaSchema, 'query'),
    async (request, response, next) => {
        try {
            const ventas = await service.findMain(request.query);
            response.status(200).json(ventas);
        } catch (error) {
            next(error);
        }

    });

router.get('/date', checkRoles([1, 2]), validatorHandler(rangeVenta, 'body'),
    async (request, response, next) => {
        try {
            const {
                dateIn,
                dateOut
            } = request.body;
            const rta = await service.findRange(dateIn, dateOut);
            response.status(200).json(rta);
        } catch (error) {
            next(error);
        }
    });

router.get('/:id', checkRoles([1, 2]), validatorHandler(getVentaSchema, 'params'),
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


router.post('/', checkRoles([1, 2]), validatorHandler(createVentaSchema, 'body'),
    async (request, response, next) => {
        try {
            const body = request.body;
            const rta = await service.create(body);
            response.status(201).json(rta);
        } catch (error) {
            next(error);
        }
    });

router.patch('/:id', checkRoles([1]), validatorHandler(getVentaSchema, 'params'),
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

router.delete('/:id', checkRoles([1]), validatorHandler(getVentaSchema, 'params'),
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
