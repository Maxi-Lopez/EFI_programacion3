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

- JWT guardado en `localStorage` (`access_token`, `refresh_token`)
- `getToken()` (en `src/utils/apiClient.js`) lee `localStorage.getItem('access_token')`
- `requireAuth()` redirige a `/login` si no hay token (lógica en páginas protegidas o middleware)
- `login` y `logout` se implementan en `AuthContext.jsx` (islas de cliente) y usan `router.push` de `next/navigation`
- Credenciales de prueba: `admin/admin`, `vendedor1/testpass123`, `cliente1/testpass123`

## Peticiones a la API

- `fetch` nativo (no Axios), siempre con `cache: "no-store"`
- `BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL` en `src/utils/apiClient.js`
- Endpoints como strings pasadas a `apiFetch(endpoint, options)`
- Token enviado en header `Authorization: Bearer <token>` (leído de `localStorage`)
- Refresh automático en `apiFetch` ante respuesta 401 usando `refresh_token`

## Componentes

- `"use client"` en componentes con interactividad (Navbar, Login, ProductoForm, etc.)
- `Link` de `next/link`; `usePathname` y `useRouter` de `next/navigation`
- Tailwind v4: `@import "tailwindcss"` y `@theme inline` / `@theme` en `globals.css`
- Fuentes vía `next/font/google`
- Clases de color personalizadas: `--color-ink`, `--color-field`, `--color-line`, `--color-brand`, `--color-brand-dark`

## Estructura de carpetas

```
src/
  app/
    layout.jsx
    page.jsx
    globals.css
    login/page.jsx
    catalogo/page.jsx
    catalogo/[id]/page.jsx
    catalogo/nuevo/page.jsx
    dashboard/layout.jsx
    dashboard/page.jsx
    dashboard/editar/[id]/page.jsx
    loading.jsx
    error.jsx
    not-found.jsx
  components/
    ui/
      Boton.jsx
      Input.jsx
      Card.jsx
    layout/
      Navbar.jsx
      Footer.jsx
    ProductoCard.jsx
    Cargando.jsx
    ProductoForm.jsx
  context/
    AuthContext.jsx
    ThemeContext.jsx
  utils/
    apiClient.js
```

## Reglas de escritura

- No usar TypeScript; usar JavaScript puro
- No usar Axios; usar `fetch` nativo
- No instalar librerías de estado global (Zustand, Jotai, Redux) a menos que se acuerde explícitamente
- No usar React Query / TanStack Query a menos que se acuerde explícitamente
- No usar React Hook Form ni Zod a menos que se acuerde explícitamente
- Los componentes de página bajo `src/app/*/page.jsx` son Server Components por defecto; agregar `"use client"` solo si se necesita interactividad
- Las utilidades de API viven en `src/utils/apiClient.js`, importadas con `@/utils/apiClient`
- Los contextos de estado global viven en `src/context/`, importados con `@/context/...`