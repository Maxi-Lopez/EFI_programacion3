'use client';

import { forwardRef } from 'react';

const Boton = forwardRef(
  (
    {
      children,
      type = 'button',
      className = '',
      disabled,
      onClick,
      variant = 'neon',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-display font-semibold tracking-wider
      rounded-xl transition-all duration-300 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none
      select-none
    `;

    const variants = {
      neon: `
        bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-green-dim)]
        text-[#050508] shadow-[0_0_10px_var(--color-glow-green),0_0_20px_var(--color-glow-green)]
        hover:shadow-[0_0_20px_var(--color-glow-green),0_0_40px_var(--color-glow-green),inset_0_0_20px_rgba(255,255,255,0.2)]
        hover:-translate-y-0.5 active:translate-y-0
        focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-[var(--color-bg)]
      `,
      neonPink: `
        bg-gradient-to-r from-[var(--color-neon-pink)] to-[var(--color-neon-pink-dim)]
        text-white shadow-[0_0_10px_var(--color-glow-pink),0_0_20px_var(--color-glow-pink)]
        hover:shadow-[0_0_20px_var(--color-glow-pink),0_0_40px_var(--color-glow-pink),inset_0_0_20px_rgba(255,255,255,0.2)]
        hover:-translate-y-0.5 active:translate-y-0
        focus-visible:ring-[var(--color-neon-pink)] focus-visible:ring-offset-[var(--color-bg)]
      `,
      neonCyan: `
        bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-cyan-dim)]
        text-[#050508] shadow-[0_0_10px_var(--color-glow-cyan),0_0_20px_var(--color-glow-cyan)]
        hover:shadow-[0_0_20px_var(--color-glow-cyan),0_0_40px_var(--color-glow-cyan),inset_0_0_20px_rgba(255,255,255,0.2)]
        hover:-translate-y-0.5 active:translate-y-0
        focus-visible:ring-[var(--color-neon-cyan)] focus-visible:ring-offset-[var(--color-bg)]
      `,
      neonOutline: `
        bg-transparent border-2 border-[var(--color-neon-green)]
        text-[var(--color-neon-green)]
        hover:bg-[var(--color-neon-green)] hover:text-[#050508]
        hover:shadow-[0_0_30px_var(--color-glow-green)]
        focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-[var(--color-bg)]
      `,
      neonOutlinePink: `
        bg-transparent border-2 border-[var(--color-neon-pink)]
        text-[var(--color-neon-pink)]
        hover:bg-[var(--color-neon-pink)] hover:text-white
        hover:shadow-[0_0_30px_var(--color-glow-pink)]
        focus-visible:ring-[var(--color-neon-pink)] focus-visible:ring-offset-[var(--color-bg)]
      `,
      ghost: `
        bg-transparent border border-[var(--color-border)]
        text-[var(--color-text)]
        hover:bg-[var(--color-surface)] hover:border-[var(--color-neon-green)] hover:text-[var(--color-neon-green)]
        hover:shadow-[0_0_20px_var(--color-glow-green)]
        focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-[var(--color-bg)]
      `,
      glass: `
        glass-strong text-[var(--color-text)]
        hover:border-[var(--color-neon-green)] hover:shadow-[0_0_20px_var(--color-glow-green)]
        focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-[var(--color-bg)]
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
    };

    const width = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
        aria-label={ariaLabel}
        aria-busy={loading}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Boton.displayName = 'Boton';

export default Boton;