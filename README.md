# ParabellumDEVS

Backend escolar desarrollado en Node.js con Express y MongoDB para gestionar una panificadora: productos, sucursales, pedidos, stock y usuarios.

## Tecnologías

- Node.js 18+
- Express 5
- MongoDB con Mongoose
- Pug para vistas
- express-session para sesiones
- bcrypt para hash de contraseñas
- dotenv para variables de entorno
- socket.io para chat en tiempo real
- jsonwebtoken para tokens de chat

## Dependencias

Las dependencias del proyecto están definidas en `package.json`:

- `bcrypt`
- `dotenv`
- `express`
- `express-session`
- `jsonwebtoken`
- `mongoose`
- `pug`
- `socket.io`

## Estructura del proyecto

- `index.js`: punto de entrada, configuración del servidor y registro de rutas.
- `config/db.js`: conexión a MongoDB.
- `routes/`: definición de rutas para usuarios, productos, pedidos, stock, sucursales y chat.
- `controllers/`: lógica de negocio y manipuladores CRUD.
- `models/`: esquemas de Mongoose para cada colección.
- `middleware/`: autenticación, autorización y manejo de errores.
- `views/`: plantillas Pug.
- `public/`: archivos estáticos.
- `scripts/`: utilidades de seed y limpieza de sucursales.
- `utils/`: utilidades generales como generación de IDs.

## Requisitos

- Node.js 18 o superior
- MongoDB local o Atlas

## Configuración

1. Crear un archivo `.env` en la raíz del proyecto.
2. Copiar el contenido de `.env.example` o usar el siguiente ejemplo:

```env
MONGO_URI="mongodb+srv://guinovillo_db_user:###@cluster0.###.mongodb.net/panificadora_db?retryWrites=true&w=majority"
PORT=3000
JWT_SECRET="panaderia_espiga_de_oro"
```

3. Instalar dependencias:

```bash
npm install
```

## Ejecutar la aplicación

```bash
npm run dev
```

O en modo producción:

```bash
npm start
```

Luego abrir `http://localhost:3000` en el navegador.

## Cuentas de usuario de prueba

Usa estas credenciales para ingresar al sistema:

- **Admin**
  - Email: `admin@espigadeoro.com`
  - Contraseña: `admin123`

- **Franquicia**
  - Email: `franquiciado@espigadeoro.com`
  - Contraseña: `franquicia123`

- **Sucursal**
  - Email: `colon-1234@espigadeoro.com`
  - Contraseña: `Sucursal123`

> Estas cuentas se usan en el proyecto escolar como ejemplos de acceso.

## Scripts disponibles

- `npm start` — iniciar el servidor en producción.
- `npm run dev` — iniciar en modo observación con `node --watch`.
- `npm run seed:sucursales` — cargar sucursales de ejemplo.
- `npm run clean:sucursales` — eliminar sucursales de prueba.

## Rutas principales

### Autenticación

- `GET /login` — mostrar formulario de login.
- `POST /login` — iniciar sesión.
- `POST /logout` — cerrar sesión.

### Productos (solo admin)

- `GET /productos` — lista de productos en HTML.
- `GET /api/productos` — lista de productos en JSON.
- `GET /productos/nuevo` — formulario para crear un producto.
- `GET /productos/editar/:id` — formulario de edición.
- `GET /productos/:id` — obtener un producto por ID.
- `POST /productos` — crear producto.
- `PUT /productos/:id` — actualizar producto.
- `DELETE /productos/:id` — dar de baja un producto.

### Pedidos (auth requerido)

- `GET /pedidos` — lista de pedidos en HTML.
- `GET /api/pedidos` — lista de pedidos en JSON.
- `GET /pedidos/nuevo` — formulario de nuevo pedido.
- `GET /pedidos/editar/:id` — editar un pedido.
- `GET /pedidos/:id` — obtener pedido por ID.
- `POST /pedidos` — crear pedido.
- `PUT /pedidos/:id` — actualizar pedido.
- `DELETE /pedidos/:id` — eliminar pedido.
- `PATCH /pedidos/:id/estado` — actualizar estado del pedido (solo admin).
- `PATCH /api/pedidos/:id/estado` — actualizar estado por API (solo admin).

### Sucursales (solo admin)

- `GET /sucursales` — lista en HTML.
- `GET /api/sucursales` — lista en JSON.
- `GET /sucursales/nuevo` — formulario de nueva sucursal.
- `GET /sucursales/editar/:id` — formulario de edición.
- `GET /sucursales/:id` — obtener sucursal por ID.
- `POST /sucursales` — crear sucursal.
- `PUT /sucursales/:id` — actualizar sucursal.
- `DELETE /sucursales/:id` — eliminar sucursal.

### Stock (solo admin)

- `GET /stock` — vista de stock.
- `GET /stock/cargar` — formulario para cargar stock.
- `POST /stock/cargar` — guardar inventario.

### Chat / Socket

- `GET /api/chat/token` — endpoint para obtener token de chat (requiere autenticación).

## Modelo de datos

### Usuario

- `email` — String
- `password` — String (hash)
- `nombre` — String
- `rol` — `admin` o `franquicia`

### Producto

- `id` — Number
- `nombre` — String
- `precio` — Number
- `tipo` — String
- `activo` — Boolean

### Pedido

- `id` — Number
- `productos` — Array de objetos con `id` y `cantidad`
- `fecha` — String

### Sucursal

- `id` — Number
- `nombre` — String
- `direccion` — String
- `activo` — Boolean

## Notas importantes

- El proyecto usa IDs autoincrementales para entidades como productos y pedidos.
- La autorización se maneja con sesiones y middleware de roles.
- Para el servidor educativo, no dependas de una base de datos local. Define `MONGO_URI` apuntando a la base de datos remota o accesible desde el servidor.
- Si el servidor sólo accede a MongoDB desde la red de la escuela, usa la URI remota proporcionada por el entorno educativo.
- `JWT_SECRET` es obligatorio en `.env` para que la generación de tokens de chat funcione. En este proyecto escolar está bien usar una clave sencilla.

