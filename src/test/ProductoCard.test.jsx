import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductoCard from '@/components/ProductoCard';

describe('ProductoCard', () => {
  it('renderiza nombre, descripción y precio del producto', () => {
    const producto = {
      id: 1,
      nombre: 'Lápiz grafito',
      descripcion: 'Lápiz de dibujo HB',
      precio_lista: 1200.5,
      stock: 10,
    };

    render(<ProductoCard producto={producto} />);

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

    render(<ProductoCard producto={producto} />);

    expect(screen.getByText('-')).toBeInTheDocument();
  });
});
