const {Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORIAS = 'categorias';

const CategoriasSchema = {
    idCategoria: {
        field: 'id_categoria',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombreCategoria: {
        field: 'nombre_categoria',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(68),
    },
    descripcion: {
        allowNull: false,
        type: DataTypes.TEXT,

    }
};

class Categorias extends Model {
    static associate(models) {
        this.hasMany(models.Productos, {
            as: 'productos',
            foreignKey: 'idCategoria'
        })
    }
    static config (sequelize) {
        return {
            sequelize,
            tableName: CATEGORIAS,
            modelName: 'Categorias',
            timestamps: false
        }
    }
};

module.exports = { CATEGORIAS, CategoriasSchema, Categorias };
