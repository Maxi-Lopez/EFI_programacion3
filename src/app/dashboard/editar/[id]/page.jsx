import ProductoForm from '@/components/ProductoForm';

export default function EditarProductoPage({ params }) {
  return <ProductoForm modo="editar" id={params.id} />;
}
