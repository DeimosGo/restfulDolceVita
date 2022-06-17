'use strict';

const { CategoriasSchema, CATEGORIAS } = require('../models/categorias.models');
const { ClientesSchema, CLIENTES } = require('../models/clientes.models');
const { RolesSchema, ROLES } = require('../models/roles.models');
const { ProductosSchema, PRODUCTOS } = require('../models/productos.models');
const { EmpleadosSchema, EMPLEADOS } = require('../models/empleados.models');
const { VentasSchema, VENTAS } = require('../models/ventas.models');
const { DetallesVentaSchema, DETALLESVENTAS }= require('../models/detallesVenta.models');
const { ComprobantesVentaSchema, COMPROBANTESVENTAS } = require('../models/comprobantesVenta.models');
const { DetallesComprobanteSchema, DETALLESCOMPROBANTE } = require('../models/detallesComprobante.models');

module.exports = {
    async up (queryInterface) {
        await queryInterface.createTable(CATEGORIAS, CategoriasSchema);
        await queryInterface.createTable(CLIENTES, ClientesSchema);
        await queryInterface.createTable(ROLES, RolesSchema);
        await queryInterface.createTable(PRODUCTOS, ProductosSchema);
        await queryInterface.createTable(EMPLEADOS, EmpleadosSchema);
        await queryInterface.createTable(VENTAS, VentasSchema);
        await queryInterface.createTable(DETALLESVENTAS, DetallesVentaSchema);
        await queryInterface.createTable(COMPROBANTESVENTAS, ComprobantesVentaSchema);
        await queryInterface.createTable(DETALLESCOMPROBANTE, DetallesComprobanteSchema);
    },

    async down (queryInterface) {
        await queryInterface.dropTable(CATEGORIAS);
        await queryInterface.dropTable(CLIENTES);
        await queryInterface.dropTable(ROLES);
        await queryInterface.dropTable(PRODUCTOS);
        await queryInterface.dropTable(EMPLEADOS);
        await queryInterface.dropTable(VENTAS);
        await queryInterface.dropTable(DETALLESVENTAS);
        await queryInterface.dropTable(COMPROBANTESVENTAS);
        await queryInterface.dropTable(DETALLESCOMPROBANTE);
    }
};
