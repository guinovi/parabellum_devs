import 'dotenv/config';
import conectarDB from '../config/db.js';
import Pedido from '../models/Pedido.js';

const migrarPedidos = async () => {
    await conectarDB();
    try {
        const resultado = await Pedido.updateMany(
            { creadoPor: { $exists: false } },
            { $set: { creadoPor: 'franquicia_1' } }
        );
        console.log(`✓ ${resultado.modifiedCount} pedidos actualizados`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

migrarPedidos();