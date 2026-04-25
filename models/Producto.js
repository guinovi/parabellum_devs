import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(),'data','productos.json');

class Producto {
    constructor (id, nombre, precio,tipo,activo=true){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.tipo=tipo;
        this.activo=activo;
    }

    static getTodos(){
        try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return[];
        }
    }

    static guardarDatos(productos) {
        fs.writeFileSync(dataPath, JSON.stringify(productos,null,2))
    }

    static crear(datos) {
        const productos = this.getTodos();
        const nuevoProducto = new Producto(
            Number(datos.id),
            datos.nombre,
            Number(datos.precio),
            datos.tipo
        )

        productos.push(nuevoProducto);
        this.guardarDatos(productos);
        return nuevoProducto;
    }

    static buscarPorID(id){
        const producto = this.getTodos();
        return producto.find(p => p.id === Number(id));
    }

    static actualizar(id, datosNuevos){
        const productos = this.getTodos();
        const index = productos.findIndex(p => p.id === Number(id));

        if (index === -1) return null;

        //se actualiza dejando el id
        productos[index] = {...productos[index], ...datosNuevos};
        this.guardarDatos(productos);
        return productos[index];
    }

    static borrar(id) {
        const productos = this.getTodos();
        const index = productos.findIndex(p => p.id === Number(id));
 
        if (index === -1 ) return null;

        //lo pasamos a inactivo
        productos[index].activo = false; 
        this.guardarDatos(productos);
        return productos[index];
    }

}

export default Producto;

