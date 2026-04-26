import Producto from "../models/Producto.js";

//Crear producto

export const createProducto = (req, res) => {
    try {
        const { id, nombre, precio, tipo, activo } = req.body;

        // convertir checkbox a true/false
        const activoBoolean = activo === 'on';


        //validamos

        if (!id || !nombre || !precio || !tipo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" })
        }

        const nuevo = Producto.crear({
            id: Number(id),
            nombre,
            precio: Number(precio),
            tipo,
            activo: activoBoolean
        });

        // volver a la lista de productos
        res.redirect('/productos');

    } catch (error) {
        console.log("ATENCIÓN, EL ERROR REAL ES:", error);
        res.status(500).send({ error: "Error al crear el producto" });
    };
}

export const formularioNuevoProducto = (req, res) => {
    res.render('nuevoProducto');
};



//leer todos(JSON)
export const getProductos = (req, res) => {
    try {
        let productos = Producto.getTodos();
        productos = productos.filter(p => p.activo === true);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

//leer todos(HTML)
export const getProductosVista = (req, res) => {
    try {
        let productos = Producto.getTodos();
        productos = productos.filter(p => p.activo === true);

        res.render('listaProductos', { productos });

    } catch (error) {
        res.status(500).send({ error: "Error al obtener los productos" });
    }
};

//leer por ID

export const getProductoById = (req, res) => {
    const producto = Producto.buscarPorID(req.params.id);
    if (!producto || !producto.activo) {
        return res.status(404).json({ error: "Producto no encontrado o inactivo" });
    }
    res.status(200).json(producto);
};

//actualizar datos

export const updateProducto = (req, res) => {
    try {
        const actualizado = Producto.actualizar(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: "No se pudo actualizar, producto no encontrado" });
        }
        res.status(200).json({ mensaje: "Actualizado correctamente", data: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error interno al actualizar el producto" });
    }
};

//borrar dato

export const deleteProducto = (req, res) => {
    const borrado = Producto.borrar(req.params.id);
    if (!borrado) {
        return res.status(404).json({ error: "No se pudo eliminar, producto no encontrado" })
    }
    res.status(200).json({ mensaje: "Producto desactivado correctamente" });
};