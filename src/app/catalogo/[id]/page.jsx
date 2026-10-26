import { apiFetch } from '@/utils/apiClient';
import { notFound } from 'next/navigation';

export default async function CatalogoDetallePage({ params }) {
  let producto;
  try {
    producto = await apiFetch(`/catalogo/categoria-get/${params.id}/`);
  } catch (error) {
    throw new Error('No se pudo cargar el producto');
  }

  if (!producto) notFound();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        {producto.nombre || 'Producto'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-slate-600">{producto.descripcion || '-'}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-800">
            ${producto.precio_lista || 0}
          </p>
        </div>
      </div>
    </main>
  );
}
