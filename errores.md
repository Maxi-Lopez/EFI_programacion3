# Lista de Errores y Pendientes - Nexusgamer

Este documento contiene los bugs detectados y las tareas que quedan para finalizar el EFI.

## 🐛 Bugs actuales a corregir

### 1. ~~Bug de estado en el formulario de Registro~~ ✅ **CORREGIDO**
- **Problema:** Al crear un usuario exitosamente, el frontend redirige al login. Pero si el usuario vuelve a la página de registro (sin loguearse), el mensaje de "Usuario creado con éxito" sigue apareciendo y bloquea el formulario.
- **Solución aplicada:** Cambiado `useEffect` de `[reset]` a `[]` en `src/app/registro/page.jsx:47` para limpiar estado al montar. Tests pasan (10/10).

### 2. ~~Error al crear Productos con base de datos vacía~~ ✅ **CORREGIDO**
- **Problema:** En el formulario de `ProductoForm.jsx`, los campos de Marca y Categoría eran `<select>`. Si la base de datos está vacía (no hay marcas creadas), es imposible crear un producto porque no hay opciones para elegir.
- **Solución aplicada:**
  - **Frontend:** Cambiados los `<select>` por `<Input type="text">` en `src/components/ProductoForm.jsx` para que el usuario escriba el nombre.
  - **Backend:** Creado `SlugGetOrCreateField` personalizado en `src/catalogo/serializers.py` que usa `get_or_create()` automáticamente. El `ProductoSerializer` ahora usa este campo para `marca` y `categoria`. Al crear/actualizar productos, si la marca o categoría no existen, se crean automáticamente.

### 3. ~~Producto sin nombre en modales de Ventas/Compras~~ ✅ **CORREGIDO**
- **Problema:** En local, los modales de detalles de Ventas y Compras mostraban "Producto sin nombre" aunque la BD tenía datos.
- **Causa:** Los serializers `DetalleVentaSerializer` y `DetalleCompraSerializer` no incluían el objeto `producto` anidado con su nombre.
- **Solución aplicada:**
  - **Backend:** Agregado `producto = ProductoListSerializer(read_only=True)` en ambos serializers (`src/ventas/serializers.py` y `src/compras/serializers.py`).
  - **Frontend:** Ya usaba `item.producto?.nombre` (correcto).
  - **Verificación API:** `/api/ventas/detalle-venta-get/` y `/api/compras/compra-list/` devuelven `producto: { nombre: "...", marca: {...}, categoria: {...}, ... }`.

## ⚠️ Advertencias de Producción (Render)

### 4. ~~Persistencia de Base de Datos (SQLite en Render)~~ ✅ **RESUELTO (Supabase)**
- **Problema:** Render en su capa gratuita usa discos efímeros. La base de datos de SQLite se borra cada vez que el servidor se reinicia o duerme.
- **Solución aplicada:** Migración a **Supabase (PostgreSQL)**. La base de datos ya no se pierde en reinicios. API en Render conectada a Supabase.

## 📝 Tareas de entrega finales (Condiciones del EFI)

- [x] **README.md:** Completar placeholders (Link a Vercel ✅, Link a API en Render ✅, Nombres de integrantes ✅, Capturas de pantalla del sistema funcionando).
- [ ] **Kanban:** Crear el tablero (Trello/GitHub Projects), cargar tareas asignadas a los integrantes y poner el link en el README.
- [x] **Testing:** Correr `npm run test` en el frontend para confirmar que los tests no se rompieron tras todos los cambios (10/10 ✅).