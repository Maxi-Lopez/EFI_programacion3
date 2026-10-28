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
  it('renderiza nombre, descripción y precio del producto', () => {
    const producto = {
      id: 1,
      nombre: 'Lápiz grafito',
      descripcion: 'Lápiz de dibujo HB',
      precio_lista: 1200.5,
      stock: 10,
    };

    render(<ProductoCard producto={producto} />, { wrapper });

    expect(screen.getByText('Lápiz grafito')).toBeInTheDocument();
    expect(screen.getByText('Lápiz de dibujo HB')).toBeInTheDocument();
    expect(screen.getByText('$1200.5')).toBeInTheDocument();
  });

  it('muestra guion cuando no hay descripción', () => {
    const producto = {
      id: 2,
      nombre: 'Borrador',
      descripcion: '',
      precio_lista: 500,
      stock: 20,
    };

    render(<ProductoCard producto={producto} />, { wrapper });

    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
