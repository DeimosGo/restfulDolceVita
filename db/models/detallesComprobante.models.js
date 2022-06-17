const { Model, DataTypes } = require('sequelize');
const { COMPROBANTESVENTAS } = require('./comprobantesVenta.models');
const { PRODUCTOS } = require('./productos.models');

const DETALLESCOMPROBANTE = 'detalles_comprobante';

const DetallesComprobanteSchema = {
    idDetalle: {
        field: 'id_detalle',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    cantidad:{
        allowNull:false,
        type: DataTypes.INTEGER
    },
    idComprobante: {
        allowNull: false,
        field: 'id_comprobante',
        type: DataTypes.INTEGER,
        references: {
            model: COMPROBANTESVENTAS,
            key: 'id_comprobante'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    idProducto: {
        field: 'id_producto',
        allowNull:false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCTOS,
            key: 'id_producto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class DetallesComprobante extends Model {
    static associate(models){
        this.belongsTo(models.ComprobantesVentas, {
            as:'comprobantes_venta',
            foreignKey: 'idComprobante'
        });
        this.belongsTo(models.Productos,  {
            as: 'productos',
            foreignKey: 'idProducto'
        });
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: DETALLESCOMPROBANTE,
            modelName: 'DetallesComprobante',
            timestamps: false
        }
    }
};

module.exports = { DETALLESCOMPROBANTE, DetallesComprobanteSchema, DetallesComprobante };
