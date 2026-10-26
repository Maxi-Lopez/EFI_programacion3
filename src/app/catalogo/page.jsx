import ProductoCard from '@/components/ProductoCard';
import { apiFetch } from '@/utils/apiClient';
import { notFound } from 'next/navigation';

export default async function CatalogoPage() {
  let productos = [];
  try {
    productos = await apiFetch('/catalogo/producto-get/');
  } catch (error) {
    throw new Error('No se pudieron cargar los productos');
  }

  if (!productos || productos.length === 0) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.map((prod) => (
          <ProductoCard key={prod.id} producto={prod} />
        ))}
      </div>
    </main>
  );
}
