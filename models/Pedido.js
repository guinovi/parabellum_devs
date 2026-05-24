import mongoose from 'mongoose';

//creamos el objeto de pedido
const pedidoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    productos: [{
        id: { type: Number, required: true },
        cantidad: { type: Number, required: true }
    }], //array de productos con su id y cantidad
    fecha: { type: String, required: true }
});

export default mongoose.model('Pedido', pedidoSchema);