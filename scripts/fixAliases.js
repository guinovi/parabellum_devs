import 'dotenv/config';
import conectarDB from '../config/db.js';
import Usuario from '../models/Usuario.js';
import Pedido from '../models/Pedido.js';
import { generarFacturacionParaPedido } from '../controllers/facturacionControllers.js';

const run = async () => {
    await conectarDB();
    try {
        console.log("Corrigiendo alias del usuario franquiciado y del pedido ID 3...");

        // 1. Modificar el alias del usuario franquiciado
        const usuario = await Usuario.findOne({ email: 'franquiciado@espigadeoro.com' });
        if (usuario) {
            usuario.alias = 'Colón-6789'; // Alias de la franquicia seeded Centro Oeste
            await usuario.save();
            console.log(`Usuario franquiciado actualizado con el alias: ${usuario.alias}`);
        } else {
            console.log("No se encontró el usuario franquiciado.");
        }

        // 2. Modificar el creadoPor del pedido ID 3 para que coincida con el alias corregido
        const pedido = await Pedido.findOne({ id: 3 });
        if (pedido) {
            pedido.creadoPor = 'Colón-6789';
            await pedido.save();
            console.log(`Pedido ID 3 actualizado. CreadoPor cambiado a: ${pedido.creadoPor}`);

            // 3. Generar la facturación para este pedido
            console.log("Generando factura/royalty para el pedido...");
            const registro = await generarFacturacionParaPedido(pedido);
            if (registro) {
                console.log(`Registro de facturación generado manualmente:`, registro);
            } else {
                console.log("No se pudo generar el registro de facturación.");
            }
        } else {
            console.log("No se encontró el pedido ID 3.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error durante la corrección:", error);
        process.exit(1);
    }
};

run();
