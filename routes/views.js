const express = require('express');
const router = express.Router();

module.exports = (io) => {
  router.get('/', (req, res) => {
    // Lógica para obtener la lista de productos y renderizar home.handlebars
    res.render('home');
  });

  router.get('/realtimeproducts', (req, res) => {
    // Lógica para obtener la lista de productos y renderizar realTimeProducts.handlebars
    res.render('realTimeProducts');
  });

  // Aquí es donde manejarías la conexión de WebSockets
  io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Manejar eventos de WebSockets, como 'productoCreado' y 'productoEliminado'
    // Emitir actualizaciones a clientes conectados
    socket.on('productoCreado', (producto) => {
      io.emit('actualizarProductos', producto);
    });

    socket.on('productoEliminado', (idProducto) => {
      io.emit('eliminarProducto', idProducto);
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });

  return router;
};
