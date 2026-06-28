import Producto from "../models/Producto.js";
import { getNextProductoId } from "../utils/idGenerator.js";

//Tipos de productos
const TIPOS_PRODUCTOS = {
    'Producto terminado': [
        'Panadería dulce',
        'Panes',
        'Masas finas',
        'Tortas,tartas y postres',
        'Sandwiches',
    ],
    'Producto congelado': [
        'Panadería dulce',
        'Panes',
    ]
};

//Crear producto
export const createProducto = async (req, res, next) => {
    try {
        const { nombre, precio, categoria, subcategoria, activo } = req.body;

        const activoBoolean = activo === 'on';

        if (!nombre || !precio || !categoria || !subcategoria) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }

        const nuevoId = await getNextProductoId();

        await Producto.create({
            id: nuevoId,
            nombre,
            precio: Number(precio),
            categoria,
            subcategoria,
            activo: activoBoolean
        });

        res.redirect('/productos');
    } catch (error) {
        next(error);
    }
};


export const formularioNuevoProducto = (req, res) => {
    res.render('nuevoProducto', { tipos: TIPOS_PRODUCTOS });
};

export const formularioEditarProducto = async (req, res, next) => {
    try {
        const producto = await Producto.findOne({ id: Number(req.params.id) });
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('editarProducto', { producto, tipos: TIPOS_PRODUCTOS });
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
