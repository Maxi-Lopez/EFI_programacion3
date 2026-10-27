'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import Card from '@/components/ui/Card';
import Boton from '@/components/ui/Boton';
import Cargando from '@/components/Cargando';

export default function CatalogoDetallePage({ params }) {
  const router = useRouter();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let montado = true;
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/catalogo/producto/${params.id}/`);
        if (montado) {
          setProducto(data);
          setLoading(false);
        }
      } catch (err) {
        if (montado) {
          setError(err.message || 'Producto no encontrado');
          setLoading(false);
          notFound();
        }
      }
    };
    cargar();
    return () => { montado = false; };
  }, [params.id]);

  if (loading) return <Cargando mensaje="Cargando producto…" />;
  if (error || !producto) return notFound();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/catalogo" className="text-slate-600 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
      <Card className="max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-slate-800">
          {producto.nombre || 'Producto'}
        </h1>
        <p className="text-slate-600 mb-4">
          {producto.descripcion || '-'}
        </p>
        <p className="font-semibold text-slate-800 text-lg mb-6">
          ${producto.precio_lista || 0}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/editar/${producto.id}`}
            className="flex-1 px-4 py-2 bg-slate-800 text-white rounded text-center hover:bg-slate-700"
          >
            Editar
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (window.confirm('¿Borrar este producto?')) {
                apiFetch(`/catalogo/producto/${producto.id}/`, {
                  method: 'DELETE',
                }).then(() => {
                  router.push('/catalogo');
                });
              }
            }}
            className="flex-1"
          >
            <Boton
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded text-center hover:bg-red-700"
            >
              Borrar
            </Boton>
          </form>
        </div>
      </Card>
    </div>
  );
}
