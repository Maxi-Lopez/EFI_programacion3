'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export default function LoginPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/token/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error('Credenciales inválidas');
      const dataRes = await res.json();
      localStorage.setItem('access_token', dataRes.access);
      localStorage.setItem('refresh_token', dataRes.refresh);
      router.push('/catalogo');
    } catch (err) {
      setApiError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Iniciar sesión</h1>
        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {apiError}
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Usuario
            </label>
            <input
              {...register('username')}
              type="text"
              className={`w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-800 ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              {...register('password')}
              type="password"
              className={`w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-800 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
