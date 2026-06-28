# falta.md

Guía de reparto por módulos para organizar el trabajo y evitar solapamientos:

## Guía de módulos
- `models/`: cambios de esquema y validaciones de estado.
- `controllers/`: lógica de negocio, transiciones y cálculos.
- `routes/`: nuevos endpoints y separación por responsabilidad.
- `middleware/`: autenticación, autorización y errores.
- `scripts/` o `test/`: pruebas y verificaciones de flujo.



Pendientes de implementación en código:

[ ] unificar las fuentes

## 1. Pedidos y estados
- [x] Agregar `estado` al modelo `Pedido`.
- [x] Validar estados permitidos: pendiente, en producción, despachado y entregado.
- [x] Crear la lógica de transición de estado en el controlador.
- [x] Exponer endpoints para actualizar solo el estado del pedido.

## 2. Operación del negocio
- [ ] Implementar demanda consolidada de productos por sucursal/local.
- [ ] Crear el cálculo de métricas de demora y tiempo de entrega.
- [ ] Implementar facturación interna para pedidos de sucursales propias.
- [ ] Implementar cálculo de royalties para franquicias.

## 3. Calidad técnica
- [x] Agregar middleware centralizado de manejo de errores.


## 4. Front-end y experiencia de uso
- [x] Limpiar los estilos inline que queden en las vistas y dejar todo centralizado en `public/styles.css`.
- [x] Unificar botones, alertas y tablas con clases reutilizables para evitar duplicación visual.
- [x] Mejorar el layout responsive de vistas principales: `home`, `login`, listas y formularios.
- [x] Agregar feedback visual más claro para errores, éxito y estados vacíos.
- [x] Evaluar una librería liviana de interfaz o íconos si ayuda a acelerar consistencia visual sin romper Pug.
