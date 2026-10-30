'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '@/utils/apiClient';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';

const proveedorSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  cuit: z.string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 11, 'El CUIT debe tener 11 dígitos'),
  telefono: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  direccion: z.string().optional(),
});

export default function ProveedorForm({ proveedor, onSave, onCancel }) {
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(proveedorSchema),
    defaultValues: proveedor || {
      nombre: '',
      cuit: '',
      telefono: '',
      email: '',
      direccion: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      if (proveedor) {
        await apiFetch(`/proveedores/proveedor/${proveedor.id}/`, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
      } else {
        await apiFetch('/proveedores/proveedor/', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }
      onSave();
      reset();
    } catch (err) {
      setApiError(err.message || 'Error al guardar el proveedor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          {proveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        </h2>

        {apiError && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4 text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Nombre *</label>
            <Input {...register('nombre')} placeholder="Ej: Tech Distribuidora" />
            {errors.nombre && <span className="text-red-400 text-xs mt-1 block">{errors.nombre.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">CUIT *</label>
            <Input {...register('cuit')} placeholder="Ej: 20123456789" />
            {errors.cuit && <span className="text-red-400 text-xs mt-1 block">{errors.cuit.message}</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Teléfono</label>
              <Input {...register('telefono')} placeholder="Ej: 1145678900" />
              {errors.telefono && <span className="text-red-400 text-xs mt-1 block">{errors.telefono.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Email</label>
              <Input type="email" {...register('email')} placeholder="contacto@empresa.com" />
              {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-1">Dirección</label>
            <Input {...register('direccion')} placeholder="Ej: Av. Corrientes 1234" />
            {errors.direccion && <span className="text-red-400 text-xs mt-1 block">{errors.direccion.message}</span>}
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
              {isSubmitting ? 'Guardando...' : 'Guardar Proveedor'}
            </Boton>
          </div>
        </form>
      </div>
    </div>
  );
}