'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';
import Boton from '@/components/ui/Boton';
import MarcaForm from '@/components/MarcaForm';

export default function MarcasPage() {
  const { user } = useAuth();
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formAbierto, setFormAbierto] = useState(false);
  const [marcaEditando, setMarcaEditando] = useState(null);

  const cargarMarcas = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/catalogo/marca-get/');
      setMarcas(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las marcas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/marca-get/');
        if (montado) setMarcas(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar las marcas');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  const handleNuevo = () => {
    setMarcaEditando(null);
    setFormAbierto(true);
  };

  const handleEditar = (m) => {
    setMarcaEditando(m);
    setFormAbierto(true);
  };

  const handleCerrarForm = () => {
    setFormAbierto(false);
    setMarcaEditando(null);
  };

  const handleGuardar = async () => {
    await cargarMarcas();
    handleCerrarForm();
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar esta marca?')) return;
    try {
      await apiFetch(`/catalogo/marca/${id}/`, { method: 'DELETE' });
      setMarcas((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo borrar la marca');
    }
  };

  if (loading) return <Cargando mensaje="Cargando marcas…" size="lg" variant="neon" />;
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
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Marcas</h1>
          <p className="text-[var(--color-text-muted)]">Gestión de marcas de productos</p>
        </div>
        {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
          <div className="flex items-center gap-4">
            <span className="badge-neon text-sm">Total: {marcas.length}</span>
            <Boton variant="neon" onClick={handleNuevo}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nueva Marca
            </Boton>
          </div>
        )}
      </div>

      {marcas.length === 0 ? (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">No hay marcas registradas</h2>
          <p className="text-[var(--color-text-muted)]">Agrega marcas para asociar a tus productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {marcas.map((m) => (
            <Card key={m.id} variant="neon" padding="lg" hover>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {m.logo ? (
                    <img
                      src={m.logo}
                      alt={m.nombre || m.nombre_marca || 'Marca'}
                      className="w-16 h-16 rounded-lg object-contain bg-[var(--color-bg-elevated)] p-2 border border-[var(--color-border)]"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
                      <svg className="w-8 h-8 text-[var(--color-border)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h2 className="font-display text-xl font-bold text-gradient-neon">
                      {m.nombre || m.nombre_marca || 'Marca'}
                    </h2>
                    <span className="badge-glass text-xs">ID: {m.id}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-dim)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Creada: {m.fecha_creacion ? new Date(m.fecha_creacion).toLocaleDateString('es-AR') : 'Desconocida'}</span>
              </div>
              {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--color-border)]">
                  <Boton variant="neonOutline" size="sm" onClick={() => handleEditar(m)} className="flex-1">
                    Editar
                  </Boton>
                  <Boton variant="neonOutlinePink" size="sm" onClick={() => handleBorrar(m.id)} className="flex-1">
                    Eliminar
                  </Boton>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {formAbierto && (
        <MarcaForm
          marca={marcaEditando}
          onSave={handleGuardar}
          onCancel={handleCerrarForm}
        />
      )}
    </div>
  );
}