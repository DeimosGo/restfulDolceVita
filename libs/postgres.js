const {Client} = require('pg');

const getConnection = async () => {
    const cliente = new Client({
        host: 'localhost',
        port: 5432,
        user: 'admin',
        password: 'crd-1-BDP',
        database: 'dolce_vita_db'
    });
    await cliente.connect();
    return cliente;
};
module.exports = getConnection;
