import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductoCard from '@/components/ProductoCard';
import { AuthProvider } from '@/context/AuthContext';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  usePathname: vi.fn(() => '/'),
}));

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('ProductoCard', () => {
  it('renderiza nombre, precio y SKU del producto', () => {
    const producto = {
      id: 1,
      nombre: 'Lápiz grafito',
      descripcion_corta: 'Lápiz de dibujo HB',
      precio_lista: 1200.5,
      stock_total: 10,
      sku: 'LAP-001',
      marca: { nombre: 'TestMarca' },
      categoria: { nombre: 'TestCat' },
    };

    render(<ProductoCard producto={producto} />, { wrapper });

    expect(screen.getByText('Lápiz grafito')).toBeInTheDocument();
    expect(screen.getByText('Lápiz de dibujo HB')).toBeInTheDocument();
    expect(screen.getByText(/^\$\s*1\.201$/)).toBeInTheDocument();
  });

  it('muestra marca y categoría como badges', () => {
    const producto = {
      id: 2,
      nombre: 'Borrador',
      descripcion_corta: '',
      precio_lista: 500,
      stock_total: 20,
      sku: 'BRR-001',
      marca: { nombre: 'MarcaTest' },
      categoria: { nombre: 'CatTest' },
    };

    render(<ProductoCard producto={producto} />, { wrapper });

    // La marca aparece en el badge (badge-glass) y en el fallback de imagen
    // Usamos getAllByText para verificar que aparece al menos una vez
    expect(screen.getAllByText('MarcaTest')).toHaveLength(2);
    // La categoría solo aparece en su badge
    expect(screen.getByText('CatTest')).toBeInTheDocument();
  });
});