export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-green)]/5 via-transparent to-[var(--color-neon-cyan)]/5 animate-aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_40px_var(--color-glow-green)] animate-neon-pulse">
          <svg className="w-10 h-10 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="font-display text-xl font-bold text-gradient-neon animate-pulse">Cargando…</p>
      </div>
    </div>
  );
}