'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import Boton from '@/components/ui/Boton';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
  ];

  const isAuthRoute = pathname === '/login';

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-slate-800">
            Mi Proyecto
          </Link>
          <div className="flex items-center gap-4">
            {!isAuthRoute && (
              <div className="hidden md:flex items-center gap-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-slate-800'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              title="Cambiar tema"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {user ? (
              <Boton onClick={handleLogout} className="text-xs py-1.5 px-3">
                Cerrar sesión
              </Boton>
            ) : (
              <Link
                href="/login"
                className="text-xs font-medium text-slate-800 hover:underline"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
