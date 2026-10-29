'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Boton from '@/components/ui/Boton';
import Cargando from '@/components/Cargando';

export default function CatalogoDetallePage({ params }) {
  const router = useRouter();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/catalogo/producto/${params.id}/`);
        if (montado) {
          setProducto(data);
          setLoading(false);
        }
      } catch (err) {
        if (montado) {
          setError(err.message || 'Producto no encontrado');
          setLoading(false);
          notFound();
        }
      }
    };
    cargar();
    return () => { montado = false; };
  }, [params.id]);

  if (loading) return <Cargando mensaje="Cargando producto…" size="lg" variant="neon" />;
  if (error || !producto) return notFound();

  const formatPrice = (price) => {
    if (!price) return '$0';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/catalogo" className="btn-neon-ghost btn-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="gradientBorder" padding="none" className="overflow-hidden">
          <div className="aspect-square relative overflow-hidden bg-[var(--color-bg-elevated)]">
            {producto.imagen_url || producto.marca?.logo ? (
              <img
                src={producto.imagen_url || producto.marca?.logo}
                alt={producto.nombre}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-neon-green)]/10 to-[var(--color-neon-cyan)]/10">
                <svg className="w-24 h-24 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {(producto.stock_total === 0 || producto.stock === 0) && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/90">
                <span className="badge-neon-pink text-lg px-6 py-3 animate-pulse">AGOTADO</span>
              </div>
            )}
          </div>
        </Card>

        <Card variant="neon" padding="xl">
          <div className="mb-6">
            {producto.marca && (
              <span className="badge-neon-cyan text-sm mb-3 inline-block">
                {producto.marca.nombre || producto.marca}
              </span>
            )}
            {producto.categoria && (
              <span className="badge-glass text-sm mb-3 inline-block ml-2">
                {producto.categoria.nombre || producto.categoria}
              </span>
            )}
            <h1 className="font-display text-4xl font-bold text-gradient-neon mb-3">
              {producto.nombre || 'Producto'}
            </h1>
            <p className="font-display text-4xl font-bold text-gradient-neon mb-6">
              {formatPrice(producto.precio_lista || 0)}
            </p>
            {producto.precio_anterior && producto.precio_anterior > producto.precio_lista && (
              <p className="text-[var(--color-text-muted)] line-through mb-4">
                {formatPrice(producto.precio_anterior)}
              </p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-display text-lg font-bold text-[var(--color-text)] mb-3">Descripción</h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">
              {producto.descripcion || producto.descripcion_corta || 'Sin descripción disponible.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass rounded-xl p-4">
              <p className="text-sm text-[var(--color-text-muted)] mb-1">Stock disponible</p>
              <p className="font-display text-2xl font-bold text-gradient-neon">
                {producto.stock_total || producto.stock || 0} unidades
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-sm text-[var(--color-text-muted)] mb-1">SKU</p>
              <p className="font-display font-mono text-lg font-bold text-[var(--color-text)]">
                {producto.sku || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/dashboard/editar/${producto.id}`}
              className="btn-neon flex-1 justify-center py-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar producto
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (window.confirm('¿Borrar este producto?')) {
                  apiFetch(`/catalogo/producto/${producto.id}/`, { method: 'DELETE' }).then(() => {
                    router.push('/catalogo');
                  });
                }
              }}
              className="flex-1"
            >
              <Boton type="submit" variant="neonOutlinePink" className="w-full py-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </Boton>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}