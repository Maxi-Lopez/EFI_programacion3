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
  if (enDashboard) return itemsDashboard;
  if (user) return [...itemsPublicosSinOfertas, ...(esAdminOMVendedor(user.rol) ? itemsAdmin : [])];
  return itemsPublicos;
};

export default function MenuLineal() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [items, setItems] = useState(itemsPublicos);
  const enDashboard = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(calcularItems(user, enDashboard));
  }, [user, enDashboard]);

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 overflow-x-auto whitespace-nowrap">
      <div className="flex gap-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-slate-600 hover:text-slate-800 hover:underline transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
