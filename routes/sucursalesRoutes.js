import express from 'express';
import {
    getSucursalesVista,
    getSucursales,
    formularioNuevaSucursal,
    crearSucursal,
    formularioEditarSucursal,
    getSucursalById,
    updateSucursal,
    deleteSucursal
} from '../controllers/sucursalesControllers.js';
import { requiereAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/sucursales', requiereAdmin, getSucursalesVista);
router.get('/api/sucursales', requiereAdmin, getSucursales);
router.get('/sucursales/nuevo', requiereAdmin, formularioNuevaSucursal);
router.get('/sucursales/editar/:id', requiereAdmin, formularioEditarSucursal);
router.get('/sucursales/:id', requiereAdmin, getSucursalById);
router.post('/sucursales', requiereAdmin, crearSucursal);
router.put('/sucursales/:id', requiereAdmin, updateSucursal);
router.delete('/sucursales/:id', requiereAdmin, deleteSucursal);

export default router;