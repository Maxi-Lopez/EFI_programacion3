import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Boton from '@/components/ui/Boton';

describe('Boton', () => {
  it('renderiza el texto pasado como children', () => {
    render(<Boton>Guardar</Boton>);
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  });

  it('llama al handler onClick al hacer clic', () => {
    const handleClick = vi.fn();
    render(<Boton onClick={handleClick}>Aceptar</Boton>);

    fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica el atributo disabled cuando se pasa disabled', () => {
    render(<Boton disabled>Deshabilitado</Boton>);
    const boton = screen.getByRole('button', { name: 'Deshabilitado' });
    expect(boton).toBeDisabled();
  });
});
