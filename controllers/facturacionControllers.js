import Facturacion from '../models/Facturacion.js';
import Sucursal from '../models/Sucursal.js';
import Producto from '../models/Producto.js';
import Pedido from '../models/Pedido.js';
import { getNextFacturacionId } from '../utils/idGenerator.js';


// Genera un comprobante de facturación interna o royalty al pasar a "entregado"
export const generarFacturacionParaPedido = async (pedido) => {
    try {
        // Evitar duplicaciones
        const existente = await Facturacion.findOne({ pedidoId: pedido.id });
        if (existente) {
            console.log(`El pedido ${pedido.id} ya cuenta con registro de facturación.`);
            return existente;
        }

        // Buscar la sucursal que creó el pedido
        const sucursal = await Sucursal.findOne({ alias: pedido.creadoPor });
        if (!sucursal) {
            console.log(`No se encontró sucursal para el alias: ${pedido.creadoPor}`);
            return null;
        }

        // Filtrar solo sucursales propias y franquicias (planta no genera facturación)
        if (sucursal.tipo !== 'propia' && sucursal.tipo !== 'franquicia') {
            console.log(`La sucursal de tipo ${sucursal.tipo} no genera facturación ni royalties.`);
            return null;
        }

        // Calcular el monto total del pedido
        let montoTotalPedido = 0;
        for (const item of pedido.productos) {
            const producto = await Producto.findOne({ id: item.id });
            if (producto) {
                montoTotalPedido += item.cantidad * producto.precio;
            }
        }

        const tipoRegistro = sucursal.tipo === 'propia' ? 'factura_interna' : 'royalty';
        const porcentajeRoyalty = sucursal.tipo === 'franquicia' ? 5 : 0; // 5% royalty por defecto
        const montoCalculado = sucursal.tipo === 'franquicia' 
            ? (montoTotalPedido * porcentajeRoyalty) / 100 
            : montoTotalPedido;

        const nuevoId = await getNextFacturacionId();

        const registro = await Facturacion.create({
            id: nuevoId,
            pedidoId: pedido.id,
            aliasSucursal: sucursal.alias,
            tipoSucursal: sucursal.tipo,
            montoTotalPedido,
            tipoRegistro,
            porcentajeRoyalty,
            montoCalculado,
            fechaEmision: new Date()
        });

        console.log(`Registro de facturación creado: ID ${nuevoId} para pedido ${pedido.id} (${tipoRegistro})`);
        return registro;
    } catch (error) {
        console.error("Error al generar facturación para pedido:", error);
        throw error;
    }
};

// Obtener todas las facturas y royalties (para el administrador)
export const getFacturacion = async (req, res, next) => {
    try {
        // Auto-generación retroactiva
        const pedidosEntregados = await Pedido.find({ estado: 'entregado' });
        for (const pedido of pedidosEntregados) {
            await generarFacturacionParaPedido(pedido);
        }

        const registros = await Facturacion.find().sort({ fechaEmision: -1 });
        res.status(200).json(registros);
    } catch (error) {
        next(error);
    }
};

// Renderizar la vista de facturación
export const getFacturacionVista = async (req, res, next) => {
    try {
        const usuario = req.session.usuario;
        
        // Auto-generación retroactiva
        const pedidosEntregados = await Pedido.find({ estado: 'entregado' });
        for (const pedido of pedidosEntregados) {
            await generarFacturacionParaPedido(pedido);
        }

        let filtro = {};
        // Si no es admin, solo ve los de su sucursal
        if (usuario.rol !== 'admin') {
            filtro.aliasSucursal = usuario.alias;
        }

        const registros = await Facturacion.find(filtro).sort({ fechaEmision: -1 });
        
        // Calcular totales consolidados
        const totalFacturadoInterno = registros
            .filter(r => r.tipoRegistro === 'factura_interna')
            .reduce((sum, r) => sum + r.montoCalculado, 0);

        const totalRoyalties = registros
            .filter(r => r.tipoRegistro === 'royalty')
            .reduce((sum, r) => sum + r.montoCalculado, 0);

        res.render('facturacion', { 
            registros, 
            totalFacturadoInterno, 
            totalRoyalties 
        });
    } catch (error) {
        next(error);
    }
};

