import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

export const getChatToken = (req, res) => {
    if (!req.session || !req.session.usuario) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error('ERROR CRÍTICO: JWT_SECRET no está definido en .env');
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const usuario = req.session.usuario;

    const token = jwt.sign(
        {
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol,
            alias: usuario.alias || null
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
};
