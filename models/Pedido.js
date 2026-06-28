import mongoose from 'mongoose';

const ESTADOS_VALIDOS = ['pendiente', 'en producción', 'despachado', 'entregado'];

//creamos el objeto de pedido
const pedidoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    productos: [{
        id: { type: Number, required: true },
        cantidad: { type: Number, required: true }
    }], //array de productos con su id y cantidad
    fecha: { type: String, required: true },
    estado: { type: String, required: true, enum: ESTADOS_VALIDOS, default: 'pendiente' },
    creadoPor: { type: String, required: true },  // ← alias del usuario que creó el pedido
    fechaCreacion: { type: Date, default: Date.now },
    fechaProduccion: { type: Date, default: null },
    fechaDespacho: { type: Date, default: null },
    fechaEntrega: { type: Date, default: null }
});

export { ESTADOS_VALIDOS };
export default mongoose.model('Pedido', pedidoSchema);
