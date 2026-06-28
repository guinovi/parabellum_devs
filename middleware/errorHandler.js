const isApiRequest = (req) => req.originalUrl.startsWith('/api/');

export const notFoundHandler = (req, res, next) => {
    const error = new Error('Recurso no encontrado');
    error.statusCode = 404;
    next(error);
};

export const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.statusCode || error.status || 500;
    const isProduction = process.env.NODE_ENV === 'production';
    const message = statusCode === 500 && isProduction
        ? 'Error interno del servidor'
        : error.message || 'Error interno del servidor';

    if (!isProduction) {
        console.error(error.stack || error);
    }

    if (isApiRequest(req)) {
        return res.status(statusCode).json({
            error: true,
            message
        });
    }

    return res.status(statusCode).render('error', {
        statusCode,
        message
    });
};
