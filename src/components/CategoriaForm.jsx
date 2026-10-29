'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '@/utils/apiClient';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';

const categoriaSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  descripcion: z.string().max(500, 'Máximo 500 caracteres').optional().or(z.literal('')),
});

export default function CategoriaForm({ categoria, onSave, onCancel }) {
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categoriaSchema),
    defaultValues: categoria || {
      nombre: '',
      descripcion: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      if (categoria) {
        await apiFetch(`/catalogo/categoria/${categoria.id}/`, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
      } else {
        await apiFetch('/catalogo/categoria/', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
      onSave();
      reset();
    } catch (err) {
      setApiError(err.message || 'Error al guardar la categoría');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          {categoria ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>

        {apiError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4 text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Nombre *</label>
            <Input {...register('nombre')} placeholder="Ej: Componentes, Periféricos, etc." />
            {errors.nombre && <span className="text-red-400 text-xs mt-1 block">{errors.nombre.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Descripción</label>
            <Input {...register('descripcion')} placeholder="Descripción opcional de la categoría" />
            {errors.descripcion && <span className="text-red-400 text-xs mt-1 block">{errors.descripcion.message}</span>}
          </div>

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
              {isSubmitting ? 'Guardando...' : 'Guardar Categoría'}
            </Boton>
          </div>
        </form>
      </div>
    </div>
  );
}