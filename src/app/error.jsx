'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-pink)]/5 via-transparent to-[var(--color-neon-amber)]/5 animate-aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 text-center animate-in slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-amber)] flex items-center justify-center shadow-[0_0_60px_var(--color-glow-pink)] animate-neon-pulse-pink">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-hot mb-4">Algo salió mal</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-md mx-auto">
          {error?.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'}
        </p>

        <button
          onClick={() => reset()}
          className="btn-neon btn-lg px-10 py-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reintentar
        </button>
      </div>
    </div>
  );
}