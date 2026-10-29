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
  username: z.string().min(1, 'El usuario es obligatorio').min(3, 'Mínimo 3 caracteres'),
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
    watch,
  } = useForm({
    resolver: zodResolver(registroSchema),
    defaultValues: { username: '', email: '', password: '', confirmar_password: '', telefono: '', dni: '' },
  });

  const password = watch('password');

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

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: 'var(--color-border)' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 1, label: 'Muy débil', color: 'var(--color-neon-pink)' };
    if (score === 2) return { level: 2, label: 'Débil', color: 'var(--color-neon-amber)' };
    if (score === 3) return { level: 3, label: 'Media', color: 'var(--color-neon-cyan)' };
    if (score === 4) return { level: 4, label: 'Fuerte', color: 'var(--color-neon-green)' };
    return { level: 5, label: 'Muy fuerte', color: 'var(--color-neon-green)' };
  };

  const strength = getPasswordStrength(password);

  if (exito) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-green)]/5 via-transparent to-[var(--color-neon-cyan)]/5 animate-aurora" aria-hidden="true" />
        <Card variant="gradientBorder" padding="xl" className="w-full max-w-md text-center relative z-10 animate-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_40px_var(--color-glow-green)] animate-neon-pulse">
            <svg className="w-10 h-10 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-neon mb-3">¡Cuenta creada!</h1>
          <p className="text-[var(--color-text-muted)] mb-6">
            El usuario <strong className="text-[var(--color-text)]">{usuarioRegistrado}</strong> ha sido registrado exitosamente.
          </p>
          <Link href="/login" className="btn-neon btn-lg w-full inline-flex justify-center">
            Ir a iniciar sesión
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-pink)]/5 via-transparent to-[var(--color-neon-cyan)]/5 animate-aurora" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-neon animate-grid opacity-20" aria-hidden="true" />

      <Card variant="gradientBorder" padding="xl" className="w-full max-w-md relative z-10 animate-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-amber)] flex items-center justify-center shadow-[0_0_30px_var(--color-glow-pink)]">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient-hot mb-2">Crear cuenta</h1>
          <p className="text-[var(--color-text-muted)]">Únete a Nexusgamer y accede a ofertas exclusivas</p>
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
            placeholder="Ej: gamer_pro"
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
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            {...register('email')}
            error={errors.email?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          {errors.email && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.email.message}</p>}

          <Input
            id="password"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            helperText={password && (
              <div className="mt-2 h-1.5 bg-[var(--color-bg-elevated)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(strength.level / 5) * 100}%`,
                    backgroundColor: strength.color,
                    boxShadow: `0 0 10px ${strength.color}`,
                  }}
                />
              </div>
            )}
          />
          {errors.password && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.password.message}</p>}

          <Input
            id="confirmar_password"
            label="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            {...register('confirmar_password')}
            error={errors.confirmar_password?.message}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          {errors.confirmar_password && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.confirmar_password.message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="telefono"
              label="Teléfono (opcional)"
              type="tel"
              placeholder="+54 9 11 2345-6789"
              {...register('telefono')}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />

            <Input
              id="dni"
              label="DNI (opcional)"
              type="text"
              placeholder="12345678"
              {...register('dni')}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
          </div>

          <Boton
            type="submit"
            variant="neonPink"
            size="lg"
            fullWidth={true}
            loading={loading || isSubmitting}
            rightIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            }
          >
            {loading ? 'Registrando…' : 'Crear cuenta'}
          </Boton>

          <p className="text-center text-sm text-[var(--color-text-muted)]">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="font-semibold text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-text-dim)]">
            Al registrarte, aceptas nuestros
            <Link href="#" className="text-[var(--color-neon-green)] hover:text-[var(--color-neon-cyan)] ml-1">Términos y condiciones</Link>
            y
            <Link href="#" className="text-[var(--color-neon-green)] hover:text-[var(--color-neon-cyan)] ml-1">Política de privacidad</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}