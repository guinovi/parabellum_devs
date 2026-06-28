# pendientes para 3 entrega
**Lógica de Estado de Pedidos:** Implementar la validación de estados del pedido: *pendiente, en producción, despachado, entregado*




# Checklist de Requisitos - Parcial de Desarrollo Web Backend

## 1. Arquitectura y Código (Node.js/Express)
- [x] Implementar arquitectura modular y organizada basada en el patrón MVC.
- [x] Separar claramente responsabilidades: rutas, controladores, modelos y vistas.
- [x] Utilizar programación asincrónica (`async`/`await`).
- [x] Implementar middlewares, manejo de rutas, controladores y manejo centralizado de errores.
- [x] Implementar validaciones simples de entrada/datos.
- [x] Completar los flujos CRUD con la lógica funcional adecuada.
- [x] Implementar el control de roles de usuario (crítico).
- [x] Garantizar consistencia en el manejo de rutas y la conexión entre módulos.

## 2. Base de Datos
# Checklist 3° Parcial - Desarrollo Web BackEnd

## 1. Código (Desarrollo, Arquitectura y Pruebas)

### Arquitectura Base y Base de Datos
- [x] Desarrollar en Node.js y Express.
- [x] Aplicar patrón MVC estructurando las carpetas adecuadamente.
- [x] Configurar rutas dinámicas, asincronía y variables de entorno separadas.
- [x] Conectar la aplicación a MongoDB Atlas (soporte vía `MONGO_URI`) y/o Mongo local.
- [x] Construir un modelo de datos coherente con entidades, relaciones y validaciones (Planta, Sucursales, Franquicias, Pedidos, Productos).

### Lógica, Seguridad y Calidad

### Front-end y experiencia de uso (implementado)
- [x] Limpiar los estilos inline y centralizar en `public/styles.css`.
- [x] Unificar botones, alertas y tablas con clases reutilizables.
- [x] Mejorar el layout responsive de vistas principales (`home`, `login`, listas y formularios).
- [x] Agregar feedback visual claro para errores, éxito y estados vacíos.
- [x] Evaluar/usar librería de interfaz o íconos cuando ayuda a la consistencia.

### Implementaciones específicas
- [x] Agregar `estado` al modelo `Pedido`.
- [x] Validar estados permitidos: Pendiente, En Producción, Despachado, Entregado.
- [x] Lógica de transición de estado en controladores y endpoints para actualizar solo el estado.

## 2. El Resto (Documentación, Video y Entregables)

### Formato PDF y Estructura
- [ ] Nombrar archivo PDF: `DSWB_EntregaFinal_2026_Com#_Grupo#_Apellido#_Apellido#`.
- [ ] Incluir Carátula completa y un Índice.
- [ ] Unificar todo el contenido en un solo documento.
- [ ] Insertar en el documento los enlaces a GitHub, Google Drive, la aplicación desplegada y el video de defensa.

### Contenido de la Documentación
- [ ] Detallar los requerimientos funcionales y no funcionales del sistema.
- [ ] Incluir diagramas: Casos de uso, Clases, Secuencia y Modelo ER.
- [ ] Explicar la planificación: estimación de tiempos, uso de tableros e historias de usuario.
- [ ] Describir el funcionamiento general, los módulos principales y su interacción.
- [ ] Explicar el Mantenimiento y Evolución (errores corregidos, mejoras en rendimiento/seguridad) respecto a la versión anterior.
- [ ] Justificar explícitamente la no utilización de temas teóricos o la inclusión de módulos extra.
- [ ] Documentar el objetivo, procedimiento y resultado de las pruebas realizadas.
- [ ] Especificar la asignación de roles y las responsabilidades del equipo.
- [ ] Redactar la conclusión (aprendizajes, dificultades, intereses, puntos a reforzar).
- [ ] Listar bibliografía y detallar el uso y adaptación de prompts de IA.

### Repositorio y Video
- [ ] Completar el README en GitHub con instrucciones de uso y dependencias.
- [ ] Grabar defensa en equipo (ej. Meet/Zoom) mostrando a todos los integrantes explicando su parte del trabajo.
- [ ] Incluir en el video la demostración práctica de las pruebas (éxitos y manejo de errores).
- [ ] Configurar los permisos de visualización del video (el archivo de video no debe subirse al campus).

### Gestión en Drive y Campus
- [ ] Organizar el Drive en carpetas: "Primer entrega", "Segunda Entrega", "Tercera Entrega".
- [ ] Subir al Drive el código final SIN comprimir, el PDF, el video y la carpeta "materia de trabajo".
- [ ] Separar la entrega de código en versiones (ej. 1.0 y 1.1) para evidenciar los cambios.
- [ ] Realizar la entrega individual en el Campus Virtual subiendo una copia del proyecto comprimida (ZIP/RAR).

---

## Checklist combinado — Resumen y estado
- **Lógica de Estado de Pedidos:** Implementar la validación de estados del pedido: *Pendiente, En Producción, Despachado, Entregado*.
- **Control de roles:** Mantener control de roles (Planta, Sucursal, Franquicia, Admin) y permisos para acciones como cambio de estado.
- **Tests y evidencias:** Preparar pruebas en Postman/Thunder y documentar resultados en `test/` o en el PDF.
- **README y despliegue:** Asegurar que `README.md` contenga pasos para instalar, configurar `.env` y desplegar en la nube.

_Archivo limpio y consolidado (duplicados removidos)._ 