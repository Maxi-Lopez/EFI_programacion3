import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">404</h1>
      <p className="text-slate-600 mb-6">Página no encontrada</p>
      <Link
        href="/"
        className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
