'use client';

export default function CatalogoError({ error, reset }) {
  return (
    <div className="p-4 border border-red-200 bg-red-50 rounded-xl text-sm text-red-800">
      <p className="font-medium mb-1">No se pudieron cargar los productos</p>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-2 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
      >
        Reintentar
      </button>
    </div>
  );
}
