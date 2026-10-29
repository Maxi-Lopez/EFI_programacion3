'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';
import Boton from '@/components/ui/Boton';

export default function ComprasPage() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detalleAbierto, setDetalleAbierto] = useState(null);
  const [detalleData, setDetalleData] = useState(null);

  const cargarCompras = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/compras/compra-list/');
      setCompras(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las compras');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/compras/compra-list/');
        const lista = Array.isArray(data) ? data : data.results || [];
        if (lista.length > 0) {
          console.log('🔍 COMPRA[0] estructura:', JSON.stringify(lista[0], null, 2));
        }
        if (montado) setCompras(lista);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar las compras');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  const handleVerDetalles = (compra) => {
    setDetalleAbierto(compra);
    setDetalleData(compra.items || compra.detalles || []);
  };

  const handleCerrarDetalle = () => {
    setDetalleAbierto(null);
    setDetalleData(null);
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar esta compra? Esta acción no se puede deshacer.')) return;
    try {
      await apiFetch(`/compras/compra/${id}/`, { method: 'DELETE' });
      await cargarCompras();
    } catch (err) {
      setError(err.message || 'No se pudo borrar la compra');
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

  const getProveedorNombre = (compra) => {
    // Si proveedor es un objeto con nombre
    if (compra.proveedor && typeof compra.proveedor === 'object') {
      return compra.proveedor.nombre || compra.proveedor.razon_social || compra.proveedor.empresa || '—';
    }
    // Si viene como ID o campos planos
    return compra.proveedor_nombre || compra.proveedor_empresa || compra.proveedor || '—';
  };

  const getCompraId = (compra) => compra.id || compra.pk || '';

  const getCompraTotal = (compra) => {
    // Prioridad: total calculado, total_compra, monto_total, monto
    if (compra.total !== undefined && compra.total !== null) return compra.total;
    if (compra.total_compra !== undefined && compra.total_compra !== null) return compra.total_compra;
    if (compra.monto_total !== undefined && compra.monto_total !== null) return compra.monto_total;
    if (compra.monto !== undefined && compra.monto !== null) return compra.monto;
    return 0;
  };

  const getCompraFecha = (compra) => compra.fecha || compra.fecha_compra || compra.fecha_creacion || compra.created_at || compra.created;

  const getCompraEstado = (compra) => compra.estado || compra.status || compra.estado_compra;

  if (loading) return <Cargando mensaje="Cargando compras…" size="lg" variant="neon" />;
  if (error) return (
    <div className="container mx-auto p-4">
      <Card variant="neonPink" padding="lg" className="max-w-md mx-auto text-center">
        <h2 className="font-display text-xl font-bold text-[var(--color-neon-pink)] mb-2">Error</h2>
        <p className="text-[var(--color-text-muted)]">{error}</p>
        <Boton variant="neonOutlinePink" onClick={cargarCompras} className="mt-4">Reintentar</Boton>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Compras</h1>
          <p className="text-[var(--color-text-muted)]">Historial de compras a proveedores</p>
        </div>
        {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
          <div className="flex items-center gap-4">
            <span className="badge-neon text-sm">Total: {compras.length}</span>
          </div>
        )}
      </div>

      {compras.length === 0 ? (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">No hay compras registradas</h2>
          <p className="text-[var(--color-text-muted)]">Las compras aparecerán aquí cuando se registren.</p>
        </div>
      ) : (
        <Card variant="neon" padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="bg-[var(--color-bg-elevated)] border-b border-[var(--color-border)]">
                  <th className="px-6 py-4 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Fecha</th>
                  <th className="px-6 py-4 text-left text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Proveedor</th>
                  <th className="px-6 py-4 text-center text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Estado</th>
                  <th className="px-6 py-4 text-right text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-display uppercase tracking-wider text-[var(--color-text-muted)]">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {compras.map((compra, index) => (
                  <tr key={getCompraId(compra)} className="hover:bg-[var(--color-surface)] transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-[var(--color-neon-cyan)]">#{String(index + 1).padStart(2, '0')}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text)]">{formatDate(getCompraFecha(compra))}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-text)]">{getProveedorNombre(compra)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`badge-glass text-xs capitalize ${getCompraEstado(compra) ? '' : 'bg-[var(--color-bg-elevated)]'}`}>
                        {getCompraEstado(compra) || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-display font-bold text-gradient-neon">{formatPrice(getCompraTotal(compra))}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Boton
                          variant="neonOutline"
                          size="sm"
                          onClick={() => handleVerDetalles(compra)}
                        >
                          Ver Detalles
                        </Boton>
                        {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
                          <Boton
                            variant="neonOutlinePink"
                            size="sm"
                            onClick={() => handleBorrar(getCompraId(compra))}
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

      {/* Modal Detalles Compra */}
      {detalleAbierto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-white">Detalle de Compra #{getCompraId(detalleAbierto)}</h2>
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

            {detalleData && detalleData.length === 0 ? (
              <p className="text-center text-[var(--color-text-muted)] py-8">Esta compra no tiene productos registrados.</p>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Proveedor</p>
                    <p className="font-display text-lg font-bold text-[var(--color-text)]">{getProveedorNombre(detalleAbierto)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Fecha</p>
                    <p className="font-display text-lg font-bold text-[var(--color-text)]">{formatDate(getCompraFecha(detalleAbierto))}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Estado</p>
                    <p className="font-display text-lg font-bold text-[var(--color-text)]">
                      <span className="badge-glass capitalize">{getCompraEstado(detalleAbierto) || '—'}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">Total</p>
                    <p className="font-display text-2xl font-bold text-gradient-neon">{formatPrice(getCompraTotal(detalleAbierto))}</p>
                  </div>
                </div>

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
                      {detalleData.map((item, idx) => {
                          // Mapeo robusto de campos
                          const productoNombre = 
                            item.producto?.nombre || 
                            item.producto?.nombre_producto ||
                            item.producto_nombre || 
                            item.nombre_producto ||
                            item.nombre || 
                            'Producto sin nombre';
                          
                          const cantidad = 
                            item.unidades || 
                            item.cantidad || 
                            item.cant || 
                            item.quantity || 
                            0;
                          
                          const precioUnitario = 
                            item.precio_unitario || 
                            item.precio || 
                            item.precio_compra || 
                            item.unit_price || 
                            0;
                          
                          const subtotal = 
                            item.subtotal || 
                            item.total || 
                            item.sub_total ||
                            (cantidad * parseFloat(precioUnitario || 0)) || 
                            0;
                          
                          return (
                            <tr key={item.id || item.pk || idx} className="hover:bg-[var(--color-surface)] transition-colors">
                              <td className="px-4 py-3 text-sm text-[var(--color-text)]">
                                {productoNombre}
                                {item.producto?.sku && <span className="block text-xs text-[var(--color-text-dim)] font-mono">{item.producto.sku}</span>}
                              </td>
                              <td className="px-4 py-3 text-center text-sm text-[var(--color-text)]">
                                {cantidad}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-mono text-[var(--color-neon-cyan)]">
                                {formatPrice(precioUnitario)}
                              </td>
                              <td className="px-4 py-3 text-right text-sm font-display font-bold text-gradient-neon">
                                {formatPrice(subtotal)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[var(--color-bg-elevated)] border-t-2 border-[var(--color-border)]">
                        <td colSpan={3} className="px-4 py-3 text-right font-display font-bold text-[var(--color-text-muted)]">Total Compra:</td>
                        <td className="px-4 py-3 text-right font-display text-2xl font-bold text-gradient-neon">
                          {formatPrice(getCompraTotal(detalleAbierto))}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}