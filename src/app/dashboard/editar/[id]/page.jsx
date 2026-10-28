import ProductoForm from '@/components/ProductoForm';

export default async function EditarProductoPage({ params }) {
  const { id } = await params;
  return <ProductoForm modo="editar" id={id} />;
}
