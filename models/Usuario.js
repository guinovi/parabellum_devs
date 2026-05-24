import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'franquicia'], required: true }
});

usuarioSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Usuario', usuarioSchema);
