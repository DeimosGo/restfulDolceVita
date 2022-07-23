'use strict';

const { ComprobantesVentaSchema, COMPROBANTESVENTAS } = require('../models/comprobantesVenta.models');
const {Model, DataTypes} = require('sequelize');

module.exports = {
    async up (queryInterface) {
        await queryInterface.changeColumn(COMPROBANTESVENTAS, 'idComprobante', ComprobantesVentaSchema.idComprobante);
    },

    async down (queryInterface) {
        await queryInterface.changeColumn(COMPROBANTESVENTAS, 'idComprobante', {
            field: 'id_comprobante',
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        });
    }
};
