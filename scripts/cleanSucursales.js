import conectarDB from '../config/db.js';
import Sucursal from '../models/Sucursal.js';

const cleanSucursales = async () => {
    await conectarDB();

    try {
        const resultado = await Sucursal.deleteMany({ seeded: true });
        console.log(`Se eliminaron ${resultado.deletedCount} sucursales marcadas como seed.`);
        process.exit(0);
    } catch (error) {
        console.error('Error al eliminar sucursales de seed:', error);
        process.exit(1);
    }
};

cleanSucursales();