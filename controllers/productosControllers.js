import Producto from "../models/Producto.js";

//Crear producto

export const createProducto = async (req, res) => {
    try {
        const { id, nombre, precio, tipo, activo } = req.body;

        // convertir checkbox a true/false
        const activoBoolean = activo === 'on';


        //validamos

        if (!id || !nombre || !precio || !tipo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" })
        }

        //usamos Mongoose para crear el producto en la base de datos

        await Producto.create({
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

export const formularioEditarProducto = async (req, res) => {
    try {
        const producto = await Producto.findOne({
            id: Number(req.params.id)
        });
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('editarProducto', { producto });
    } catch (error) {
        res.status(500).send('Error al cargar producto');
    }
};

//leer todos(JSON)
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.find({ activo: true }); //busca los activos en la BD
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

//leer todos(HTML)
export const getProductosVista = async (req, res) => {
    try {
        const productos = await Producto.find({ activo: true });
        res.render('listaProductos', { productos });

    } catch (error) {
        res.status(500).send({ error: "Error al obtener los productos" });
    }
};

//leer por ID

export const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findOne({ id: Number(req.params.id), activo: true });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado o inactivo" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

//actualizar datos

export const updateProducto = async (req, res) => {
    try {
        const actualizado = await Producto.findOneAndUpdate(
            { id: Number(req.params.id)}, //busca por ID y activo
            req.body, 
            { new: true } //devuelve el documento actualizado
        );
        if (!actualizado) {
            return res.status(404).json({ error: "Producto no encontrado o inactivo" });    
        }
        res.status(200).json({ mensaje: "Actualizado correctamente", data: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error interno al actualizar el producto" });
    }
};

//borrar dato

export const deleteProducto = async (req, res) => {
    try {
        const borrado = await Producto.findOneAndUpdate(
            { id: Number(req.params.id)}, //busca por ID 
            { activo: false }, //desactiva el producto en lugar de eliminarlo
            { new: true } //devuelve el documento actualizado
        );

        if (!borrado) {
            return res.status(404).json({ error: "Producto no encontrado o inactivo" });
        }
        res.status(200).json({ mensaje: "Producto desactivado correctamente", data: borrado });
    } catch (error) {
        res.status(500).json({ error: "Error interno al eliminar el producto" });
    }
};