const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const routerApi = require('./routes');
const { boomErrorHandler, errorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();

app.use(express.json());

app.use(cors());
require('./utils/auth');
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.get('/', (request, response)=>{
    response.sendFile(__dirname+'/prueba.html');
})
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin:'*',
    }
});
routerApi(app);
const port = process.env.PORT || 3000;

io.on('connection', socket =>{
    console.log(socket.id);
    socket.on('logged', (data) =>{
        if (data) {
            const usuario = {
                nombre:data.nombres,
                apellido:data.apellidos,
            };
            if (data.idRol === 1) {
                usuario.rol = 'administrador';
                socket.broadcast.emit('loginUser', usuario);
            } else {
                usuario.rol = 'vendedor';
                socket.broadcast.emit('loginUser', usuario);
            }
            setTimeout(()=>{
                socket.emit('logout');
            }, 900000);
        }
    });
    socket.on('cliente:registerProduct', (datos)=>{
        socket.broadcast.emit('server:adviceProducto', `${datos.nombreProducto[0]}${datos.nombreProducto.toLowerCase().substring(1)}`);
    });
    socket.on('cliente:editProduct', (datos)=>{
        socket.broadcast.emit('server:adviceEditProducto', `${datos.nombreProducto[0]}${datos.nombreProducto.toLowerCase().substring(1)}`);
    });
    socket.on('cliente:deleteProduct', (datos)=>{
        socket.broadcast.emit('server:adviceDeleteProducto', `${datos.nombreProducto[0]}${datos.nombreProducto.toLowerCase().substring(1)}`);
    });
    socket.on('cliente:createVenta', (datos)=>{
        socket.broadcast.emit(
            'server:adviceNewVenta',
            `${datos.nombres[0]}${datos.nombres.toLowerCase().substring(1)} ${datos.apellidos[0]}${datos.apellidos.toLowerCase().substring(1)}`);
    });
});

/* app.listen(port, ()=>{
    console.log(`Server running in port ${port}`);
}); */
httpServer.listen(port);

app.use(errorHandler);
