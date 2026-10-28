'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import ProductoCard from '@/components/ProductoCard';
import Cargando from '@/components/Cargando';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('search') || '';
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const endpoint = search
          ? `/catalogo/producto-get/?search=${encodeURIComponent(search)}`
          : '/catalogo/producto-get/';
        const data = await apiFetch(endpoint);
        if (montado) setProductos(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar los productos');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, [search]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  if (loading) return <Cargando mensaje="Cargando productos…" />;
  if (error) return <div className="container mx-auto p-4 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      {search ? (
        <div className="flex items-center gap-2 mb-6 text-sm text-slate-600">
          <span>Resultados para: </span>
          <span className="font-medium text-slate-800">{search}</span>
        </div>
      ) : null}

      <div className="flex justify-end mb-4">
        <Link
          href="/catalogo/nuevo"
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 text-sm"
        >
          + Nuevo producto
        </Link>
      </div>

      {productos.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          No se encontraron productos{search ? ' con ese nombre' : ''}.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow flex flex-col">
            <ProductoCard producto={prod} />
            <div className="mt-auto pt-4 flex gap-2">
              <Link
                href={`/dashboard/editar/${prod.id}`}
                className="flex-1 px-3 py-2 bg-slate-100 text-slate-800 text-sm rounded hover:bg-slate-200 text-center"
              >
                Editar
              </Link>
              <button
                onClick={() => {
                  if (window.confirm('¿Borrar este producto?')) {
                    apiFetch(`/catalogo/producto/${prod.id}/`, {
                      method: 'DELETE',
                    }).then(() => {
                      router.push('/dashboard');
                    });
                  }
                }}
                className="flex-1 px-3 py-2 text-xs bg-red-600 hover:bg-red-700 text-center"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
