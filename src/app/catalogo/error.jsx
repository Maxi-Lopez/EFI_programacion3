'use client';

export default function CatalogoError({ error, reset }) {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto text-center animate-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-amber)] flex items-center justify-center shadow-[0_0_40px_var(--color-glow-pink)] animate-neon-pulse-pink">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-[var(--color-neon-pink)] mb-3">Error al cargar el catálogo</h2>
        <p className="text-[var(--color-text-muted)] mb-6">{error?.message || 'No se pudieron cargar los productos'}</p>
        <button onClick={() => reset()} className="btn-neonOutlinePink btn-lg px-8 py-3">
          Reintentar
        </button>
      </div>
    </div>
  );
}