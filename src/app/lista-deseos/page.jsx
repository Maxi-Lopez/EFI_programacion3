'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/utils/apiClient';
import ProductoCard from '@/components/ProductoCard';
import Card from '@/components/ui/Card';
import Cargando from '@/components/Cargando';
import { useAuth } from '@/context/AuthContext';

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
      <div className="container mx-auto p-4 text-center py-20">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Lista de Deseos</h1>
        <p className="text-slate-600 mb-6">Inicia sesión para ver tu lista de deseos.</p>
      </div>
    );
  }

  if (loading) return <Cargando mensaje="Cargando lista de deseos…" />;
  if (error) return <div className="container mx-auto p-4 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Lista de Deseos</h1>
      {productos.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No tienes productos en tu lista de deseos.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((prod) => (
          <Card key={prod.id} className="flex flex-col">
            <ProductoCard producto={prod} />
          </Card>
        ))}
      </div>
    </div>
  );
}
