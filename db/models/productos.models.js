const {Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIAS } = require('./categorias.models');

const PRODUCTOS = 'productos';

const ProductosSchema = {
    idProducto: {
        field: 'id_producto',
        allowNull: 'false',
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombreProducto: {
        field: 'nombre_producto',
        allowNull: 'false',
        unique: true,
        type: DataTypes.STRING(68)
    },
    descripcionProducto: {
        field: 'descripcion_producto',
        allowNull: 'false',
        unique: true,
        type: DataTypes.TEXT
    },
    precio: {
        allowNull: false,
        type: DataTypes.DOUBLE
    },
    stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    cantidadVentas: {
        field: 'cantidad_ventas',
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    idCategoria: {
        field: 'id_categoria',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORIAS,
            key: 'id_categoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Productos extends Model {
    static associate(models){
        this.belongsTo(models.Categorias, {
            as:'categoria',
            foreignKey: 'idCategoria'
        });
        this.hasMany(models.detallesVenta, {
            as: 'detalles_venta',
            foreignKey: 'idDetalleVenta'
        });
        this.hasMany(models.DetallesComprobante, {
            as: 'detalles_comprobante',
            foreignKey: 'idDetalle'
        });
    };
    static config(sequelize){
        return {
            sequelize,
            tableName: PRODUCTOS,
            modelName: 'Productos',
            timestamps: false
        };
    };
};

module.exports = { PRODUCTOS, ProductosSchema, Productos };
