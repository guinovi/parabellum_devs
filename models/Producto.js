import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    activo: { type: Boolean, default: true }
});

export default mongoose.model('Producto', productoSchema);