import 'dotenv/config';
import express from 'express'
import session from 'express-session'
import conectarDB from './config/db.js';
import { requiereAuth } from './middleware/auth.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
conectarDB();

const app = express();

import productosRoutes from './routes/productosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import sucursalesRoutes from './routes/sucursalesRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { initSocket } from './services/socket.js';
import stockRoutes from './routes/stockRoutes.js'; 

app.use(express.json());
// Para manejar datos enviados a través de formularios HTML
app.use(express.urlencoded({ extended: true }));

// Configuración de sesiones
app.use(session({
    secret: 'parabellum-secret-dev',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Expone el usuario logueado a todas las vistas como `usuario`
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

// Configura el motor de renderizado Pug y carpetas de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// Archivos estáticos (CSS, imágenes, JS del cliente)
app.use(express.static('public'));

// Rutas de autenticación (públicas)
app.use(usuariosRoutes);

// Rutas protegidas
app.use(productosRoutes);
app.use(sucursalesRoutes);
app.use(pedidosRoutes);
app.use(chatRoutes);
app.use(stockRoutes);

// Home: requiere login
app.get('/', requiereAuth, (req, res) => {
    res.render('home');
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
});

initSocket(server);
