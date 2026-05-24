// Requiere que el usuario esté logueado
export const requiereAuth = (req, res, next) => {
    if (!req.session || !req.session.usuario) {
        return res.redirect('/login');
    }
    next();
};

// Requiere que el usuario logueado tenga rol admin
export const requiereAdmin = (req, res, next) => {
    if (!req.session || !req.session.usuario) {
        return res.redirect('/login');
    }
    if (req.session.usuario.rol !== 'admin') {
        return res.status(403).render('sinPermisos');
    }
    next();
};
