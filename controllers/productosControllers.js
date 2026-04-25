import Producto from "../models/Producto.js";

//Crear producto

    export const createProducto = (req, res) => {
        try {
            const {nombre, precio, tipo} = req.body;

            //validamos

            if (!nombre || !precio || !tipo) {
                return res.status(400).json({error: "Faltan datos obligatorios"})
            }

            const nuevo = Producto.crear(req.body);
            res.status(201).json({ mensaje: "Prodcuto creado con exito", data: nuevo})
        } catch (error) {
            console.log("ATENCIÓN, EL ERROR REAL ES:", error);
            res.status(500).json({ error: "Error al crear el producto" });
        };
    }

    //leer todos
    export const getProductos = (req,res) => {
        try {
            let productos = Producto.getTodos(); //traemos todos para filtrar despues
            productos = productos.filter(p => p.activo === true);

            res.status(200).json(productos);

        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos" });
        }
    };

    //leer por ID

    export const getProductoById = (req, res) => {
        const producto = Producto.buscarPorID(req.params.id);
        if ( !producto || !producto.activo) {
            return res.status(404).json({error: "Producto no encontrado o inactivo"});
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
            return res.status(404).json({ error: "No se pudo eliminar, producto no encontrado"})
        }
        res.status(200).json({ mensaje: "Prodcuto desactivado correctamente"});
    };