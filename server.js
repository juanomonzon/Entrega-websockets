const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configurar el middleware para manejar archivos estáticos
app.use(express.static('public'));

// Configurar rutas
const viewsRouter = require('./routes/views');
app.use('/', viewsRouter(io));

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
