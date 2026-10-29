import { Suspense } from 'react';
import ProductoForm from '@/components/ProductoForm';
import Cargando from '@/components/Cargando';

async function FormularioEdicion({ params }) {
  const { id } = await params;
  return <ProductoForm modo="editar" id={id} />;
}

export default function EditarProductoPage({ params }) {
  return (
    <Suspense fallback={<Cargando mensaje="Cargando formulario…" />}>
      <FormularioEdicion params={params} />
    </Suspense>
  );
}