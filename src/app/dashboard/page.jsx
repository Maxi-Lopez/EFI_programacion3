'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/utils/apiClient';
import { useAuth } from '@/context/AuthContext';
import Cargando from '@/components/Cargando';
import Card from '@/components/ui/Card';
import Boton from '@/components/ui/Boton';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalProveedores: 0,
    totalVentas: 0,
    totalCompras: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const [productosRes, proveedoresRes, ventasRes, comprasRes] = await Promise.all([
          apiFetch('/catalogo/producto-get/'),
          apiFetch('/proveedores/proveedor-get/'),
          apiFetch('/ventas/venta-get/'),
          apiFetch('/compras/compra-get/'),
        ]);

        if (montado) {
          const productos = Array.isArray(productosRes) ? productosRes : productosRes.results || [];
          const proveedores = Array.isArray(proveedoresRes) ? proveedoresRes : proveedoresRes.results || [];
          const ventas = Array.isArray(ventasRes) ? ventasRes : ventasRes.results || [];
          const compras = Array.isArray(comprasRes) ? comprasRes : comprasRes.results || [];

          setStats({
            totalProductos: productosRes.count ?? productos.length,
            totalProveedores: proveedoresRes.count ?? proveedores.length,
            totalVentas: ventasRes.count ?? ventas.length,
            totalCompras: comprasRes.count ?? compras.length,
          });
        }
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar las estadísticas');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

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

  const statCards = [
    {
      label: 'Total Productos',
      value: stats.totalProductos.toLocaleString('es-AR'),
      href: '/catalogo',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-green)] to-[var(--color-neon-cyan)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-green)]',
    },
    {
      label: 'Total Proveedores',
      value: stats.totalProveedores.toLocaleString('es-AR'),
      href: '/proveedores',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-cyan)] to-[var(--color-neon-green)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-cyan)]',
    },
    {
      label: 'Total Ventas',
      value: stats.totalVentas.toLocaleString('es-AR'),
      href: '/ventas',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-pink)] to-[var(--color-neon-amber)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-pink)]',
    },
    {
      label: 'Total Compras',
      value: stats.totalCompras.toLocaleString('es-AR'),
      href: '/compras',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-amber)] to-[var(--color-neon-pink)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-amber)]',
    },
  ];

  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Dashboard</h1>
          <p className="text-[var(--color-text-muted)]">Resumen general del sistema</p>
        </div>
        {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
          <Link href="/catalogo/nuevo">
            <Boton variant="neon" size="md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              + Nuevo Producto
            </Boton>
          </Link>
        )}
      </div>

      {/* Tarjetas de Estadísticas - Grid 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" role="list" aria-label="Estadísticas globales">
        {statCards.map((stat, i) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="cursor-pointer transition-transform duration-300 hover:scale-105 hover:border-[var(--color-neon-green)]"
          >
            <Card
              variant="gradientBorder"
              padding="xl"
              className={`animate-in slide-in-from-bottom-4 duration-400 delay-${i * 100}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-2 font-medium uppercase tracking-wide">{stat.label}</p>
                  <p className="font-display text-4xl font-bold text-gradient-neon animate-count">{stat.value}</p>
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0 ${stat.glow}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}