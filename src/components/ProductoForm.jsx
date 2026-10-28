'use client';

import { useState, useEffect } from 'react';
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
  sku: z.string().min(1, 'El SKU es obligatorio').max(100, 'Máximo 100 caracteres'),
  descripcion_corta: z.string().max(500, 'Máximo 500 caracteres').optional(),
  precio_lista: z.string().min(1, 'El precio es obligatorio').regex(/^\d+(\.\d{1,2})?$/, 'Precio inválido'),
  stock_total: z.string().min(1, 'El stock es obligatorio').regex(/^\d+$/, 'Stock debe ser un número entero'),
  marca: z.string().min(1, 'Selecciona una marca'),
  categoria: z.string().min(1, 'Selecciona una categoría'),
  imagen_url: z.string().url('URL inválida').optional().or(z.literal('')),
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
    setValue,
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: '',
      sku: '',
      descripcion_corta: '',
      precio_lista: '',
      stock_total: '',
      marca: '',
      categoria: '',
      imagen_url: '',
    },
  });

  useEffect(() => {
    if (modo === 'editar' && id) {
      const cargarProducto = async () => {
        try {
          const producto = await apiFetch(`/catalogo/producto/${id}/`);
          setValue('nombre', producto.nombre || '');
          setValue('sku', producto.sku || '');
          setValue('descripcion_corta', producto.descripcion_corta || '');
          setValue('precio_lista', String(producto.precio_lista || ''));
          setValue('stock_total', String(producto.stock_total || ''));
          setValue('marca', String(producto.marca || ''));
          setValue('categoria', String(producto.categoria || ''));
          setValue('imagen_url', producto.imagen_url || '');
        } catch (err) {
          setApiError(err.message || 'No se pudo cargar el producto');
        }
      };
      cargarProducto();
    }
  }, [modo, id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      const body = {
        nombre: data.nombre,
        sku: data.sku,
        descripcion_corta: data.descripcion_corta || '',
        precio_lista: parseFloat(data.precio_lista),
        stock_total: parseInt(data.stock_total, 10),
        marca: data.marca,
        categoria: data.categoria,
        imagen_url: data.imagen_url || '',
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
          {errors.nombre && <span className="text-xs text-red-500">{errors.nombre.message}</span>}
          <Input
            id="sku"
            label="SKU"
            {...register('sku')}
            error={errors.sku}
          />
          {errors.sku && <span className="text-xs text-red-500">{errors.sku.message}</span>}
          <Input
            id="descripcion_corta"
            label="Descripción corta"
            {...register('descripcion_corta')}
            error={errors.descripcion_corta}
          />
          {errors.descripcion_corta && <span className="text-xs text-red-500">{errors.descripcion_corta.message}</span>}
          <Input
            id="marca"
            label="Marca"
            {...register('marca')}
            error={errors.marca}
          />
          {errors.marca && <span className="text-xs text-red-500">{errors.marca.message}</span>}
          <Input
            id="categoria"
            label="Categoría"
            {...register('categoria')}
            error={errors.categoria}
          />
          {errors.categoria && <span className="text-xs text-red-500">{errors.categoria.message}</span>}
          <Input
            id="precio_lista"
            label="Precio lista"
            type="number"
            step="0.01"
            {...register('precio_lista')}
            error={errors.precio_lista}
          />
          {errors.precio_lista && <span className="text-xs text-red-500">{errors.precio_lista.message}</span>}
          <Input
            id="stock_total"
            label="Stock total"
            type="number"
            {...register('stock_total')}
            error={errors.stock_total}
          />
          {errors.stock_total && <span className="text-xs text-red-500">{errors.stock_total.message}</span>}
          <Input
            id="imagen_url"
            label="URL de imagen (opcional)"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            {...register('imagen_url')}
            error={errors.imagen_url}
          />
          {errors.imagen_url && <span className="text-xs text-red-500">{errors.imagen_url.message}</span>}
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
