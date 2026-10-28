'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';

export default function CategoriasPage() {
  const { user } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/categoria/');
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

  if (loading) return <Cargando mensaje="Cargando categorías…" />;
  if (error) return <div className="container mx-auto p-4 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Categorías</h1>
      {['admin', 'administrador', 'vendedor'].includes(user?.rol?.toLowerCase()) && (
        <div className="mb-4">
          <p className="text-sm text-slate-600">Total de categorías: {categorias.length}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((cat) => (
          <Card key={cat.id} className="flex flex-col">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">
              {cat.nombre || cat.nombre_categoria || cat.descripcion || 'Categoría'}
            </h2>
            <p className="text-sm text-slate-500 mb-2">
              {cat.descripcion || cat.descripcion_corta || ''}
            </p>
          </Card>
        ))}
      </div>
      {categorias.length === 0 && (
        <div className="text-center py-10 text-slate-500">No hay categorías registradas.</div>
      )}
    </div>
  );
}
