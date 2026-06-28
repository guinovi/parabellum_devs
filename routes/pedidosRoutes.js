import express from 'express';

import {
    getPedidosVista,
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
    formularioNuevoPedido,
    actualizarEstadoPedido
} from '../controllers/pedidosControllers.js';

import { requiereAdmin, requiereAuth } from '../middleware/auth.js';

const router = express.Router();

// Pedidos: ambos roles (admin y franquicia) pueden ver y crear
router.get('/pedidos', requiereAuth, getPedidosVista);                    // Leer todos (HTML)
router.get('/api/pedidos', requiereAuth, getPedidos);                     // Leer todos (JSON)
router.get('/pedidos/nuevo', requiereAuth, formularioNuevoPedido);        // Formulario para crear nuevo pedido
router.get('/pedidos/:id', requiereAuth, getPedidoById);                  // Leer por ID
router.post('/pedidos', requiereAuth, createPedido);                      // Crear nuevo
router.put('/pedidos/:id', requiereAuth, updatePedido);                   // Modificar
router.delete('/pedidos/:id', requiereAuth, deletePedido);                // Eliminar
router.patch('/pedidos/:id/estado', requiereAdmin, actualizarEstadoPedido);     // Actualizar estado (HTML fetch)
router.patch('/api/pedidos/:id/estado', requiereAdmin, actualizarEstadoPedido); // Actualizar estado (JSON/API)

export default router;
