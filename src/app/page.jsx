'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/catalogo');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-green)]/5 via-transparent to-[var(--color-neon-pink)]/5 animate-aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 text-center animate-in fade-in duration-700">
        <div className="w-28 h-28 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_60px_var(--color-glow-green),0_0_100px_var(--color-glow-green)] animate-neon-pulse">
          <svg className="w-16 h-16 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-cyber mb-6 tracking-tight">
          Nexusgamer
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-12 leading-relaxed">
          Tu nexus gaming. Componentes seleccionados, precios honestos, soporte real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/catalogo" className="btn-neon btn-lg px-10 py-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Ver Catálogo
          </Link>
          <Link href="/registro" className="btn-neon-outline neonOutlinePink btn-lg px-10 py-4">
            Crear Cuenta
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--color-text-dim)]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-green)] animate-neon-pulse" aria-hidden="true"></span>
            Envíos a todo el país
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-cyan)] animate-neon-pulse-cyan" aria-hidden="true"></span>
            Garantía oficial
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-pink)] animate-neon-pulse-pink" aria-hidden="true"></span>
            Soporte experto
          </span>
        </div>
      </div>
    </div>
  );
}