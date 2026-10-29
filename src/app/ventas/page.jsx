'use client';

import { useState, useEffect } from 'react';
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
  const [detalleAbierto, setDetalleAbierto] = useState(null);
  const [detalleLoading, setDetalleLoading] = useState(false);
  const [detalleData, setDetalleData] = useState(null);
  const [detalleError, setDetalleError] = useState(null);

  const cargarVentas = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/ventas/venta-get/');
      setVentas(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las ventas');
    } finally {
      setLoading(false);
    }
  };

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

  const handleVerDetalles = async (ventaId) => {
    setDetalleAbierto(ventaId);
    setDetalleLoading(true);
    setDetalleData(null);
    setDetalleError(null);
    try {
      const data = await apiFetch(`/ventas/detalle-venta-get/?venta=${ventaId}`);
      setDetalleData(Array.isArray(data) ? data : data.results || data);
    } catch (err) {
      setDetalleError(err.message || 'No se pudieron cargar los detalles');
    } finally {
      setDetalleLoading(false);
    }
  };

  const handleCerrarDetalle = () => {
    setDetalleAbierto(null);
    setDetalleData(null);
    setDetalleError(null);
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar esta venta? Esta acción no se puede deshacer.')) return;
    try {
      await apiFetch(`/ventas/venta/${id}/`, { method: 'DELETE' });
      await cargarVentas();
    } catch (err) {
      setError(err.message || 'No se pudo borrar la venta');
    }
  };

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

  const getClienteNombre = (venta) => venta.cliente || venta.cliente_nombre || venta.username || '—';

  const getVentaId = (venta) => venta.id || venta.pk || '';

  const getVentaTotal = (venta) => venta.total || venta.total_venta || venta.monto || 0;

  const getVentaFecha = (venta) => venta.fecha || venta.fecha_venta || venta.fecha_compra;

  if (loading) return <Cargando mensaje="Cargando ventas…" size="lg" variant="neon" />;
  if (error) return (
    <div className="container mx-auto p-4">
      <Card variant="neonPink" padding="lg" className="max-w-md mx-auto text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-neon-pink)] mb-2">Error</h2>
        <p className="text-[var(--color-text-muted)]">{error}</p>
        <Boton variant="neonOutlinePink" onClick={cargarVentas} className="mt-4">Reintentar</Boton>
      </Card>
    </div>
  );

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
        <Card variant="neon" padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
                  <th className="px-6 py-4 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Cliente</th>
                  <th className="px-6 py-4 text-right text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {ventas.map((venta) => (
                  <tr key={getVentaId(venta)} className="hover:bg-[var(--color-surface)] transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-[var(--color-neon-cyan)]">#{getVentaId(venta)}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text)]">{formatDate(getVentaFecha(venta))}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text)]">{getClienteNombre(venta)}</td>
                    <td className="px-6 py-4 text-right font-display font-bold text-gradient-neon">{formatPrice(getVentaTotal(venta))}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Boton
                          variant="neonOutline"
                          size="sm"
                          onClick={() => handleVerDetalles(getVentaId(venta))}
                        >
                          Ver Detalles
                        </Boton>
                        {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
                          <Boton
                            variant="neonOutlinePink"
                            size="sm"
                            onClick={() => handleBorrar(getVentaId(venta))}
                          >
                            Eliminar
                          </Boton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal Detalles Venta */}
      {detalleAbierto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-white">Detalle de Venta #{detalleAbierto}</h2>
              <button
                onClick={handleCerrarDetalle}
                className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-neon-pink)] transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {detalleLoading && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className="w-12 h-12 border-4 border-[var(--color-border)] border-t-[var(--color-neon-green)] rounded-full animate-spin shadow-[0_0_15px_var(--color-glow-green),inset_0_0_15px_var(--color-glow-green)]" aria-hidden="true"></div>
                <p className="text-sm text-[var(--color-text-muted)] font-display tracking-wider">Cargando detalles…</p>
              </div>
            )}

            {detalleError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-4 text-sm">
                {detalleError}
              </div>
            )}

            {detalleData && !detalleLoading && (
              <div>
                {detalleData.length === 0 ? (
                  <p className="text-center text-[var(--color-text-muted)] py-8">Esta venta no tiene productos registrados.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full" role="table">
                      <thead>
                        <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
                          <th className="px-4 py-3 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Producto</th>
                          <th className="px-4 py-3 text-center text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Cantidad</th>
                          <th className="px-4 py-3 text-right text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Precio Unit.</th>
                          <th className="px-4 py-3 text-right text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-border)]">
                        {detalleData.map((item, idx) => (
                          <tr key={item.id || item.pk || idx} className="hover:bg-[var(--color-surface)] transition-colors">
                            <td className="px-4 py-3 text-sm text-[var(--color-text)]">
                              {item.producto?.nombre || item.producto_nombre || item.nombre || 'Producto'}
                              {item.producto?.sku && <span className="block text-xs text-[var(--color-text-dim)] font-mono">{item.producto.sku}</span>}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-[var(--color-text)]">
                              {item.cantidad || item.cant || 0}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-mono text-[var(--color-neon-cyan)]">
                              {formatPrice(item.precio_unitario || item.precio || item.precio_venta || 0)}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-display font-bold text-gradient-neon">
                              {formatPrice(item.subtotal || item.total || (item.precio_unitario * item.cantidad) || 0)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-[var(--color-bg-elevated)] border-t-2 border-[var(--color-border)]">
                          <td colSpan={3} className="px-4 py-3 text-right font-display font-bold text-[var(--color-text-muted)]">Total Venta:</td>
                          <td className="px-4 py-3 text-right font-display text-2xl font-bold text-gradient-neon">
                            {formatPrice(getVentaTotal(ventas.find(v => getVentaId(v) === detalleAbierto)))}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}