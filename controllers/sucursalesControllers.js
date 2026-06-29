import Sucursal from '../models/Sucursal.js';
import { getNextSucursalId } from '../utils/idGenerator.js';

export const getSucursales = async (req, res, next) => {
    try {
        const filtro = { activo: true };
        if (req.query.tipo) {
            filtro.tipo = req.query.tipo;
        }
        const sucursales = await Sucursal.find(filtro).sort({ id: 1 });
        res.status(200).json(sucursales);
    } catch (error) {
        next(error);
    }
};

export const getSucursalesVista = async (req, res, next) => {
    try {
        const filtro = { activo: true };
        const tipoFiltro = req.query.tipo || '';
        if (tipoFiltro) {
            filtro.tipo = tipoFiltro;
        }
        const sucursales = await Sucursal.find(filtro).sort({ id: 1 });
        res.render('listaSucursales', { sucursales, tipoFiltro });
    } catch (error) {
        next(error);
    }
};

export const crearSucursal = async (req, res, next) => {
    try {
        const {
            nombre,
            tipo,
            direccion,
            alias,
            ciudad,
            provincia,
            telefono,
            email,
            responsable,
            activo
        } = req.body;

        if (!nombre || !tipo || !direccion || !alias) {
            return res.status(400).send('Faltan datos obligatorios');
        }

        const nuevoId = await getNextSucursalId();
        const activoBoolean = activo === 'on';

        await Sucursal.create({
            id: nuevoId,
            nombre,
            tipo,
            direccion,
            alias,
            ciudad: ciudad || 'Córdoba',
            provincia: provincia || 'Córdoba',
            telefono: telefono || '',
            email: email || '',
            responsable: responsable || '',
            activo: activoBoolean,
            seeded: true
        });

        res.redirect('/sucursales');
    } catch (error) {
        next(error);
    }
};

export const formularioNuevaSucursal = (req, res) => {
    res.render('nuevoSucursal');
};

export const formularioEditarSucursal = async (req, res, next) => {
    try {
        const sucursal = await Sucursal.findOne({ id: Number(req.params.id) });
        if (!sucursal) {
            return res.status(404).send('Sucursal no encontrada');
        }
        res.render('editarSucursal', { sucursal });
    } catch (error) {
        next(error);
    }
};

export const getSucursalById = async (req, res, next) => {
    try {
        const sucursal = await Sucursal.findOne({ id: Number(req.params.id), activo: true });
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada o inactiva' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        next(error);
    }
};

export const updateSucursal = async (req, res, next) => {
    try {
        const datos = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            direccion: req.body.direccion,
            alias: req.body.alias,
            ciudad: req.body.ciudad || 'Córdoba',
            provincia: req.body.provincia || 'Córdoba',
            telefono: req.body.telefono || '',
            email: req.body.email || '',
            responsable: req.body.responsable || ''
        };

        if (typeof req.body.activo !== 'undefined') {
            datos.activo = req.body.activo === 'on' || req.body.activo === true || req.body.activo === 'true';
        }

        const actualizado = await Sucursal.findOneAndUpdate(
            { id: Number(req.params.id) },
            datos,
            { new: true }
        );

        if (!actualizado) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }

        res.status(200).json({ mensaje: 'Actualizado correctamente', data: actualizado });
    } catch (error) {
        next(error);
    }
};

export const deleteSucursal = async (req, res, next) => {
    try {
        const borrado = await Sucursal.findOneAndUpdate(
            { id: Number(req.params.id) },
            { activo: false },
            { new: true }
        );

        if (!borrado) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.status(200).json({ mensaje: 'Sucursal desactivada correctamente', data: borrado });
    } catch (error) {
        next(error);
    }
};
