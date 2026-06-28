import Pedido from '../models/Pedido.js';

const ORDER_QUERY_PATTERNS = [
    /(?:cual\s*es\s*(?:el\s*)?)?estado\s*(?:del\s*)?pedido\s*[:#]?\s*(\d+)/i,
    /consulta\s*(?:de\s*)?pedido\s*[:#]?\s*(\d+)/i,
    /como\s*va\s*(?:el\s*)?pedido\s*[:#]?\s*(\d+)/i,
    /pedido\s*[:#]?\s*(\d+)/i,
    /(\d+)\s*(?:es\s*)?(?:mi\s*)?pedido/i,
];

function extractOrderId(text) {
    for (const pattern of ORDER_QUERY_PATTERNS) {
        const match = text.match(pattern);
        if (match) return parseInt(match[1], 10);
    }
    return null;
}

export async function processMessage(text) {
    const orderId = extractOrderId(text);
    if (orderId === null) return null;

    try {
        const pedido = await Pedido.findOne({ id: orderId });
        if (!pedido) {
            return `No encontré ningún pedido con el ID #${orderId}. Verificá el número e intentá de nuevo.`;
        }

        const estadoIcon = {
            'pendiente': '⏳',
            'en producción': '👨‍🍳',
            'despachado': '🚚',
            'entregado': '✅'
        };

        const icon = estadoIcon[pedido.estado] || '📋';

        let response = `📦 **Pedido #${pedido.id}** ${icon}\n`;
        response += `Estado: **${pedido.estado.toUpperCase()}**\n`;
        response += `Creado por: ${pedido.creadoPor}\n`;
        response += `Fecha solicitada: ${pedido.fecha}\n`;
        response += `Creado el: ${new Date(pedido.fechaCreacion).toLocaleDateString('es-AR')}\n`;

        if (pedido.fechaProduccion) {
            response += `Inicio producción: ${new Date(pedido.fechaProduccion).toLocaleString('es-AR')}\n`;
        }
        if (pedido.fechaDespacho) {
            response += `Despachado: ${new Date(pedido.fechaDespacho).toLocaleString('es-AR')}\n`;
        }
        if (pedido.fechaEntrega) {
            response += `Entregado: ${new Date(pedido.fechaEntrega).toLocaleString('es-AR')}\n`;
        }

        response += `\n¿Necesitás algo más? Consultá otro pedido o esperá la asistencia del equipo.`;

        return response;
    } catch (error) {
        return 'Hubo un error al consultar el pedido. Por favor, intentá de nuevo más tarde.';
    }
}

export function getHelpMessage() {
    return (
        '🤖 *Hola! Soy el asistente virtual de La Espiga de Oro*\n\n' +
        'Podés consultarme el estado de tus pedidos escribiendo:\n' +
        '• "Estado del pedido 5"\n' +
        '• "Consulta de pedido 12"\n' +
        '• "Pedido #7"\n\n' +
        'También podés escribir un mensaje y el equipo de planta te responderá.'
    );
}
