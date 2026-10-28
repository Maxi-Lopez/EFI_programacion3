'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import Boton from '@/components/ui/Boton';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Nexusgamer Logo"
                width={32}
                height={32}
                className="rounded"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-12">
            <input
              type="text"
              placeholder="Buscar productos…"
              value={searchParams.get('search') || ''}
              onChange={handleSearch}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-700 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 outline-none"
            />
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
              <Boton
                onClick={handleLogout}
                className="text-xs py-1 px-3"
              >
                Cerrar sesión
              </Boton>
            )}
            <button
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded"
              title="Carrito"
            >
              <span className="block w-5 h-5 border-b-2 border-slate-800 mx-1" />
              <span className="block w-3 h-3 border-t-2 border-slate-800 mx-1" />
            </button>
            <button
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
