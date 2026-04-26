import express from 'express';

import {
    getPedidosVista,
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    formularioNuevoPedido
} from '../controllers/pedidosControllers.js'

const router = express.Router();

// CRUD Pedidos
router.get('/pedidos', getPedidosVista);                 // Leer todos (HTML)
router.get('/api/pedidos', getPedidos);              // Leer todos (JSON)
router.get('/pedidos/nuevo', formularioNuevoPedido); // Formulario para crear nuevo pedido
router.get('/pedidos/:id', getPedidoById);          // Leer por ID
router.post('/pedidos', createPedido);              // Crear nuevo
router.put('/pedidos/:id', updatePedido);           // Modificar
router.delete('/pedidos/:id', deletePedido);        // Eliminar

export default router;
