# ParabellumDEVS

Backend desarrollado en Node.js con Express y MongoDB para gestionar productos, pedidos y usuarios de una panificadora.

## Tecnologías

- Node.js
- Express
- MongoDB con Mongoose
- Pug para vistas
- express-session para sesiones
- bcrypt para hash de contraseñas
- dotenv para variables de entorno

## Estructura del proyecto

- `index.js`: punto de entrada y configuración de servidor.
- `config/db.js`: conexión a MongoDB.
- `routes/`: definición de rutas para usuarios, productos y pedidos.
- `controllers/`: lógica de negocio y CRUD.
- `models/`: esquemas de Mongoose.
- `middleware/`: autenticación y control de roles.
- `views/`: plantillas Pug.
- `public/`: archivos estáticos.
- `utils/`: utilidades de generación de IDs.

## Requisitos

- Node.js 18+ instalado
- MongoDB local o Atlas

## Configuración

1. Copiar el archivo de entorno (si existe) o definir variables:

```env
MONGO_URI=<tu_uri_de_mongodb>
```

2. Instalar dependencias:

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm run dev
```

Luego abrir `http://localhost:3000` en el navegador.

## Rutas principales

### Autenticación

- `GET /login` — formulario de login
- `POST /login` — iniciar sesión
- `POST /logout` — cerrar sesión

### Productos (solo admin)

- `GET /productos` — lista de productos en HTML
- `GET /api/productos` — lista de productos en JSON
- `GET /productos/nuevo` — formulario nuevo producto
- `POST /productos` — crear producto
- `GET /productos/:id` — obtener producto por ID
- `PUT /productos/:id` — actualizar producto
- `DELETE /productos/:id` — desactivar producto

### Pedidos (auth requerido)

- `GET /pedidos` — lista de pedidos en HTML
- `GET /api/pedidos` — lista de pedidos en JSON
- `GET /pedidos/nuevo` — formulario nuevo pedido
- `GET /pedidos/:id` — obtener pedido por ID
- `POST /pedidos` — crear pedido
- `PUT /pedidos/:id` — actualizar pedido
- `DELETE /pedidos/:id` — eliminar pedido

## Modelo de datos

### Usuario

- `email` (String)
- `password` (String, hash)
- `nombre` (String)
- `rol` (admin | franquicia)

### Producto

- `id` (Number)
- `nombre` (String)
- `precio` (Number)
- `tipo` (String)
- `activo` (Boolean)

### Pedido

- `id` (Number)
- `productos` (Array of { id, cantidad })
- `fecha` (String)

## Notas importantes

- El proyecto usa IDs autoincrementales para productos y pedidos.
- El control de acceso está implementado con sesiones y middleware.
- Aún no hay pruebas automáticas ni manejo de errores centralizado.

## Recomendaciones

- Agregar pruebas unitarias y de integración.
- Añadir middleware global de errores.
- Verificar conexión local a MongoDB si `MONGO_URI` no está definido.
