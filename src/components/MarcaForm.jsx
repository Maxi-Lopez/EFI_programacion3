'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '@/utils/apiClient';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';

const marcaSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  logo: z.string().url('URL inválida').optional().or(z.literal('')),
});

export default function MarcaForm({ marca, onSave, onCancel }) {
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(marcaSchema),
    defaultValues: marca || {
      nombre: '',
      logo: '',
    },
  });

  const watchedLogo = watch('logo');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      if (marca) {
        await apiFetch(`/catalogo/marca/${marca.id}/`, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
      } else {
        await apiFetch('/catalogo/marca/', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
      onSave();
      reset();
    } catch (err) {
      setApiError(err.message || 'Error al guardar la marca');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          {marca ? 'Editar Marca' : 'Nueva Marca'}
        </h2>

        {apiError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4 text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Nombre *</label>
            <Input {...register('nombre')} placeholder="Ej: ASUS, Logitech, Samsung" />
            {errors.nombre && <span className="text-red-400 text-xs mt-1 block">{errors.nombre.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Logo (URL)</label>
            <Input type="url" {...register('logo')} placeholder="https://ejemplo.com/logo.png" />
            {errors.logo && <span className="text-red-400 text-xs mt-1 block">{errors.logo.message}</span>}
          </div>

          {watchedLogo && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
              <img
                src={watchedLogo}
                alt="Vista previa del logo"
                className="w-full h-full object-contain p-4"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute bottom-2 right-2 badge-glass text-xs">
                Vista previa
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <Boton type="submit" variant="neon" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Marca'}
            </Boton>
          </div>
        </form>
      </div>
    </div>
  );
}