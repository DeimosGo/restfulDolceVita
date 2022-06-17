const { Model, DataTypes } = require('sequelize');

const ROLES = 'roles';

const RolesSchema = {
    idRol:{
        field: 'id_rol',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombreRol: {
        field: 'nombre_rol',
        allowNull:false,
        unique: true,
        type: DataTypes.STRING(78)
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.TEXT
    }
};

class Roles extends Model {
    static associate(models){
        this.hasMany(models.Empleados, {
            as: 'empleados',
            foreignKey: 'idRol'
        });
    };
    static config(sequelize){
        return {
            sequelize,
            tableName: ROLES,
            modelName: 'Roles',
            timestamps: false
        };
    };
};

module.exports = { ROLES, Roles, RolesSchema };
