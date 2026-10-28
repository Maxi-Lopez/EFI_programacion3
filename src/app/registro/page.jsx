'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '@/utils/apiClient';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export const registroSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  email: z.string().email('El email no es válido').min(1, 'El email es obligatorio'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmar_password: z.string().min(1, 'Confirma tu contraseña'),
  telefono: z.string().optional(),
  dni: z.string().optional(),
}).refine((data) => data.password === data.confirmar_password, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmar_password'],
});

export default function RegistroPage() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [usuarioRegistrado, setUsuarioRegistrado] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registroSchema),
    defaultValues: { username: '', email: '', password: '', confirmar_password: '', telefono: '', dni: '' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    setExito(false);
    try {
      await apiFetch('/usuarios/cliente/', {
        method: 'POST',
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          telefono: data.telefono || '',
          dni: data.dni || '',
        }),
      });
      setUsuarioRegistrado(data.username);
      setExito(true);
    } catch (err) {
      setApiError(err.message || 'No se pudo completar el registro');
    } finally {
      setLoading(false);
    }
  };

  if (exito) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <Card className="w-full max-w-md p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold mb-6 text-slate-800">Cuenta creada</h1>
          <p className="mb-6 text-slate-600">
            El usuario <strong>{usuarioRegistrado}</strong> ha sido registrado exitosamente.
          </p>
          <Link
            href="/login"
            className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
          >
            Ir a iniciar sesión
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6 text-slate-800 text-center">Crear cuenta</h1>
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-center">
            {apiError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Usuario
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Ej: prueba"
              {...register('username')}
              error={errors.username?.message}
            />
            {errors.username && (
              <span className="text-xs text-red-500 mt-1 block">{errors.username.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              {...register('email')}
              error={errors.email?.message}
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              {...register('password')}
              error={errors.password?.message}
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Confirmar contraseña
            </label>
            <Input
              id="confirmar_password"
              name="confirmar_password"
              type="password"
              placeholder="••••••"
              {...register('confirmar_password')}
              error={errors.confirmar_password?.message}
            />
            {errors.confirmar_password && (
              <span className="text-xs text-red-500 mt-1 block">{errors.confirmar_password.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Teléfono (opcional)
            </label>
            <Input
              id="telefono"
              name="telefono"
              type="text"
              placeholder="+54 9 11 2345-6789"
              {...register('telefono')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              DNI (opcional)
            </label>
            <Input
              id="dni"
              name="dni"
              type="text"
              placeholder="12345678"
              {...register('dni')}
            />
          </div>
          <Boton
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Boton>
          <p className="text-sm text-slate-600 text-center mt-4">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-slate-800 hover:underline font-medium">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
