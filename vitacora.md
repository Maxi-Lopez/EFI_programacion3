# Vitacora del proyecto Frontend (Next.js + API Django REST)

## Objetivo

Construir el frontend consumiendo la API Django REST existente, siguiendo las reglas de `reglas.md` y el esqueleto de `front.md`. Se avanza de a poco, comiteando cada entrega funcional.

## Estado actual

- Next.js 16, App Router, JavaScript, Tailwind CSS v4, Turbopack
- Endpoints implementados: `/api/articulos/` y `/api/proveedor/`
- Auth: login/logout con JWT en cookie httpOnly (`access`)
- Páginas: `/` (redirige a `/articulos`), `/login`, `/articulos`, `/proveedores`
- Componentes: `Sidebar`, `DataTable`, `CreateForm`, `AgregarArticulo`, `BorrarArticulo`, `Cargando`, `Stats`
- Variables de entorno: `NEXT_PUBLIC_API_URL`

## Pendiente (por sprints)

- [ ] Agregar endpoint `/api/catalogo/categoria/` (listar categorías)
- [ ] Agregar endpoint `/api/catalogo/producto/` (listar productos activos)
- [ ] Agregar endpoint `/api/ventas/venta/` y `/api/ventas/detalle-venta/`
- [ ] Agregar endpoint `/api/compras/compra/` y `/api/compras/detalle-compra/`
- [ ] Registro de usuarios (cliente / vendedor)
- [ ] Formularios de creación para compras y ventas
- [ ] Detalle de recursos con anidados (marca+categoría, proveedor+detalles)
- [ ] Manejo de errores global y estados de carga
- [ ] Despliegue y verificación en producción

## Log de cambios

| Fecha | Commit | Descripción |
|-------|--------|-------------|
| (pendiente) | — | Creación de `reglas.md` y `vitacora.md` |
