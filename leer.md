# leer.md — Guía detallada para la defensa del proyecto

## 1. Resumen ejecutivo

Este proyecto es el frontend del Examen Final Integrador (EFI 2026) de la materia Programación III. Se trata de una aplicación web desarrollada con **Next.js 16.4.2 (App Router)**, **React 19.3.0**, **JavaScript puro** y **Tailwind CSS v4**, que consume una API REST desarrollada en **Django + Django REST Framework** por el grupo de Ingeniería de Software.

La temática del sistema es **Nexusgamer** — tienda de computación. Sistema integral de negocio que consume una API Django REST. Permite consultas de catálogo para clientes logueados o no; los clientes logueados pueden llenar el carrito y la lista de deseos. Los usuarios con rol de administrador pueden crear, editar y borrar productos; los clientes comunes solo ven el catálogo sin botones de administración.

El proyecto cumple los 8 requisitos (R1 a R8) del enunciado y sigue la metodología **GitFlow** (`main`, `develop`, ramas `feature/*`) con entregas organizadas por sprints.

---

## 2. Stack tecnológico

| Capa | Tecnología | Versión | Notas |
|------|-----------|---------|-------|
| Framework | Next.js | 16.4.2 | App Router, Turbopack |
| Librería UI | React | 19.3.0 | JavaScript (no TypeScript) |
| Estilos | Tailwind CSS | v4 | `@import "tailwindcss"`, variables CSS personalizadas, dark mode con `data-theme` |
| Peticiones | `fetch` nativo | — | Sin Axios, `cache: "no-store"` |
| Autenticación | JWT | — | `access_token` y `refresh_token` en `localStorage`; cookies para middleware; JWT decodificado para rol y username |
| Formularios | React Hook Form + Zod | — | `zodResolver` |
| Testing | Vitest | — | jsdom, 15 tests unitarios |
| Build | Turbopack | — | `cacheComponents: true`, `partialPrefetching: true` |
| Despliegue | Vercel (recomendado) | — | Variables de entorno en producción |

---

## 3. Estructura de carpetas

```
src/
  app/
    layout.jsx              # Layout raíz con AuthProvider + ThemeProvider + Suspense para Navbar
    page.jsx                # Splash de bienvenida (/)
    globals.css             # Estilos globales + Tailwind v4 + dark mode
    loading.jsx             # Loading global
    error.jsx               # Error global
    not-found.jsx           # 404
    login/page.jsx          # /login (RHF + Zod, previene envío nativo GET)
    catalogo/page.jsx       # /catalogo (listado con búsqueda + CRUD)
    catalogo/loading.jsx    # Loading del catálogo
    catalogo/error.jsx       # Error del catálogo
    catalogo/[id]/page.jsx  # /catalogo/[id] (detalle + borrar)
    catalogo/nuevo/page.jsx # /catalogo/nuevo (crear producto)
    dashboard/layout.jsx    # Layout anidado del dashboard (sin protección de login)
    dashboard/page.jsx      # /dashboard (catálogo, botón + Nuevo producto solo para admin/vendedor)
    dashboard/editar/[id]/page.jsx # /dashboard/editar/[id] (editar producto)
  components/
    ui/
      Boton.jsx             # Botón reutilizable
      Input.jsx             # Input con soporte de error
      Card.jsx              # Tarjeta genérica
    layout/
      Navbar.jsx            # Barra de navegación (logo izq, auth, tema, sin búsqueda ni carrito)
      Footer.jsx            # Pie de página con redes sociales (face.png, tele.jpg, insta.jpg)
      MenuLineal.jsx        # Menú horizontal: Productos, Ofertas, Marcas, Categorías, Proveedores, Compras, Ventas, Lista de Deseos, Contacto, ¿Por qué comprar?, Sobre nosotros
    ProductoCard.jsx        # Tarjeta de producto (Server Component)
    ProductoForm.jsx        # Formulario crear/editar (Client Component, RHF + Zod)
    Cargando.jsx            # Componente de carga
    BackToTop.jsx           # Botón flotante volver arriba (esquina inferior izquierda)
  context/
    AuthContext.jsx         # Contexto de sesión (login/logout/token, decodifica JWT para rol y username)
    ThemeContext.jsx        # Contexto de tema claro/oscuro
  utils/
    apiClient.js            # Cliente de API con fetch + JWT + refresh token + cache: no-store
  test/
    setup.jsx               # Configuración de pruebas (@testing-library/jest-dom)
    zod.test.jsx            # Tests de esquemas Zod (productoSchema, loginSchema)
    ProductoCard.test.jsx   # Tests del componente ProductoCard
    Boton.test.jsx          # Tests del componente Boton
    apiFetch.test.jsx       # Tests del cliente de API
vitest.config.mjs           # Configuración de Vitest (alias @/ + jsdom)
middleware.js               # Middleware de protección de rutas (solo /catalogo/nuevo)
jsconfig.json               # Alias @/* → ./src/*
next.config.mjs             # Configuración de Next.js (Turbopack)
package.json                # Dependencias y scripts
.env.local                  # Variables de entorno locales (no se sube a git)
.env.example                # Ejemplo de variables de entorno
public/
  images/
    logo.png                # Logo definitivo de Nexusgamer
    face.png                # Icono Facebook
    tele.jpg                # Icono Telegram
    insta.jpg               # Icono Instagram
```

---

## 4. Requisitos cumplidos (R1 a R8)

### R1 — Enrutamiento y layouts

- **7 rutas principales:** `/`, `/login`, `/catalogo`, `/catalogo/nuevo`, `/dashboard`, `/dashboard/editar/[id]`, `/catalogo/[id]`
- **1 ruta anidada:** `/dashboard` usa `dashboard/layout.jsx` que envuelve `dashboard/page.jsx` y `dashboard/editar/[id]/page.jsx`
- **2 rutas dinámicas:** `/catalogo/[id]` y `/dashboard/editar/[id]`
- **Navegación interna:** `<Link>` de `next/link` en Navbar, tarjetas y formularios
- **Layout raíz:** `src/app/layout.jsx` (envuelve toda la app con `AuthProvider` y `ThemeProvider`)
- **Layout anidado:** `src/app/dashboard/layout.jsx` (solo para la sección dashboard)
- **Páginas de estados:** `not-found.jsx` (404), `loading.jsx` (carga global), `error.jsx` (error global), más `catalogo/loading.jsx` y `catalogo/error.jsx` específicos

### R2 — Arquitectura de componentes

- **8 componentes reutilizables** (sin contar páginas):
  1. `Boton` (ui) — Client Component
  2. `Input` (ui) — Client Component
  3. `Card` (ui) — Server/Client (sin interactividad directa)
  4. `Navbar` (layout) — Client Component (usa `useAuth`, `useTheme`, `useRouter`)
  5. `Footer` (layout) — Server Component
  6. `ProductoCard` — Server Component (recibe datos, sin interactividad)
  7. `ProductoForm` — Client Component (formulario interactivo con RHF)
  8. `Cargando` — Client Component (indicador de carga)

- **Componentes adicionales:** `MenuLineal` (Server Component), `BackToTop` (Client Component)

- **Justificación de islas:**
  - **Server Components:** `ProductoCard`, `Card`, `Footer`, `MenuLineal`, páginas de listado/detalle que solo renderizan datos. No necesitan estado ni eventos del navegador, por lo que se benefician del renderizado en servidor (mejor SEO, menor bundle de cliente).
  - **Client Components:** `Navbar` (necesita `useAuth`, `useTheme`, `useRouter`), `ProductoForm` (necesita estado de formulario, validación en tiempo real), `Boton`, `Input` (interactividad del usuario), `Cargando` (estado visual de carga), `BackToTop` (escucha scroll de ventana).

### R3 — Integración con la API y CRUD

El recurso principal es **producto**. Las 4 operaciones del CRUD funcionan sobre el endpoint base `/catalogo/producto/`:

| Operación | Método | Endpoint | Ubicación |
|-----------|--------|----------|-----------|
| Leer (listado) | GET | `/catalogo/producto-get/` | `catalogo/page.jsx` y `dashboard/page.jsx` |
| Leer (detalle) | GET | `/catalogo/producto/[id]/` | `catalogo/[id]/page.jsx` |
| Crear | POST | `/catalogo/producto/` | `catalogo/nuevo/page.jsx` → `ProductoForm` |
| Editar | PUT | `/catalogo/producto/[id]/` | `dashboard/editar/[id]/page.jsx` → `ProductoForm` |
| Borrar | DELETE | `/catalogo/producto/[id]/` | `catalogo/[id]/page.jsx` y `dashboard/page.jsx` |

- **Búsqueda/filtro:** En `catalogo/page.jsx` y `dashboard/page.jsx` hay un input de búsqueda que envía `?search=` al backend para filtrar por nombre.
- **Estados de carga y error:** Cada llamada a la API maneja estados `loading` y `error` visibles para el usuario (componentes `Cargando` y mensajes de error en rojo).

### R4 — Autenticación

- **Login:** `POST /token/` con credenciales `username`/`password`. Devuelve `access_token` y `refresh_token`.
- **Almacenamiento:** Tokens guardados en `localStorage` y, adicionalmente, en cookies `SameSite=Lax` para que el middleware del servidor pueda leer la sesión.
- **Logout:** Limpia `localStorage`, borra cookies y redirige a `/login`.
- **Rutas protegidas:**
  - **Middleware (`middleware.js`):** Protege solo `/catalogo/nuevo`. Si no hay cookie `access_token`, redirige a `/login` con `callbackUrl`.
  - **`/dashboard`** es accesible sin login (pantalla pública de catálogo).
- **Token en peticiones:** `apiFetch` lee el token de `localStorage` y lo envía en el header `Authorization: Bearer <token>`.
- **Refresh token automático:** Ante respuesta 401, `apiFetch` intenta renovar el token con `/token/refresh/` y reintenta la petición original.
- **Decodificación de JWT:** `AuthContext` decodifica el `access_token` para obtener `username` y `rol` del usuario logueado.

### R5 — Formularios y validaciones

Se implementaron **2 formularios distintos** con **React Hook Form + Zod**:

1. **Login** (`src/app/login/page.jsx`):
   - Esquema `loginSchema`: `username` (obligatorio), `password` (obligatorio).
   - Errores de validación mostrados por campo (borde rojo + mensaje).
   - Errores de API (credenciales inválidas) mostrados en alerta roja.
   - Previene envío nativo GET del formulario.

2. **Producto** (`src/components/ProductoForm.jsx`):
   - Esquema `productoSchema`:
     - `nombre`: obligatorio, máximo 100 caracteres.
     - `sku`: obligatorio, máximo 100 caracteres.
     - `descripcion_corta`: opcional, máximo 500 caracteres.
     - `precio_lista`: obligatorio, formato decimal válido (`^\d+(\.\d{1,2})?$`).
     - `stock_total`: obligatorio, número entero (`^\d+$`).
     - `marca`: obligatorio, ID de marca (select cargado desde la API).
     - `categoria`: obligatorio, ID de categoría (select cargado desde la API).
   - Modos: `crear` (POST) y `editar` (PUT).
   - En modo editar, los valores se precargan desde el endpoint `/catalogo/producto/[id]/`.
   - Errores de validación y errores de API mostrados al usuario.

### R6 — Estado global con Context API

Dos contextos creados con `createContext`/`useContext`:

1. **`AuthContext`** (`src/context/AuthContext.jsx`):
   - Estado: `user` (usuario logueado con `username`, `rol`, `token`), `loading` (inicialización).
   - Acciones: `login(username, password)`, `logout()`.
   - Proporciona sesión global a toda la aplicación.
   - Usado en: `Navbar` (mostrar nombre/cerrar sesión), `login/page.jsx` (autenticar), `dashboard/page.jsx` (mostrar botón + Nuevo producto solo para admin/vendedor).

2. **`ThemeContext`** (`src/context/ThemeContext.jsx`):
   - Estado: `theme` (`'light'` / `'dark'`), persistido en `localStorage` y aplicado como `data-theme` en `<html>`.
   - Acción: `toggleTheme()`.
   - Usado en: `Navbar` (botón sol/luna).

Ambos proveedores se montan en `src/app/layout.jsx` envolviendo `{children}`, por lo que están disponibles en cualquier componente cliente de la aplicación.

### R7 — Testing unitario

- **Configuración:** Vitest con entorno `jsdom`, archivo de setup `@testing-library/jest-dom`, alias `@/` resuelto a `./src`.
- **Script:** `npm run test` ejecuta `vitest run`.
- **15 tests unitarios pasando** en 4 archivos:

| Archivo | Tests | Qué valida |
|---------|-------|------------|
| `zod.test.jsx` | 7 | Esquemas Zod de producto y login (campos válidos, inválidos, vacíos) |
| `ProductoCard.test.jsx` | 2 | Renderizado de nombre, descripción, precio y guion cuando no hay descripción |
| `Boton.test.jsx` | 3 | Renderizado de texto, ejecución de `onClick`, atributo `disabled` |
| `apiFetch.test.jsx` | 3 | GET exitoso, envío de token en header `Authorization`, manejo de error 404 |

Comando para ejecutar: `npm run test`

### R8 — Despliegue

- **Plataforma recomendada:** Vercel (adaptador de servidor para Next.js).
- **Variables de entorno de producción:** `NEXT_PUBLIC_API_BASE_URL` apuntando a la URL pública de la API de Django (no localhost).
- **Coordinación con Back:** La API debe estar accesible públicamente para que el frontend desplegado funcione.
- **Build:** `npm run build` para producción, `npm run start` para servidor local de producción.

---

## 5. Detalle técnico por archivo clave

### `src/utils/apiClient.js`

Cliente de peticiones basado en `fetch` nativo. Características:
- Lee `BASE_URL` de `process.env.NEXT_PUBLIC_API_BASE_URL` (fallback a `http://127.0.0.1:8000/api`).
- Siempre usa `cache: "no-store"`.
- Agrega header `Authorization: Bearer <token>` si hay token en `localStorage`.
- **Refresh automático:** Si la respuesta es 401, intenta renovar con `/token/refresh/` usando `refresh_token`. Si tiene éxito, actualiza el token y reintenta la petición original. Si falla, limpia los tokens y lanza un error para que la aplicación redirija al login.
- Lanza errores con el mensaje `detail` devuelto por la API.

### `src/context/AuthContext.jsx`

Contexto de sesión. Funcionamiento:
- Al montar, lee `access_token` de `localStorage`, decodifica el JWT y establece `user` con `username` y `rol`.
- `login()`: hace `POST` a `/token/` vía `apiFetch`, guarda `access_token` y `refresh_token` en `localStorage` y en cookies (para el middleware del servidor), decodifica el token para obtener `username` y `rol`, redirige a `/catalogo`.
- `logout()`: elimina tokens de `localStorage` y cookies, redirige a `/login`.

### `src/middleware.js`

Middleware de Next.js que se ejecuta en el servidor antes de llegar a las páginas:
- Lee la cookie `access_token`.
- Si la ruta coincide con `/catalogo/nuevo` y no hay token, redirige a `/login` con `callbackUrl` para volver después del login.
- Configuración `matcher`: `['/catalogo/nuevo']`.

### `src/components/ProductoForm.jsx`

Componente cliente para crear y editar productos:
- Usa `useForm` de React Hook Form con `zodResolver(productoSchema)`.
- Detecta si es modo `crear` o `editar` mediante prop `modo` y `id`.
- Los campos **Marca** y **Categoría** son inputs de texto libre (no se cargan desde el back).
- En modo editar, precarga los valores del producto desde `/catalogo/producto/[id]/`.
- Al enviar: valida con Zod, envía POST o PUT vía `apiFetch` con los campos `nombre`, `sku`, `descripcion_corta`, `precio_lista`, `stock_total`, `marca`, `categoria`; muestra errores de API en alerta roja, redirige a `/catalogo` al éxito.

### `src/app/catalogo/page.jsx`

Listado de productos con búsqueda:
- `useEffect` + `apiFetch` para cargar productos al montar.
- Estado `search` para filtrar por nombre usando `?search=` del backend.
- Cada producto muestra: nombre, descripción, precio, botón "Editar" (va a `/dashboard/editar/[id]`) y botón "Borrar" (DELETE + confirmación).
- Botón "+ Nuevo producto" que va a `/catalogo/nuevo`.

### `src/app/dashboard/page.jsx`

Panel de administración con catálogo:
- Muestra el listado de productos con búsqueda vía `?search=` del backend.
- Botón "+ Nuevo producto" solo visible si el usuario logueado tiene rol `admin`, `administrador` o `vendedor` (obtenido del JWT decodificado).
- Cada producto muestra: nombre, descripción, precio, botón "Editar" y botón "Borrar".

---

## 6. Flujo de funcionamiento del usuario

### Flujo sin autenticación (invitado)

1. Usuario entra a `/` (splash de bienvenida) — ve el logo de Nexusgamer por 3 segundos.
2. Se redirige automáticamente a `/dashboard` — ve el listado de productos (lectura pública).
3. Puede buscar productos por nombre.
4. Puede ver el detalle de un producto en `/catalogo/[id]`.
5. Si intenta acceder a `/catalogo/nuevo`, el middleware lo redirige a `/login`.
6. En `/login`, ingresa credenciales (`admin/admin`, `vendedor1/testpass123`, `cliente1/testpass123`).
7. Al iniciar sesión, se guardan los tokens y se redirige a `/catalogo`.

### Flujo autenticado (usuario logueado)

1. Navbar muestra el usuario y botón "Cerrar sesión".
2. Si es admin o vendedor, puede acceder a `/catalogo/nuevo` para crear un producto (formulario validado con RHF + Zod).
3. Puede acceder a `/dashboard` (panel de administración con catálogo).
4. Desde el dashboard puede editar productos en `/dashboard/editar/[id]`.
5. Puede borrar productos desde el listado o desde el detalle.
6. Al cerrar sesión, se limpian tokens y cookies, y se redirige a `/login`.

---

## 7. Cronología de desarrollo (sprints)

| Sprint | Enfoque | Estado | Archivos clave |
|--------|---------|--------|----------------|
| 0 | Documentación base | ✅ | `reglas.md`, `vitacora.md`, `plan.md` |
| 1 | Rutas y layouts (R1) | ✅ | `src/app/` completo, `apiClient.js`, contextos |
| 2 | Componentes reutilizables (R2) | ✅ | 8 componentes en `src/components/` |
| 3 | CRUD completo (R3) | ✅ | `catalogo/page.jsx`, `[id]/page.jsx`, `nuevo/`, `editar/[id]/` |
| 4 | Autenticación (R4) | ✅ | `middleware.js`, `AuthContext` con cookies, `DashboardLayout` protegido |
| 5 | Formularios y validación (R5) | ✅ | Login y ProductoForm con RHF + Zod |
| 6 | Estado global (R6) | ✅ | `AuthContext` + `ThemeContext` en `layout.jsx` |
| 7 | Testing (R7) | ✅ | Vitest, 15 tests, `vitest.config.mjs` |
| 8 | Despliegue y entrega (R8) | ⏳ | Vercel, env vars, README, Kanban |

---

## 8. Credenciales de prueba

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin | Administrador |
| vendedor1 | testpass123 | Vendedor |
| cliente1 | testpass123 | Cliente |

---

## 9. Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm run start

# Lint
npm run lint

# Ejecutar tests
npm run test
```

---

## 10. Consideraciones para la defensa oral

1. **¿Por qué Next.js App Router?** Permite renderizado mixto (Server y Client Components), rutas anidadas y dinámicas nativas, y optimizaciones de rendimiento con Turbopack.

2. **¿Por qué `fetch` nativo y no Axios?** Cumple con las reglas del proyecto (sin dependencias innecesarias) y es suficiente para el consumo de la API REST.

3. **¿Por qué cookies además de `localStorage`?** El middleware de Next.js corre en el servidor y no tiene acceso a `localStorage`. Las cookies permiten que el middleware valide la sesión antes de renderizar la página protegida.

4. **¿Cómo se maneja el refresh de token?** `apiFetch` intercepta respuestas 401, intenta renovar con `/token/refresh/` y reintenta la petición automáticamente.

5. **¿Por qué RHF + Zod?** Proporciona validación declarativa de esquemas, manejo de estado de formulario y mensajes de error claros sin librerías de estado global pesadas.

6. **¿Qué servidor usa el despliegue?** Next.js en Vercel usa su propio adaptador de servidor (Node.js). La variable `NEXT_PUBLIC_API_BASE_URL` debe apuntar a la API desplegada públicamente.

7. **¿Cómo funciona el modo oscuro?** `ThemeContext` establece `data-theme="dark"` en `<html>`, y `globals.css` sobreescribe las clases de Tailwind hardcodeadas para cambiar toda la interfaz a colores oscuros.

---

## 11. Pendientes (Sprint 8)

- Desplegar en Vercel.
- Configurar `NEXT_PUBLIC_API_BASE_URL` en variables de entorno de producción.
- Asegurar que la API de Django esté accesible públicamente.
- Completar `README.md` con: título, temática, enlace a la API, pasos de ejecución, variables de entorno, cómo correr tests, enlace desplegado, enlace Kanban, capturas, integrantes.
- Crear tablero Kanban (Trello o GitHub Projects) con tareas asignadas.

*Documento generado para apoyo en la defensa oral del EFI 2026 — Frontend Next.js + API Django REST.*
