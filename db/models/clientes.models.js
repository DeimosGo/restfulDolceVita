const { Model, DataTypes, Sequelize } = require('sequelize')

const CLIENTES = 'clientes';

const ClientesSchema = {
    dniCliente:{
        field: 'dni_cliente',
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    telefonoCliente: {
        field: 'telefono_cliente',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(15)
    },
    cantidadCompras:{
        field: 'cantidad_compras',
        allowNull: false,
        type: DataTypes.INTEGER
    }
}

class Clientes extends Model {
    static config (sequelize) {
        return {
            sequelize,
            tableName: CLIENTES,
            modelName: 'Clientes',
            timestamps: false
        };
    };
};

module.exports = {CLIENTES, ClientesSchema, Clientes};
