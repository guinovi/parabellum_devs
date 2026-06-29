import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const mongoUriAtlas = process.env.MONGO_URI || process.env.MONGODB_URI;
    const mongoLocal = 'mongodb://127.0.0.1:27017/panificadora_db';

    const mongoUri = mongoUriAtlas;
    await mongoose.connect(mongoUri, { writeConcern: { w: 'majority' } });

    if (process.env.MONGO_URI || process.env.MONGODB_URI) {
      console.log('Conexion a MongoDB (URI desde variables de entorno) exitosa');
    } else {
      console.log('Conexion a MongoDB local exitosa');
    }
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

export default conectarDB;