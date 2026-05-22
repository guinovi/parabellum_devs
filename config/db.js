import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/panificadora_db');
    console.log('Conexion a base de datos MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    } 
};

export default conectarDB;