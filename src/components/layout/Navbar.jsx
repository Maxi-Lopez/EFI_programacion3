'use client';

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

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Nexusgamer Logo"
                width={48}
                height={48}
                className="rounded"
              />
            </Link>
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
                <span className="text-xs text-slate-700 hidden md:block">{user.username}</span>
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
