# Documentación del Proyecto - Sistema de Gestión de Productos

## Descripción General
Sistema de gestión de productos para panaderías desarrollado con **Node.js** y **Express**. Utiliza **Pug** como motor de plantillas y almacena datos en JSON.

---

## Estructura del Proyecto

```
Backend/
├── index.js                    # Archivo principal
├── package.json               # Dependencias y configuración
├── controllers/
│   └── productosControllers.js # Controladores CRUD
├── models/
│   └── Producto.js           # Modelo de datos
├── routes/
│   └── productosRoutes.js     # Rutas de la aplicación
├── views/
│   ├── home.pug              # Página principal
│   ├── index.pug             # Lista de productos
│   ├── layout.pug            # Layout base
│   └── nuevoProducto.pug     # Formulario nuevo producto
└── data/
    └── productos.json        # Base de datos (JSON)
```

---

## Dependencias

```json
{
  "dependencies": {
    "express": "^5.2.1",
    "pug": "^3.0.4"
  },
  "type": "module",
  "name": "parabellum_devs",
  "version": "0.0.1",
  "description": "software para panaderias"
}
```

### Scripts disponibles:
- `npm start` - Inicia el servidor
- `npm run dev` - Inicia en modo observación (watch)

---

## 1. Archivo Principal: `index.js`

Configura y ejecuta el servidor Express en el puerto 3000.

```javascript
import express from 'express'
const app = express();

import productosRoutes from './routes/productosRoutes.js';

app.use(express.json());
// Para manejar datos enviados a través de formularios HTML
app.use(express.urlencoded({ extended: true }));

//Configura el motor de renderizado Pug y carpetas de vistas
app.set('view engine', 'pug');
app.set('views', './views');

app.use(productosRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto http://localhost:${PORT}`)
})
```

**Características:**
- Configura Express como servidor
- Habilita parseo de JSON y formularios
- Establece Pug como motor de vistas
- Define ruta raíz `/` que renderiza `home.pug`
- Escucha en puerto 3000

---

## 2. Modelo: `models/Producto.js`

Define la estructura de datos y métodos CRUD para productos.

```javascript
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(),'data','productos.json');

class Producto {
    constructor (id, nombre, precio, tipo, activo=true){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.tipo=tipo;
        this.activo=activo;
    }

    static getTodos(){
        try {
            const data = fs.readFileSync(dataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return[];
        }
    }

    static guardarDatos(productos) {
        fs.writeFileSync(dataPath, JSON.stringify(productos,null,2))
    }

    static crear(datos) {
        const productos = this.getTodos();
        const nuevoProducto = new Producto(
            Number(datos.id),
            datos.nombre,
            Number(datos.precio),
            datos.tipo
        )
        productos.push(nuevoProducto);
        this.guardarDatos(productos);
        return nuevoProducto;
    }

    static buscarPorID(id){
        const producto = this.getTodos();
        return producto.find(p => p.id === Number(id));
    }

    static actualizar(id, datosNuevos){
        const productos = this.getTodos();
        const index = productos.findIndex(p => p.id === Number(id));

        if (index === -1) return null;

        productos[index] = {...productos[index], ...datosNuevos};
        this.guardarDatos(productos);
        return productos[index];
    }

    static borrar(id) {
        const productos = this.getTodos();
        const index = productos.findIndex(p => p.id === Number(id));
 
        if (index === -1 ) return null;

        productos[index].activo = false; 
        this.guardarDatos(productos);
        return productos[index];
    }
}

export default Producto;
```

### Métodos:
- **`getTodos()`** - Obtiene todos los productos del JSON
- **`guardarDatos()`** - Guarda productos en el archivo JSON
- **`crear()`** - Crea un nuevo producto
- **`buscarPorID()`** - Busca un producto por ID
- **`actualizar()`** - Actualiza datos de un producto
- **`borrar()`** - Marca un producto como inactivo

---

## 3. Controladores: `controllers/productosControllers.js`

Maneja la lógica de negocio y las respuestas HTTP.

```javascript
import Producto from "../models/Producto.js";

// CREAR PRODUCTO
export const createProducto = (req, res) => {
    try {
        const { id, nombre, precio, tipo, activo } = req.body;
        const activoBoolean = activo === 'on';

        if (!id || !nombre || !precio || !tipo) {
            return res.status(400).json({ error: "Faltan datos obligatorios" })
        }

        const nuevo = Producto.crear({
            id: Number(id),
            nombre,
            precio: Number(precio),
            tipo,
            activo: activoBoolean
        });

        res.redirect('/productos');
    } catch (error) {
        console.log("ATENCIÓN, EL ERROR REAL ES:", error);
        res.status(500).send({ error: "Error al crear el producto" });
    };
}

// MOSTRAR FORMULARIO
export const formularioNuevoProducto = (req, res) => {
    res.render('nuevoProducto');
};

// OBTENER TODOS LOS PRODUCTOS
export const getProductos = (req, res) => {
    try {
        let productos = Producto.getTodos();
        productos = productos.filter(p => p.activo === true);

        res.render('index', { productos });
    } catch (error) {
        res.status(500).send("Error");
    }
};

// OBTENER PRODUCTO POR ID
export const getProductoById = (req, res) => {
    const producto = Producto.buscarPorID(req.params.id);
    if (!producto || !producto.activo) {
        return res.status(404).json({ error: "Producto no encontrado o inactivo" });
    }
    res.status(200).json(producto);
};

// ACTUALIZAR PRODUCTO
export const updateProducto = (req, res) => {
    try {
        const actualizado = Producto.actualizar(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: "No se pudo actualizar, producto no encontrado" });
        }
        res.status(200).json({ mensaje: "Actualizado correctamente", data: actualizado });
    } catch (error) {
        res.status(500).json({ error: "Error interno al actualizar el producto" });
    }
};

// ELIMINAR PRODUCTO
export const deleteProducto = (req, res) => {
    const borrado = Producto.borrar(req.params.id);
    if (!borrado) {
        return res.status(404).json({ error: "No se pudo eliminar, producto no encontrado" })
    }
    res.status(200).json({ mensaje: "Producto desactivado correctamente" });
};
```

### Funciones:
- **`createProducto`** - POST - Crea nuevo producto (valida datos)
- **`formularioNuevoProducto`** - GET - Renderiza formulario
- **`getProductos`** - GET - Lista productos activos
- **`getProductoById`** - GET - Obtiene un producto específico (JSON)
- **`updateProducto`** - PUT - Actualiza un producto
- **`deleteProducto`** - DELETE - Desactiva un producto

---

## 4. Rutas: `routes/productosRoutes.js`

Define los endpoints de la API.

```javascript
import express from 'express';

import {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
    formularioNuevoProducto
} from '../controllers/productosControllers.js'

const router = express.Router();

router.get('/productos', getProductos);                      // Leer todos
router.get('/productos/nuevo', formularioNuevoProducto);    // Formulario crear
router.get('/productos/:id', getProductoById);              // Leer uno
router.post('/productos', createProducto);                  // Crear nuevo
router.put('/productos/:id', updateProducto);               // Modificar
router.delete('/productos/:id', deleteProducto);            // Eliminar

export default router;
```

### Endpoints:
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página principal |
| GET | `/productos` | Lista de productos |
| GET | `/productos/nuevo` | Formulario nuevo producto |
| GET | `/productos/:id` | Obtener producto por ID (JSON) |
| POST | `/productos` | Crear nuevo producto |
| PUT | `/productos/:id` | Actualizar producto |
| DELETE | `/productos/:id` | Eliminar/desactivar producto |

---

## 5. Vistas Pug

### `views/layout.pug` (Base)
```pug
extends layout
block content
```

### `views/home.pug` (Página principal)
Se renderiza en la ruta `/`

### `views/nuevoProducto.pug` (Formulario)
```pug
extends layout

block content
    h2 Nuevo Producto

    form(method='POST', action='/productos')
        label ID:
        input(type='number', name='id', required)

        br

        label Nombre:
        input(type='text', name='nombre', required)

        br

        label Precio:
        input(type='number', name='precio', required)

        br

        label Tipo:
        input(type='text', name='tipo', required)

        br

        label Activo:
        input(type='checkbox', name='activo')

        br
        br

        button(type='submit') Crear Producto
```

### `views/index.pug` (Lista de productos)
```pug
extends layout

block content
    h1 Lista de Productos

    table(border='1')
        tr
            th ID
            th Nombre
            th Precio
            th Tipo
            th Activo

        each producto in productos
            tr
                td #{producto.id}
                td #{producto.nombre}
                td #{producto.precio}
                td #{producto.tipo}
                td #{producto.activo ? 'Sí' : 'No'}
```

---

## Flujo de Funcionamiento

### Crear un producto:
1. Usuario accede a `/productos/nuevo`
2. Se renderiza el formulario (`nuevoProducto.pug`)
3. Usuario completa los datos y hace submit
4. Formulario envía POST a `/productos`
5. `createProducto` valida y crea el producto
6. Se redirige a `/productos` (lista actualizada)

### Listar productos:
1. Usuario accede a `/productos`
2. `getProductos` obtiene todos los productos activos
3. Se renderiza `index.pug` con los datos

### Actualizar/Eliminar:
- PUT `/productos/:id` - Actualiza producto
- DELETE `/productos/:id` - Marca como inactivo

---

## Base de Datos: `data/productos.json`

Almacena los productos en formato JSON:

```json
[
  {
    "id": 1,
    "nombre": "Pan Blanco",
    "precio": 2.50,
    "tipo": "Pan",
    "activo": true
  },
  {
    "id": 2,
    "nombre": "Croissant",
    "precio": 1.80,
    "tipo": "Pastelería",
    "activo": true
  }
]
```

---

## Cómo ejecutar el proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```
   o en modo desarrollo:
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   - Principal: `http://localhost:3000`
   - Productos: `http://localhost:3000/productos`
   - Nuevo producto: `http://localhost:3000/productos/nuevo`

---

## Características principales

✅ **CRUD completo** - Crear, Leer, Actualizar, Eliminar  
✅ **Almacenamiento persistente** - JSON en servidor  
✅ **Interfaz web** - Con Pug templates  
✅ **Validación de datos** - Campos obligatorios  
✅ **Soft delete** - Los productos se marcan como inactivos  
✅ **API REST** - Endpoints JSON disponibles  

---

## Posibles mejoras futuras

- [ ] Agregar autenticación
- [ ] Implementar base de datos (MongoDB, PostgreSQL)
- [ ] Validación más robusta
- [ ] Frontend con React/Vue
- [ ] Búsqueda y filtros avanzados
- [ ] Paginación
- [ ] Tests unitarios
