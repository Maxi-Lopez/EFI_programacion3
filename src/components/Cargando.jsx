'use client';

export default function Cargando({ mensaje = 'Cargando…', size = 'md', variant = 'neon' }) {
  const sizeStyles = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
    xl: 'w-20 h-20 border-4',
  };

  const variants = {
    neon: 'border-[var(--color-border)] border-t-[var(--color-neon-green)] shadow-[0_0_15px_var(--color-glow-green),inset_0_0_15px_var(--color-glow-green)]',
    neonPink: 'border-[var(--color-border)] border-t-[var(--color-neon-pink)] shadow-[0_0_15px_var(--color-glow-pink),inset_0_0_15px_var(--color-glow-pink)]',
    neonCyan: 'border-[var(--color-border)] border-t-[var(--color-neon-cyan)] shadow-[0_0_15px_var(--color-glow-cyan),inset_0_0_15px_var(--color-glow-cyan)]',
    dots: '',
  };

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4" role="status" aria-live="polite">
        <div className="flex gap-2" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full bg-[var(--color-neon-green)] animate-bounce`}
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <p className="text-sm text-[var(--color-text-muted)] font-display tracking-wider">{mensaje}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4" role="status" aria-live="polite">
      <div
        className={`${sizeStyles[size]} rounded-full animate-spin ${variants[variant]}`}
        aria-hidden="true"
      />
      <p className="text-sm text-[var(--color-text-muted)] font-display tracking-wider">{mensaje}</p>
    </div>
  );
}