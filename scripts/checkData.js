import 'dotenv/config';
import conectarDB from '../config/db.js';
import Sucursal from '../models/Sucursal.js';
import Usuario from '../models/Usuario.js';
import Pedido from '../models/Pedido.js';

const check = async () => {
    await conectarDB();
    try {
        console.log("=== SUCURSALES ===");
        const sucursales = await Sucursal.find();
        sucursales.forEach(s => console.log(`- Alias: ${s.alias}, Tipo: ${s.tipo}, Nombre: ${s.nombre}`));

        console.log("\n=== USUARIOS ===");
        const usuarios = await Usuario.find();
        usuarios.forEach(u => console.log(`- Email: ${u.email}, Rol: ${u.rol}, Alias: ${u.alias}`));

        console.log("\n=== PEDIDOS ENTREGADOS ===");
        const pedidos = await Pedido.find({ estado: 'entregado' });
        pedidos.forEach(p => console.log(`- ID: ${p.id}, CreadoPor: ${p.creadoPor}, Estado: ${p.estado}`));

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

check();
