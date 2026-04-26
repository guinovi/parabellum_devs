import express from 'express';

import {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    formularioNuevoProducto
} from '../controllers/productosControllers.js'

const router = express.Router();

//CRUDS

router.get('/productos', getProductos);           // Leer todos
router.get('/productos/nuevo', formularioNuevoProducto); // Formulario para crear nuevo producto
router.get('/productos/:id', getProductoById);    // Leer uno puntual
router.post('/productos', createProducto);        // Crear nuevo
router.put('/productos/:id', updateProducto);     // Modificar
router.delete('/productos/:id', deleteProducto);  // Dar de baja

export default router;