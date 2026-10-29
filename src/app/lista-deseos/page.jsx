'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/utils/apiClient';
import ProductoCard from '@/components/ProductoCard';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';

export default function ListaDeseosPage() {
  const { user, wishlist } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/producto-get/');
        const all = Array.isArray(data) ? data : data.results || [];
        if (montado) {
          setProductos(all.filter((p) => wishlist.includes(p.id)));
        }
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar los productos');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, [wishlist]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-pink)]/5 via-transparent to-[var(--color-neon-cyan)]/5 animate-aurora" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />
        <Card variant="gradientBorder" padding="xl" className="w-full max-w-md text-center relative z-10 animate-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-amber)] flex items-center justify-center shadow-[0_0_30px_var(--color-glow-pink)]">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3.5.35-4.9 1.2L12 8l-1.6-3.8C10.01 3.35 8.23 3 6.46 3h0C4.55 3 3 4.55 3 6.5c0 2.3 1.51 4.04 3 5.54z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-hot mb-3">Lista de Deseos</h1>
          <p className="text-[var(--color-text-muted)] mb-8">Inicia sesión para ver y guardar tus productos favoritos.</p>
          <div className="flex flex-col gap-3">
            <Link href="/login" className="btn-neon btn-lg">
              Iniciar sesión
            </Link>
            <Link href="/registro" className="btn-neon-outline neonOutlinePink btn-lg">
              Crear cuenta
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (loading) return <Cargando mensaje="Cargando lista de deseos…" size="lg" variant="neon" />;
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient-hot mb-2">Lista de Deseos</h1>
          <p className="text-[var(--color-text-muted)]">Tus productos guardados ({wishlist.length})</p>
        </div>
      </div>

      {productos.length === 0 && (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">Tu lista está vacía</h2>
          <p className="text-[var(--color-text-muted)] max-w-md mx-auto mb-6">Empieza a agregar productos a tu lista de deseos haciendo clic en el corazón de cualquier producto.</p>
          <Link href="/catalogo" className="btn-neon inline-flex">
            Ir al catálogo
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {productos.map((prod) => (
          <Card key={prod.id} variant="neon" padding="none" hover>
            <ProductoCard producto={prod} />
          </Card>
        ))}
      </div>
    </div>
  );
}