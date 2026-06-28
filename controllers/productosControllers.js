import Producto from "../models/Producto.js";
import { getNextProductoId } from "../utils/idGenerator.js";

//Crear producto

export const createProducto = async (req, res, next) => {
    try {
        const { nombre, precio, tipo, activo } = req.body;

        // convertir checkbox a true/false
        const activoBoolean = activo === 'on';

        //validamos
        if (!nombre || !precio || !tipo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        // Obtener siguiente ID autoincremental
        const nuevoId = await getNextProductoId();

        //usamos Mongoose para crear el producto en la base de datos

        await Producto.create({
            id: nuevoId,
            nombre,
            precio: Number(precio),
            tipo,
            activo: activoBoolean
        });

        // volver a la lista de productos
        res.redirect('/productos');

    } catch (error) {
        next(error);
    }
};

export const formularioNuevoProducto = (req, res) => {
    res.render('nuevoProducto');
};

export const formularioEditarProducto = async (req, res, next) => {
    try {
        const producto = await Producto.findOne({
            id: Number(req.params.id)
        });
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('editarProducto', { producto });
    } catch (error) {
        next(error);
    }
};

//leer todos(JSON)
export const getProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find({ activo: true }); //busca los activos en la BD
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};

//leer todos(HTML)
export const getProductosVista = async (req, res, next) => {
    try {
        const productos = await Producto.find({ activo: true });
        res.render('listaProductos', { productos });

    } catch (error) {
        next(error);
    }
};

//leer por ID

export const getProductoById = async (req, res, next) => {
    try {
        const producto = await Producto.findOne({ id: Number(req.params.id), activo: true });
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado o inactivo" });
        }
        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
};

//actualizar datos

export const updateProducto = async (req, res, next) => {
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
        next(error);
    }
};

//borrar dato

export const deleteProducto = async (req, res, next) => {
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
        next(error);
    }
};
