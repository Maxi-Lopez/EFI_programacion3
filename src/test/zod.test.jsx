import { describe, it, expect } from 'vitest';
import { productoSchema } from '@/components/ProductoForm';
import { loginSchema } from '@/app/login/page';

describe('productoSchema (Zod)', () => {
  it('valida un producto completo correctamente', () => {
    const resultado = productoSchema.safeParse({
      nombre: 'Lápiz',
      descripcion: 'Lápiz grafito',
      precio_lista: '1200.50',
      stock: '10',
    });
    expect(resultado.success).toBe(true);
  });

  it('rechaza nombre vacío', () => {
    const resultado = productoSchema.safeParse({
      nombre: '',
      descripcion: '',
      precio_lista: '100',
      stock: '5',
    });
    expect(resultado.success).toBe(false);
    expect(resultado.error).toBeDefined();
  });

  it('rechaza precio inválido', () => {
    const resultado = productoSchema.safeParse({
      nombre: 'Lápiz',
      descripcion: '',
      precio_lista: 'abc',
      stock: '5',
    });
    expect(resultado.success).toBe(false);
  });

  it('rechaza stock no numérico', () => {
    const resultado = productoSchema.safeParse({
      nombre: 'Lápiz',
      descripcion: '',
      precio_lista: '100',
      stock: 'cinco',
    });
    expect(resultado.success).toBe(false);
  });
});

describe('loginSchema (Zod)', () => {
  it('valida un login completo correctamente', () => {
    const resultado = loginSchema.safeParse({
      username: 'admin',
      password: 'admin',
    });
    expect(resultado.success).toBe(true);
  });

  it('rechaza usuario vacío', () => {
    const resultado = loginSchema.safeParse({
      username: '',
      password: 'admin',
    });
    expect(resultado.success).toBe(false);
  });

  it('rechaza contraseña vacía', () => {
    const resultado = loginSchema.safeParse({
      username: 'admin',
      password: '',
    });
    expect(resultado.success).toBe(false);
  });
});
