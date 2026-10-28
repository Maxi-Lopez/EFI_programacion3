'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import ProductoCard from '@/components/ProductoCard';
import Card from '@/components/ui/Card';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';

export default function CatalogoPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [allProductos, setAllProductos] = useState([]);
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productos = allProductos.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch('/catalogo/producto-get/');
        if (montado) setAllProductos(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (montado) setError(err.message || 'No se pudieron cargar los productos');
      } finally {
        if (montado) setLoading(false);
      }
    };
    cargar();
    return () => { montado = false; };
  }, []);

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Borrar este producto?')) return;
    try {
      await apiFetch(`/catalogo/producto/${id}/`, { method: 'DELETE' });
      setAllProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo borrar el producto');
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  if (loading) return <Cargando mensaje="Cargando productos…" />;
  if (error) return <div className="p-4 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-800">Catálogo</h1>
          <p className="text-slate-600">Gestión de productos</p>
        </div>
        {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
          <div className="flex gap-2">
            <Link
              href="/catalogo/nuevo"
              className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
            >
              + Nuevo producto
            </Link>
          </div>
        )}
      </div>

      <Card className="mb-6">
        <Input
          id="buscar"
          label="Buscar producto"
          placeholder="Buscar por nombre…"
          value={query}
          onChange={handleSearchChange}
          className="w-full max-w-md"
        />
      </Card>

      {productos.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No se encontraron productos{query ? ' con ese nombre' : ''}.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.map((prod) => (
          <Card key={prod.id} className="flex flex-col">
            <ProductoCard producto={prod} />
            {['admin', 'administrador'].includes(user?.rol?.toLowerCase()) && (
              <div className="mt-auto pt-4 flex gap-2">
                <Link
                  href={`/dashboard/editar/${prod.id}`}
                  className="flex-1 px-3 py-2 bg-slate-100 text-slate-800 text-sm rounded hover:bg-slate-200 text-center"
                >
                  Editar
                </Link>
                <Boton
                  onClick={() => handleBorrar(prod.id)}
                  className="flex-1 px-3 py-2 text-xs bg-red-600 hover:bg-red-700 text-center"
                >
                  Borrar
                </Boton>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
