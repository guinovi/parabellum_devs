import express from 'express';

const router = express.Router();

import { getProductos } from '../controllers/productosControllers.js';



router.get('/productos', getProductos);


router.get('/producto', (req, res) => {
    res.send('Producto');
});



export default router;