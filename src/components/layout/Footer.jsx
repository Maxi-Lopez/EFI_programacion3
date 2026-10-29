'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState(0);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative border-t border-[var(--color-border)] mt-16">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] to-transparent opacity-50" aria-hidden="true" />
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Nexusgamer - Inicio">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Nexusgamer Logo"
                  width={44}
                  height={44}
                  className="rounded-lg border border-[var(--color-border)] group-hover:border-[var(--color-neon-green)] transition-all duration-300"
                />
              </div>
              <span className="font-display text-xl font-bold text-gradient-neon">
                Nexusgamer
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xs text-center md:text-left">
              Tu nexus gaming. Componentes seleccionados, precios honestos, soporte real.
            </p>
            <div className="flex gap-3" role="list" aria-label="Redes sociales">
              <a
                href="#"
                className="p-2.5 glass rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-neon-green)] hover:border-[var(--color-neon-green)] hover:shadow-[0_0_15px_var(--color-glow-green)] transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 glass rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-neon-cyan)] hover:border-[var(--color-neon-cyan)] hover:shadow-[0_0_15px_var(--color-glow-cyan)] transition-all duration-300"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.05 14.55l-5.05-3.15c-.47-.29-.47-.98 0-1.27l5.05-3.15c.63-.39 1.38.06 1.09.71l-1.09 4.75 4.46 2.33c.66.35.6.1.24-.53l-2.6-4.62 4.75-1.08c.64-.34.64-1.09 0-1.43L13.09 5.26c-.41-.25-.97-.12-1.28.26l-5.51 3.41c-.69.43-.69 1.32 0 1.75l5.51 3.4c.3.19.56.07.71-.3z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 glass rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-neon-pink)] hover:border-[var(--color-neon-pink)] hover:shadow-[0_0_15px_var(--color-glow-pink)] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 glass rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-neon-amber)] hover:border-[var(--color-neon-amber)] hover:shadow-[0_0_15px_var(--color-glow-amber)] transition-all duration-300"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.676 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.081.081 0 0 0 .031.057 19.9 19.9 0 0 0 6.008 3.438.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 1 .082-.028c1.826 0 3.447.46 4.75 1.207a.077.077 0 0 1 .082.028c2.834.93 5.413.825 7.633-.905a.077.077 0 0 0 .031-.056c.383-4.168-.374-8.517-3.548-13.192a.061.061 0 0 0-.032-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gradient-neon uppercase tracking-wider mb-4">Enlaces rápidos</h3>
            <nav aria-label="Enlaces del pie de página">
              <ul className="space-y-2">
                {[
                  { label: 'Catálogo', href: '/catalogo' },
                  { label: 'Ofertas', href: '/catalogo?ofertas=1' },
                  { label: 'Lista de Deseos', href: '/lista-deseos' },
                  { label: 'Contacto', href: '/contacto' },
                  { label: 'Sobre nosotros', href: '/sobre-nosotros' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-neon-green)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-gradient-hot uppercase tracking-wider mb-4">Legal</h3>
            <nav aria-label="Enlaces legales">
              <ul className="space-y-2">
                {[
                  { label: 'Términos y condiciones', href: '/Terminos' },
                  { label: 'Política de privacidad', href: '/Politica' },
                  { label: 'Política de cookies', href: '/Cookies' },
                  { label: 'Devoluciones', href: '/Devoluciones' },
                  { label: 'Envíos', href: '/Envios' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-neon-pink)] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-dim)] text-center md:text-left">
            Nexusgamer &mdash; Tienda de computación &copy; {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
