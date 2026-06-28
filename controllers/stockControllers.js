import Stock from "../models/Stock.js";
import Producto from "../models/Producto.js";

// Ver stock de todos los productos (HTML)
export const getStockVista = async (req, res, next) => {
    try {
        const stocks = await Stock.find().sort({ producto: 1 });

        // Enriquecer con datos del producto
        const stockConProducto = await Promise.all(
            stocks.map(async (stock) => {
                const producto = await Producto.findOne({ id: stock.producto });
                return {
                    ...stock.toObject(),
                    nombreProducto: producto ? producto.nombre : 'Producto no encontrado',
                    bajominimo: stock.cantidad <= stock.stockMinimo
                };
            })
        );

        res.render('listaStock', { stocks: stockConProducto });
    } catch (error) {
        next(error);
    }
};

// Formulario para cargar stock
export const formularioCargarStock = async (req, res, next) => {
    try {
        const productos = await Producto.find({ activo: true });
        res.render('cargarStock', { productos });
    } catch (error) {
        next(error);
    }
};

// Cargar o actualizar stock manualmente (admin)
export const cargarStock = async (req, res, next) => {
    try {
        const { productoId, cantidad } = req.body;

        const producto = await Producto.findOne({ id: Number(productoId) });
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const stockMinimo = producto.unidad === 'kg' ? 3 : 20;

        // Si ya existe el stock lo actualiza, si no lo crea
        const stock = await Stock.findOneAndUpdate(
            { producto: Number(productoId) },
            {
                $inc: { cantidad: Number(cantidad) }, // suma al stock existente
                unidad: producto.unidad,
                stockMinimo
            },
            { new: true, upsert: true } // upsert: crea si no existe
        );

        res.redirect('/stock');
    } catch (error) {
        next(error);
    }
};

// Descontar stock al crear un pedido (se llama desde pedidoController)
export const descontarStock = async (productos) => {
    for (const item of productos) {
        const stock = await Stock.findOne({ producto: item.id });

        if (!stock) {
            throw new Error(`No hay stock registrado para el producto ${item.id}`);
        }

        if (stock.cantidad < item.cantidad) {
            throw new Error(`Stock insuficiente para el producto ${item.id}. Disponible: ${stock.cantidad} ${stock.unidad}`);
        }

        const cantidadRestante = stock.cantidad - item.cantidad;

        if (cantidadRestante < stock.stockMinimo) {
            const maxPermitido = stock.cantidad - stock.stockMinimo;
            if (maxPermitido <= 0) {
                throw new Error(`El producto ${item.id} alcanzó su stock mínimo (${stock.stockMinimo} ${stock.unidad}). No se pueden realizar pedidos hasta que se reponga el stock.`);
            }
            throw new Error(`La cantidad solicitada para el producto ${item.id} supera el límite permitido. Máximo disponible para pedir: ${maxPermitido} ${stock.unidad}`);
        }

        stock.cantidad -= item.cantidad;
        await stock.save();
    }
};