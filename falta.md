# falta.md

Guía de reparto por módulos para organizar el trabajo y evitar solapamientos:

## Guía de módulos
- `models/`: cambios de esquema y validaciones de estado.
- `controllers/`: lógica de negocio, transiciones y cálculos.
- `routes/`: nuevos endpoints y separación por responsabilidad.
- `middleware/`: autenticación, autorización y errores.
- `scripts/` o `test/`: pruebas y verificaciones de flujo.

Pendientes de implementación en código:

## 1. Seguridad y acceso
- [ ] Definir si se mantiene solo sesiones o se suma `JWT`.
- [ ] Si se suma `JWT`, crear el middleware de verificación de token.
- [ ] Centralizar respuestas de acceso denegado y errores de autenticación.

## 2. Pedidos y estados
- [ ] Agregar `estado` al modelo `Pedido`.
- [ ] Validar estados permitidos: pendiente, en producción, despachado y entregado.
- [ ] Crear la lógica de transición de estado en el controlador.
- [ ] Exponer endpoints para actualizar solo el estado del pedido.

## 3. Operación del negocio
- [ ] Implementar demanda consolidada de productos por sucursal/local.
- [ ] Crear el cálculo de métricas de demora y tiempo de entrega.
- [ ] Implementar facturación interna para pedidos de sucursales propias.
- [ ] Implementar cálculo de royalties para franquicias.

## 4. Calidad técnica
- [ ] Agregar middleware centralizado de manejo de errores.
- [ ] Revisar y fortalecer validaciones de formularios y endpoints.
- [ ] Agregar pruebas de código o scripts de prueba para los flujos más críticos.

## 5. Front-end y experiencia de uso
- [ ] Limpiar los estilos inline que queden en las vistas y dejar todo centralizado en `public/styles.css`.
- [ ] Unificar botones, alertas y tablas con clases reutilizables para evitar duplicación visual.
- [ ] Mejorar el layout responsive de vistas principales: `home`, `login`, listas y formularios.
- [ ] Agregar feedback visual más claro para errores, éxito y estados vacíos.
- [ ] Evaluar una librería liviana de interfaz o íconos si ayuda a acelerar consistencia visual sin romper Pug.