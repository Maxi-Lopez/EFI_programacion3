# Vitacora del proyecto Frontend (Next.js + API Django REST)

## Objetivo

Construir el frontend consumiendo la API Django REST existente, siguiendo las reglas de `reglas.md` y el esqueleto de `front.md`. Se avanza de a poco, comiteando cada entrega funcional.

## Estado actual

- Next.js 16.4.2, App Router, JavaScript, Tailwind CSS v4, Turbopack
- Auth: login/logout con JWT en `localStorage` (`access_token`, `refresh_token`)
- Páginas: `/`, `/login`, `/catalogo`, `/catalogo/[id]`, `/catalogo/nuevo`, `/dashboard`, `/dashboard/editar/[id]`
- Componentes (8 reutilizables): `ProductoCard`, `Boton`, `Input`, `Card`, `Navbar`, `Footer`, `Cargando`, `ProductoForm`
- Formularios: React Hook Form + Zod (`zodResolver`)
- Estado global: `AuthContext` (sesión) y `ThemeContext` (tema claro/oscuro)
- Testing: Vitest configurado
- Variables de entorno: `NEXT_PUBLIC_API_BASE_URL`

## Pendiente (por sprints)

- [x] Sprint 0 — Documentación base (`reglas.md`, `vitacora.md`, `plan.md`)
- [x] Sprint 1 — Rutas y layouts (R1): `src/app/` con layout raíz, `loading.jsx`, `error.jsx`, `not-found.jsx`, rutas dinámicas y anidadas. Login con RHF + Zod.
- [x] Sprint 2 — Componentes reutilizables (R2): mínimo 8, Server + Client Components con justificación. Integrados en layout y catálogo con búsqueda, crear, editar y borrar.
- [x] Sprint 3 — CRUD completo (R3): crear, leer, editar, borrar en al menos 1 recurso; búsqueda/filtro
- [x] Sprint 4 — Autenticación (R4): rutas protegidas, middleware que redirige a `/login`
- [x] Sprint 5 — Formularios y validación (R5): React Hook Form + Zod en componentes `.jsx`
- [x] Sprint 6 — Estado global (R6): `createContext`/`useContext` (tema o sesión)
- [x] Sprint 7 — Testing (R7): Vitest, al menos 4 tests unitarios pasando
- [ ] Sprint 8 — Despliegue y entrega (R8 + condiciones): Vercel, env vars producción, README, Kanban, GitFlow

## Log de cambios

| Fecha | Commit | Descripción |
|-------|--------|-------------|
| (pendiente) | — | Creación de `reglas.md`, `vitacora.md` y `plan.md` basados en `front.md` (Next.js + JS puro) |
| (pendiente) | — | Sprint 1: estructura `src/app/` con layout, página home, login, catálogo, dashboard, 404, loading, error, `apiClient.js`, `AuthContext.jsx`, `ThemeContext.jsx`, `ProductoCard.jsx` |
| (pendiente) | — | Sprint 2: 8 componentes reutilizables (Boton, Input, Card, Navbar, Footer, Cargando, ProductoCard, ProductoForm) integrados en layout y catálogo |
| (pendiente) | — | Sprint 3: CRUD completo sobre producto (GET list/detalle, POST crear, PUT editar, DELETE borrar) con búsqueda por nombre y estados carga/error; link de editar corregido y borrar funcional en detalle |
| (pendiente) | — | Sprint 5: login y ProductoForm migrados a React Hook Form + Zod (2 formularios distintos); errores de validación (Zod) y errores de API mostrados al usuario |
| (pendiente) | — | Sprint 4: middleware en `src/middleware.js` protege `/dashboard/*` y `/catalogo/nuevo` redirigiendo a `/login` si no hay token; `AuthContext` guarda/borra cookies `access_token`/`refresh_token`; `DashboardLayout` con `requireAuth` de respaldo |
