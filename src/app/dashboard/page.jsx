'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import { useAuth } from '@/context/AuthContext';
import ProductoCard from '@/components/ProductoCard';
import Cargando from '@/components/Cargando';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Boton from '@/components/ui/Boton';

export default function DashboardPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [allProductos, setAllProductos] = useState([]);
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, valorTotal: 0, sinStock: 0, categorias: 0 });

  const productos = allProductos.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/producto-get/');
        const prods = Array.isArray(data) ? data : data.results || [];
        if (montado) {
          setAllProductos(prods);
          setStats({
            total: prods.length,
            valorTotal: prods.reduce((acc, p) => acc + (p.precio_lista * p.stock_total || 0), 0),
            sinStock: prods.filter(p => (p.stock_total || p.stock || 0) === 0).length,
            categorias: new Set(prods.map(p => p.categoria?.nombre || p.categoria)).size,
          });
        }
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar los productos');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar este producto?')) return;
    try {
      await apiFetch(`/catalogo/producto/${id}/`, { method: 'DELETE' });
      setAllProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo borrar el producto');
    }
  };

  if (loading) return <Cargando mensaje="Cargando dashboard…" size="lg" variant="neon" />;
  if (error) return (
    <div className="container mx-auto p-4">
      <Card variant="neonPink" padding="lg" className="max-w-md mx-auto text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-neon-pink)] mb-2">Error</h2>
        <p className="text-[var(--color-text-muted)]">{error}</p>
        <Boton variant="neonOutlinePink" onClick={() => window.location.reload()} className="mt-4">Reintentar</Boton>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Dashboard</h1>
          <p className="text-[var(--color-text-muted)]">Panel de administración de productos</p>
        </div>
        <div className="flex gap-3">
          <Link href="/catalogo/nuevo" className="btn-neon px-6 py-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo producto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" role="list" aria-label="Estadísticas">
        {[
          { label: 'Total productos', value: stats.total, icon: '📦', color: 'neon' },
          { label: 'Valor inventario', value: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(stats.valorTotal), icon: '💰', color: 'neonGreen' },
          { label: 'Sin stock', value: stats.sinStock, icon: '⚠️', color: stats.sinStock > 0 ? 'neonPink' : 'neon' },
          { label: 'Categorías', value: stats.categorias, icon: '🏷️', color: 'neonCyan' },
        ].map((stat, i) => (
          <Card key={i} variant="neon" padding="lg" className={`animate-in slide-in-from-bottom-4 duration-300 delay-${i * 100}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-1">{stat.label}</p>
                <p className="font-display text-2xl font-bold text-gradient-neon">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br from-[var(--color-${stat.color === 'neonGreen' ? 'neon-green' : stat.color})] to-[var(--color-${stat.color === 'neonPink' ? 'neon-pink' : stat.color === 'neonCyan' ? 'neon-cyan' : 'neon-green'})]`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card variant="glass" padding="md" className="mb-8">
        <div className="relative max-w-xl">
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
      </Card>

      {query && (
        <div className="mb-4 flex items-center gap-2 text-sm text-[var(--color-text-muted)] animate-in slide-in-from-top-2 duration-300">
          <span>Resultados para:</span>
          <span className="font-medium text-[var(--color-neon-green)]">{query}</span>
          <Boton variant="ghost" size="sm" onClick={() => setQuery('')}>Limpiar</Boton>
        </div>
      )}

      {productos.length === 0 && (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">
            No se encontraron productos{query ? ' con ese nombre' : ''}.
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
            {query ? 'Intenta con otros términos de búsqueda.' : 'No hay productos registrados aún.'}
          </p>
          {query && <Boton variant="neonOutline" onClick={() => setQuery('')} className="mt-4">Limpiar búsqueda</Boton>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {productos.map((prod) => (
          <Card key={prod.id} variant="neon" padding="none" hover>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-elevated)]">
              {prod.imagen_url || prod.marca?.logo ? (
                <img src={prod.imagen_url || prod.marca?.logo} alt={prod.nombre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {(prod.stock_total === 0 || prod.stock === 0) && (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/90">
                  <span className="badge-neon-pink text-sm px-3 py-1">AGOTADO</span>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col h-40">
              <ProductoCard producto={prod} />
              <div className="mt-auto pt-3 flex gap-2 border-t border-[var(--color-border)]">
                <Link
                  href={`/dashboard/editar/${prod.id}`}
                  className="btn-neon-outline flex-1 justify-center py-2 text-sm"
                >
                  Editar
                </Link>
                <Boton
                  variant="neonOutlinePink"
                  size="sm"
                  onClick={() => handleBorrar(prod.id)}
                  className="flex-1 justify-center py-2 text-sm"
                >
                  Borrar
                </Boton>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {productos.length === 0 && !query && (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)]">No hay productos registrados.</p>
          <Link href="/catalogo/nuevo" className="btn-neon mt-4 inline-flex">Crear primer producto</Link>
        </div>
      )}
    </div>
  );
}