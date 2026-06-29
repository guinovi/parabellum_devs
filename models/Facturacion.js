import mongoose from 'mongoose';

const facturacionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    pedidoId: { type: Number, required: true },
    aliasSucursal: { type: String, required: true },
    tipoSucursal: { type: String, enum: ['propia', 'franquicia'], required: true },
    montoTotalPedido: { type: Number, required: true },
    tipoRegistro: { type: String, enum: ['factura_interna', 'royalty'], required: true },
    porcentajeRoyalty: { type: Number, default: 0 }, // 0 para propia, ej. 5 para franquicia
    montoCalculado: { type: Number, required: true }, // montoTotalPedido para propia, (montoTotalPedido * porcentajeRoyalty / 100) para franquicia
    fechaEmision: { type: Date, default: Date.now }
});

export default mongoose.model('Facturacion', facturacionSchema);
