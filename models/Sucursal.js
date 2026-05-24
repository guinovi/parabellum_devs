import mongoose from "mongoose";

const sucursalSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    tipo: { type: String, enum: ['propia', 'franquicia', 'planta'], required: true },
    direccion: { type: String, required: true },
    alias: { type: String, required: true },
    ciudad: { type: String, default: 'Córdoba' },
    provincia: { type: String, default: 'Córdoba' },
    telefono: { type: String, default: '' },
    email: { type: String, default: '' },
    responsable: { type: String, default: '' },
    activo: { type: Boolean, default: true },
    seeded: { type: Boolean, default: false }
});

export default mongoose.model('Sucursal', sucursalSchema);