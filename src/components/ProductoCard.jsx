export default function ProductoCard({ producto }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      <h3 className="font-bold text-slate-800">{producto.nombre}</h3>
      <p className="text-sm text-slate-600">{producto.descripcion || '-'}</p>
      <p className="font-semibold text-slate-800">
        ${producto.precio_lista || 0}
      </p>
    </div>
  );
}
