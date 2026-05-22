import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    tipo: { type: String, required: true },
    activo: { type: Boolean, default: true }
});

//exportamos para usarlo en los controladores

export default mongoose.model('Producto', productoSchema);