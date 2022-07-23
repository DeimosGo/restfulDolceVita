const express = require('express');
const ProductoService = require('../services/productos.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkApiKey, checkRoles } = require('../middlewares/auth.handler');
const {
    createProductoSchema,
    updateProductoSchema,
    getProductoSchema,
    queryProductoSchema,
    getNameProductoSchema,
    getProductoCategoriaSchema
} = require('../schemas/producto.schema');
const router = express.Router();
const service = new ProductoService();

router.get('/', checkRoles([1,2]),
validatorHandler(queryProductoSchema, 'query'),
async (request, response, next) => {
    try {
        const productos = await service.find(request.query);
        response.status(200).json(productos);
    } catch (error) {
        next(error);
    }
});

router.get('/chart', checkRoles([1,2]),
validatorHandler(queryProductoSchema, 'query'),
async (request, response, next) => {
    try {
        const productos = await service.findChart(request.query);
        response.status(200).json(productos);
    } catch (error) {
        next(error);
    }
});


router.get('/venta', checkRoles([1,2]),
async (request, response, next) => {
    try {
        const productos = await service.findForVenta();
        response.status(200).json(productos);
    } catch (error) {
        next(error);
    }
});

router.get('/venta/:name', checkRoles([1,2]),
validatorHandler(getNameProductoSchema, 'params'),
async (request, response, next) => {
    try {
        const { name } = request.params;
        const productos = await service.findNameVenta(name);
        response.status(200).json(productos);
    } catch (error) {
        next(error);
    }
});

router.get('/count', checkRoles([1,2]),
validatorHandler(queryProductoSchema, 'query'),
async (request, response, next) => {
    try {
        const cantidad = await service.count();
        response.status(200).json({cantidad: cantidad});
    } catch (error) {
        next(error);
    }
});

router.get('/:id', checkRoles([1,2]),
validatorHandler(getProductoSchema, 'params'),
    async (request, response, next) => {
        try {
            const {id} = request.params;
            const respuesta = await service.findOne(id);
            response.status(200).json(respuesta);
        } catch (error) {
            next(error);
        }

    });

router.get('/name/:name', checkRoles([1,2]),
validatorHandler(getNameProductoSchema, 'params'),
async (request, response, next) => {
    try {
        const { name } = request.params;
        const respuesta = await service.findName(name);
        response.status(200).json(respuesta);
    } catch (error) {
        next(error);
    }
});

router.get('/categoria/:categoria', checkRoles([1]),
validatorHandler(getProductoCategoriaSchema, 'params'),
async (request, response, next) => {
    try {
        const { categoria } = request.params;
        const respuesta = await service.findCategoria(categoria);
        response.status(200).json(respuesta);
    } catch (error) {
        next(error);
    }
});

router.post('/', checkRoles([1]),
validatorHandler(createProductoSchema, 'body'),
    async (request, response, next) => {
        try {
            const body = request.body;
            const rta = await service.create(body);
            response.status(201).json({created: rta});
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

router.patch('/:id', checkRoles([1]),
validatorHandler(getProductoSchema, 'params'),
validatorHandler(updateProductoSchema, 'body'),
    async (request, response, next) => {
        try {
            const {id} = request.params;
            const body = request.body;
            const rta = await service.update(id, body);
            response.status(200).json({
                "updated": rta
            });
        } catch (error) {
            next(error);
        }
    });

router.delete('/:id', checkRoles([1]),
validatorHandler(getProductoSchema, 'params'),
    async (request, response, next) => {
        try {
            const {id} = request.params;
            const rta = await service.delete(id);
            response.status(200).json({
                "deleted": rta
            });
        } catch (error) {
            next(error);
        }
    });
module.exports = router;
