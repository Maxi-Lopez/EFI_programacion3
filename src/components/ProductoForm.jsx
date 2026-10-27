'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/utils/apiClient';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export const productoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  descripcion: z.string().max(500, 'Máximo 500 caracteres').optional(),
  precio_lista: z
    .string()
    .min(1, 'El precio es obligatorio')
    .regex(/^\d+(\.\d{1,2})?$/, 'Precio inválido'),
  stock: z
    .string()
    .min(1, 'El stock es obligatorio')
    .regex(/^\d+$/, 'Stock debe ser un número entero'),
});

export default function ProductoForm({ modo = 'crear', id }) {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio_lista: '',
      stock: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      const body = {
        nombre: data.nombre,
        descripcion: data.descripcion || '',
        precio_lista: parseFloat(data.precio_lista),
        stock: parseInt(data.stock, 10),
      };

      if (modo === 'editar' && id) {
        await apiFetch(`/catalogo/producto/${id}/`, {
          method: 'PUT',
          body: JSON.stringify(body),
        });
      } else {
        await apiFetch('/catalogo/producto/', {
          method: 'POST',
          body: JSON.stringify(body),
        });
      }

      router.push('/catalogo');
    } catch (err) {
      setApiError(err.message || 'Error guardando el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <Card>
        <h2 className="text-xl font-bold mb-6 text-slate-800">
          {modo === 'editar' ? 'Editar producto' : 'Nuevo producto'}
        </h2>
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {apiError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="nombre"
            label="Nombre"
            {...register('nombre')}
            error={errors.nombre}
          />
          {errors.nombre && (
            <span className="text-xs text-red-500">{errors.nombre.message}</span>
          )}
          <Input
            id="descripcion"
            label="Descripción"
            {...register('descripcion')}
            error={errors.descripcion}
          />
          <Input
            id="precio_lista"
            label="Precio lista"
            type="number"
            step="0.01"
            {...register('precio_lista')}
            error={errors.precio_lista}
          />
          {errors.precio_lista && (
            <span className="text-xs text-red-500">{errors.precio_lista.message}</span>
          )}
          <Input
            id="stock"
            label="Stock"
            type="number"
            {...register('stock')}
            error={errors.stock}
          />
          {errors.stock && <span className="text-xs text-red-500">{errors.stock.message}</span>}
          <div className="flex gap-2">
            <Boton type="submit" disabled={isSubmitting} className="w-full">
              {loading ? 'Guardando…' : 'Guardar'}
            </Boton>
            <Boton
              type="button"
              onClick={() => router.push('/catalogo')}
              className="w-full bg-slate-300 text-slate-800 hover:bg-slate-400"
            >
              Cancelar
            </Boton>
          </div>
        </form>
      </Card>
    </div>
  );
}
