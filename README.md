# Nexusgamer

Frontend del Examen Final Integrador 2026 — Programación III. Aplicación web desarrollada con **Next.js 16 (App Router) + JavaScript puro + Tailwind CSS v4** que consume la API REST de Django desarrollada por el grupo en Ingeniería de Software.

## Temática

**Nexusgamer** — tienda de computación. Sistema integral de negocio que consume una API Django. Permite consultas de catálogo para clientes logueados o no; los clientes logueados pueden llenar el carrito y la lista de deseos. Los usuarios con rol de administrador pueden crear, editar y borrar productos; los clientes comunes solo ven el catálogo sin botones de administración (seleccionan productos para enviarlos al carrito o lista de deseos).

## Documentación de la API

- Repositorio de la API (Ingeniería de Software): [ENLACE_AL_REPOSITORIO_DE_LA_API]
- Endpoints consumidos: autenticación (`POST /api/token/`), refresh (`POST /api/token/refresh/`), catálogo de productos (`GET /api/catalogo/producto-get/`, `GET /api/catalogo/producto/[id]/`), crear (`POST /api/catalogo/producto/`), editar (`PUT /api/catalogo/producto/[id]/`), borrar (`DELETE /api/catalogo/producto/[id]/`).

## Stack

- Next.js 16.4.2 (App Router), React 19.3.0, JavaScript puro
- Tailwind CSS v4, Turbopack
- React Hook Form + Zod (`@hookform/resolvers/zod`)
- React Context API (`createContext` / `useContext`)
- Vitest + React Testing Library (testing unitario)
- `fetch` nativo para peticiones HTTP
- JWT en `localStorage` (`access_token`, `refresh_token`)

## Requisitos cumplidos (R1 a R8)

- **R1:** Enrutamiento y layouts (≥6 rutas, 1 anidada, 2 dinámicas, `<Link>`, layout raíz + anidado, 404/loading/error)
- **R2:** 8 componentes reutilizables (Server + Client Components con justificación)
- **R3:** CRUD completo (crear, leer, editar, borrar) con búsqueda/filtro y estados carga/error
- **R4:** Autenticación con JWT, login, logout y rutas protegidas
- **R5:** Formularios con React Hook Form + Zod (`zodResolver`), ≥2 formularios
- **R6:** Estado global con Context API (sesión y tema claro/oscuro)
- **R7:** Testing unitario con Vitest (≥4 tests pasando)
- **R8:** Despliegue en producción con variables de entorno

## Ejecución localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de entorno (copiar del ejemplo)
cp .env.example .env.local

# 3. Configurar NEXT_PUBLIC_API_BASE_URL en .env.local apuntando a la API pública

# 4. Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API Django REST | `https://api-tu-grupo.com/api` |

Credenciales de prueba: `admin/admin`, `vendedor1/testpass123`, `cliente1/testpass123`.

## Correr tests

```bash
npm run test
```

## Despliegue

- Aplicación desplegada: [ENLACE_VERCEL_OTRO_HOSTING] (pendiente de despliegue en producción)
- Variables de entorno de producción configuradas (incluyendo `NEXT_PUBLIC_API_BASE_URL` apuntando a la API pública, no localhost)
- La API del Back debe estar accesible públicamente

## Tablero Kanban

[Trello o GitHub Projects] — [ENLACE_AL_TABLERO_KANBAN] con tareas asignadas a los integrantes.

## Capturas

[Insertar capturas de la aplicación en funcionamiento: login, catálogo, dashboard, CRUD, etc.]

## Integrantes

- [Nombre y apellido 1]
- [Nombre y apellido 2]
- [Nombre y apellido 3]
- [Nombre y apellido 4]

## Metodología

GitFlow con ramas `main`, `develop` y `feature/*`. Cada sprint se entrega como commit descriptivo y se mergea vía Pull Request en GitHub.

## Licencia

EFI 2026 — Programación III
