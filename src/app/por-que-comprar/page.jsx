import Card from '@/components/ui/Card';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';

export default function PorQueComprarPage() {
  const razones = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-green)] to-[var(--color-neon-cyan)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-green)]',
      title: 'Productos probados y seleccionados',
      desc: 'No vendemos cajas cerradas. Cada componente pasa por nuestro filtro de calidad: rendimiento real, estabilidad térmica y compatibilidad verificada.',
      color: 'neon',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-pink)] to-[var(--color-neon-amber)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-pink)]',
      title: 'Precio honesto, sin sorpresas',
      desc: 'Márgenes ajustados. Lo que ves es lo que pagas: sin costos ocultos, sin ofertas infladas y con stock real disponible para envío inmediato.',
      color: 'neonPink',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-cyan)] to-[var(--color-neon-green)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-cyan)]',
      title: 'Soporte que entiende lo que armás',
      desc: 'Nuestro equipo arma PCs, juega y hace streaming. Si tenés dudas de compatibilidad o rendimiento, te respondemos con experiencia, no con scripts de soporte genérico.',
      color: 'neonCyan',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-[var(--color-neon-amber)] to-[var(--color-neon-pink)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-amber)]',
      title: 'Garantía y posventa real',
      desc: 'Gestionamos RMA directo con distribuidores oficiales. Si algo falla, nos ocupamos nosotros para que vos sigas jugando o trabajando sin dolores de cabeza.',
      color: 'neonAmber',
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-cyber mb-4">¿Por qué comprar en Nexusgamer?</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">Cuatro razones que nos hacen diferentes</p>
      </header>

      <div className="space-y-6">
        {razones.map((razon, i) => (
          <Card key={i} variant="gradientBorder" padding="xl" className="animate-in slide-in-from-bottom-4 duration-500 delay-{i * 100}">
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${razon.gradient} flex items-center justify-center flex-shrink-0 ${razon.glow}`}>
                {razon.icon}
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold text-gradient-{razon.color === 'neonPink' ? 'hot' : razon.color === 'neonCyan' ? 'cyber' : 'neon'} mb-3">
                  {razon.title}
                </h2>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
                  {razon.desc}
                </p>
              </div>
            </div>
          </Card>
        ))}

        <div className="text-center pt-8 animate-in fade-in duration-500 delay-400">
          <Link href="/catalogo" className="btn-neon btn-lg px-10 py-4 inline-flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Ver Productos
          </Link>
          <Link href="/contacto" className="btn-neon-outline neonOutlinePink btn-lg px-8 py-4 ml-4">
            Contactarnos
          </Link>
        </div>
      </div>
    </div>
  );
}