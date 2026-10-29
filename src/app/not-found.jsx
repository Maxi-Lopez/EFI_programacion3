'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-pink)]/5 via-transparent to-[var(--color-neon-cyan)]/5 animate-aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 text-center animate-in slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_60px_var(--color-glow-pink),0_0_100px_var(--color-glow-cyan)] animate-neon-pulse-pink">
          <span className="font-display text-6xl font-bold text-white">404</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-hot mb-4">Página no encontrada</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-neon btn-lg px-10 py-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
          <Link href="/catalogo" className="btn-neon-outline neonOutlinePink btn-lg px-10 py-4">
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}