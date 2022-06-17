const passport = require('passport');
const productosRouter = require('./productos.router');
const categoriasRouter = require('./categorias.router');
const ventasRouter = require('./ventas.router');
const detallesVentaRouter = require('./detallesVenta.router');
const comprobantesVentaRouter = require('./comprobantesVenta.router');
const detallesComprobanteRouter = require('./detallesComprobante.router');
const empleadosRouter = require('./empleados.router');
const rolesRouter = require('./roles.router');
const clientesRouter = require('./clientes.router');
const authRouter = require('./auth.router');

const express = require('express');

const routerApi = (app) =>{
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/productos', passport.authenticate('jwt', { session: false }), productosRouter);
    router.use('/categorias', passport.authenticate('jwt', { session: false }), categoriasRouter);
    router.use('/ventas', passport.authenticate('jwt', { session: false }), ventasRouter);
    router.use('/detallesVenta', passport.authenticate('jwt', { session: false }), detallesVentaRouter);
    router.use('/comprobantes', passport.authenticate('jwt', { session: false }), comprobantesVentaRouter);
    router.use('/detallesComprobante', passport.authenticate('jwt', { session: false }), detallesComprobanteRouter);
    router.use('/empleados', passport.authenticate('jwt', { session: false }), empleadosRouter);
    router.use('/roles', passport.authenticate('jwt', { session: false }), rolesRouter);
    router.use('/clientes', passport.authenticate('jwt', { session: false }), clientesRouter);
    router.use('/auth', authRouter);
};
module.exports = routerApi;
