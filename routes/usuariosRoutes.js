import express from 'express';

import {
    formularioLogin,
    loginUsuario,
    logoutUsuario
} from '../controllers/usuariosControllers.js';

const router = express.Router();

router.get('/login', formularioLogin);   // Mostrar formulario de login
router.post('/login', loginUsuario);     // Procesar login
router.post('/logout', logoutUsuario);   // Cerrar sesión

export default router;
