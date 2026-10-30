# Punto de Partida - Frontend Next.js para efi2_ing_soft

## 1. Información del Proyecto

- **Backend**: Django REST Framework (API REST)
- **Base URL local**: `http://localhost:8000`
- **Base URL producción (Render)**: definir al desplegar
- **Frontend local**: `http://localhost:3000` (Next.js)
- **Frontend producción (Vercel)**: definir al desplegar
- **CORS**: configurado para `http://localhost:3000` en desarrollo

## 2. Autenticación

El API usa **JWT (access + refresh tokens)** y **Sesión** como clases de autenticación por defecto.

### Endpoints de autenticación
| Método | Endpoint | Descripción | Cuerpo |
|--------|----------|-------------|--------|
| POST | `/api/token/` | Obtener tokens (access + refresh) | `{ username, password }` |
| POST | `/api/token/refresh/` | Refrescar access token | `{ refresh }` |

### Uso de tokens
- Incluir el access token en el header: `Authorization: Bearer <access_token>`
- El refresh token se usa para obtener un nuevo access token sin volver a loguearse

### Credenciales de prueba (seed_db.py)
| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin | Superusuario |
| vendedor1 | testpass123 | Vendedor |
| cliente1 | testpass123 | Cliente |

## 3. Permisos

| Acción | ¿Quién puede? | Nota |
|--------|---------------|------|
| GET (lectura) | Público (`AllowAny`) | Listado y detalle públicos |
| POST/PUT/PATCH/DELETE (escritura) | Vendedores autenticados + superusuarios | `PermissionVendedor` |
| Registro cliente (`POST /api/usuarios/cliente/`) | Público | Crea usuario y asigna grupo 'Cliente' |
| Lista de deseos | Clientes autenticados y vendedores | `PermissionCliente` |
| `eliminado_logico` (`@action` POST) | Vendedores autenticados | Soft-delete (`is_active = False`) |

## 4. Endpoints de la API

### Autenticación
- `POST /api/token/` — Obtener JWT
- `POST /api/token/refresh/` — Renovar JWT

### Usuarios (`/api/usuarios/`)
| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/cliente/` | GET, POST, PUT, PATCH, DELETE | CRUD clientes (grupo 'Cliente') |
| `/cliente/{id}/eliminado_logico/` | POST | Soft-delete cliente |
| `/cliente-get/` | GET | Listado de clientes (solo lectura) |
| `/cliente-get/{id}/` | GET | Detalle cliente (solo lectura) |
| `/vendedor/` | GET, POST, PUT, PATCH, DELETE | CRUD vendedores (grupo 'Vendedor') |
| `/vendedor/{id}/eliminado_logico/` | POST | Soft-delete vendedor |
| `/vendedor-get/` | GET | Listado de vendedores (solo lectura) |
| `/vendedor-get/{id}/` | GET | Detalle vendedor (solo lectura) |
| `/lista-deseos/` | GET, POST, PUT, PATCH, DELETE | CRUD lista de deseos |
| `/lista-deseos/{id}/eliminado_logico/` | POST | Soft-delete item de deseos |
| `/lista-deseos-get/` | GET | Listado con datos anidados (usuario + producto) |
| `/lista-deseos-get/{id}/` | GET | Detalle item de deseos |

### Catálogo (`/api/catalogo/`)
| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/categoria/` | GET, POST, PUT, PATCH, DELETE | CRUD categorías |
| `/categoria/{id}/eliminado_logico/` | POST | Soft-delete categoría |
| `/categoria-get/` | GET | Listado categorías (solo lectura) |
| `/marca/` | GET, POST, PUT, PATCH, DELETE | CRUD marcas |
| `/marca/{id}/eliminado_logico/` | POST | Soft-delete marca |
| `/marca-get/` | GET | Listado marcas (solo lectura) |
| `/producto/` | GET, POST, PUT, PATCH, DELETE | CRUD productos (con filtros) |
| `/producto/{id}/eliminado_logico/` | POST | Soft-delete producto |
| `/producto-get/` | GET | Listado productos **anidados** (marca + categoría) |
| `/producto-get/{id}/` | GET | Detalle producto con marca y categoría |

### Proveedores (`/api/proveedores/`)
| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/proveedor/` | GET, POST, PUT, PATCH, DELETE | CRUD proveedores |
| `/proveedor/{id}/eliminado_logico/` | POST | Soft-delete proveedor |
| `/proveedor-get/` | GET | Listado proveedores (solo lectura) |

### Compras (`/api/compras/`)
| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/compra/` | GET, POST, PUT, PATCH, DELETE | CRUD compras |
| `/compra/{id}/eliminado_logico/` | POST | Soft-delete compra |
| `/compra-get/` | GET | Listado compras con proveedor |
| `/compra-list/` | GET | Listado compras **anidadas** (proveedor + detalles) |
| `/detalle-compra/` | GET, POST, PUT, PATCH, DELETE | CRUD detalles de compra |
| `/detalle-compra/{id}/eliminado_logico/` | POST | Soft-delete detalle |
| `/detalle-compra-get/` | GET | Listado detalles (compra + producto) |

### Ventas (`/api/ventas/`)
| Endpoint | Métodos | Descripción |
|----------|---------|-------------|
| `/venta/` | GET, POST, PUT, PATCH, DELETE | CRUD ventas |
| `/venta/{id}/eliminado_logico/` | POST | Soft-delete venta |
| `/venta-get/` | GET | Listado ventas con cliente |
| `/detalle-venta/` | GET, POST, PUT, PATCH, DELETE | CRUD detalles de venta |
| `/detalle-venta/{id}/eliminado_logico/` | POST | Soft-delete detalle |
| `/detalle-venta-get/` | GET | Listado detalles (venta + producto) |

### Documentación
- `GET /api/schema/` — Esquema OpenAPI
- `GET /api/schema/swagger/` — Swagger UI
- `GET /` — Vista de bienvenida (template HTML)
- `GET /admin/` — Panel de administración Django

## 5. Modelos (10 total)

| App | Modelo | Campos principales |
|-----|--------|-------------------|
| usuarios | `UsuarioPersonalizado` | username, email, telefono, dni, groups |
| usuarios | `ListaDeseosProductos` | usuario (FK), producto (FK), created_at, is_active |
| catalogo | `Categoria` | nombre, descripcion, is_active, created_at |
| catalogo | `Marca` | nombre, logo, descripcion, pais_origen, is_active, created_at |
| catalogo | `Producto` | nombre, sku, precio_lista, precio_oferta, stock_total, marca (FK), categoria (FK), is_active, created_at |
| proveedores | `Proveedor` | nombre, cuit, email, telefono, direccion, is_active, created_at |
| compras | `Compra` | proveedor (FK), estado, nro_factura, total, created_at, is_active |
| compras | `DetalleCompra` | compra (FK), producto (FK), unidades, precio, created_at, is_active |
| ventas | `Venta` | cliente (FK AUTH_USER_MODEL), estado, nro_factura, created_at, is_active |
| ventas | `DetalleVenta` | venta (FK), producto (FK), unidades, precio_unitario, created_at, is_active |

## 6. Características Importantes para el Frontend

### Paginación
- Todos los endpoints de `get all` están paginados
- `PageNumberPagination` con `PAGE_SIZE = 10`
- Respuesta paginada: `{ count, next, previous, results }`

### Filtros y Búsquedas
- `ProductoViewSet` soporta:
  - `filterset_fields`: `marca`, `categoria`, `destacado`, `is_active`
  - `search_fields`: `nombre`, `sku`, `descripcion_corta`
  - `ordering_fields`: `precio_lista`, `precio_oferta`, `stock_total`, `created_at`
- Ejemplo: `GET /api/catalogo/producto/?search=laptop&ordering=-precio_lista`

### Nested Serializers (datos anidados en list)
- `ProductoListSerializer` (`/producto-get/`): incluye `marca` y `categoria` anidadas
- `CompraListSerializer` (`/compra-list/`): incluye `proveedor_detalle` y `detalles` anidados
- `ListaDeseosGetSerializer` (`/lista-deseos-get/`): incluye `usuario` y `producto` anidadas

### Soft-delete (`eliminado_logico`)
- Todos los `ModelViewSet` tienen un `@action` POST `eliminado_logico` en `{id}/eliminado_logico/`
- Marca `is_active = False` y renombra campos únicos para evitar colisiones
- Los querysets filtran por `is_active = True`

## 7. Stack Sugerido para Next.js

```
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Axios o fetch nativo para llamadas a la API
- React Hook Form + Zod para formularios y validación
- Zustand o Context API para manejo de estado (auth, carrito, etc.)
- js-cookie o httpOnly cookies para almacenar tokens
- Lucide-react o similar para iconos
- date-fns para fechas
```

## 8. Estructura Sugerida del Frontend

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Home (llamar a GET /)
│   ├── login/
│   ├── register/
│   ├── productos/
│   ├── compras/
│   ├── ventas/
│   ├── proveedores/
│   ├── categorias/
│   ├── marcas/
│   ├── lista-deseos/
│   └── admin/
├── components/
├── lib/
│   ├── api.ts                   # Instancia de axios con base URL y interceptors de auth
│   ├── auth.ts                  # Funciones de login, logout, refresh token
│   └── validations.ts           # Esquemas Zod
├── types/
│   └── index.ts                 # Interfaces TypeScript de los modelos
└── hooks/
    ├── useAuth.ts
    ├── useProductos.ts
    └── useCompras.ts
```

## 9. Consideraciones de Despliegue

### Desarrollo local
- Backend: `http://localhost:8000` (Django runserver)
- Frontend: `http://localhost:3000` (Next.js dev)
- CORS permite `http://localhost:3000`
- Base de datos: SQLite (`db.sqlite3`)

### Producción
- Backend: Render (Dockerizado con `Dockerfile` + `compose.yaml`)
- Frontend: Vercel
- Variable de entorno: `NEXT_PUBLIC_API_URL=https://<backend>.onrender.com`
- CORS en producción debe permitir el dominio de Vercel

## 10. Pasos Iniciales para el Agente

1. Leer `endpoints.md` para tener la lista completa de endpoints
2. Revisar `memoria.md` para contexto del backend
3. Crear el archivo `.env.local` con `NEXT_PUBLIC_API_URL=http://localhost:8000`
4. Implementar la capa de API con axios (interceptor para agregar Bearer token automáticamente)
5. Implementar login/registro y persistencia de tokens
6. Construir las páginas principales: listado de productos, detalle, compras, ventas
7. Probar contra el backend local antes de desplegar a Render/Vercel
