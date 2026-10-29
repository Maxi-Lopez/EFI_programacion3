'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';
import Boton from '@/components/ui/Boton';
import CategoriaForm from '@/components/CategoriaForm';

export default function CategoriasPage() {
  const { user } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formAbierto, setFormAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/catalogo/categoria-get/');
      setCategorias(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/categoria-get/');
        if (montado) setCategorias(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar las categorías');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  const handleNuevo = () => {
    setCategoriaEditando(null);
    setFormAbierto(true);
  };

  const handleEditar = (cat) => {
    setCategoriaEditando(cat);
    setFormAbierto(true);
  };

  const handleCerrarForm = () => {
    setFormAbierto(false);
    setCategoriaEditando(null);
  };

  const handleGuardar = async () => {
    await cargarCategorias();
    handleCerrarForm();
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar esta categoría?')) return;
    try {
      await apiFetch(`/catalogo/categoria/${id}/`, { method: 'DELETE' });
      setCategorias((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo borrar la categoría');
    }
  };

  if (loading) return <Cargando mensaje="Cargando categorías…" size="lg" variant="neon" />;
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
          <h1 className="font-display text-4xl font-bold text-gradient-neon mb-2">Categorías</h1>
          <p className="text-[var(--color-text-muted)]">Gestión de categorías de productos</p>
        </div>
        {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
          <div className="flex items-center gap-4">
            <span className="badge-neon text-sm">Total: {categorias.length}</span>
            <Boton variant="neon" onClick={handleNuevo}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Nueva Categoría
            </Boton>
          </div>
        )}
      </div>

      {categorias.length === 0 ? (
        <div className="text-center py-20 animate-in fade-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
            <svg className="w-12 h-12 text-[var(--color-text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] mb-2">No hay categorías registradas</h2>
          <p className="text-[var(--color-text-muted)]">Crea categorías para organizar tus productos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categorias.map((cat) => (
            <Card key={cat.id} variant="neon" padding="lg" hover>
              <div className="flex items-start justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-gradient-neon">
                  {cat.nombre || cat.nombre_categoria || cat.descripcion || 'Categoría'}
                </h2>
              </div>
              {cat.descripcion || cat.descripcion_corta && (
                <p className="text-[var(--color-text-muted)] mb-4 line-clamp-3">
                  {cat.descripcion || cat.descripcion_corta}
                </p>
              )}
             
              {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--color-border)]">
                  <Boton variant="neonOutline" size="sm" onClick={() => handleEditar(cat)} className="flex-1">
                    Editar
                  </Boton>
                  <Boton variant="neonOutlinePink" size="sm" onClick={() => handleBorrar(cat.id)} className="flex-1">
                    Eliminar
                  </Boton>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {formAbierto && (
        <CategoriaForm
          categoria={categoriaEditando}
          onSave={handleGuardar}
          onCancel={handleCerrarForm}
        />
      )}
    </div>
  );
}