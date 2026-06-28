import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    producto: { type: Number, required: true, unique: true, ref: 'Producto' },
    cantidad: { type: Number, required: true, default: 0 },
    unidad: { type: String, enum: ['unidad', 'kg'], required: true },
    stockMinimo: { type: Number, required: true }
});

export default mongoose.model('Stock', stockSchema);