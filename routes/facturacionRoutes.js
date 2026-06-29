import express from 'express';
import { getFacturacion, getFacturacionVista } from '../controllers/facturacionControllers.js';
import { requiereAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/facturacion', requiereAuth, getFacturacionVista);
router.get('/api/facturacion', requiereAuth, getFacturacion);

export default router;
