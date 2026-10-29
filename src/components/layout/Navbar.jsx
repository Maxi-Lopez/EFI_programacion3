'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import Boton from '@/components/ui/Boton';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isReady) {
    return (
      <header className="navbar-glass sticky top-0 z-50 h-16">
        <div className="container px-4 h-full" />
      </header>
    );
  }

  return (
    <header className="navbar-glass sticky top-0 z-50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Nexusgamer - Inicio">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg animate-neon-pulse" aria-hidden="true" />
                <Image
                  src="/images/logo.png"
                  alt="Nexusgamer Logo"
                  width={44}
                  height={44}
                  className="relative rounded-lg border border-[var(--color-border)] group-hover:border-[var(--color-neon-green)] transition-all duration-300"
                />
              </div>
              <span className="font-display text-xl font-bold text-gradient-neon hidden sm:block">
                Nexusgamer
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/registro"
                  className="btn-neon-ghost text-xs px-3 py-2 hidden sm:inline-flex"
                >
                  Registrarse
                </Link>
                <Link
                  href="/login"
                  className="btn-neon btn-sm px-4 py-2"
                >
                  Iniciar sesión
                </Link>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-3 px-3 py-2 glass rounded-xl border border-[var(--color-border)]">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-neon-green)] animate-neon-pulse" aria-hidden="true" />
                  <span className="text-sm font-medium text-[var(--color-text)]">{user.username || 'Usuario'}</span>
                  <span className="badge-neon text-xs"> {user.rol?.toUpperCase() || 'USER'} </span>
                </div>
                <Boton
                  variant="neonOutlinePink"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden sm:inline-flex"
                >
                  Cerrar sesión
                </Boton>
              </>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="
                p-3 rounded-xl glass
                text-[var(--color-text-muted)]
                hover:text-[var(--color-neon-green)]
                hover:border-[var(--color-neon-green)]
                hover:shadow-[0_0_20px_var(--color-glow-green)]
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-green)]
              "
              title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
              aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}