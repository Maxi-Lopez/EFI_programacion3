'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import ProductoCard from '@/components/ProductoCard';
import Card from '@/components/ui/Card';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';

export default function CatalogoPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [allProductos, setAllProductos] = useState([]);
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroMarca, setFiltroMarca] = useState('todas');

  // Extraer categorías y marcas únicas de los productos cargados
  const categoriasUnicas = [...new Set(allProductos.map((p) => p.categoria?.nombre).filter(Boolean))].sort();
  const marcasUnicas = [...new Set(allProductos.map((p) => p.marca?.nombre).filter(Boolean))].sort();

  const productos = allProductos.filter((p) => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(query.toLowerCase());
    const coincideCategoria = filtroCategoria === 'todas' || p.categoria?.nombre === filtroCategoria;
    const coincideMarca = filtroMarca === 'todas' || p.marca?.nombre === filtroMarca;
    return coincideBusqueda && coincideCategoria && coincideMarca;
  });

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/producto-get/');
        if (montado) setAllProductos(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar los productos');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar este producto?')) return;
    try {
      await apiFetch(`/catalogo/producto/${id}/`, { method: 'DELETE' });
      setAllProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo borrar el producto');
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  if (loading) return <Cargando mensaje="Cargando productos…" size="lg" variant="neon" />;
  if (error) return (
    <div className="container mx-auto p-4">
      <Card variant="neonPink" padding="lg" className="max-w-md mx-auto text-center">
        <svg className="w-12 h-12 mx-auto mb-3 text-[var(--color-neon-pink)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="font-display text-xl font-bold text-[var(--color-neon-pink)] mb-2">Error al cargar</h2>
        <p className="text-[var(--color-text-muted)]">{error}</p>
        <Boton variant="neonOutlinePink" onClick={() => window.location.reload()} className="mt-4">
          Reintentar
        </Boton>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Catálogo</h1>
          <p className="text-[var(--color-text-muted)]">Gestión de productos</p>
        </div>
        {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
          <div className="flex gap-3">
            <Link
              href="/catalogo/nuevo"
              className="btn-neon px-6 py-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nuevo producto
            </Link>
          </div>
        )}
      </div>

      <Card variant="glass" padding="md" className="mb-8">
        <div className="space-y-4">
          <div className="relative max-w-xl mx-auto md:mx-0">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              id="buscar"
              label="Buscar producto"
              placeholder="Buscar por nombre…"
              value={query}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="filtro-categoria" className="label-neon">Categoría</label>
              <select
                id="filtro-categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="input-neon w-full appearance-none bg-[var(--color-bg-elevated)]"
              >
                <option value="todas">Todas las categorías</option>
                {categoriasUnicas.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filtro-marca" className="label-neon">Marca</label>
              <select
                id="filtro-marca"
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
                className="input-neon w-full appearance-none bg-[var(--color-bg-elevated)]"
              >
                <option value="todas">Todas las marcas</option>
                {marcasUnicas.map((marca) => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
            </div>
          </div>

          {(filtroCategoria !== 'todas' || filtroMarca !== 'todas') && (
            <div className="flex flex-wrap gap-2">
              {filtroCategoria !== 'todas' && (
                <span className="badge-neon text-xs flex items-center gap-1">
                  Categoría: {filtroCategoria}
                  <button
                    type="button"
                    onClick={() => setFiltroCategoria('todas')}
                    className="ml-1 hover:text-[var(--color-neon-pink)] transition-colors"
                    aria-label="Quitar filtro de categoría"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {filtroMarca !== 'todas' && (
                <span className="badge-neon text-xs flex items-center gap-1">
                  Marca: {filtroMarca}
                  <button
                    type="button"
                    onClick={() => setFiltroMarca('todas')}
                    className="ml-1 hover:text-[var(--color-neon-pink)] transition-colors"
                    aria-label="Quitar filtro de marca"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {(filtroCategoria !== 'todas' || filtroMarca !== 'todas') && (
                <button
                  type="button"
                  onClick={() => { setFiltroCategoria('todas'); setFiltroMarca('todas'); }}
                  className="btn-neon-outline btn-sm px-3 py-1.5"
                >
                  Limpiar todos
                </button>
              )}
            </div>
          )}
        </div>
      </Card>

      {productos.length === 0 && (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">
            No se encontraron productos
            {(query || filtroCategoria !== 'todas' || filtroMarca !== 'todas') ? ' con los filtros aplicados' : ''}.
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
            {query || filtroCategoria !== 'todas' || filtroMarca !== 'todas'
              ? 'Intenta ampliar tu búsqueda o cambiar los filtros.'
              : 'Aún no hay productos en el catálogo.'}
          </p>
          {(query || filtroCategoria !== 'todas' || filtroMarca !== 'todas') && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              {query && (
                <Boton
                  variant="neonOutline"
                  onClick={() => setQuery('')}
                  className="mt-4 sm:mt-0"
                >
                  Limpiar búsqueda
                </Boton>
              )}
              {(filtroCategoria !== 'todas' || filtroMarca !== 'todas') && (
                <Boton
                  variant="neonOutline"
                  onClick={() => { setFiltroCategoria('todas'); setFiltroMarca('todas'); }}
                  className="mt-4 sm:mt-0"
                >
                  Limpiar filtros
                </Boton>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--color-text-muted)]">Vista:</span>
          <div className="flex bg-[var(--color-bg-elevated)] rounded-xl p-1 border border-[var(--color-border)]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-[var(--color-neon-green)] text-[#050508] shadow-[0_0_10px_var(--color-glow-green)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
              aria-label="Vista en cuadrícula"
              aria-pressed={viewMode === 'grid'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-[var(--color-neon-cyan)] text-[#050508] shadow-[0_0_10px_var(--color-glow-cyan)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
              aria-label="Vista en lista"
              aria-pressed={viewMode === 'list'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {productos.map((prod) => (
            <Card key={prod.id} variant="neon" padding="none" hover>
              <ProductoCard producto={prod} />
              {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
                <div className="p-4 pt-0 flex gap-2 border-t border-[var(--color-border)]">
                  <Link
                    href={`/dashboard/editar/${prod.id}`}
                    className="btn-neon-outline flex-1 justify-center py-2 text-sm"
                  >
                    Editar
                  </Link>
                  <Boton
                    variant="neonOutlinePink"
                    onClick={() => handleBorrar(prod.id)}
                    className="flex-1 justify-center py-2 text-sm"
                  >
                    Borrar
                  </Boton>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3" role="list">
          {productos.map((prod) => (
            <article key={prod.id} className="card-neon hover flex" role="listitem" style={{ minHeight: '120px' }}>
              <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-elevated)]">
                {prod.imagen_url || prod.marca?.logo ? (
                  <img src={prod.imagen_url || prod.marca?.logo} alt={prod.nombre} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold text-[var(--color-text)]">{prod.nombre}</h3>
                    {prod.marca && <span className="badge-glass text-xs shrink-0">{prod.marca.nombre || prod.marca}</span>}
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-1">{prod.descripcion || 'Sin descripción'}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-3 border-t border-[var(--color-border)]">
                  <div className="font-display text-xl font-bold text-gradient-neon">
                    ${prod.precio_lista || 0}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {prod.categoria && <span className="badge-glass text-xs">{prod.categoria.nombre || prod.categoria}</span>}
                    {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
                      <>
                        <Link href={`/dashboard/editar/${prod.id}`} className="btn-neon-outline btn-sm py-1.5">Editar</Link>
                        <Boton variant="neonOutlinePink" size="sm" onClick={() => handleBorrar(prod.id)}>Borrar</Boton>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {productos.length === 0 && !query && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">No hay productos disponibles.</p>
        </div>
      )}
    </div>
  );
}