const sequelize = require('sequelize');
const { Model, DataTypes }= require('sequelize');
const { EMPLEADOS } = require('./empleados.models');

const VENTAS = 'ventas';

const VentasSchema = {
    idVenta:{
        field: 'id_venta',
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    precioTotal: {
        field: 'precio_total',
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },
    fecha: {
        allowNull: false,
        type:  DataTypes.DATEONLY,
        defaultValue: sequelize.NOW,
    },
    idEmpleado: {
        field: 'id_empleado',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: EMPLEADOS,
            key: 'id_empleado'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    deleted:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}

class Ventas extends Model {
    static associate(models){
        this.belongsTo(models.Empleados, {
            as: 'empleados',
            foreignKey: 'idEmpleado'
        });
        this.hasMany(models.detallesVenta, {
            as: 'detalles_venta',
            foreignKey: 'idDetalleVenta'
        });
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: VENTAS,
            modelName: 'Ventas',
            timestamps: false
        }
    }
};

module.exports = { VENTAS, VentasSchema, Ventas };
