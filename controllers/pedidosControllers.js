import Pedido, { ESTADOS_VALIDOS } from "../models/Pedido.js";
import Producto from "../models/Producto.js";
import { getNextPedidoId } from "../utils/idGenerator.js";

// Estados para las transiciones de los pedidos
const TRANSICIONES = {
    'pendiente': 'en producción',
    'en producción': 'despachado',
    'despachado': 'entregado',
    'entregado': null
};

// Mapeo de estado a campo de fecha
const FECHAS_ESTADO = {
    'en producción': 'fechaProduccion',
    'despachado': 'fechaDespacho',
    'entregado': 'fechaEntrega'
};

// Leer todos los pedidos (JSON)
export const getPedidos = async (req, res, next) => {
    try {
        const pedidos = await Pedido.find().sort({ id: 1 });
        res.status(200).json(pedidos);
    } catch (error) {
        next(error);
    }
};

// Leer todos los pedidos (HTML)
export const getPedidosVista = async (req, res, next) => {
    try {
        const usuario = req.session.usuario;

        const filtro = usuario.rol === 'admin'
            ? {}
            : { creadoPor: usuario.alias };

        const pedidos = await Pedido.find(filtro).sort({ id: 1 });
        res.render('listaPedidos', { pedidos });
    } catch (error) {
        next(error);
    }
};

// Formulario para crear nuevo pedido
export const formularioNuevoPedido = async (req, res, next) => {
    try {
        const productos = await Producto.find({ activo: true });
        const fechaHoy = new Date().toISOString().split('T')[0];
        res.render('nuevoPedido', { productos, fechaHoy });
    } catch (error) {
        next(error);
    }
};

// Leer un pedido por ID
export const getPedidoById = async (req, res, next) => {
    try {
        const pedido = await Pedido.findOne({ id: Number(req.params.id) });
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo pedido
export const createPedido = async (req, res, next) => {
    try {
        const { fecha } = req.body;
        let productos = [];

        if (!fecha) {
            return res.status(400).send("Faltan datos obligatorios: fecha");
        }

        if (req.body.productos) {
            productos = req.body.productos;
        } else {
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

        if (productos.length === 0) {
            return res.status(400).send("Debe seleccionar al menos un producto");
        }

        const nuevoId = await getNextPedidoId();

        await Pedido.create({
            id: nuevoId,
            productos,
            fecha,
            creadoPor: req.session.usuario.alias,
            fechaCreacion: new Date()
        });

        res.redirect('/pedidos');

    } catch (error) {
        next(error);
    }
};

// Actualizar un pedido
export const updatePedido = async (req, res, next) => {
    try {
        const { productos, fecha } = req.body;

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
        next(error);
    }
};

// Eliminar un pedido
export const deletePedido = async (req, res, next) => {
    try {
        const borrado = await Pedido.findOneAndDelete({ id: Number(req.params.id) });

        if (!borrado) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json({ mensaje: "Pedido eliminado correctamente" });
    } catch (error) {
        next(error);
    }
};

// Cambio de estado en los pedidos
export const actualizarEstadoPedido = async (req, res, next) => {
    const { estado } = req.body;

    if (!ESTADOS_VALIDOS.includes(estado)) {
        return res.status(400).json({
            error: `Estado inválido. Los permitidos son: ${ESTADOS_VALIDOS.join(', ')}`
        });
    }

    try {
        const pedido = await Pedido.findOne({ id: Number(req.params.id) });

        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }

        const siguienteEstado = TRANSICIONES[pedido.estado];

        if (siguienteEstado === undefined) {
            return res.status(400).json({ error: `El estado actual '${pedido.estado}' no es válido.` });
        }

        if (siguienteEstado === null) {
            return res.status(400).json({ error: "El pedido ya fue entregado, no puede cambiar de estado." });
        }

        if (siguienteEstado !== estado) {
            return res.status(400).json({
                error: `Transición inválida: '${pedido.estado}' → '${estado}'. El siguiente estado permitido es '${siguienteEstado}'.`
            });
        }

        // Actualizar estado y guardar fecha correspondiente
        pedido.estado = estado;
        if (FECHAS_ESTADO[estado]) {
            pedido[FECHAS_ESTADO[estado]] = new Date();
        }
        await pedido.save();

        res.status(200).json({ mensaje: "Estado actualizado correctamente", data: pedido });

    } catch (error) {
        next(error);
    }
};