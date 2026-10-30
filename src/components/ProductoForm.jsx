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
import Cargando from '@/components/Cargando';

export const productoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'Máximo 100 caracteres'),
  sku: z.string().min(1, 'El SKU es obligatorio').max(100, 'Máximo 100 caracteres'),
  descripcion_corta: z.string().max(500, 'Máximo 500 caracteres').optional(),
  precio_lista: z.string().min(1, 'El precio es obligatorio').regex(/^\d+(\.\d{1,2})?$/, 'Precio inválido'),
  stock_total: z.string().min(1, 'El stock es obligatorio').regex(/^\d+$/, 'Stock debe ser un número entero'),
  marca: z.string().min(1, 'La marca es obligatoria'),
  categoria: z.string().min(1, 'La categoría es obligatoria'),
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
    watch,
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
          setLoading(true);
          const producto = await apiFetch(`/catalogo/producto/${id}/`);
          setValue('nombre', producto.nombre || '');
          setValue('sku', producto.sku || '');
          setValue('descripcion_corta', producto.descripcion_corta || '');
          setValue('precio_lista', String(producto.precio_lista || ''));
          setValue('stock_total', String(producto.stock_total || ''));
          setValue('marca', producto.marca?.nombre || producto.marca || '');
          setValue('categoria', producto.categoria?.nombre || producto.categoria || '');
          setValue('imagen_url', producto.imagen_url || '');
        } catch (err) {
          setApiError(err.message || 'No se pudo cargar el producto');
        } finally {
          setLoading(false);
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

  const watchedValues = watch();

  if (loading && modo === 'editar') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card variant="glass">
          <Cargando mensaje="Cargando producto…" />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card variant="gradientBorder" padding="xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              {modo === 'editar' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              )}
            </svg>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gradient-neon">
              {modo === 'editar' ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {modo === 'editar' ? 'Actualiza la información del producto' : 'Completa los campos para crear un nuevo producto'}
            </p>
          </div>
        </div>

        {apiError && (
          <div className="mb-6 p-4 glass rounded-xl border border-[var(--color-neon-pink)]/50 bg-[var(--color-neon-pink)]/5 animate-in slide-in-from-top-3 duration-300" role="alert">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--color-neon-pink)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--color-neon-pink)] text-sm">{apiError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="nombre"
              label="Nombre del producto"
              placeholder="Ej: RTX 4090 Gaming OC"
              {...register('nombre')}
              error={errors.nombre?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />
            {errors.nombre && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.nombre.message}</p>}

            <Input
              id="sku"
              label="SKU / Código"
              placeholder="Ej: GPU-NVDA-4090-001"
              {...register('sku')}
              error={errors.sku?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
            />
            {errors.sku && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.sku.message}</p>}
          </div>

          <Input
            id="descripcion_corta"
            label="Descripción corta"
            placeholder="Descripción breve para mostrar en tarjetas (máx. 500 caracteres)"
            {...register('descripcion_corta')}
            error={errors.descripcion_corta?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            }
          />
          {errors.descripcion_corta && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.descripcion_corta.message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="marca"
              label="Marca"
              placeholder="Ej: NVIDIA, AMD, Intel"
              {...register('marca')}
              error={errors.marca?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
            />
            {errors.marca && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.marca.message}</p>}

            <Input
              id="categoria"
              label="Categoría"
              placeholder="Ej: Placas de video, Procesadores, Memoria RAM"
              {...register('categoria')}
              error={errors.categoria?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              }
            />
            {errors.categoria && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.categoria.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input
              id="precio_lista"
              label="Precio (ARS)"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register('precio_lista')}
              error={errors.precio_lista?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            {errors.precio_lista && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.precio_lista.message}</p>}

            <Input
              id="stock_total"
              label="Stock"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              {...register('stock_total')}
              error={errors.stock_total?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />
            {errors.stock_total && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.stock_total.message}</p>}

            <Input
              id="imagen_url"
              label="URL de imagen (opcional)"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              {...register('imagen_url')}
              error={errors.imagen_url?.message}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
            {errors.imagen_url && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.imagen_url.message}</p>}
          </div>

          {watchedValues.imagen_url && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
              <img
                src={watchedValues.imagen_url}
                alt="Vista previa"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute bottom-2 right-2 badge-glass text-xs">
                Vista previa
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[var(--color-border)]">
            <Boton
              type="submit"
              variant="neon"
              size="lg"
              fullWidth={true}
              loading={loading || isSubmitting}
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              }
            >
              {loading || isSubmitting ? 'Guardando…' : modo === 'editar' ? 'Actualizar' : 'Crear producto'}
            </Boton>
            <Boton
              type="button"
              variant="ghost"
              size="lg"
              fullWidth={true}
              onClick={() => router.push('/catalogo')}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              }
            >
              Cancelar
            </Boton>
          </div>
        </form>
      </Card>
    </div>
  );
}