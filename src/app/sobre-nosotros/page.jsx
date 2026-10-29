import Card from '@/components/ui/Card';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-neon mb-4">Sobre Nosotros</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">Conoce la historia detrás de Nexusgamer</p>
      </header>

      <div className="space-y-8">
        <Card variant="gradientBorder" padding="xl">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-cyan)] flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_var(--color-glow-green)]">
              <svg className="w-8 h-8 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gradient-neon mb-3">Nuestra misión</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
                Somos una empresa en crecimiento que velamos por tus necesidades de gaming y computación,
                ofreciendo productos de calidad, asesoramiento honesto y una experiencia de compra transparente.
              </p>
            </div>
          </div>
        </Card>

        <Card variant="gradientBorder" padding="xl">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-neon-pink)] to-[var(--color-neon-amber)] flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_var(--color-glow-pink)]">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gradient-hot mb-3">Qué nos mueve</h2>
              <ul className="space-y-3 text-[var(--color-text-muted)]">
                {[
                  'Seleccionamos cada componente probando su rendimiento real',
                  'Priorizamos la relación precio-calidad sobre márgenes inflados',
                  'Brindamos soporte técnico antes, durante y después de la compra',
                  'Construimos comunidad: gamers, creadores y entusiastas',
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3 animate-in slide-in-from-left-4 duration-300 delay-{i * 100}">
                    <svg className="w-5 h-5 text-[var(--color-neon-pink)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card variant="gradientBorder" padding="xl">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-green)] flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_var(--color-glow-cyan)]">
              <svg className="w-8 h-8 text-[#050508]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gradient-cyber mb-3">Nexusgamer</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
                El nombre refleja nuestro propósito: ser el <strong className="text-[var(--color-text)]">nexus</strong> (punto de conexión)
                entre la tecnología y tu pasión por jugar, crear y rendir al máximo.
                Cada pedido que sale de nuestro almacén lleva ese compromiso.
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center pt-8">
          <Link href="/catalogo" className="btn-neon btn-lg px-10 py-4 inline-flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Explorar Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}