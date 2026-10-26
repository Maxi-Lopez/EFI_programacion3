import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Bienvenido</h1>
      <p className="text-slate-600 mb-6">
        Panel de gestión consumiendo API Django REST.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/catalogo"
          className="p-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-800"
        >
          Catálogo
        </Link>
        <Link
          href="/dashboard"
          className="p-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-800"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="p-4 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-800"
        >
          Iniciar sesión
        </Link>
      </div>
    </main>
  );
}
