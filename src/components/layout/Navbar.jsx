'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import Boton from '@/components/ui/Boton';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, []);
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  const handleBuscar = (e) => {
    if (e.key === 'Enter') {
      router.push(`/catalogo?search=${encodeURIComponent(busqueda.trim())}`);
    }
  };
  const enCatalogo = pathname === '/catalogo';

  if (!isReady) {
    return null;
  }

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Nexusgamer Logo"
                width={48}
                height={48}
                className="rounded"
              />
            </Link>
            {enCatalogo && (
              <input
                type="text"
                placeholder="Buscar productos…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onKeyPress={handleBuscar}
                className="px-3 py-1.5 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 w-48"
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  href="/registro"
                  className="text-xs font-medium text-slate-600 hover:text-slate-800 hover:underline"
                >
                  Registrarse
                </Link>
                <Link
                  href="/login"
                  className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs hover:bg-slate-700 transition-colors"
                >
                  Iniciar sesión
                </Link>
              </>
            ) : (
              <>
                <span className="text-xs text-slate-700 hidden md:block">{user.username || 'Usuario'}</span>
                <Boton
                  onClick={handleLogout}
                  className="text-xs py-1 px-3"
                >
                  Cerrar sesión
                </Boton>
              </>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              title="Cambiar tema"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
