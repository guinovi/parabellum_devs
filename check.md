# pendientes para 3 entrega
**Lógica de Estado de Pedidos:** Implementar la validación de estados del pedido: *pendiente, en producción, despachado, entregado*




# Checklist de Requisitos - Parcial de Desarrollo Web Backend

## 1. Arquitectura y Código (Node.js/Express)
- [x] Implementar arquitectura modular y organizada basada en el patrón MVC.
- [x] Separar claramente responsabilidades: rutas, controladores, modelos y vistas.
- [x] Utilizar programación asincrónica (`async`/`await`).
- [ ] Implementar middlewares, manejo de rutas, controladores y manejo centralizado de errores.
- [x] Implementar validaciones simples de entrada/datos.
- [x] Completar los flujos CRUD con la lógica funcional adecuada.
- [x] Implementar el control de roles de usuario (crítico).
- [x] Garantizar consistencia en el manejo de rutas y la conexión entre módulos.

## 2. Base de Datos
- [x] Integrar base de datos MongoDB utilizando el ODM Mongoose.

## 2.1 Seguridad y Autenticación
- [x] Manejo de sesiones con `express-session` para login, logout y control de acceso.
- [x] Encriptación de contraseñas con `bcrypt` y comparación segura al iniciar sesión.
- [ ] JWT: autenticación por token no implementada actualmente.

## 3. Requerimientos Funcionales y No Funcionales (Matriz de Categorización)
- [ ] **Comercial:** Implementar carga y validación de pedidos B2B (Funcional) garantizando alta disponibilidad del portal (No Funcional).
- [ ] **Stock:** Implementar alertas de stock y trazabilidad (Funcional) asegurando consistencia de datos (No Funcional).
- [ ] **Producción:** Implementar generación de órdenes de trabajo (Funcional) optimizando la velocidad de procesamiento (No Funcional).
- [ ] **Logística:** Implementar planificación de rutas de entrega (Funcional) con portabilidad / diseño responsivo (No Funcional).
- [ ] **Finanzas:** Implementar facturación y control de deuda (Funcional) garantizando seguridad y control de acceso (No Funcional).

## 4. Pruebas (Testing)
- [ ] Implementar pruebas (manuales o automáticas) cubriendo los aspectos más críticos (Postman/Thunder Client).
- [ ] Documentar las pruebas indicando: objetivo, procedimiento, y resultados obtenidos (en tablas o carpeta `test/`).
- [ ] Incluir capturas de respuestas (evitar exceso innecesario).
- [ ] Preparar la demostración de pruebas para ser grabada (rutas exitosas y casos límite/errores).

## 5. Documentación y Repositorio (PDF y GitHub)
- [ ] **Profundizar la explicación técnica del backend** (no dejarla incompleta).
- [ ] **Detallar explícitamente las tareas realizadas por cada integrante** del grupo.
- [ ] Integrar conceptos de Ingeniería de Software de forma coherente, **sin copiar y pegar literalmente** los documentos de esa materia.
- [ ] Registrar y justificar cualquier cambio respecto a la iteración anterior o la omisión de temas de la cátedra.
- [ ] Sintetizar la contextualización (no hacerla excesivamente extensa).
- [ ] **Declarar explícitamente el uso de IA** (si se usó) de forma crítica, incluyendo referencias y ejemplos de su aplicación.
- [x] Crear archivo `README.md` con instrucciones técnicas.
- [ ] Verificar que el link al repositorio sea correcto y que el repositorio contenga el backend funcional.

## 6. Video y Defensa
- [ ] Grabar sesión mostrando código y MongoDB.
- [ ] **Todos los integrantes deben participar activamente, de forma equitativa y con la cámara encendida.**
- [ ] Asegurar una **buena calidad de audio y un ritmo de explicación adecuado** (no muy rápido).
- [ ] Mostrar en el video la ejecución de las pruebas.
- [ ] Verificar que el link del video esté **bien ubicado en el PDF** y tenga permisos de visualización públicos.

## 7. Proceso de Entrega y Administración
- [ ] Consolidar todo en un único PDF y subirlo a Drive (con links a Git, video y diagramas).
- [ ] **Entrega individual:** Cada estudiante sube el link del Drive con su propio usuario del campus.
- [ ] **Condición Administrativa:** Inscribirse en las fechas correspondientes a la promoción o final para que la calificación impacte formalmente en las actas.
requisitos_parcial_backend_v2.md
Mostrando requisitos_parcial_backend_v2.md.



---

# V2.0

# 📋 Checklist de Cumplimiento: Sistema Panificadora (Auditoría Final)

## 1. Requisitos Funcionales del Negocio
- [ ] **Portal de Pedidos:** Existe una interfaz/ruta estructurada para que franquicias y sucursales carguen pedidos (eliminando la informalidad).
- [ ] **Gestión de Estados:** Los pedidos transicionan correctamente por los estados: *Pendiente, En Producción, Despachado, Entregado*.
- [ ] **Demanda Consolidada:** El sistema agrupa y muestra los productos requeridos por todos los locales para que la Planta planifique la producción.
- [ ] **Métricas de Tiempo:** El sistema detecta y registra demoras en la entrega de pedidos.
- [ ] **Facturación Interna:** Generación de información consolidada de los pedidos entregados a Sucursales Propias.
- [ ] **Royalties:** Sistema o endpoint que calcula el cobro a Franquicias basado en los pedidos despachados/entregados.

## 2. Requisitos Arquitectónicos y Técnicos (Backend)
- [x] **Stack Tecnológico:** Implementación exclusiva en Node.js y Express.
- [x] **Arquitectura Modular:** Separación estricta entre Modelos, Rutas, Servicios/Controladores.
- [ ] **Base de Datos (MongoDB):** Conexión activa a MongoDB Atlas, reemplazando o complementando el almacenamiento en memoria.
- [x] **Modelado Coherente:** Esquemas definidos con relaciones lógicas (Usuarios/Locales $\rightarrow$ Pedidos $\rightarrow$ Productos) y validación de datos obligatorios.
- [x] **Autenticación y Autorización:** Acceso restringido implementado (JWT, sesiones, etc.) respetando la matriz (Planta vs. Sucursal vs. Franquicia).
- [ ] **Manejo de Errores:** Middlewares personalizados implementados para capturar errores y evitar caídas del servidor.
- [x] **Respuestas Estándar:** La API responde en formato JSON con códigos HTTP adecuados (200, 201, 400, 403, 500).
- [x] **Asincronía:** Uso correcto de promesas o `async/await` en todas las operaciones de I/O y base de datos.
- [x] **Variables de Entorno:** Configuración sensible y puertos aislados correctamente (ej. `.env`).

## 3. Requisitos Académicos, Entregables y Despliegue
- [ ] **Mantenimiento y Evolución:** Evidencia (en código o commit) de refactorización, mejoras de rendimiento, seguridad o escalabilidad respecto al sistema anterior.
- [ ] **Despliegue en la Nube:** La aplicación está productiva y accesible mediante una URL pública.
- [ ] **Repositorio Seguro:** Código alojado en GitHub sin exponer credenciales (uso correcto de `.gitignore`).
- [ ] **Documentación (README.md):**
  - [x] Instrucciones de instalación y uso.
  - [x] Listado de dependencias.
  - [ ] Justificación documentada de cualquier módulo extra no visto en clase o decisiones de Ingeniería de Software.
  - [ ] Análisis explícito del alcance del sistema (si aplica).
- [ ] **Entrega Final:** Archivo comprimido con el código (sin `node_modules`) listo para subir a la plataforma.