# front.md - Esqueleto de Frontend para API Django REST

## 1. Configuración Base

### Variables de Entorno
```env
# .env.local o .env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
# NextJS
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
# Astro
PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
```

### Paquetes Recomendados
- **Axios** o **Fetch API** para peticiones HTTP
- **React Query** o **TanStack Query** para gestión de estado servidor
- **React Hook Form** + **Zod** para formularios
- **React Router** o **Wouter** para routing (Vite)
- **Next.js** routing nativo (App Router)
- **Astro** con endpoints API integrados

## 2. Estructura de Componentes

```
src/
├── api/                  # Configuración de cliente HTTP
│   └── client.ts        # Instancia de axios/fetch con base URL
│   └── auth.ts          # Interceptores de token JWT
├── components/          # Componentes UI reutilizables
│   ├── ui/              # Botones, inputs, tarjetas (shadcn/ui)
│   ├── Layout.tsx       # Header, sidebar, footer
│   └── ErrorBoundary.tsx # Manejo de errores global
├── pages/              # Páginas/routes por app
│   ├── home/
│   ├── catalogo/
│   │   ├── categories/
│   │   └── products/
│   ├── compras/
│   └── ventas/
├── stores/             # Zustand/Jotai para estado global
├── hooks/              # Custom hooks (useFetch, useAuth, etc.)
├── types/              # TypeScript interfaces (generados del API)
└── utils/              # Helper functions
```

## 3. Endpoints de la API (mapeo)

### Autenticación
- `POST /api/token/` - Login con JWT
- `POST /api/token/refresh/` - Refrescar access token
- `POST /api/usuarios/cliente/` - Registro de cliente
- `POST /api/usuarios/vendedor/` - Registro de vendedor

### Catálogo
- `GET /api/catalogo/categoria/` - Listar categorías
- `GET /api/catalogo/producto/` - Listar productos activos
- `GET /api/catalogo/producto-get/` - Productos con anidados (marca+categoría)
- `GET /api/catalogo/categoria-get/{id}/` - Categoría con productos

### Proveedores
- `GET /api/proveedores/proveedor/` - Listar proveedores
- `GET /api/proveedores/proveedor-get/{id}/` - Proveedor detalle

### Compras
- `GET /api/compras/compra/` - Listar compras
- `GET /api/compras/compra-get/` - Compras con proveedor
- `GET /api/compras/compra-list/` - Compras con datos anidados (proveedor+detalles)
- `GET /api/compras/detalle-compra/` - Detalles de compra

### Ventas
- `GET /api/ventas/venta/` - Listar ventas
- `GET /api/ventas/venta-get/` - Ventas con cliente
- `GET /api/ventas/detalle-venta/` - Detalles de venta

## 4. Patrón de Autenticación

```typescript
// api/client.ts (ejemplo Axios)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Para sesión Django
});

// Interceptor para agregar token JWT a headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

// Interceptor para refrescar token automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = await api.post('/api/token/refresh/');
      localStorage.setItem('access_token', refresh.data.access);
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
```

## 5. Hooks Personalizados

```typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Validar token o verificar sesión
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/api/token/', credentials);
    localStorage.setItem('access_token', response.data.access);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return { isAuthenticated, user, login, logout };
}
```

## 6. Componentes por Sección

### Catálogo de Productos
```tsx
// ProductoList.tsx
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function ProductoList() {
  const { data, isLoading } = useQuery({
    queryKey: ['productos'],
    queryFn: () => api.get('/api/catalogo/producto/').then(r => r.data),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="grid gap-4">
      {data.map(producto => (
        <ProductoCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
```

### Carrito/Lista de Deseos
```tsx
// ListaDeseosStore.ts (Zustand)
import create from 'zustand';

export const useWishlistStore = create(set => ({
  items: [],
  addItem: (productoId) => set(state => {
    const exists = state.items.some(item => item.producto_id === productoId);
    return { items: exists ? state.items : [...state.items, { producto_id: productoId }] };
  }),
  removeItem: (productoId) => set(state => ({
    items: state.items.filter(item => item.producto_id !== productoId)
  })),
  clear: () => set({ items: [] }),
}));
```

### Formularios de Venta/Compra
```tsx
// VentaForm.tsx
import { useForm } from 'react-hook-form';

export function VentaForm() {
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = async (data) => {
    await api.post('/api/ventas/venta/', data);
    reset();
    toast('Venta creada exitosamente');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('clienteId')} required />
      <select {...register('estado')} required>
        <option value="pendiente">Pendiente</option>
        <option value="completada">Completada</option>
      </select>
      <button type="submit">Crear Venta</button>
    </form>
  );
}
```

## 7. Configuración por Framework

### React Vite
```bash
npm create vite@latest frontend -- --template react-ts
npm i axios @tanstack/react-query react-router-dom @hookform/react-hook-form zod
```

### NextJS 14 (App Router)
```bash
npx create-next-app@latest frontend --typescript --tailwind --app
# next.config.mjs con rewrites para desarrollo
```

### Astro 4
```bash
npm create astro@latest frontend -- --template react
# Astro usa islands y endpoints API separados
```

## 8. Deployment Consideraciones

### Variables de Producción
```env
VITE_API_BASE_URL=https://tu-dominio.com/api
```

### CORS Already Configurado en Django
Asegúrate de tener en `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev
    "http://localhost:3000",  # NextJS dev
    "https://tu-dominio.com",
]
```

### Service Worker (Opicional)
Para offline support en PWA.

## 9. Scripts de Desarrollo

```json
// package.json snippets
"dev": "vite",                                    // React Vite
"dev": "next dev",                                // NextJS
"dev": "astro dev",                               // Astro
"build": "vite build || next build || astro build",
"preview": "vite preview || next start || astro preview"
```

## 10. Flujo de Trabajo Recomendado

1. **Paso 1**: Configurar `.env` con `API_BASE_URL`
2. **Paso 2**: Crear cliente API con interceptores JWT
3. **Paso 3**: Implementar `useAuth` hook y proteger rutas
4. **Paso 4**: Mapear los 5 principales endpoints (categorías, productos, proveedores, compras, ventas)
5. **Paso 5**: Crear componentes de lista y detalle para cada recurso
6. **Paso 6**: Implementar formularios con React Hook Form + validación Zod
7. **Paso 7**: Agregar gestión de estado con React Query para caching
8. **Paso 8**: Probar login/logout y endpoints protegidos/abiertos
9. **Paso 9**: Manejo de errores global y estados de carga
10. **Paso 10**: Desplegar y verificar en producción

---

**Nota importante:** Tu API ya tiene autenticación híbrida (JWT + Sesión Django). Para el frontend, recomiendo usar JWT en localStorage con interceptor de refresh automático, ya que es más sencillo para React/NextJS/Astro y compatible con tu configuración actual.

**Para empezar, solo necesitas:**
1. Crear el proyecto del framework de tu elección (Vite es el más rápido para empezar)
2. Configurar el cliente API base URL
3. Implementar el hook de autenticación
4. Probar el endpoint `/api/token/` con las credencias de prueba (admin/admin, vendedor1/testpass123, cliente1/testpass123)