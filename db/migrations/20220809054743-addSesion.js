'use strict';
const {
    EMPLEADOS,
    EmpleadosSchema,
    Empleados
} = require('../models/empleados.models');
const {
    Model,
    DataTypes
} = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(EMPLEADOS, 'sesion', EmpleadosSchema.sesion);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn(EMPLEADOS, 'sesion', EmpleadosSchema.sesion);
    }
};
