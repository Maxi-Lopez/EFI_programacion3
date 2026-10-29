'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const itemsPublicos = [
  { id: 'productos', label: 'Productos', href: '/catalogo' },
  { id: 'lista-deseos', label: 'Lista de Deseos', href: '/lista-deseos' },
  { id: 'contacto', label: 'Contacto', href: '/contacto' },
  { id: 'por-que-comprar', label: '¿Por qué comprar?', href: '/por-que-comprar' },
  { id: 'sobre-nosotros', label: 'Sobre nosotros', href: '/sobre-nosotros' },
];

const itemsAdmin = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'ventas', label: 'Ventas', href: '/ventas' },
  { id: 'compras', label: 'Compras', href: '/compras' },
  { id: 'proveedores', label: 'Proveedores', href: '/proveedores' },
  { id: 'categorias-admin', label: 'Categorías', href: '/categorias' },
];

const esAdminOMVendedor = (rol) =>
  ['admin', 'administrador', 'vendedor'].includes(String(rol || '').toLowerCase());

export default function MenuLineal() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculamos items solo cuando está montado (evita hydration mismatch)
  const esAdmin = isMounted && user && esAdminOMVendedor(user.rol);
  const items = esAdmin ? [...itemsPublicos, ...itemsAdmin] : itemsPublicos;

  // Función para ver si un link está activo
  const isActive = (href) => {
    // Para la ruta /catalogo con query params, comparamos solo la base
    if (href.includes('?')) {
      return pathname === href.split('?')[0] && typeof window !== 'undefined' && window.location.search === href.split('/catalogo')[1];
    }
    // Para el resto, si la ruta actual empieza con el href (ej: /ventas y /ventas/123)
    return pathname === href || (href !== '/catalogo' && pathname.startsWith(href));
  };

  // Efecto para mover la barrita mágica
  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = document.querySelector('[data-active="true"]');
      const container = document.querySelector('[data-menu-container]');
      if (activeLink && container) {
        const rect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setActiveIndicator({
          width: rect.width,
          left: rect.left - containerRect.left + container.scrollLeft, // + scrollLeft para menú con overflow
        });
      }
    };

    requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [pathname, esAdmin]); // se recalcula si cambia la ruta o el rol

  return (
    <nav
      className="glass-strong border-b border-[var(--color-border)] px-6 py-2 overflow-x-auto whitespace-nowrap scrollbar-neon relative"
      data-menu-container
      role="navigation"
      aria-label="Menú principal"
    >
      <div className="flex gap-1 min-w-max relative">
        {/* Barrita animada */}
        <div
          className="absolute h-0.5 bottom-0 bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] rounded-full transition-all duration-300 ease-out pointer-events-none"
          style={{
            width: activeIndicator.width,
            transform: `translateX(${activeIndicator.left}px)`,
          }}
          aria-hidden="true"
        />
        
        {/* Links */}
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              data-active={active}
              className={`
                relative flex items-center px-4 py-2.5
                text-sm font-medium font-display tracking-wide
                transition-all duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
                whitespace-nowrap
                ${active 
                  ? 'text-[var(--color-neon-green)]' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-neon-green)]'
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}