import Card from '@/components/ui/Card';
import Link from 'next/link';
import Boton from '@/components/ui/Boton';
import ContactoForm from '@/components/ContactoForm';

export default function ContactoPage() {
  const infoContacto = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      titulo: 'Email de Soporte',
      datos: [
        { label: 'Ventas y consultas', valor: 'ventas@nexusgamer.com' },
        { label: 'Soporte técnico', valor: 'soporte@nexusgamer.com' },
        { label: 'Posventa y garantías', valor: 'garantias@nexusgamer.com' },
      ],
      color: 'neon',
      gradient: 'from-[var(--color-neon-green)] to-[var(--color-neon-cyan)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-green)]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      titulo: 'Teléfono',
      datos: [
        { label: 'Atención al cliente', valor: '+54 11 4000-0000' },
        { label: 'WhatsApp Business', valor: '+54 11 4000-0001' },
        { label: 'Horario: Lun-Vie 9-18hs', valor: 'Sábados 10-14hs' },
      ],
      color: 'neonPink',
      gradient: 'from-[var(--color-neon-pink)] to-[var(--color-neon-amber)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-pink)]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      titulo: 'Ubicación',
      datos: [
        { label: 'Showroom & Pickup', valor: 'Av. Corrientes 1234, CABA' },
        { label: 'Barrio: San Nicolás', valor: 'Cerca de Obelisco (Subte B, D)' },
        { label: 'Ver en Google Maps', valor: 'maps.app.goo.gl/nexusgamer' },
      ],
      color: 'neonCyan',
      gradient: 'from-[var(--color-neon-cyan)] to-[var(--color-neon-green)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-cyan)]',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      titulo: 'Horarios de Atención',
      datos: [
        { label: 'Lunes a Viernes', valor: '09:00 - 18:00' },
        { label: 'Sábados', valor: '10:00 - 14:00' },
        { label: 'Domingos y feriados', valor: 'Cerrado' },
      ],
      color: 'neonAmber',
      gradient: 'from-[var(--color-neon-amber)] to-[var(--color-neon-pink)]',
      glow: 'shadow-[0_0_30px_var(--color-glow-amber)]',
    },
  ];

  const redesSociales = [
    {
      nombre: 'Discord',
      url: 'https://discord.gg/nexusgamer',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-.657.076.076 0 0 0 .019-.103 13.107 13.107 0 0 0-.18-1.817.077.077 0 0 1-.007-.128 10.2 10.2 0 0 1 .372-.516.074.074 0 0 1 .101-.01c3.58 0 6.746-2.507 7.525-5.92a.077.077 0 0 1 .097-.086.073.073 0 0 0-.024-.108 13.176 13.176 0 0 0-1.782-3.797.077.077 0 0 1-.007-.127 10.18 10.18 0 0 1 .362-.547.076.076 0 0 0-.025-.117c.691-3.186-.183-6.375-1.687-8.84a.061.061 0 0 0-.046-.034zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.176-2.419 1.2 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
        </svg>
      ),
      color: 'text-[var(--color-neon-cyan)]',
    },
    {
      nombre: 'Instagram',
      url: 'https://instagram.com/nexusgamer',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-.058-1.281-.072-1.689-.072-4.948 0-3.26.013-3.667.072-4.947.196-4.354 2.618-6.78 6.98-6.98 1.281-.058 1.69-.072 4.948-.072z" />
          <circle cx="17.5" cy="6.5" r="1" />
        </svg>
      ),
      color: 'text-[var(--color-neon-pink)]',
    },
    {
      nombre: 'Twitter/X',
      url: 'https://twitter.com/nexusgamer',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 9.24-3.308.832L12 15.279l-6.216 5.313-3.308-.832 8.502-9.24-7.228-8.26h3.308l4.76 5.593L22.26 2.25h-4.016z" />
        </svg>
      ),
      color: 'text-[var(--color-neon-cyan)]',
    },
    {
      nombre: 'YouTube',
      url: 'https://youtube.com/@nexusgamer',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136C1.505 7.514 1.505 12 1.505 12s0 4.486.505 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C22.5 16.486 22.5 12 22.5 12s0-4.486-.505-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: 'text-[var(--color-neon-pink)]',
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-cyber mb-4">Contacto</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">Estamos para ayudarte. Escribinos o visitános en nuestro showroom.</p>
      </header>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoContacto.map((item, i) => (
            <Card key={item.titulo} variant="gradientBorder" padding="xl" className="animate-in slide-in-from-bottom-4 duration-500 delay-{i * 100}">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 ${item.glow}`}>
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-gradient-{item.color} mb-4">{item.titulo}</h2>
                  <ul className="space-y-2">
                    {item.datos.map((dato, j) => (
                      <li key={j} className="flex items-center gap-2 text-[var(--color-text-muted)]">
                        <span className="font-medium text-[var(--color-text)]">{dato.label}:</span>
                        <span>{dato.valor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card variant="gradientBorder" padding="xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="font-display text-2xl font-bold text-gradient-neon mb-6">Redes Sociales</h2>
              <div className="flex flex-wrap gap-4">
                {redesSociales.map((red) => (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl glass border border-[var(--color-border)] transition-all duration-300 hover:border-[var(--color-neon-green)] hover:shadow-[0_0_20px_var(--color-glow-green)] group`}
                    aria-label={red.nombre}
                  >
                    <span className={`${red.color} group-hover:text-[var(--color-neon-green)] transition-colors`}>
                      {red.icon}
                    </span>
                    <span className="font-display text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-neon-green)] transition-colors">
                      {red.nombre}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="font-display text-2xl font-bold text-gradient-hot mb-6">Envíanos un mensaje</h2>
              <ContactoForm />
            </div>
          </div>
        </Card>

        <div className="text-center pt-8">
          <Link href="/catalogo" className="btn-neon btn-lg px-10 py-4 inline-flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Volver al Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}