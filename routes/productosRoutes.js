import express from 'express';

const router = express.Router();

router.get('/productos', (req, res) => {
    res.send('Lista de productos');
});



export default router;