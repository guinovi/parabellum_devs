import 'dotenv/config';
import conectarDB from '../config/db.js';
import Producto from '../models/Producto.js';

const verificar = async () => {
    console.log('Verificando...');
    await conectarDB();
    try {
        const productos = await Producto.find({});
        console.log(JSON.stringify(productos, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verificar();