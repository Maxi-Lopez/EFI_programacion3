export default function EditarPage({ params }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Editar #{params.id}
      </h1>
      <p className="text-slate-600">Formulario de edición.</p>
    </div>
  );
}
