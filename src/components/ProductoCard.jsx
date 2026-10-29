'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProductoCard({ producto }) {
  const { user, wishlist, toggleDeseo } = useAuth();
  const favorito = user ? wishlist.includes(producto.id) : false;
  
  // Estado para controlar si la imagen falló al cargar
  const [imageError, setImageError] = useState(false);

  const imagenUrl = producto.imagen_url || producto.marca?.logo;

  const formatPrice = (price) => {
    if (!price) return '$0';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <article className="card-neon group relative overflow-hidden" tabIndex={0} role="listitem">
      <div className="aspect-[4/3] relative overflow-hidden bg-[var(--color-bg-elevated)]">
        {/* Si hay URL y no hubo error, renderiza la imagen. Si falla o no hay URL, renderiza el fallback */}
        {imagenUrl && !imageError ? (
          <img
            src={imagenUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)} 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-neon-green)]/10 to-[var(--color-neon-cyan)]/10 relative">
            <svg className="w-16 h-16 text-[var(--color-border)] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {/* Texto opcional de la marca para que no quede tan vacío */}
            <span className="text-xs font-bold text-[var(--color-text-dim)] uppercase tracking-widest">
              {producto.marca?.nombre || 'Nexusgamer'}
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

        {user && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleDeseo(producto.id);
            }}
            aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            aria-pressed={favorito}
            className={`
              absolute top-3 right-3 z-10
              p-2 rounded-xl
              glass-strong
              text-[var(--color-text-muted)]
              transition-all duration-300
              hover:scale-110
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-pink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
              ${favorito
                ? 'text-[var(--color-neon-pink)] shadow-[0_0_15px_var(--color-glow-pink)] border border-[var(--color-neon-pink)]/30'
                : 'hover:text-[var(--color-neon-pink)] hover:border-[var(--color-neon-pink)]/50'
              }
            `}
          >
            {favorito ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3.5.35-4.9 1.2L12 8l-1.6-3.8C10.01 3.35 8.23 3 6.46 3h0C4.55 3 3 4.55 3 6.5c0 2.3 1.51 4.04 3 5.54z" />
              </svg>
            )}
          </button>
        )}

        {(producto.stock_total !== undefined && producto.stock_total <= 5 && producto.stock_total > 0) && (
          <span className="absolute top-3 left-3 badge-neon-amber text-xs px-2 py-1">
            Últimas {producto.stock_total} unidades
          </span>
        )}

        {(producto.stock_total === 0 || producto.stock === 0) && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg)]/90">
            <span className="badge-neon-pink text-lg px-4 py-2 animate-pulse">
              AGOTADO
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col h-[calc(100%-200px)] min-h-[180px]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-bold text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-neon-green)] transition-colors duration-300">
            {producto.nombre}
          </h3>
          {producto.marca && (
            <span className="badge-glass text-xs px-2 py-0.5 shrink-0">
              {producto.marca.nombre || producto.marca}
            </span>
          )}
        </div>

        {producto.descripcion_corta && (
          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3 flex-1">
            {producto.descripcion_corta}
          </p>
        )}

        <div className="flex items-baseline justify-between gap-4 mt-auto pt-3 border-t border-[var(--color-border)]">
          <div>
            <span className="font-display text-2xl font-bold text-gradient-neon">
              {formatPrice(producto.precio_lista || producto.precio)}
            </span>
            {producto.precio_anterior && producto.precio_anterior > producto.precio_lista && (
              <span className="ml-2 text-sm text-[var(--color-text-dim)] line-through">
                {formatPrice(producto.precio_anterior)}
              </span>
            )}
          </div>

          {producto.categoria && (
            <span className="badge-glass text-xs shrink-0">
              {producto.categoria.nombre || producto.categoria}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}