import express from 'express'
const app = express();

import productosRoutes from './routes/productosRoutes.js';

app.use(express.json());
// Para manejar datos enviados a través de formularios HTML
app.use(express.urlencoded({ extended: true }));

//Configura el motor de renderizado Pug y carpetas de vistas
app.set('view engine', 'pug');
app.set('views', './views');

app.use(productosRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})