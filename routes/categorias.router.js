const express = require('express');
const CategoriaService = require('../services/categorias.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
    checkRoles
} = require('../middlewares/auth.handler');
const {
    createCategoriaSchema,
    updateCategoriaSchema,
    getCategoriaSchema,
    queryCategoriaSchema,
    getNameCategoriaSchema
} = require('../schemas/categorias.schema')

const router = express.Router();
const service = new CategoriaService();

router.get('/', checkRoles([1, 2]),
    validatorHandler(queryCategoriaSchema, 'query'),
    async (request, response, next) => {
        try {
            const categorias = await service.find(request.query);
            response.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    });

    router.get('/count', checkRoles([1, 2]),
validatorHandler(queryCategoriaSchema, 'query'),
async (request, response, next) => {
    try {
        const cantidad = await service.count();
        response.status(200).json({cantidad:cantidad});
    } catch (error) {
        console.log(error);
        next(error);
    }
}
);

router.get('/:id_categoria', checkRoles([1, 2]),
    validatorHandler(getCategoriaSchema, 'params'),
    async (request, response, next) => {
        const {
            id_categoria
        } = request.params;
        try {
            const respuesta = await service.findOne(id_categoria);
            response.status(200).json(respuesta);
        } catch (error) {
            next(error);
        }
    });

    router.get('/name/:nombre', checkRoles([1, 2]),
    validatorHandler(getNameCategoriaSchema, 'params'),
    async (request, response, next) => {
        const { nombre } = request.params;
        try {
            const respuesta = await service.findName(nombre);
            response.status(200).json(respuesta);
        } catch (error) {
            next(error);
        }
    });


router.post('/', checkRoles([1]),
    validatorHandler(createCategoriaSchema, 'body'),
    async (requets, response, next) => {
        const body = requets.body;
        try {
            const res = await service.create(body);
            response.status(201).json({
                created: res,
            });
        } catch (error) {
            next(error);
        }
    });

router.patch('/:id', checkRoles([1]),
    validatorHandler(getCategoriaSchema, 'params'),
    validatorHandler(updateCategoriaSchema, 'body'),
    async (request, response, next) => {
        try {
            const {
                id
            } = request.params;
            const body = request.body;
            const res = await service.update(id, body);
            response.status(200).json({
                updated: res
            });
        } catch (error) {
            next(error);
            console.error(error);
        }
    });

router.delete('/:id', checkRoles([1]),
    validatorHandler(getCategoriaSchema, 'params'),
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
            console.log(error);
        }
    });

module.exports = router;
