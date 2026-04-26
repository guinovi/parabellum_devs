import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(),'data','pedidos.json');

class Pedido {
    constructor (id, productos, fecha){
        this.id = id;
        this.productos = productos;
        this.fecha = fecha;
    }

    static getTodos(){
        try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    static guardarDatos(pedidos) {
        fs.writeFileSync(dataPath, JSON.stringify(pedidos, null, 2));
    }

    static crear(datos) {
        const pedidos = this.getTodos();
        const nuevoPedido = new Pedido(
            Number(datos.id),
            datos.productos,
            datos.fecha
        );
        
        pedidos.push(nuevoPedido);
        this.guardarDatos(pedidos);
        return nuevoPedido;
    }

    static buscarPorID(id) {
        const pedidos = this.getTodos();
        return pedidos.find(p => p.id === Number(id));
    }

    static actualizar(id, datosNuevos) {
        const pedidos = this.getTodos();
        const index = pedidos.findIndex(p => p.id === Number(id));
        
        if (index === -1) return null;
        
        pedidos[index] = { ...pedidos[index], ...datosNuevos };
        this.guardarDatos(pedidos);
        return pedidos[index];
    }

    static borrar(id) {
        const pedidos = this.getTodos();
        const index = pedidos.findIndex(p => p.id === Number(id));
        
        if (index === -1) return false;
        
        pedidos.splice(index, 1);
        this.guardarDatos(pedidos);
        return true;
    }
}

export default Pedido;
