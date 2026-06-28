import Usuario from "../models/Usuario.js";

// Mostrar formulario de login
export const formularioLogin = (req, res) => {
    // si ya estaba logueado, mandar al home
    if (req.session && req.session.usuario) {
        return res.redirect('/');
    }
    res.render('login');
};

// Procesar login
export const loginUsuario = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', { error: "Email y contraseña son obligatorios" });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).render('login', { error: "Credenciales inválidas" });
        }

        const passwordMatch = await usuario.comparePassword(password);

        if (!passwordMatch) {
            // Transitional fallback para usuarios con contraseña en texto plano
            if (usuario.password === password) {
                usuario.password = password;
                await usuario.save();
            } else {
                return res.status(401).render('login', { error: "Credenciales inválidas" });
            }
        }

        // Guarda los datos del usuario en sesión
        req.session.usuario = {
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol
        };

        res.redirect('/');

    } catch (error) {
        next(error);
    }
};

// Cerrar sesión
export const logoutUsuario = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            return next(error);
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
};
