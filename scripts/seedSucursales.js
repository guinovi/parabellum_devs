import 'dotenv/config';
import conectarDB from '../config/db.js';
import Sucursal from '../models/Sucursal.js';
import { getNextSucursalId } from '../utils/idGenerator.js';

const seedSucursales = async () => {
    await conectarDB();

    try {
        const inicial = await getNextSucursalId();
        const sucursales = [
            { nombre: 'Sucursal Centro', tipo: 'propia', direccion: 'Av. Colón 1234', alias: 'Colón-1234', telefono: '', email: '', responsable: 'Gerente Centro' },
            { nombre: 'Sucursal Nueva Córdoba', tipo: 'propia', direccion: 'Av. Colón 2345', alias: 'Colón-2345', telefono: '', email: '', responsable: 'Gerente Nueva Córdoba' },
            { nombre: 'Sucursal Alta Córdoba', tipo: 'propia', direccion: 'Av. Colón 3456', alias: 'Colón-3456', telefono: '', email: '', responsable: 'Gerente Alta Córdoba' },
            { nombre: 'Sucursal Güemes', tipo: 'propia', direccion: 'Av. Colón 4567', alias: 'Colón-4567', telefono: '', email: '', responsable: 'Gerente Güemes' },
            { nombre: 'Sucursal Cerro de las Rosas', tipo: 'propia', direccion: 'Av. Colón 5678', alias: 'Colón-5678', telefono: '', email: '', responsable: 'Gerente Cerro' },
            { nombre: 'Franquicia Centro Oeste', tipo: 'franquicia', direccion: 'Av. Colón 6789', alias: 'Colón-6789', telefono: '', email: '', responsable: 'Dueño Centro Oeste' },
            { nombre: 'Franquicia Villa Belgrano', tipo: 'franquicia', direccion: 'Av. Colón 7890', alias: 'Colón-7890', telefono: '', email: '', responsable: 'Dueño Villa Belgrano' },
            { nombre: 'Franquicia General Paz', tipo: 'franquicia', direccion: 'Av. Colón 8901', alias: 'Colón-8901', telefono: '', email: '', responsable: 'Dueño General Paz' },
            { nombre: 'Franquicia Nueva Córdoba', tipo: 'franquicia', direccion: 'Av. Colón 9012', alias: 'Colón-9012', telefono: '', email: '', responsable: 'Dueño Nueva Córdoba' },
            { nombre: 'Franquicia Alberdi', tipo: 'franquicia', direccion: 'Av. Colón 1013', alias: 'Colón-1013', telefono: '', email: '', responsable: 'Dueño Alberdi' },
            { nombre: 'Franquicia Pueyrredón', tipo: 'franquicia', direccion: 'Av. Colón 1114', alias: 'Colón-1114', telefono: '', email: '', responsable: 'Dueño Pueyrredón' },
            { nombre: 'Franquicia Alta Córdoba', tipo: 'franquicia', direccion: 'Av. Colón 1215', alias: 'Colón-1215', telefono: '', email: '', responsable: 'Dueño Alta Córdoba' },
            { nombre: 'Franquicia Shopping', tipo: 'franquicia', direccion: 'Av. Colón 1316', alias: 'Colón-1316', telefono: '', email: '', responsable: 'Dueño Shopping' },
            { nombre: 'Franquicia Villa Allende', tipo: 'franquicia', direccion: 'Av. Colón 1417', alias: 'Colón-1417', telefono: '', email: '', responsable: 'Dueño Villa Allende' },
            { nombre: 'Franquicia Cerro Norte', tipo: 'franquicia', direccion: 'Av. Colón 1518', alias: 'Colón-1518', telefono: '', email: '', responsable: 'Dueño Cerro Norte' },
            { nombre: 'Planta Central', tipo: 'planta', direccion: 'Blvd. de los Alemanes 1', alias: 'Planta Central', telefono: '', email: '', responsable: 'Administrador General' }
        ];

        const documentos = sucursales.map((sucursal, index) => ({
            id: inicial + index,
            ciudad: 'Córdoba',
            provincia: 'Córdoba',
            activo: true,
            seeded: true,
            ...sucursal
        }));

        await Sucursal.insertMany(documentos);
        console.log(`Se han insertado ${documentos.length} sucursales correctamente.`);
        process.exit(0);
    } catch (error) {
        console.error('Error al insertar sucursales:', error);
        process.exit(1);
    }
};

seedSucursales();