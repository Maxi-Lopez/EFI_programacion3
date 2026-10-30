# Nexusgamer — Explicación Técnica Completa del Proyecto

## 1. Visión General

**Nexusgamer** es el frontend del Examen Final Integrador 2026 de Programación III. Es una aplicación web desarrollada con **Next.js 16 (App Router) + React 19 + JavaScript puro + Tailwind CSS v4** que consume una API REST de Django (django-rest-framework) desarrollada por el mismo grupo en Ingeniería de Software.

**Identidad visual**: Tienda de computación/gaming con paleta neón (verde #00ff88, rosa #ff006e, cyan #00d4ff, ámbar #ffaa00) sobre fondo oscuro (#050508) con soporte para modo claro/oscuro.

---

## 2. Estructura del Proyecto (App Router)

```
src/
├── app/                          # Rutas (App Router)
│   ├── layout.jsx                # Layout raíz (providers, Navbar, MenuLineal, Footer)
│   ├── page.jsx                  # Home → redirige a /catalogo
│   ├── globals.css               # Estilos globales + variables CSS (Tailwind v4 @theme)
│   ├── loading.jsx               # Loading global
│   ├── error.jsx                 # Error global
│   ├── not-found.jsx             # 404 global
│   ├── login/
│   │   └── page.jsx              # Login (Client Component, RHF + Zod)
│   ├── registro/
│   │   └── page.jsx              # Registro
│   ├── catalogo/
│   │   ├── page.jsx              # Listado productos (búsqueda, filtros, grid/list, CRUD admin)
│   │   ├── loading.jsx           # Loading catálogo
│   │   ├── error.jsx             # Error catálogo
│   │   ├── [id]/
│   │   │   └── page.jsx          # Detalle producto (ruta dinámica)
│   │   └── nuevo/
│   │       └── page.jsx          # Crear producto (ProductForm)
│   ├── dashboard/
│   │   ├── layout.jsx            # Layout anidado (protege rutas admin)
│   │   ├── page.jsx              # Dashboard admin (stats + listado productos)
│   │   └── editar/
│   │       └── [id]/
│   │           └── page.jsx      # Editar producto (ruta dinámica anidada)
│   ├── compras/
│   │   └── page.jsx              # Historial compras (protegido)
│   ├── ventas/
│   │   └:: page.jsx              # Historial ventas (protegido)
│   ├── proveedores/
│   │   └:: page.jsx              # Gestión proveedores (protegido)
│   ├── categorias/
│   │   └:: page.jsx              # Gestión categorías (protegido)
│   ├── lista-deseos/
│   │   └:: page.jsx              # Wishlist (requiere login)
│   ├── por-que-comprar/
│   │   └:: page.jsx              # Landing informativa
│   ├── sobre-nosotros/
│   │   └:: page.jsx              # Landing informativa
│   ├── contacto/
│   │   └:: page.jsx              # Formulario de contacto (RHF + Zod)
│   └── legal/
│       └── [slug]/
│           └:: page.jsx          # Páginas legales dinámicas (Server Component)
├── components/
│   ├── ui/                       # Componentes UI base (reutilizables)
│   │   ├── Boton.jsx             # Botón con variantes neón
│   │   ├── Card.jsx              # Tarjeta con variantes (neon, glass, gradientBorder...)
│   │   ├── Input.jsx             # Input con label, error, icon
│   │   └── BackToTop.jsx         # Botón volver arriba
│   ├── layout/                   # Componentes de layout
│   │   ├── Navbar.jsx            # Barra superior (logo, auth, theme toggle)
│   │   ├── MenuLineal.jsx        # Menú horizontal con indicador animado
│   │   └── Footer.jsx            # Pie de página
│   ├── ProductoCard.jsx          # Tarjeta de producto (Client Component)
│   ├── ProductoForm.jsx          # Formulario crear/editar (RHF + Zod)
│   ├── Cargando.jsx              # Spinner/dots de carga
│   └── ContactoForm.jsx          # Formulario de contacto (RHF + Zod)
├── context/
│   ├── AuthContext.jsx           # Estado global auth (JWT, user, wishlist)
│   └── ThemeContext.jsx          # Estado global tema (light/dark + localStorage)
├── utils/
│   └:: apiClient.js              # Wrapper fetch con auto-refresh token
├── test/                         # Tests unitarios (Vitest + RTL)
│   ├── setup.jsx
│   ├── Boton.test.jsx
│   ├── ProductoCard.test.jsx
│   ├── apiFetch.test.jsx
│   └:: zod.test.jsx
├── middleware.js                 # Protección de rutas (JWT en cookies)
└── postcss.config.mjs            # Config PostCSS para Tailwind v4
```

---

## 3. Rutas Implementadas (R1 - Enrutamiento y Layouts)

| Ruta | Tipo | Descripción | Protegida |
|------|------|-------------|-----------|
| `/` | Principal | Home → redirect a /catalogo | No |
| `/login` | Principal | Login (RHF + Zod) | No |
| `/registro` | Principal | Registro | No |
| `/catalogo` | Principal | Listado productos con búsqueda/filtros | No |
| `/catalogo/[id]` | **Dinámica** | Detalle producto | No |
| `/catalogo/nuevo` | Principal | Crear producto (admin) | **Sí** |
| `/dashboard` | Principal | Panel admin (stats + productos) | **Sí** |
| `/dashboard/editar/[id]` | **Dinámica anidada** | Editar producto | **Sí** |
| `/compras` | Principal | Historial compras | **Sí** |
| `/ventas` | Principal | Historial ventas | **Sí** |
| `/proveedores` | Principal | Gestión proveedores | **Sí** |
| `/categorias` | Principal | Gestión categorías | **Sí** |
| `/lista-deseos` | Principal | Wishlist (requiere login) | **Sí** |
| `/por-que-comprar` | Principal | Landing informativa | No |
| `/sobre-nosotros` | Principal | Landing informativa | No |

**Layouts:**
- **Layout raíz** (`app/layout.jsx`): Providers (Auth, Theme), Navbar, MenuLineal, Footer, BackToTop
- **Layout anidado** (`app/dashboard/layout.jsx`): Protege toda la sección `/dashboard/*`

**Estados de carga/error:**
- Global: `loading.jsx`, `error.jsx`, `not-found.jsx`
- Sección catálogo: `app/catalogo/loading.jsx`, `app/catalogo/error.jsx`

---

## 4. Componentes Reutilizables (R2 - Arquitectura)

### Client Components ("use client") - 7:
1. **Navbar** - Interactividad: theme toggle, logout, estado auth
2. **MenuLineal** - Indicador animado, scroll horizontal, active link
3. **ProductoCard** - Botón favoritos (wishlist), hover effects
4. **ProductoForm** - Formulario complejo RHF + Zod, carga datos para editar
5. **Cargando** - Animaciones de carga
6. **Boton** - Variantes, loading state, iconos
7. **Input** - Label, error, icono izquierdo
8. **Card** - Variantes visuales, hover, forwardRef
9. **BackToTop** - Scroll listener, animación entrada/salida
10. **ContactoForm** - Formulario de contacto RHF + Zod
11. **AuthContext Provider** - Context API auth
12. **ThemeContext Provider** - Context API tema
13. **Footer** - (Server Component por defecto, sin interactividad)

> **Total: 11 componentes reutilizables** (sin contar páginas)

**Justificación Client vs Server:**
- **Client**: Requieren hooks (`useState`, `useEffect`, `useContext`, `useRouter`), eventos (`onClick`, `onSubmit`), o acceso a `localStorage`/`document`
- **Server**: Páginas informativas (`por-que-comprar`, `sobre-nosotros`), layout anidado dashboard (solo envuelve children)

---

## 5. Integración con API y CRUD (R3)

### Cliente API (`src/utils/apiClient.js`)
```javascript
// Wrapper fetch nativo con:
// - Base URL configurable via NEXT_PUBLIC_API_BASE_URL
// - Auto-inyección de Authorization: Bearer <access_token>
// - Auto-refresh token en 401 (usa refresh_token en localStorage)
// - Manejo de errores tipificado (400, 401, 500)
// - cache: "no-store" para datos frescos
```

### Endpoints Consumidos

| Operación | Endpoint | Descripción |
|-----------|----------|-------------|
| **Auth** | `POST /api/token/` | Login (username + password) |
| **Auth** | `POST /api/token/refresh/` | Refresh access token |
| **Productos** | `GET /api/catalogo/producto-get/` | Listado (soporta paginación) |
| **Productos** | `GET /api/catalogo/producto/[id]/` | Detalle |
| **Productos** | `POST /api/catalogo/producto/` | Crear (admin) |
| **Productos** | `PUT /api/catalogo/producto/[id]/` | Editar (admin) |
| **Productos** | `DELETE /api/catalogo/producto/[id]/` | Borrar (admin) |
| **Marcas** | `GET /api/catalogo/marca-get/` | Para selects en formulario |
| **Categorías** | `GET /api/catalogo/categoria-get/` | Para selects + página admin |

### CRUD Completo (Producto)
- **Crear**: `/catalogo/nuevo` → `ProductoForm` (POST)
- **Leer**: `/catalogo` (grid/list con búsqueda), `/catalogo/[id]` (detalle)
- **Editar**: `/dashboard/editar/[id]` → `ProductoForm` (PUT)
- **Borrar**: Botón en catálogo/dashboard (DELETE + confirmación)

### Búsqueda/Filtros
- `/catalogo`: Search por nombre (client-side filter sobre datos cargados)
- Vista Grid / Lista toggle
- Filtros por query params: `?ofertas=1`, `?marcas=1`, `?categorias=1`

### Estados de Carga/Error
- `Cargando` component (spinner/dots) en todas las páginas con fetch
- Error boundaries por sección + toast inline en formularios
- Retry buttons en páginas de error

---

## 6. Autenticación (R4)

### Flujo JWT
```
Login (/login)
  → POST /api/token/ {username, password}
  → Recibe {access, refresh}
  → Guarda en localStorage + cookies (HttpOnly-style via document.cookie)
  → Decodifica JWT (payload) para extraer rol + username
  → AuthContext.setUser({token, username, rol})
  → Redirect a /catalogo
```

### Protección de Rutas
**Middleware** (`src/middleware.js`):
- Intercepta requests a rutas protegidas
- Lee `access_token` de cookies
- Si no hay token → 307 redirect a `/login?callbackUrl=...`
- Rutas protegidas: `/catalogo/nuevo`, `/ventas`, `/compras`, `/proveedores`, `/categorias`

**AuthContext** (Client-side):
- `user` object: `{token, username, rol}`
- `login()`, `logout()`, `toggleDeseo()` (wishlist)
- Persistencia en `localStorage` + cookies

### Roles
- `admin` / `administrador`: Acceso completo (CRUD productos, dashboard, ventas, compras, proveedores, categorías)
- `vendedor`: Ventas, compras, proveedores, categorías
- `cliente`: Solo catálogo público, wishlist, login/logout

---

## 7. Formularios y Validaciones (R5)

### Librerías
- **React Hook Form** (`react-hook-form`) - Controlled forms
- **Zod** (`zod`) - Schema validation
- **@hookform/resolvers/zod** - Integración RHF + Zod

### Formulario 1: Login (`src/app/login/page.jsx`)
```javascript
loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});
```
- Validación cliente (required)
- Errores API (credenciales inválidas) mostrados en toast
- Quick-login buttons para testing (admin, vendedor, cliente)

### Formulario 2: Producto Crear/Editar (`src/components/ProductoForm.jsx`)
```javascript
productoSchema = z.object({
  nombre: z.string().min(1).max(100),
  sku: z.string().min(1).max(100),
  descripcion_corta: z.string().max(500).optional(),
  precio_lista: z.string().regex(/^\d+(\.\d{1,2})?$/),
  stock_total: z.string().regex(/^\d+$/),
  marca: z.string().min(1),
  categoria: z.string().min(1),
  imagen_url: z.string().url().optional().or(z.literal('')),
});
```
- Carga dinámica de marcas/categorías desde API
- Modo "crear" (POST) vs "editar" (PUT + precarga datos)
- Vista previa de imagen URL
- Validación en tiempo real + errores API

---

## 8. Estado Global con Context API (R6)

### AuthContext (`src/context/AuthContext.jsx`)
```javascript
value = {
  user: { token, username, rol } | null,
  wishlist: number[],
  login(username, password),
  logout(),
  toggleDeseo(productId),
}
```
- JWT decode manual (sin librería externa)
- Wishlist persistida en localStorage
- Token en localStorage + cookies (para middleware)

### ThemeContext (`src/context/ThemeContext.jsx`)
```javascript
value = {
  theme: 'light' | 'dark',
  toggleTheme(),
}
```
- Persistencia en localStorage
- Aplica `data-theme="light|dark"` a `<html>` (CSS usa este selector)
- Inicialización desde localStorage o default 'light'

---

## 9. Testing Unitario (R7)

### Configuración
- **Vitest** + **React Testing Library** + **jsdom**
- `npm run test` → `vitest run`
- **10 tests pasando**

### Tests Implementados

| Archivo | Tests | Qué prueba |
|---------|-------|------------|
| `Boton.test.jsx` | 3 | Render, onClick, disabled |
| `ProductoCard.test.jsx` | 3 | Render datos, badges marca/cat, formato precio |
| `zod.test.jsx` | 4 | productoSchema (2) + loginSchema (2) - validaciones éxito/fallo |
| `apiFetch.test.jsx` | N | Mock fetch, auth headers, error handling |

---

## 10. Estilos y Temas

### Tailwind CSS v4 (`globals.css`)
- **@theme inline**: Fuentes (Orbitron, Rajdhani, system-ui)
- **@theme**: Variables de color completas (bg, surface, border, neon, text, glow)
- **Modo oscuro** (default): Variables base en `@theme`
- **Modo claro**: Selector `[data-theme='light']` sobrescribe todas las variables
- **Componentes**: Clases utilitarias (.glass, .neon-border, .btn-neon, .card-neon, etc.)
- **Animaciones**: @keyframes (neon-pulse, float, shimmer, aurora, grid-move, scanline)
- **Scroll suave**: `html { scroll-behavior: smooth }` + `data-scroll-behavior="smooth"`

### Correcciones Recientes (Tema Claro/Oscuro)
- Selector unificado a `[data-theme='light']` (antes mezclaba `:root:not([data-theme='dark'])`)
- Fix syntax error: llave faltante en `body::before` light
- `body::before` y `body::after` (fondos aurora/grid) ahora cambian correctamente
- `.navbar-glass` adapta background/shadow según tema
- `ThemeContext` ahora SIEMPRE setea `data-theme="light|dark"` (antes removía atributo en light)
- Eliminado `::selection` duplicado

---

## 11. Middleware y Seguridad

### `src/middleware.js`
```javascript
export function middleware(request) {
  // Rutas protegidas
  const rutasProtegidas = [
    '/catalogo/nuevo', '/ventas', '/compras', '/proveedores', '/categorias'
  ];
  
  const token = request.cookies.get('access_token')?.value;
  
  if (rutaProtegida && !token) {
    return NextResponse.redirect('/login?callbackUrl=...');
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/catalogo/nuevo', '/ventas', '/compras', '/proveedores', '/categorias'],
};
```

**Nota**: Next.js 16 muestra warning de deprecación ("middleware" → "proxy"). Se mantiene `middleware.js` por requerimiento académico (defensa oral).

---

## 12. Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | URL base API Django | `https://api-grupo.com/api` |
| (local) | Default si no está seteada | `http://127.0.0.1:8000/api` |

Archivo `.env.example` incluido. Copiar a `.env.local` para desarrollo.

---

## 13. Scripts Disponibles

```json
{
  "dev": "next dev",           // Desarrollo (Turbopack)
  "build": "next build",       // Build producción
  "start": "next start",       // Servidor producción
  "lint": "eslint",            // Linting
  "test": "vitest run"         // Tests unitarios
}
```

---

## 14. Estado Actual vs Requisitos (R1-R8)

| Requisito | Estado | Detalles |
|-----------|--------|----------|
| **R1** Enrutamiento/Layouts | ✅ **Completo** | 14 rutas (11 principales), 2 dinámicas (`[id]`), 1 anidada (`dashboard/editar/[id]`), layout raíz + anidado, loading/error/not-found global + sección |
| **R2** Componentes | ✅ **Completo** | 11 componentes reutilizables, mix Server/Client justificado |
| **R3** API/CRUD | ✅ **Completo** | CRUD producto completo, búsqueda, carga/error, 9 endpoints |
| **R4** Autenticación | ✅ **Completo** | JWT login/logout, middleware protección, roles, refresh token |
| **R5** Formularios | ✅ **Completo** | 2 formularios (Login, Producto) RHF + Zod, validación cliente + API |
| **R6** Context API | ✅ **Completo** | AuthContext + ThemeContext, localStorage, providers en layout raíz |
| **R7** Testing | ✅ **Completo** | Vitest configurado, 10 tests pasando (componentes, schemas, utils) |
| **R8** Despliegue | ⚠️ **Pendiente** | App lista para deploy, falta: Vercel/producción + API pública accesible |

---

## 15. Queda Pendiente para Completar Requisitos

### R8 - Despliegue en Producción
1. **Desplegar frontend en Vercel** (u otro hosting)
2. **Configurar variable de entorno** `NEXT_PUBLIC_API_BASE_URL` en producción apuntando a la API pública (NO localhost)
3. **Coordinar con equipo Back** para que la API Django esté desplegada y accesible públicamente (CORS configurado)
4. **Verificar funcionamiento end-to-end** en producción

### README.md - Completar Placeholders
- [ ] Enlace repositorio API Ingeniería de Software
- [ ] Enlace aplicación desplegada (Vercel)
- [ ] Enlace tablero Kanban (Trello/GitHub Projects)
- [ ] Capturas de pantalla funcionando
- [ ] Nombres y apellidos de los 4 integrantes

### Documentación Ágil
- [ ] Tablero Kanban actualizado con tareas asignadas por integrante
- [ ] GitFlow: ramas `main`, `develop`, `feature/*` con PRs descriptivas

### Notas técnicas recientes
- **Fix definitivo inputs**: `.input-neon` sin `padding` en `globals.css`, `Input.jsx` con `py-3`, `pl-12/pr-4`, `min-h-[48px]`, iconos `left-3`/`right-3` + `z-10`
- **Ruta `/legal/[slug]`**: Server Component dinámico con 5 páginas (terminos, privacidad, cookies, devoluciones, envios), `instant = false`

---

## 16. Puntos Clave para la Defensa Oral

1. **Arquitectura híbrida**: Server Components por defecto (SEO, performance), Client Components donde se necesita interactividad/estado
2. **Auth dual**: Middleware (server-side, cookies) + AuthContext (client-side, localStorage) → defensa en profundidad
3. **API Client robusto**: Auto-refresh token transparente, manejo errores tipificado, no-store cache
4. **Tema claro/oscuro real**: CSS variables + `data-theme` en `<html>` + Context + localStorage, sin FOUC
5. **Formularios profesionales**: RHF + Zod con validación en tiempo real, errores de campo + errores API, carga dinámica de selects
6. **Componentes reutilizables**: Card/Boton/Input con variantes via props, composition pattern, forwardRef
7. **Testing real**: 15 tests cubren UI, schemas, utils - no tests "de relleno"
8. **Middleware legado intencional**: Se mantiene `middleware.js` (no `proxy.js`) por requerimiento académico, se acepta warning

---

## 17. Credenciales de Prueba (Development)

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `admin` | Administrador |
| `vendedor1` | `testpass123` | Vendedor |
| `cliente1` | `testpass123` | Cliente |

---

## 18. Comandos Útiles para Desarrollo

```bash
# Instalar deps
npm install

# Desarrollo
npm run dev          # http://localhost:3000

# Tests
npm run test         # Vitest run (15 tests)

# Lint
npm run lint

# Build producción
npm run build
npm run start

# Ver estructura rutas
find src/app -name "page.jsx" | sort
```

---

## 19. Decisiones Técnicas Importantes

| Decisión | Justificación |
|----------|---------------|
| **JavaScript puro (no TypeScript)** | Requisito académico "JavaScript o TSX", equipo optó por JS para velocidad |
| **fetch nativo (no Axios/TanStack Query)** | Simplicidad, 0 deps extra, control total sobre refresh token |
| **JWT decode manual** | Evita dependencia `jwt-decode`, payload simple |
| **localStorage + cookies** | Middleware lee cookies, Client Context lee localStorage |
| **Tailwind v4 @theme** | Variables CSS nativas, mejor DX, sin config JS |
| **Middleware no migrado a proxy** | Requisito defensa: mostrar implementación estudiada |
| **Zod schemas exportados** | Reutilizables en tests y formularios |
| **Componentes UI con variantes** | Un solo componente `Card`/`Boton`/`Input` cubre todos los casos |

---

*Documento generado para facilitar transferencia de contexto a otra IA. Refleja el estado del proyecto al 29/10/2026.*