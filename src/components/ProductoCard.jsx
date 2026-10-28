'use client';

import { useAuth } from '@/context/AuthContext';

export default function ProductoCard({ producto }) {
  const { user, wishlist, toggleDeseo } = useAuth();
  const favorito = user ? wishlist.includes(producto.id) : false;

  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow relative group">
      {producto.imagen_url && (
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h3 className="font-bold text-slate-800">{producto.nombre}</h3>
      <p className="text-sm text-slate-600">{producto.descripcion || '-'}</p>
      <p className="font-semibold text-slate-800">
        ${producto.precio_lista || 0}
      </p>
      {user && (
        <button
          onClick={() => toggleDeseo(producto.id)}
          aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 focus:outline-none"
        >
          {favorito ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-red-500 bg-red-500/10"
            >
              <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400 hover:text-red-500 hover:bg-red-50"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.5.35-4.9 1.2L12 8l-1.6-3.8C10.01 3.35 8.23 3 6.46 3h0C4.55 3 3 4.55 3 6.5c0 2.3 1.51 4.04 3 5.54z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
