import 'dotenv/config';
import conectarDB from '../config/db.js';
import Pedido from '../models/Pedido.js';
import { generarFacturacionParaPedido } from '../controllers/facturacionControllers.js';

const migrate = async () => {
    await conectarDB();
    try {
        console.log("Iniciando migración manual de facturación para pedidos entregados...");
        
        const pedidosEntregados = await Pedido.find({ estado: 'entregado' });
        console.log(`Se encontraron ${pedidosEntregados.length} pedidos en estado 'entregado'.`);

        let creados = 0;
        let omitidos = 0;

        for (const pedido of pedidosEntregados) {
            const registro = await generarFacturacionParaPedido(pedido);
            if (registro) {
                creados++;
            } else {
                omitidos++;
            }
        }

        console.log(`Migración completada. Registros creados: ${creados}, Omitidos/Ya existentes: ${omitidos}`);
        process.exit(0);
    } catch (error) {
        console.error("Error durante la migración:", error);
        process.exit(1);
    }
};

migrate();
