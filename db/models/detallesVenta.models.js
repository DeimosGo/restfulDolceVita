const { DataTypes, Model } = require('sequelize');
const { VENTAS } = require('./ventas.models');
const { PRODUCTOS } = require('./productos.models');

const DETALLESVENTAS = 'detalles_venta';

const DetallesVentaSchema = {
    idDetalleVenta : {
        field: 'id_detalle',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    cantidad: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    idVenta: {
        field: 'id_venta',
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {
            model: VENTAS,
            key: 'id_venta'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    idProducto: {
        field: 'id_producto',
        allowNull:false,
        type:DataTypes.INTEGER,
        references: {
            model: PRODUCTOS,
            key: 'id_producto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class DetallesVenta extends Model {
    static associate(models){
        this.belongsTo(models.Ventas, {
            as: 'ventas',
            foreignKey: 'idVenta'
        });
        this.belongsTo(models.Productos, {
            as: 'productos',
            foreignKey: 'idProducto'
        });
    };
    static config(sequelize){
        return {
            sequelize,
            tableName: DETALLESVENTAS,
            modelName: 'detallesVenta',
            timestamps: false
        };
    };
};

module.exports = { DETALLESVENTAS, DetallesVentaSchema, DetallesVenta };
