import express from 'express';

import {
    getProductosVista,
    getProductos,
    formularioEditarProducto,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    formularioNuevoProducto
} from '../controllers/productosControllers.js'

import { requiereAdmin } from '../middleware/auth.js';

const router = express.Router();

// Toda la sección de productos es exclusiva del admin
router.get('/productos', requiereAdmin, getProductosVista);           // Leer todos EN HTML
router.get('/api/productos', requiereAdmin, getProductos);            // Leer todos en JSON
router.get('/productos/nuevo', requiereAdmin, formularioNuevoProducto); // Formulario para crear nuevo producto
router.get('/productos/editar/:id', requiereAdmin, formularioEditarProducto); // Formulario para editar producto con sus datos precargados
router.get('/productos/:id', requiereAdmin, getProductoById);    // Leer uno puntual
router.post('/productos', requiereAdmin, createProducto);        // Crear nuevo
router.put('/productos/:id', requiereAdmin, updateProducto);     // Modificar
router.delete('/productos/:id', requiereAdmin, deleteProducto);  // Dar de baja


export default router;