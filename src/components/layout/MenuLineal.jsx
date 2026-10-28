import Link from 'next/link';

const items = [
  { label: 'Productos', href: '/catalogo' },
  { label: 'Ofertas', href: '/catalogo?ofertas=1' },
  { label: 'Marcas', href: '/catalogo?marcas=1' },
  { label: 'Categorías', href: '/catalogo?categorias=1' },
  { label: 'Proveedores', href: '/catalogo?proveedores=1' },
  { label: 'Compras', href: '/compras' },
  { label: 'Ventas', href: '/ventas' },
  { label: 'Lista de Deseos', href: '/lista-deseos' },
  { label: 'Contacto', href: '/contacto' },
  { label: '¿Por qué comprar?', href: '/por-que-comprar' },
  { label: 'Sobre nosotros', href: '/sobre-nosotros' },
];

export default function MenuLineal() {
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
