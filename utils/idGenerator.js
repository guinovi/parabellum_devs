import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";

/**
 * Obtiene el siguiente ID disponible para pedidos
 * @returns {Promise<number>} ID autoincremental para nuevo pedido
 */
export const getNextPedidoId = async () => {
    try {
        const ultimoPedido = await Pedido.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        
        return ultimoPedido ? ultimoPedido.id + 1 : 1;
    } catch (error) {
        console.error("Error al obtener siguiente ID de pedido:", error);
        throw error;
    }
};

/**
 * Obtiene el siguiente ID disponible para productos
 * @returns {Promise<number>} ID autoincremental para nuevo producto
 */
export const getNextProductoId = async () => {
    try {
        const ultimoProducto = await Producto.findOne()
            .sort({ id: -1 })
            .limit(1)
            .lean();
        
        return ultimoProducto ? ultimoProducto.id + 1 : 1;
    } catch (error) {
        console.error("Error al obtener siguiente ID de producto:", error);
        throw error;
    }
};
