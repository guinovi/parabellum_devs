import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import { requiereAuth } from './middleware/auth.js';


dotenv.config();
conectarDB();

const app = express();

import productosRoutes from './routes/productosRoutes.js';
import pedidosRoutes from './routes/pedidosRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';

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

// Rutas de autenticación (públicas)
app.use(usuariosRoutes);

// Rutas protegidas
app.use(productosRoutes);
app.use(pedidosRoutes);

// Home: requiere login
app.get('/', requiereAuth, (req, res) => {
    res.render('home');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})
