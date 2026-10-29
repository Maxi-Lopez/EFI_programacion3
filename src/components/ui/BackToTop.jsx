'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-xl
        bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)]
        text-[#050508]
        flex items-center justify-center
        shadow-[0_10px_30px_var(--color-glow-green),0_0_40px_var(--color-glow-green)]
        hover:shadow-[0_15px_40px_var(--color-glow-green),0_0_60px_var(--color-glow-green)]
        hover:scale-105
        transition-all duration-300
        animate-neon-pulse
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
      "
      title="Volver arriba"
      aria-label="Volver al inicio"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}