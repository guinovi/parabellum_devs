import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import conectarDB from './config/db.js';
import Usuario from './models/Usuario.js';

const usuarios = JSON.parse(readFileSync('./data/usuarios.json', 'utf-8'));

const seed = async () => {
    try {
        await conectarDB();
        await Usuario.deleteMany({});
        await Usuario.insertMany(usuarios);
        console.log(`Se cargaron ${usuarios.length} usuarios en la base de datos.`);
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error al precargar usuarios:', error);
        process.exit(1);
    }
};

seed();
