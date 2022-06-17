const {Model, DataTypes} = require('sequelize');

const COMPROBANTESVENTAS = 'comprobantes_venta';

const ComprobantesVentaSchema = {
    idComprobante:{
        field: 'id_comprobante',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    dniCliente:{
        allowNull: false,
        field: 'dni_cliente',
        type: DataTypes.STRING(8),
    },
    nombreCliente: {
        field: 'nombre_cliente',
        allowNull:false,
        type: DataTypes.TEXT,
    },
    fecha: {
        allowNull: false,
        type: DataTypes.DATEONLY
    },
    totalVenta: {
        field: 'total_venta',
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    }
};

class ComprobantesVenta extends Model {
    static associate(models){
        this.hasMany(models.DetallesComprobante, {
            as: 'detalles_comprobante',
            foreignKey: 'idDetalle'
        });
    };
    static config(sequelize){
        return {
            sequelize,
            tableName: COMPROBANTESVENTAS,
            modelName: 'ComprobantesVentas',
            timestamps: false
        };
    };
};

module.exports = {COMPROBANTESVENTAS, ComprobantesVentaSchema, ComprobantesVenta};
