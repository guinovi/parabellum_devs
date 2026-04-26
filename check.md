Este es el checklist técnico basado estrictamente en los requerimientos de tu entrega. Usalo para dividir y asignar las tareas. 


### Fase 1: Arquitectura y Configuración Base
- [x] [cite_start]**Estructura del Proyecto:** Crear la estructura de carpetas respetando el patrón MVC (models, controllers, routes, data, views)[cite: 85].
- [x] [cite_start]**Separación Modular:** Asegurar que cada CRUD tenga sus propios archivos de rutas, controladores y modelos independientes[cite: 39].
- [x] [cite_start]**Persistencia de Datos (JSON):** Configurar el almacenamiento en memoria utilizando archivos `.json` ubicados dentro de una carpeta `/data/`[cite: 151].
- [x] **Dependencias:** Instalar Express y configurar Pug como motor de plantillas.

### Fase 2: Desarrollo Backend - Caso 4 (La Espiga de Oro)
<!-- - [ ] [cite_start]**Modelo - Actores:** Crear el CRUD para gestionar Sucursales (propias) y Franquicias[cite: 78]. -->
- [x] [cite_start]**Modelo - Productos/Insumos:** Crear el CRUD básico para los productos que produce la planta[cite: 82].
- [x] [cite_start]**Modelo - Pedidos (Core):** Crear el CRUD de pedidos asegurando la relación entre el actor (sucursal/franquicia) y los productos[cite: 81].
<!-- - [ ] [cite_start]**Lógica de Estado de Pedidos:** Implementar la validación de estados del pedido: *pendiente, en producción, despachado, entregado*[cite: 82]. -->
- [x] [cite_start]**Interacción entre Módulos:** Validar que al crear un pedido, la sucursal/franquicia y los productos referenciados existan en el sistema[cite: 14, 15].
- [x] [cite_start]**Manejo de Errores y Validaciones:** Implementar validaciones de datos obligatorios y retorno de códigos de estado HTTP adecuados[cite: 38, 39, 85].
<!-- - [ ] [cite_start]**Prevención de Eliminación:** Bloquear la eliminación de una sucursal, franquicia o producto si tienen pedidos activos asociados[cite: 27, 28]. -->

### Fase 3: Vistas (Portal con Pug)
- [x] [cite_start]**Layout Base:** Crear el archivo `layout.pug` con la estructura HTML, header, footer y barra de navegación[cite: 157].
- [x] [cite_start]**Vistas del Portal de Franquiciados:** Desarrollar las vistas para el "portal de pedidos" que exige el caso, permitiendo a los franquiciados realizar solicitudes estructuradas[cite: 83].
- [x] [cite_start]**Vistas CRUD:** Implementar vistas para listar (ej. `index.pug`), ver detalle (ej. `detail.pug`), y crear/editar (ej. `nuevo.pug`) al menos para los pedidos y productos[cite: 155, 159, 160].

### Fase 4: Documentación
- [x] [cite_start]**Nomenclatura del Documento:** Nombrar el archivo de documentación y la carpeta de Google Drive exactamente con el formato: `DSWB_2#_#################_1C26`[cite: 108].
- [ ] [cite_start]**Estructura del Documento:** Completar el template exigido incluyendo links (Drive, GitHub, Video) y Bibliografía[cite: 110, 111, 119].
- [x] [cite_start]**Intro y Funcionalidades:** Redactar la introducción y los objetivos generales/funcionalidades del Caso 4[cite: 112, 116].
- [x] [cite_start]**Módulos y Persistencia:** Describir los módulos desarrollados y explicar la persistencia de datos en JSON[cite: 117, 118].
- [x] [cite_start]**Pruebas (Capturas):** Adjuntar capturas de pantalla de las peticiones HTTP probadas con Thunder Client (mostrando métodos GET/POST, URL y Status Codes)[cite: 154].
- [ ] [cite_start]**Video (Opcional en esta entrega):** Grabar una demo técnica de máximo 10 minutos mostrando el funcionamiento y la explicación de la arquitectura[cite: 41, 42].

### Fase 5: Entregables y Administración
- [ ] **Campus/Moodle:** Subir **únicamente** el link del Google Drive en el área de entrega del TP.
- [ ] **Foro ("Oficinas de trabajo"):** Realizar la publicación incluyendo la siguiente información estricta:
  - [ ] Nombre de la empresa de desarrollo.
  - [ ] Número de caso (Caso 4: Panificadora Industrial "La Espiga de Oro S.R.L.").
  - [ ] Breve comentario (1 o 2 párrafos sobre lo que desarrollaron).
  - [ ] Link al Drive.
  - [ ] Lista completa de los integrantes del grupo.
  - [ ] Video.

