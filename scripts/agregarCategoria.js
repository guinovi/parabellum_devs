import 'dotenv/config';
import conectarDB from '../config/db.js';
import Producto from '../models/Producto.js';

const agregarCategoria = async () => {
    console.log('Iniciando...');
    await conectarDB();
    try {
        const productos = await Producto.find({ categoria: { $exists: false } });
        console.log(`Productos sin categoria: ${productos.length}`);
        
        for (const producto of productos) {
            producto.categoria = 'Producto Terminado';
            await producto.save();
            console.log(`✓ ${producto.nombre} actualizado`);
        }

        console.log('Migración completa');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

agregarCategoria();