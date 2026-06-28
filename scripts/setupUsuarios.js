import 'dotenv/config';
import conectarDB from '../config/db.js';
import Usuario from '../models/Usuario.js';
import Sucursal from '../models/Sucursal.js';


const setupUsuarios = async () => {
    await conectarDB();

    try {
        // 1. Agregar alias al usuario franquicia demo
        const franquicia = await Usuario.findOneAndUpdate(
            { rol: 'franquicia' },
            { $set: { alias: 'franquicia_1' } },
            { new: true }
        );

        if (franquicia) {
            console.log(`✓ Alias actualizado en usuario franquicia: ${franquicia.email}`);
        } else {
            console.log('⚠ No se encontró usuario con rol franquicia');
        }

        // 2. Buscar la Sucursal Centro para asociar al usuario sucursal
        const sucursal = await Sucursal.findOne({ alias: 'Colón-1234' });

        if (!sucursal) {
            console.log('⚠ No se encontró la Sucursal Centro. Asegurate de haber corrido seedSucursales.js primero.');
            process.exit(1);
        }

        // 3. Verificar si ya existe el usuario sucursal
        const yaExiste = await Usuario.findOne({ email: 'colon-1234@espigadeoro.com' });

        if (yaExiste) {
            console.log('⚠ El usuario sucursal ya existe, no se creó de nuevo.');
        } else {
            await Usuario.create({
                email: 'colon-1234@espigadeoro.com',
                password: 'Sucursal123',
                nombre: 'Sucursal Centro',
                rol: 'sucursal',
                alias: sucursal.alias
            });
            console.log('✓ Usuario sucursal creado: colon-1234@espigadeoro.com');
        }

        console.log('\n✓ Setup completado. Podés eliminar este script.');
        process.exit(0);

    } catch (error) {
        console.error('Error en el setup:', error);
        process.exit(1);
    }
};

setupUsuarios();