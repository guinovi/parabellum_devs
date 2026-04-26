import express from 'express';

import {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
} from '../controllers/pedidosControllers.js'

const router = express.Router();

// CRUD Pedidos
router.get('/pedidos', getPedidos);                 // Leer todos
router.get('/pedidos/:id', getPedidoById);          // Leer por ID
router.post('/pedidos', createPedido);              // Crear nuevo
router.put('/pedidos/:id', updatePedido);           // Modificar
router.delete('/pedidos/:id', deletePedido);        // Eliminar

export default router;
