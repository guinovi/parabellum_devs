import express from 'express';

import {
    getStockVista,
    formularioCargarStock,
    cargarStock
} from '../controllers/stockControllers.js';

import { requiereAdmin } from '../middleware/auth.js';

const router = express.Router();

// Stock: solo admin puede ver y gestionar
router.get('/stock', requiereAdmin, getStockVista);                    // Ver lista de stock
router.get('/stock/cargar', requiereAdmin, formularioCargarStock);     // Formulario cargar stock
router.post('/stock/cargar', requiereAdmin, cargarStock);              // Guardar stock

export default router;