# Nexusgamer

Frontend del Examen Final Integrador 2026 — Programación III. Aplicación web desarrollada con **Next.js 16 (App Router) + JavaScript puro + Tailwind CSS v4** que consume la API REST de Django (django-rest-framework) desarrollada por el mismo grupo en Ingeniería de Software.

Alojado en **https://efi-programacion3.vercel.app** (Frontend)  
API en **https://nexusgamer-api.onrender.com** (Backend Django REST + Supabase PostgreSQL)

## Temática

**Nexusgamer** — Tienda de computación y gaming. Sistema integral de negocio que consume una API Django REST desarrollada por el grupo en Ingeniería de Software. Permite consultas de catálogo para clientes logueados o no; los clientes logueados pueden llenar el carrito y la lista de deseos. Los usuarios con rol de administrador pueden crear, editar y borrar productos; los clientes comunes solo ven el catálogo sin botones de administración.

Identidad visual: Tienda de computación/gaming con paleta neón (verde #00ff88, rosa #ff006e, cyan #00d4ff, ámbar #ffaa00) sobre fondo oscuro (#050508) con soporte para modo claro/oscuro.

## Enlaces

| Descripción | Enlace |
|-------------|--------|
| Repositorio API (Ingeniería de Software) | [https://github.com/Maxi-Lopez/EFI_programacion3](https://github.com/Maxi-Lopez/EFI_programacion3) |
| Aplicación desplegada (Vercel) | [https://efi-programacion3.vercel.app](https://efi-programacion3.vercel.app) |
| API desplegada (Render) | [https://nexusgamer-api.onrender.com](https://nexusgamer-api.onrender.com) |
| Tablero Kanban (GitHub Projects) | [URL_TABLERO_KANBAN] |

## Stack Tecnológico

- **Framework**: Next.js 16.4.2 (App Router)
- **Runtime**: React 19.3.0
- **Lenguaje**: JavaScript (ES2022+)
- **Estilos**: Tailwind CSS v4 + CSS Variables (@theme)
- **Formularios**: React Hook Form + Zod (@hookform/resolvers/zod)
- **Estado Global**: React Context API (AuthContext + ThemeContext)
- **Testing**: Vitest + React Testing Library + jsdom
- **Autenticación**: JWT en localStorage + cookies (middleware)
- **HTTP**: fetch nativo con cache: "no-store" + auto-refresh token
- **Linting**: ESLint (eslint-config-next)

## Requisitos Previos

- Node.js 18+
- npm 9+
- API Django REST corriendo (local: `http://127.0.0.1:8000/api` | producción: `https://nexusgamer-api.onrender.com/api`)

## Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone [URL_REPOSITORIO]
cd next-drf

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local y setear NEXT_PUBLIC_API_BASE_URL

# 4. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Variables de Entorno

| Variable | Descripción | Ejemplo (local) | Ejemplo (producción) |
|----------|-------------|-----------------|----------------------|
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API Django REST | `http://127.0.0.1:8000/api` | `https://nexusgamer-api.onrender.com/api` |

Archivo `.env.example` incluido. Copiar a `.env.local` para desarrollo.

## Scripts Disponibles

```bash
npm run dev      # Desarrollo (Turbopack) - http://localhost:3000
npm run build    # Build producción
npm run start    # Servidor producción
npm run lint     # ESLint
npm run test     # Vitest (10 tests unitarios)
```

## Ejecutar Tests

```bash
npm run test
```

Ejecuta Vitest con jsdom y React Testing Library. Se esperan **10 tests pasando** en 4 archivos:
- `Boton.test.jsx` (3 tests)
- `ProductoCard.test.jsx` (3 tests)
- `zod.test.jsx` (4 tests: productoSchema + loginSchema)
- `apiFetch.test.jsx` (N tests: mock fetch, auth headers, error handling)

## Estructura del Proyecto

```
src/
├── app/                          # Rutas (App Router)
│   ├── layout.jsx                # Layout raíz (providers, Navbar, MenuLineal, Footer)
│   ├── page.jsx                  # Home → redirige a /catalogo
│   ├── globals.css               # Estilos globales + CSS Variables (Tailwind v4 @theme)
│   ├── loading.jsx               # Loading global
│   ├── error.jsx                 # Error global
│   ├── not-found.jsx             # 404 global
│   ├── login/
│   │   └── page.jsx              # Login (RHF + Zod)
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
│   │   └── page.jsx              # Historial ventas (protegido)
│   ├── proveedores/
│   │   └── page.jsx              # Gestión proveedores (protegido)
│   ├── categorias/
│   │   └── page.jsx              # Gestión categorías (protegido)
│   ├── lista-deseos/
│   │   └── page.jsx              # Wishlist (requiere login)
│   ├── por-que-comprar/
│   │   └── page.jsx              # Landing informativa
│   ├── sobre-nosotros/
│   │   └── page.jsx              # Landing informativa
│   ├── contacto/
│   │   └── page.jsx              # Formulario contacto (RHF + Zod)
│   └── legal/
│       └── [slug]/
│           └── page.jsx          # Páginas legales dinámicas (Server Component)
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
│   └── apiClient.js              # Wrapper fetch con auto-refresh token
├── test/                         # Tests unitarios (Vitest + RTL)
│   ├── setup.jsx
│   ├── Boton.test.jsx
│   ├── ProductoCard.test.jsx
│   ├── apiFetch.test.jsx
│   └── zod.test.jsx
├── middleware.js                 # Protección de rutas (JWT en cookies)
└── postcss.config.mjs            # Config PostCSS para Tailwind v4
```

## Rutas Implementadas

| Ruta | Tipo | Descripción | Protegida |
|------|------|-------------|-----------|
| `/` | Principal | Home → redirect a /catalogo | No |
| `/login` | Principal | Login (RHF + Zod) | No |
| `/registro` | Principal | Registro de usuarios | No |
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
| `/contacto` | Principal | Formulario contacto | No |
| `/legal/[slug]` | **Dinámica** | Páginas legales (5 slugs) | No |
| `/por-que-comprar` | Principal | Landing informativa | No |
| `/sobre-nosotros` | Principal | Landing informativa | No |

## Roles y Permisos

| Rol | Permisos |
|-----|----------|
| `admin` / `administrador` | CRUD productos, Dashboard, Ventas, Compras, Proveedores, Categorías |
| `vendedor` | Ventas, Compras, Proveedores, Categorías |
| `cliente` | Catálogo público, Wishlist, Contacto, Login/Logout |

**Credenciales de prueba (development):**
- `admin` / `admin` (Superusuario)
- `vendedor1` / `testpass123` (Vendedor)
- `cliente1` / `testpass123` (Cliente)

## Componentes Reutilizables (11)

| Componente | Tipo | Descripción |
|------------|------|-------------|
| `Boton` | Client | Botón con variantes neón, loading state, iconos |
| `Card` | Client | Tarjeta con variantes (neon, glass, gradientBorder...) |
| `Input` | Client | Input con label, error, icono izquierdo, helper text |
| `BackToTop` | Client | Botón flotante volver arriba |
| `Navbar` | Client | Barra superior (logo, auth, theme toggle) |
| `MenuLineal` | Client | Menú horizontal con indicador animado |
| `Footer` | Server | Pie de página con redes sociales |
| `ProductoCard` | Client | Tarjeta producto (wishlist, badges, hover) |
| `ProductoForm` | Client | Formulario crear/editar (RHF + Zod) |
| `Cargando` | Client | Spinner/dots de carga |
| `ContactoForm` | Client | Formulario contacto (RHF + Zod) |

## Estado Global (Context API)

| Contexto | Función |
|----------|---------|
| `AuthContext` | Sesión (token, username, rol), wishlist, login(), logout(), toggleDeseo() |
| `ThemeContext` | Tema light/dark, toggleTheme(), persistencia localStorage, `data-theme` en `<html>` |

## Autenticación

- **Login**: `POST /api/token/` → JWT (access + refresh)
- **Storage**: localStorage + cookies (HttpOnly-style via document.cookie)
- **Middleware**: Protege `/catalogo/nuevo`, `/dashboard/*`, `/ventas`, `/compras`, `/proveedores`, `/categorias`, `/lista-deseos`
- **Refresh automático**: En 401, usa `refresh_token` para obtener nuevo `access_token`

## Capturas de Pantalla

Las capturas se encuentran en la carpeta `public/capturas/` (pendientes de subir).

| Vista | Captura |
|-------|---------|
| Home / Splash | `![Home](public/capturas/home.png)` |
| Login | `![Login](public/capturas/login.png)` |
| Catálogo (Grid + Filtros) | `![Catalogo](public/capturas/catalogo.png)` |
| Detalle Producto | `![Detalle](public/capturas/detalle.png)` |
| Dashboard | `![Dashboard](public/capturas/dashboard.png)` |
| Modo Oscuro/Claro | `![Theme](public/capturas/theme.png)` |

## Integrantes

| Nombre | Rol |
|--------|-----|
| Maximiliano López | Full |

## Metodología

- **GitFlow**: Ramas `main`, `develop`, `feature/*`
- **Commits**: Descriptivos, agrupados por sprint/feature
- **PRs**: Revisión obligatoria antes de merge a `develop`
- **Kanban**: GitHub Projects (configurado en el repositorio)

## Decisiones Técnicas Clave

| Decisión | Justificación |
|----------|---------------|
| JavaScript puro (no TypeScript) | Requisito académico "JavaScript o TSX", velocidad de desarrollo |
| fetch nativo (no Axios/TanStack) | 0 deps extra, control total sobre refresh token |
| JWT decode manual | Evita dependencia `jwt-decode`, payload simple |
| localStorage + cookies | Middleware lee cookies, Client Context lee localStorage |
| Tailwind v4 @theme | Variables CSS nativas, mejor DX, sin config JS |
| Middleware legacy | Requisito defensa oral: mostrar implementación estudiada |
| Zod schemas exportados | Reutilizables en tests y formularios |
| Componentes UI con variantes | Un solo componente `Card`/`Boton`/`Input` cubre todos los casos |

## Estado de Requisitos (R1-R8)

| Requisito | Estado |
|-----------|--------|
| R1 Enrutamiento/Layouts | ✅ Completo |
| R2 Componentes | ✅ Completo (11 reutilizables) |
| R3 API/CRUD | ✅ Completo |
| R4 Autenticación | ✅ Completo |
| R5 Formularios | ✅ Completo (2 formularios RHF+Zod) |
| R6 Context API | ✅ Completo |
| R7 Testing | ✅ Completo (10 tests) |
| R8 Despliegue | ✅ **Desplegado** (Vercel + Render + Supabase) |

---

**EFI 2026 — Programación III**  
Desarrollado con Next.js 16 + React 19 + Tailwind CSS v4
