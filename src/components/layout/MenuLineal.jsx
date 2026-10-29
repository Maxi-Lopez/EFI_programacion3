'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const itemsPublicos = [
  { label: 'Productos', href: '/catalogo' },
  { label: 'Ofertas', href: '/catalogo?ofertas=1' },
  { label: 'Marcas', href: '/catalogo?marcas=1' },
  { label: 'Categorías', href: '/catalogo?categorias=1' },
  { label: 'Lista de Deseos', href: '/lista-deseos' },
  { label: 'Contacto', href: '/contacto' },
  { label: '¿Por qué comprar?', href: '/por-que-comprar' },
  { label: 'Sobre nosotros', href: '/sobre-nosotros' },
];

const itemsDashboard = [
  { label: 'Productos', href: '/catalogo' },
  { label: 'Marcas', href: '/catalogo?marcas=1' },
  { label: 'Categorías', href: '/categorias' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Sobre nosotros', href: '/sobre-nosotros' },
];

const itemsAdmin = [
  { label: 'Ventas', href: '/ventas' },
  { label: 'Compras', href: '/compras' },
  { label: 'Proveedores', href: '/proveedores' },
  { label: 'Categorías (admin)', href: '/categorias' },
];

const esAdminOMVendedor = (rol) =>
  ['admin', 'administrador', 'vendedor'].includes(String(rol || '').toLowerCase());

const calcularItems = (user, enDashboard) => {
  const itemsPublicosSinOfertas = itemsPublicos.filter((i) => i.label !== 'Ofertas');
  const baseItems = enDashboard ? itemsDashboard : itemsPublicosSinOfertas;
  if (user && esAdminOMVendedor(user.rol)) {
    return [...baseItems, ...itemsAdmin];
  }
  return baseItems;
};

export default function MenuLineal() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [items, setItems] = useState(itemsPublicos);
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0 });
  const enDashboard = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  useEffect(() => {
    setItems(calcularItems(user, enDashboard));
  }, [user, enDashboard]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = document.querySelector('[data-menu-active]');
      const container = document.querySelector('[data-menu-container]');
      if (activeLink && container) {
        const rect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setActiveIndicator({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [pathname, items]);

  return (
    <nav
      className="glass-strong border-b border-[var(--color-border)] px-6 py-2 overflow-x-auto whitespace-nowrap scrollbar-neon"
      data-menu-container
      role="navigation"
      aria-label="Menú principal"
    >
      <div className="flex gap-1 min-w-max">
        <div
          className="absolute h-0.5 bottom-0 bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] rounded-full transition-all duration-300 ease-out"
          style={{
            width: activeIndicator.width,
            transform: `translateX(${activeIndicator.left}px)`,
          }}
          aria-hidden="true"
        />
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-menu-active={pathname === item.href || (item.href !== '/catalogo' && pathname.startsWith(item.href))}
            className="
              relative flex items-center px-4 py-2.5
              text-sm font-medium font-display tracking-wide
              text-[var(--color-text-muted)]
              hover:text-[var(--color-neon-green)]
              transition-all duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]
              whitespace-nowrap
              ${pathname === item.href || (item.href !== '/catalogo' && pathname.startsWith(item.href))
                ? 'text-[var(--color-neon-green)]'
                : ''
              }
            "
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}