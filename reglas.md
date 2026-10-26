# reglas.md — Sintaxis y convenciones del proyecto

Este documento registra cómo está escrito el proyecto actual para no inventar nada nuevo. Todo cambio nuevo debe seguir estas reglas.

## Stack y configuración

- **Next.js 16.4.2** (App Router), **React 19.3.0**, **Tailwind CSS v4**, **Turbopack**
- **JavaScript** (no TypeScript)
- `jsconfig.json` con alias `@/*` → `./src/*`
- `next.config.mjs` con `turbopack` rules para CSS (`*.css` → `["@tailwindcss/turbopack"]`), `cacheComponents: true`, `partialPrefetching: true`
- `eslint.config.mjs` con `eslint-config-next/core-web-vitals`
- `package.json` scripts: `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`eslint`)

## Autenticación

- JWT guardado en cookie httpOnly llamada `access`, establecida por Server Actions con `cookies()` de `next/headers`
- `getToken()` (en `src/lib/auth.js`) lee la cookie `access`
- `requireToken()` redirige a `/login` si no hay token
- `login` y `logout` son Server Actions (`"use server"`) que usan `redirect` de `next/navigation`
- `revalidatePath` de `next/cache` invalida caché tras crear o borrar recursos
- Credenciales de prueba: `admin/admin`, `vendedor1/testpass123`, `cliente1/testpass123`

## Peticiones a la API

- `fetch` nativo (no Axios), siempre con `cache: "no-store"`
- `API_URL = process.env.NEXT_PUBLIC_API_URL` en `src/lib/api.js`
- Endpoints como constantes en objeto `ENDPOINTS` (ej. `articulos: "/api/articulos/"`)
- Token enviado en header `Authorization: Bearer <token>`
- Paginación manual: bucle `while` leyendo `data.next` hasta agotar páginas; si la respuesta es array plano se retorna directamente

## Componentes

- `"use client"` en componentes con interactividad (Sidebar, Login, AgregarArticulo, BorrarArticulo, etc.)
- `useActionState` de React para formularios vinculados a Server Actions
- `Link` de `next/link`; `usePathname` y `useRouter` de `next/navigation`
- `Suspense` con `fallback={<Cargando />}` para carga de datos en Server Components
- Tailwind v4: `@import "tailwindcss"` y `@theme inline` / `@theme` en `globals.css`
- Fuentes vía `next/font/google` (`Bricolage_Grotesque` para headings, `Figtree` para body)
- Clases de color personalizadas: `--color-ink`, `--color-field`, `--color-line`, `--color-brand`, `--color-brand-dark`

## Estructura de carpetas

```
src/
  app/
    layout.js
    page.js
    globals.css
    actions.js
    login/page.js
    articulos/page.js
    proveedores/page.js
  components/
    Sidebar.jsx
    DataTable.jsx
    CreateForm.jsx
    AgregarArticulo.jsx
    BorrarArticulo.jsx
    Cargando.jsx
    Stats.jsx
  lib/
    api.js
    auth.js
```

## Reglas de escritura

- No usar TypeScript; usar JavaScript puro
- No usar Axios; usar `fetch` nativo
- No instalar librerías de estado global (Zustand, Jotai, Redux) a menos que se acuerde explícitamente
- No usar React Query / TanStack Query a menos que se acuerde explícitamente
- No usar React Hook Form ni Zod a menos que se acuerde explícitamente
- Los componentes de página bajo `src/app/*/page.js` son Server Components por defecto; agregar `"use client"` solo si se necesita interactividad
- Los Server Actions viven en `src/app/actions.js` y se importan con `@/app/actions`
- Las utilidades de API viven en `src/lib/api.js` y `src/lib/auth.js`, importadas con `@/lib/...`