'use client';

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold text-red-700 mb-2">
        Algo salió mal
      </h2>
      <p className="text-slate-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
      >
        Reintentar
      </button>
    </div>
  );
}
