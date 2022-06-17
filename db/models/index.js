const { Clientes, ClientesSchema } = require('./clientes.models');
const { Categorias, CategoriasSchema } = require('./categorias.models');
const { Empleados, EmpleadosSchema } = require('./empleados.models');
const { Productos, ProductosSchema } = require('./productos.models');
const { Roles, RolesSchema } = require('./roles.models');
const { Ventas, VentasSchema } = require('./ventas.models');
const { DetallesVenta, DetallesVentaSchema } = require('./detallesVenta.models');
const { ComprobantesVenta, ComprobantesVentaSchema } = require('./comprobantesVenta.models');
const { DetallesComprobante, DetallesComprobanteSchema } = require('./detallesComprobante.models');

const setupModels = (sequelize) => {
    Clientes.init(ClientesSchema, Clientes.config(sequelize));
    Categorias.init(CategoriasSchema, Categorias.config(sequelize));
    Productos.init(ProductosSchema, Productos.config(sequelize));
    Roles.init(RolesSchema, Roles.config(sequelize));
    Empleados.init(EmpleadosSchema, Empleados.config(sequelize));
    Ventas.init(VentasSchema, Ventas.config(sequelize));
    DetallesVenta.init(DetallesVentaSchema, DetallesVenta.config(sequelize));
    ComprobantesVenta.init(ComprobantesVentaSchema, ComprobantesVenta.config(sequelize));
    DetallesComprobante.init(DetallesComprobanteSchema, DetallesComprobante.config(sequelize));

    Categorias.associate(sequelize.models);
    DetallesVenta.associate(sequelize.models);
    Ventas.associate(sequelize.models);
    DetallesComprobante.associate(sequelize.models);
    ComprobantesVenta.associate(sequelize.models);
    Productos.associate(sequelize.models);
    Roles.associate(sequelize.models);
    Empleados.associate(sequelize.models);
};

module.exports = setupModels;
