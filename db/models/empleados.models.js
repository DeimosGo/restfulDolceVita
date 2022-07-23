const { Model, DataTypes } = require('sequelize');

const {ROLES} = require('./roles.models');

const EMPLEADOS = 'empleados';

const EmpleadosSchema = {
    idEmpleado: {
        field: 'id_empleado',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombres: {
        allowNull: false,
        type:DataTypes.STRING(100)
    },
    apellidos: {
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    telefono: {
        allowNull: false,
        unique:true,
        type: DataTypes.STRING(9)
    },
    fechaNacimiento: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(100)
    },
    password: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT
    },
    activo: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN
    },
    idRol: {
        field: 'id_rol',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ROLES,
            key: 'id_rol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    deleted:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
};

class Empleados extends Model {
    static associate (models){
        this.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'idRol'
        });
        this.hasMany(models.Ventas, {
            as: 'ventas',
            foreignKey: 'idVenta'
        });
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: EMPLEADOS,
            modelName: 'Empleados',
            timestamps: false
        };
    };
}

module.exports = { EMPLEADOS, EmpleadosSchema, Empleados };
