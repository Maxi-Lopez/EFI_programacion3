'use client';

import { forwardRef } from 'react';

const Card = forwardRef(
  (
    {
      children,
      className = '',
      variant = 'neon',
      padding = 'lg',
      hover = true,
      borderColor,
      background,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const variants = {
      neon: `
        glass
        border border-[var(--color-border)]
        ${hover ? 'hover:border-[var(--color-neon-green)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_var(--color-glow-green),inset_0_0_40px_rgba(0,255,136,0.05)] hover:-translate-y-1 transition-all duration-300' : ''}
      `,
      neonPink: `
        glass
        border border-[var(--color-border)]
        ${hover ? 'hover:border-[var(--color-neon-pink)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_var(--color-glow-pink),inset_0_0_40px_rgba(255,0,110,0.05)] hover:-translate-y-1 transition-all duration-300' : ''}
      `,
      neonCyan: `
        glass
        border border-[var(--color-border)]
        ${hover ? 'hover:border-[var(--color-neon-cyan)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_var(--color-glow-cyan),inset_0_0_40px_rgba(0,212,255,0.05)] hover:-translate-y-1 transition-all duration-300' : ''}
      `,
      gradientBorder: `
        relative glass
        ${hover ? 'hover:-translate-y-1 transition-transform duration-300' : ''}
        before:absolute before:inset-[-1px] before:rounded-[inherit] before:bg-gradient-to-br before:from-[var(--color-neon-green)] before:via-[var(--color-neon-cyan)] before:to-[var(--color-neon-pink)] before:bg-[size:200%_200%] before:animate-shimmer before:opacity-0 before:transition-opacity before:duration-300 before:-z-10
        ${hover ? 'hover:before:opacity-100' : ''}
      `,
      glass: `
        glass-strong
        ${hover ? 'hover:border-[var(--color-neon-green)] hover:shadow-[0_0_30px_var(--color-glow-green)] transition-all duration-300' : ''}
      `,
      elevated: `
        bg-[var(--color-bg-elevated)]
        border border-[var(--color-border)]
        shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        ${hover ? 'hover:shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_40px_var(--color-glow-green)] hover:-translate-y-1 transition-all duration-300' : ''}
      `,
      minimal: `
        bg-transparent border-none
        ${hover ? 'hover:bg-[var(--color-surface)] transition-colors duration-300' : ''}
      `,
    };

    const borderStyle = borderColor
      ? `border-${borderColor}`
      : '';

    const bgStyle = background
      ? `bg-${background}`
      : '';

    return (
      <Component
        ref={ref}
        className={`${variants[variant]} ${paddingStyles[padding]} rounded-2xl ${borderStyle} ${bgStyle} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;