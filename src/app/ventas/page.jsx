'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';
import Boton from '@/components/ui/Boton';

export default function VentasPage() {
  const { user } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/ventas/venta-get/');
        if (montado) setVentas(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar las ventas');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  if (loading) return <Cargando mensaje="Cargando ventas…" size="lg" variant="neon" />;
  if (error) return (
    <div className="container mx-auto p-4">
      <Card variant="neonPink" padding="lg" className="max-w-md mx-auto text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-neon-pink)] mb-2">Error</h2>
        <p className="text-[var(--color-text-muted)]">{error}</p>
        <Boton variant="neonOutlinePink" onClick={() => window.location.reload()} className="mt-4">Reintentar</Boton>
      </Card>
    </div>
  );

  const formatPrice = (price) => {
    if (!price) return '$0';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(num);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return dateStr; }
  };

  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Ventas</h1>
          <p className="text-[var(--color-text-muted)]">Historial de ventas realizadas</p>
        </div>
        {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
          <div className="flex items-center gap-4">
            <span className="badge-neon text-sm">Total: {ventas.length}</span>
          </div>
        )}
      </div>

      {ventas.length === 0 ? (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">No hay ventas registradas</h2>
          <p className="text-[var(--color-text-muted)]">Las ventas aparecerán aquí cuando se realicen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ventas.map((venta) => (
            <Card key={venta.id} variant="neon" padding="lg" hover>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="badge-neon-cyan text-sm">Venta #{venta.id || venta.pk || ''}</span>
                  <span className="ml-2 text-sm text-[var(--color-text-muted)]">{formatDate(venta.fecha || venta.fecha_venta || venta.fecha_compra)}</span>
                </div>
                <span className="font-display text-xl font-bold text-gradient-neon">{formatPrice(venta.total || venta.total_venta || venta.monto)}</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-[var(--color-text-muted)]">
                  <span className="font-medium text-[var(--color-text)]">Cliente:</span> {venta.cliente || venta.cliente_nombre || venta.username || '—'}
                </p>
                {venta.items && venta.items.length > 0 && (
                  <p className="text-[var(--color-text-muted)]">
                    <span className="font-medium text-[var(--color-text)]">Productos:</span> {venta.items.length} items
                  </p>
                )}
                {venta.metodo_pago && (
                  <p className="text-[var(--color-text-muted)]">
                    <span className="font-medium text-[var(--color-text)]">Pago:</span> {venta.metodo_pago}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}