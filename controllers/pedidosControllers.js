import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";


// Leer todos los pedidos (JSON)
export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.getTodos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }

};

// Leer todos los pedidos (HTML)
export const getPedidosVista = async (req, res) => {
    try {
        const pedidos =  await Pedido.find();
        res.render('listaPedidos', { pedidos });
    } catch (error) {
        res.status(500).send({ error: "Error al obtener los pedidos" });
    }
};

// Formulario para crear nuevo pedido
export const formularioNuevoPedido = async (req, res) => {
    try {
        const productos = await Producto.find({ activo: true }); //Buscamos directamente los productos activos
        res.render('nuevoPedido', { productos });
    } catch (error) {
        res.status(500).send("Error a cargar el formulario");
    }
};

// Leer un pedido por ID
export const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ id: Number(req.params.id) });
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el pedido" });
    }
};

// Crear un nuevo pedido
export const createPedido = async (req, res) => {
    try {
        const { id, fecha } = req.body;
        let productos = [];

        // Validaciones básicas
        if (!id || !fecha) {
            return res.status(400).send("Faltan datos obligatorios: id y fecha");
        }

        // Si viene desde Thunder Client (JSON)
        if (req.body.productos) {
            productos = req.body.productos;
        }

        else {

            // Construir array de productos desde los campos del formulario
            const productosDB = await Producto.find({ activo: true });

            for (let producto of productosDB) {
                const cantidad = req.body[`cantidad_${producto.id}`];
                if (cantidad && Number(cantidad) > 0) {
                    productos.push({
                        id: producto.id,
                        cantidad: Number(cantidad)
                    });
                }
            }
        }

        // Validar que haya al menos un producto
        if (productos.length === 0) {
            return res.status(400).send("Debe seleccionar al menos un producto");
        }

        //guardamos en mongo  db
        await Pedido.create({
            id: Number(id),
            productos,
            fecha
        });

        // Redirigir a la lista de pedidos
        res.redirect('/pedidos');

    } catch (error) {
        console.log("ATENCIÓN, EL ERROR REAL ES:", error);
        res.status(500).send("Error al crear el pedido");
    }
};

// Actualizar un pedido
export const updatePedido = async (req, res) => {
    try {
        const { productos, fecha } = req.body;

        // Si se actualiza productos, validar que existan
        if (productos) {
            const productosDB = await Producto.find();
            for (let item of productos) {
                const existe = productosDB.find(p => p.id === Number(item.id));
                if (!existe) {
                    return res.status(400).json({ error: `Producto con id ${item.id} no existe` });
                }
            }
        }

        const actualizado = await Pedido.findOneAndUpdate(
            { id: Number(req.params.id) },
            { productos, fecha },
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        res.status(200).json({ mensaje: "Pedido actualizado correctamente", data: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pedido" });
    }
};

// Eliminar un pedido
export const deletePedido = async (req, res) => {
    try {
        const borrado =  await Pedido.findOneAndDelete({ id: Number(req.params.id) });

        if (!borrado) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json({ mensaje: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el pedido" });
    }
};
