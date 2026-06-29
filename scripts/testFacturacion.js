import 'dotenv/config';
import conectarDB from '../config/db.js';
import Sucursal from '../models/Sucursal.js';
import Producto from '../models/Producto.js';
import Facturacion from '../models/Facturacion.js';
import { generarFacturacionParaPedido } from '../controllers/facturacionControllers.js';

const run = async () => {
    await conectarDB();
    try {
        console.log("Iniciando pruebas de facturación...");
        
        // Buscar sucursales existentes (ej: seeded)
        let propia = await Sucursal.findOne({ tipo: 'propia' });
        let franquicia = await Sucursal.findOne({ tipo: 'franquicia' });

        if (!propia) {
            console.log("Creando sucursal propia temporal para pruebas...");
            propia = await Sucursal.create({
                id: 9999,
                nombre: 'Sucursal Test Propia',
                tipo: 'propia',
                direccion: 'Calle Test 123',
                alias: 'test-propia'
            });
        }

        if (!franquicia) {
            console.log("Creando sucursal franquicia temporal para pruebas...");
            franquicia = await Sucursal.create({
                id: 9998,
                nombre: 'Franquicia Test',
                tipo: 'franquicia',
                direccion: 'Calle Test 456',
                alias: 'test-franquicia'
            });
        }

        // Buscar o crear producto temporal
        let producto = await Producto.findOne({ activo: true });
        if (!producto) {
            console.log("Creando producto temporal para pruebas...");
            producto = await Producto.create({
                id: 9999,
                nombre: 'Pan Casero Test',
                precio: 100,
                categoria: 'Panaderia',
                subcategoria: 'Panes',
                unidad: 'unidad'
            });
        }

        console.log(`Producto utilizado: ${producto.nombre} ($${producto.precio})`);

        // Pedido Sucursal Propia
        const pedidoPropia = {
            id: 8888,
            productos: [{ id: producto.id, cantidad: 5 }], // 5 * 100 = 500
            fecha: '2026-06-29',
            estado: 'entregado',
            creadoPor: propia.alias
        };

        // Pedido Franquicia
        const pedidoFranquicia = {
            id: 8889,
            productos: [{ id: producto.id, cantidad: 10 }], // 10 * 100 = 1000
            fecha: '2026-06-29',
            estado: 'entregado',
            creadoPor: franquicia.alias
        };

        // Limpiar registros de pruebas anteriores si existen
        await Facturacion.deleteMany({ pedidoId: { $in: [8888, 8889] } });

        // Probar generación
        console.log("Generando facturación propia...");
        const facPropia = await generarFacturacionParaPedido(pedidoPropia);
        console.log("Resultado Factura Propia:", facPropia);
        
        const expectedPropiaTotal = producto.precio * 5;
        if (facPropia.montoTotalPedido !== expectedPropiaTotal || facPropia.montoCalculado !== expectedPropiaTotal || facPropia.tipoRegistro !== 'factura_interna') {
            throw new Error(`Fallo en cálculos de factura propia. Esperado: ${expectedPropiaTotal}, Obtenido: ${facPropia.montoTotalPedido}`);
        }

        console.log("Generando royalty franquicia...");
        const facFranquicia = await generarFacturacionParaPedido(pedidoFranquicia);
        console.log("Resultado Royalty Franquicia:", facFranquicia);
        
        const expectedFranquiciaTotal = producto.precio * 10;
        const expectedRoyalty = (expectedFranquiciaTotal * 5) / 100;
        if (facFranquicia.montoTotalPedido !== expectedFranquiciaTotal || facFranquicia.montoCalculado !== expectedRoyalty || facFranquicia.tipoRegistro !== 'royalty') {
            throw new Error(`Fallo en cálculos de royalty franquicia. Esperado total: ${expectedFranquiciaTotal}, royalty: ${expectedRoyalty}, Obtenido total: ${facFranquicia.montoTotalPedido}, royalty: ${facFranquicia.montoCalculado}`);
        }


        console.log("¡Pruebas exitosas!");

        // Limpiar
        await Facturacion.deleteMany({ pedidoId: { $in: [8888, 8889] } });
        if (propia.id === 9999) await Sucursal.deleteOne({ id: 9999 });
        if (franquicia.id === 9998) await Sucursal.deleteOne({ id: 9998 });
        if (producto.id === 9999) await Producto.deleteOne({ id: 9999 });

        process.exit(0);
    } catch (e) {
        console.error("Prueba fallida:", e);
        process.exit(1);
    }
};

run();
