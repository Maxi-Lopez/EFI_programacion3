'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/ui/Input';
import Boton from '@/components/ui/Boton';

const contactoSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000),
});

export default function ContactoForm() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactoSchema),
    defaultValues: { nombre: '', email: '', mensaje: '' },
  });

  const onSubmit = async (data) => {
    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('📧 Contacto enviado:', data);
    setEnviado(true);
    setEnviando(false);
    reset();
    setTimeout(() => setEnviado(false), 5000);
  };

  if (enviado) {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="glass rounded-2xl p-8 text-center border border-[var(--color-neon-green)]/50">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center shadow-[0_0_30px_var(--color-glow-green)]">
            <svg className="w-8 h-8 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-gradient-neon mb-2">¡Mensaje enviado!</h3>
          <p className="text-[var(--color-text-muted)]">Te responderemos a la brevedad. Gracias por contactarnos.</p>
          <Boton variant="neonOutline" onClick={() => setEnviado(false)} className="mt-6">
            Enviar otro mensaje
          </Boton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          id="nombre"
          label="Nombre *"
          placeholder="Tu nombre"
          {...register('nombre')}
          error={errors.nombre?.message}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />
        {errors.nombre && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.nombre.message}</p>}

        <Input
          id="email"
          label="Email *"
          type="email"
          placeholder="tu@email.com"
          {...register('email')}
          error={errors.email?.message}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        {errors.email && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)] flex items-center gap-1">{errors.email.message}</p>}
      </div>

      <Input
        id="mensaje"
        label="Mensaje *"
        placeholder="Cuéntanos en qué podemos ayudarte..."
        {...register('mensaje')}
        error={errors.mensaje?.message}
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        }
        className="min-h-[140px]"
      />
      {errors.mensaje && <p className="mt-1.5 text-sm text-[var(--color-neon-pink)]">{errors.mensaje.message}</p>}

      <Boton
        type="submit"
        variant="neon"
        size="lg"
        fullWidth={true}
        loading={enviando}
        rightIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        }
      >
        {enviando ? 'Enviando...' : 'Enviar Mensaje'}
      </Boton>
    </form>
  );
}