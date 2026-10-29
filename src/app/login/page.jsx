'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export const loginSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export default function LoginPage() {
  const { login } = useAuth();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await login(data.username, data.password);
    } catch (err) {
      setApiError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-green)]/5 via-transparent to-[var(--color-neon-pink)]/5 animate-aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />

      <Card variant="gradientBorder" padding="xl" className="w-full max-w-md relative z-10 animate-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_30px_var(--color-glow-green)]">
            <svg className="w-9 h-9 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-neon mb-2">Bienvenido</h1>
          <p className="text-[var(--color-text-muted)]">Inicia sesión para acceder a tu cuenta</p>
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
          <Input
            id="username"
            label="Usuario"
            type="text"
            autoComplete="username"
            placeholder="tu_usuario"
            {...register('username')}
            error={errors.username?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          {errors.username && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.username.message}</p>}

          <Input
            id="password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />
          {errors.password && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.password.message}</p>}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-neon-green)] focus:ring-[var(--color-neon-green)] focus:ring-2 transition-colors"
              />
              <span className="text-sm text-[var(--color-text-muted)]">Recordarme</span>
            </label>
            <Link href="/recuperar-contrasena" className="text-sm font-medium text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Boton
            type="submit"
            variant="neon"
            size="lg"
            fullWidth={true}
            loading={loading || isSubmitting}
            rightIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            className="animate-neon-pulse"
          >
            {loading ? 'Entrando…' : 'Iniciar sesión'}
          </Boton>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-center text-sm text-[var(--color-text-muted)]">
            ¿No tienes cuenta?{' '}
            <Link href="/registro" className="font-semibold text-[var(--color-neon-green)] hover:text-[var(--color-neon-cyan)] transition-colors">
              Regístrate
            </Link>
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            { user: 'admin', pass: 'admin', label: 'Admin' },
            { user: 'vendedor1', pass: 'testpass123', label: 'Vendedor' },
            { user: 'cliente1', pass: 'testpass123', label: 'Cliente' },
          ].map((cred) => (
            <button
              key={cred.user}
              type="button"
              onClick={() => {
                document.getElementById('username').value = cred.user;
                document.getElementById('password').value = cred.pass;
                handleSubmit(onSubmit)({ preventDefault: () => {} });
              }}
              className="btn-neon-ghost btn-sm py-2 text-xs"
            >
              {cred.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}