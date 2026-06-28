import 'dotenv/config';

import conectarDB from '../config/db.js';
import Producto from '../models/Producto.js';

const migrarProductos = async () => {
    await conectarDB();
    try {
        // Renombrar tipo a subcategoria
        await Producto.updateMany(
            { tipo: { $exists: true } },
            { $rename: { "tipo": "subcategoria" } }
        );
        console.log('✓ Campo tipo renombrado a subcategoria');

        // Agregar categoria a todos los que no la tengan
        const resultado = await Producto.updateMany(
            { categoria: { $exists: false } },
            { $set: { categoria: 'Producto Terminado' } }
        );
        console.log(`✓ ${resultado.modifiedCount} productos actualizados con categoria`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

migrarProductos();