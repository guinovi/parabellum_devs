import express from 'express'
const app = express();

import productosRoutes from './routes/productosRoutes.js';

app.use(express.json());
app.use(productosRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Parabellum Devs');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})