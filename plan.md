# Plan de desarrollo — EFI 2026 Frontend (Next.js App Router + JavaScript + API Django REST)

## Repositorio remoto

https://github.com/Maxi-Lopez/EFI_programacion3.git

## Metodología

- GitFlow: ramas `main`, `develop` y `feature/*`
- Un sprint = una entrega funcional con su propio commit
- Los commits son descriptivos y se agrupan por sprint
- Documentación viva: `reglas.md`, `vitacora.md`, `plan.md`

## Objetivo

Cumplir los 8 requisitos (R1 a R8) del enunciado `requisitos.md` y las condiciones de entrega (Kanban, Tailwind, README, despliegue, testing), usando Next.js App Router + JavaScript puro según `front.md`.

## Brechas detectadas (estado actual vs. requisitos)

| Requisito | Exige | Estado actual | Brecha |
|-----------|-------|---------------|--------|
| R1 Rutas y layouts | 6 rutas principales, 1 anidada, 2 dinámicas, layout raíz + anidado, not-found, loading/error | Ninguna ruta creada en Next.js | Faltan todas las rutas, layouts, 404, loading, error |
| R2 Componentes | 8 reutilizables, al menos 1 Server Component y 1 Client Component con justificación | Ningún componente creado | Faltan los 8 componentes + justificación de islas |
| R3 CRUD | 4 operaciones en 1 recurso, búsqueda/filtro, carga/error | CRUD completo sobre producto (GET list/detalle, POST crear, PUT editar, DELETE borrar) con búsqueda por nombre y estados carga/error | Cumplido |
| R4 Autenticación | Login con token, logout, rutas protegidas | Login/logout con JWT; middleware protege `/dashboard/*` y `/catalogo/nuevo` | Cumplido (middleware + `requireAuth` en layout) |
| R5 Formularios | React Hook Form + Zod, 2 formularios con errores | Login y ProductoForm usan RHF + Zod; errores de validación y de API mostrados | Cumplido |
| R6 Estado global | `createContext`/`useContext` (tema o sesión) en componentes cliente | AuthContext y ThemeContext creados y proveídos en layout; consumidos en Navbar y login | Cumplido |
| R7 Testing | Vitest, 4 tests pasando | Vitest configurado con jsdom, 15 tests unitarios pasando | Cumplido |
| R8 Despliegue | Desplegado, env vars producción, API pública | No desplegado | Faltan despliegue, env vars, adaptador de servidor |
| Entrega | Kanban, GitFlow, README completo, capturas, integrantes | Solo documentación base | Faltan Kanban, GitFlow, README completo, capturas, integrantes |

## Sprint 1 — Rutas y layouts (R1)

**Objetivo:** Establecer la navegación base del sistema en Astro.

**Tareas:**
- [ ] Crear `src/app/layout.jsx` (layout raíz con `AuthProvider` y `ThemeProvider`)
- [ ] Crear `src/app/page.jsx` (home `/`)
- [ ] Crear `src/app/loading.jsx` (estado de carga global)
- [ ] Crear `src/app/error.jsx` (manejo de errores global)
- [ ] Crear `src/app/not-found.jsx` (página 404)
- [ ] Crear `src/app/login/page.jsx` (ruta `/login`)
- [ ] Crear `src/app/catalogo/page.jsx` (ruta `/catalogo`, Server Component)
- [ ] Crear `src/app/catalogo/loading.jsx` (carga específica de catálogo)
- [ ] Crear `src/app/catalogo/error.jsx` (error específico de catálogo)
- [ ] Crear `src/app/catalogo/[id]/page.jsx` (ruta dinámica `/catalogo/[id]`)
- [ ] Crear `src/app/dashboard/layout.jsx` (layout anidado para dashboard)
- [ ] Crear `src/app/dashboard/page.jsx` (ruta `/dashboard`)
- [ ] Crear `src/app/dashboard/editar/[id]/page.jsx` (ruta dinámica `/dashboard/editar/[id]`)
- [ ] Crear `src/utils/apiClient.js` con `fetch` nativo y manejo de JWT
- [ ] Crear `src/context/AuthContext.jsx` con `AuthProvider` y `useAuth`
- [ ] Crear `src/context/ThemeContext.jsx` con `ThemeProvider` y `useTheme`
- [ ] Crear `src/components/ProductoCard.jsx` como componente reutilizable
- [ ] Navegación interna con `<Link>` de `next/link`

**Entrega:** Commit en rama `feature/rutas-layouts`, merge a `develop`.

## Sprint 2 — Componentes reutilizables (R2)

**Objetivo:** Llegar al mínimo de 8 componentes reutilizables y justificar el tipo de isla de cada uno.

**Tareas:**
- [ ] Crear componentes de UI reutilizables en `src/components/ui/` (botones, inputs, cards)
- [ ] Crear componentes de layout en `src/components/layout/` (Navbar, Footer)
- [ ] Crear componentes funcionales (ProductoCard, ProductoForm, etc.) en `.jsx`
- [ ] Llegar a un mínimo de 8 componentes reutilizables (sin contar las páginas)
- [ ] Justificar cuáles son Server Components (por defecto, sin `'use client'`) y cuáles son Client Components (`'use client'`)
- [ ] Documentar la justificación de por qué cada componente es de un tipo u otro

**Entrega:** Commit en rama `feature/componentes`, merge a `develop`.

## Sprint 3 — CRUD completo (R3)

**Objetivo:** Las 4 operaciones del CRUD funcionando sobre al menos 1 recurso principal, con búsqueda y manejo de estados.

**Tareas:**
- [ ] Implementar `apiFetch` en `src/utils/apiClient.js` con `fetch` nativo y manejo de JWT (refresh token)
- [ ] Leer (GET) al menos 2 recursos (ej: productos, categorías)
- [ ] Crear (POST) al menos 1 recurso mediante formulario en Client Component
- [ ] Editar (PUT/PATCH) al menos 1 recurso mediante formulario en Client Component
- [ ] Borrar (DELETE) al menos 1 recurso mediante botón en Client Component
- [ ] Agregar búsqueda y/o filtros en al menos 1 listado
- [ ] Asegurar manejo visible de estados de carga y error en llamadas a API

**Entrega:** Commit en rama `feature/crud`, merge a `develop`.

## Sprint 4 — Autenticación (R4)

**Objetivo:** Proteger rutas que requieren sesión y enviar token en operaciones protegidas.

**Tareas:**
- [ ] Implementar `AuthContext.jsx` en `src/context/` con `AuthProvider` y `useAuth`
- [ ] Página de login que obtenga token desde `POST /token/` y guarde en `localStorage`
- [ ] Cierre de sesión que limpie `localStorage` y redirija a `/login`
- [ ] Proteger rutas que requieren sesión (middleware de Next.js o lógica en páginas) redirigiendo a `/login` si no hay sesión
- [ ] Enviar token `Authorization: Bearer <token>` en operaciones protegidas mediante `apiFetch`

**Entrega:** Commit en rama `feature/auth`, merge a `develop`.

## Sprint 5 — Formularios y validación (R5)

**Objetivo:** Formularios controlados con React Hook Form y validación con Zod.

**Tareas:**
- [ ] Instalar `react-hook-form` y `zod`
- [ ] Implementar al menos 2 formularios distintos (ej: login y alta/edición de recurso principal)
- [ ] Integrar Zod mediante el resolver de RHF (`zodResolver`)
- [ ] Mostrar errores de validación al usuario y errores devueltos por la API
- [ ] Implementar formularios como islas de React (`.jsx` con `client:load` o `client:visible`)

**Entrega:** Commit en rama `feature/formularios`, merge a `develop`.

## Sprint 6 — Estado global (R6)

**Objetivo:** Compartir información global entre componentes cliente con nanostores y Context API dentro de islas de React.

**Tareas:**
- [ ] Crear contexto con `createContext` y `useContext` en `src/context/` (ej: `ThemeContext` para tema oscuro/claro)
- [ ] Usar `AuthContext` para estado global de sesión (auth)
- [ ] Proveer los contextos en `src/app/layout.jsx` envolviendo `{children}`
- [ ] Documentar en qué componentes se usa el estado global y por qué

**Entrega:** Commit en rama `feature/estado-global`, merge a `develop`.

## Sprint 7 — Testing (R7)

**Objetivo:** Al menos 4 tests unitarios pasando con Vitest.

**Tareas:**
- [ ] Instalar Vitest
- [ ] Configurar entorno de testing para Next.js (React Testing Library, jsdom)
- [ ] Escribir al menos 4 tests unitarios (componentes, funciones utilitarias o esquemas de validación Zod)
- [ ] Verificar que todos los tests pasen (`npm run test` o script equivalente)

**Entrega:** Commit en rama `feature/testing`, merge a `develop`.

## Sprint 8 — Despliegue y entrega (R8 + condiciones de entrega)

**Objetivo:** Aplicación desplegada y lista para defensa oral.

**Tareas:**
- [ ] Desplegar en Vercel (u otro hosting)
- [ ] Configurar variables de entorno de producción (`NEXT_PUBLIC_API_BASE_URL` apuntando a la API pública)
- [ ] Coordinar con el equipo de Back para que la API sea accesible públicamente (no localhost)
- [ ] Crear tablero Kanban (Trello o GitHub Projects) con tareas asignadas a integrantes
- [ ] Actualizar `README.md` con: título, descripción de la temática, enlace a la API de Ingeniería de Software, pasos para ejecutar localmente (`npm install`, `npm run dev`), variables de entorno, pasos para correr tests (`npm run test`), enlace a la aplicación desplegada, enlace al tablero Kanban, capturas de la aplicación en funcionamiento, nombres y apellidos de los integrantes
- [ ] Asegurar ramas GitFlow (`main`, `develop`, `feature/*`) y commits descriptivos

**Entrega:** Commit final en rama `feature/despliegue`, merge a `main`.

## Log de sprints

| Sprint | Rama | Estado | Fecha | Commit | Descripción |
|--------|------|--------|-------|--------|-------------|
| 0 | main | completado | — | — | Creación de reglas.md, vitacora.md, plan.md |
| 1 | feature/rutas-layouts | completado | — | — | Rutas, layouts, 404, loading/error, apiClient, AuthContext, ThemeContext, ProductoCard. Login con RHF + Zod. |
| 2 | feature/componentes | pendiente | — | — | 8 componentes reutilizables + justificación de islas |
| 3 | feature/crud | completado | — | — | CRUD completo sobre producto, búsqueda por nombre, estados carga/error |
| 4 | feature/auth | completado | — | — | Middleware protege rutas, login/logout con cookies, requireAuth en dashboard |
| 5 | feature/formularios | completado | — | — | Login y ProductoForm con RHF + Zod, 2 formularios |
| 6 | feature/estado-global | completado | — | — | AuthContext y ThemeContext creados, proveídos en layout, consumidos en Navbar y login |
| 7 | feature/testing | completado | — | — | Vitest configurado, 15 tests unitarios pasando |
| 8 | feature/despliegue | pendiente | — | — | Despliegue, README, Kanban, entrega final |