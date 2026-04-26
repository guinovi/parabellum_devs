import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";

// Leer todos los pedidos
export const getPedidos = (req, res) => {
    try {
        const pedidos = Pedido.getTodos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener pedidos" });
    }
};

// Leer un pedido por ID
export const getPedidoById = (req, res) => {
    try {
        const pedido = Pedido.buscarPorID(req.params.id);
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el pedido" });
    }
};

// Crear un nuevo pedido
export const createPedido = (req, res) => {
    try {
        const { id, productos, fecha } = req.body;

        // Validaciones
        if (!id || !productos || !fecha) {
            return res.status(400).json({ error: "Faltan datos obligatorios: id, productos, fecha" });
        }

        if (!Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ error: "Productos debe ser un array no vacío" });
        }

        // Validar que todos los productos existan
        const productosDB = Producto.getTodos();
        for (let item of productos) {
            const existe = productosDB.find(p => p.id === Number(item.id));
            if (!existe) {
                return res.status(400).json({ error: `Producto con id ${item.id} no existe` });
            }
        }

        const nuevoPedido = Pedido.crear({
            id: Number(id),
            productos,
            fecha
        });

        res.status(201).json({ mensaje: "Pedido creado correctamente", data: nuevoPedido });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ error: "Error al crear el pedido" });
    }
};

// Actualizar un pedido
export const updatePedido = (req, res) => {
    try {
        const { productos, fecha } = req.body;

        // Si se actualiza productos, validar que existan
        if (productos) {
            const productosDB = Producto.getTodos();
            for (let item of productos) {
                const existe = productosDB.find(p => p.id === Number(item.id));
                if (!existe) {
                    return res.status(400).json({ error: `Producto con id ${item.id} no existe` });
                }
            }
        }

        const actualizado = Pedido.actualizar(req.params.id, {
            productos,
            fecha
        });

        if (!actualizado) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        res.status(200).json({ mensaje: "Pedido actualizado correctamente", data: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pedido" });
    }
};

// Eliminar un pedido
export const deletePedido = (req, res) => {
    try {
        const borrado = Pedido.borrar(req.params.id);
        if (!borrado) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json({ mensaje: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" });
    }
};
