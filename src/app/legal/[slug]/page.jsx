import { notFound } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Boton from '@/components/ui/Boton';

export const instant = false;

const paginasLegales = {
  terminos: {
    titulo: 'Términos y Condiciones',
    descripcion: 'Condiciones generales de uso del sitio web Nexusgamer',
    contenido: `
      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">1. Aceptación de los términos</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Al acceder y utilizar el sitio web Nexusgamer (en adelante, "el Sitio"), usted acepta cumplir y quedar legalmente
        vinculado por estos Términos y Condiciones (en adelante, "los Términos"), nuestra Política de Privacidad y nuestra
        Política de Cookies. Si no está de acuerdo con alguna parte de estos Términos, no debe utilizar nuestro Sitio.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">2. Uso del Sitio</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        El Sitio está destinado a usuarios mayores de 18 años o que cuenten con la capacidad legal para contratar
        según la legislación aplicable. Usted se compromete a utilizar el Sitio únicamente con fines lícitos y de
        acuerdo con estos Términos. Queda prohibido cualquier uso que pueda dañar, inutilizar, sobrecargar o deteriorar
        el Sitio, o impedir su normal utilización por parte de otros usuarios.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">3. Propiedad Intelectual</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Todos los contenidos del Sitio (textos, imágenes, logotipos, iconos, software, diseños, estructura de navegación,
        bases de datos, etc.) son propiedad de Nexusgamer o de terceros que han autorizado su uso, y están protegidos
        por las leyes de propiedad intelectual e industrial. Queda expresamente prohibida la reproducción, distribución,
        comunicación pública, transformación o cualquier otro acto de explotación de los mismos sin autorización previa
        y por escrito.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">4. Productos y Precios</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Los productos y servicios ofrecidos en el Sitio, junto con sus características y precios, son válidos mientras
        estén accesibles en el Sitio y dentro de los límites de stock disponibles. Nexusgamer se reserva el derecho a
        modificar en cualquier momento y sin previo aviso la oferta comercial presentada en el Sitio (productos, precios,
        promociones y condiciones comerciales). Los precios mostrados incluyen IVA salvo indicación contraria.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">5. Proceso de Compra</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Para realizar una compra, el usuario deberá seguir el procedimiento de compra online establecido en el Sitio,
        seleccionando los productos deseados, facilitando los datos necesarios para el envío y facturación, y confirmando
        el pedido. La confirmación del pedido implica la aceptación plena y sin reservas de los presentes Términos.
        Nexusgamer enviará un correo electrónico de confirmación con el detalle del pedido realizado.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">6. Garantía y Devoluciones</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Todos los productos vendidos por Nexusgamer cuentan con la garantía legal correspondiente según la normativa
        vigente. Para gestionar una devolución o ejercer el derecho de desistimiento, consulte nuestra página de
        <Link href="/legal/devoluciones" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">Devoluciones</Link>.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">7. Limitación de Responsabilidad</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Nexusgamer no se hace responsable de los daños y perjuicios que pudieran derivarse de: (i) interrupciones,
        virus, averías, desconexiones en el funcionamiento operativo del Sitio; (ii) retrasos o bloqueos en el uso
        causados por deficiencias o sobrecargas de Internet; (iii) la falta de veracidad, exactitud, exhaustividad
        y/o actualidad de los contenidos; (iv) el uso ilícito, negligente, fraudulento o contrario a los presentes
        Términos por parte del usuario.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">8. Modificaciones</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Nexusgamer se reserva el derecho a modificar los presentes Términos en cualquier momento. Las modificaciones
        entrarán en vigor desde su publicación en el Sitio. Se recomienda al usuario revisar periódicamente esta página.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">9. Ley Aplicable y Jurisdicción</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Para la resolución
        de cualquier controversia que pudiera surgir, las partes se someten a la jurisdicción de los tribunales ordinarios
        de la Ciudad Autónoma de Buenos Aires, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">10. Contacto</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Para cualquier consulta sobre estos Términos, puede contactarnos a través de nuestra
        <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">página de contacto</Link>
        o enviando un correo a <span className="text-[var(--color-neon-cyan)]">legal@nexusgamer.com</span>.
      </p>
    `,
  },
  privacidad: {
    titulo: 'Política de Privacidad',
    descripcion: 'Cómo recopilamos, usamos y protegemos su información personal',
    contenido: `
      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">1. Responsable del Tratamiento</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        El responsable del tratamiento de sus datos personales es Nexusgamer (en adelante, "Nosotros", "Nuestro"),
        con domicilio en Av. Corrientes 1234, CABA, Argentina. Puede contactar con nuestro Delegado de Protección
        de Datos en <span className="text-[var(--color-neon-cyan)]">privacidad@nexusgamer.com</span>.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">2. Datos que Recopilamos</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Recopilamos las siguientes categorías de datos personales:
      </p>
      <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] mb-6">
        <li>Datos de identificación: nombre, apellidos, DNI/CUIT, fecha de nacimiento.</li>
        <li>Datos de contacto: dirección postal, email, teléfono.</li>
        <li>Datos económicos: datos de facturación, historial de compras.</li>
        <li>Datos de navegación: dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia.</li>
        <li>Datos de preferencias: lista de deseos, productos vistos, categorías de interés.</li>
      </ul>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">3. Finalidad del Tratamiento</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Tratamos sus datos para:
      </p>
      <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] mb-6">
        <li>Gestionar su registro como usuario y el acceso a su cuenta.</li>
        <li>Procesar y gestionar sus pedidos, pagos, envíos y devoluciones.</li>
        <li>Responder a sus consultas, solicitudes o reclamaciones.</li>
        <li>Enviar comunicaciones comerciales (previa consentimiento) sobre ofertas, novedades y promociones.</li>
        <li>Mejorar la experiencia de usuario y personalizar el contenido del Sitio.</li>
        <li>Cumplir obligaciones legales (facturación, prevención de fraude, etc.).</li>
      </ul>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">4. Base Legal</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        El tratamiento se basa en: (i) la ejecución del contrato de compraventa; (ii) el cumplimiento de obligaciones
        legales; (iii) su consentimiento libre, informado, específico e inequívoco para fines de marketing; (iv) nuestro
        interés legítimo en mejorar el Sitio y prevenir el fraude.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">5. Destinatarios</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Sus datos podrán ser comunicados a: proveedores de servicios de pago (MercadoPago, Stripe), empresas de logística
        y transporte, proveedores de servicios tecnológicos (hosting, email marketing), autoridades competentes cuando
        sea requerido por ley. No vendemos sus datos a terceros.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">6. Conservación</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Conservaremos sus datos mientras dure la relación contractual y, una vez finalizada, durante los plazos legales
        de prescripción (generalmente 10 años para obligaciones fiscales/contables). Los datos para marketing se
        conservarán hasta que revoque su consentimiento.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">7. Derechos del Usuario</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Usted tiene derecho a: acceder a sus datos, rectificarlos, suprimirlos (derecho al olvido), limitar u oponerse
        a su tratamiento, solicitar su portabilidad, y retirar el consentimiento en cualquier momento. Para ejercer
        estos derechos, envíe un correo a <span className="text-[var(--color-neon-cyan)]">privacidad@nexusgamer.com</span>
        adjuntando copia de su DNI. También puede reclamar ante la Autoridad de Control (AAIP en Argentina).
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">8. Seguridad</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos contra acceso no autorizado,
        alteración, divulgación o destrucción (cifrado TLS, accesos restringidos, auditorías, formación del personal).
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">9. Transferencias Internacionales</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Algunos proveedores (ej. servidores en la nube) pueden estar ubicados fuera de Argentina. En esos casos,
        garantizamos que existen garantías adecuadas (cláusulas contractuales tipo, decisiones de adecuación) conforme
        a la normativa de protección de datos.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">10. Contacto</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Para ejercer sus derechos o consultas sobre esta Política, contacte a nuestro DPO en
        <span className="text-[var(--color-neon-cyan)]">privacidad@nexusgamer.com</span> o a través de nuestra
        <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">página de contacto</Link>.
      </p>
    `,
  },
  cookies: {
    titulo: 'Política de Cookies',
    descripcion: 'Uso de cookies y tecnologías similares en nuestro sitio',
    contenido: `
      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">1. Qué son las Cookies</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet, smartphone)
        cuando visita un sitio web. Permiten que el sitio recuerde información sobre su visita (preferencias, sesión,
        carrito, etc.) para mejorar su experiencia. Otras tecnologías similares incluyen píxeles, web beacons y
        almacenamiento local (localStorage/sessionStorage).
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">2. Tipos de Cookies que Utilizamos</h3>
      <div className="space-y-4 mb-6">
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-green)] mb-2">Cookies Técnicas / Esenciales</h4>
          <p className="text-[var(--color-text-muted)]">
            Necesarias para el funcionamiento del Sitio: gestión de sesión, carrito de compras, seguridad,
            prevención de fraude, cumplimiento de obligaciones legales. <strong>No requieren consentimiento.</strong>
          </p>
        </div>
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-cyan)] mb-2">Cookies de Preferencias / Personalización</h4>
          <p className="text-[var(--color-text-muted)]">
            Permiten recordar configuraciones: idioma, moneda, tema (claro/oscuro), región. Mejoran su experiencia.
            Requieren consentimiento (excepto si son estrictamente necesarias para un servicio solicitado).
          </p>
        </div>
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-pink)] mb-2">Cookies Analíticas / de Rendimiento</h4>
          <p className="text-[var(--color-text-muted)]">
            Nos ayudan a entender cómo interactúan los usuarios con el Sitio (páginas vistas, tiempo, errores).
            Usamos Google Analytics / Matomo con anonimización de IP. Requieren consentimiento.
          </p>
        </div>
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-amber)] mb-2">Cookies de Marketing / Publicitarias</h4>
          <p className="text-[var(--color-text-muted)]">
            Permiten mostrar anuncios relevantes en nuestro Sitio y en terceros (remarketing, píxeles de conversión).
            Requieren consentimiento expreso. Puede optar por no participar en cualquier momento.
          </p>
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">3. Cookies de Terceros</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Algunos servicios externos que utilizamos instalan sus propias cookies:
      </p>
      <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] mb-6">
        <li><strong>Google Analytics:</strong> análisis de tráfico (consentimiento analítico).</li>
        <li><strong>MercadoPago / Stripe:</strong> procesamiento seguro de pagos (cookies técnicas/seguridad).</li>
        <li><strong>Redes sociales (Meta, Twitter, Discord):</strong> botones de compartir, píxeles de conversión.</li>
        <li><strong>Cloudflare / Vercel:</strong> seguridad, rendimiento, CDN (cookies técnicas).</li>
      </ul>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">4. Gestión y Consentimiento</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Al acceder al Sitio por primera vez, se muestra un banner de cookies donde puede: aceptar todas, rechazar
        las no esenciales, o configurar sus preferencias por categorías. Puede cambiar su configuración en cualquier
        momento desde el enlace "Configuración de cookies" en el pie de página o borrando las cookies desde su navegador.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">5. Cómo Desactivar/Eliminar Cookies</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de su navegador:
      </p>
      <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] mb-6">
        <li>Chrome: Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
        <li>Firefox: Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
        <li>Safari: Preferencias → Privacidad → Gestionar datos de sitios web</li>
        <li>Edge: Configuración → Cookies y permisos de sitios → Administrar y eliminar cookies</li>
      </ul>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Tenga en cuenta que desactivar cookies técnicas puede afectar al funcionamiento del Sitio (no podrá completar
        compras, mantener sesión, etc.).
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">6. Actualizaciones</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Podemos actualizar esta Política para reflejar cambios en el uso de cookies o en la normativa. La versión
        vigente estará siempre publicada en esta página con la fecha de última actualización.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">7. Contacto</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Consultas sobre esta Política: <span className="text-[var(--color-neon-cyan)]">privacidad@nexusgamer.com</span>
        o a través de nuestra <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">página de contacto</Link>.
      </p>
    `,
  },
  devoluciones: {
    titulo: 'Política de Devoluciones',
    descripcion: 'Condiciones para cambios, devoluciones y derecho de desistimiento',
    contenido: `
      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">1. Derecho de Desistimiento (Consumidores)</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Conforme a la Ley de Defensa del Consumidor (Ley 24.240) y el Código Civil y Comercial de la Nación,
        el consumidor tiene derecho a revocar la aceptación del producto dentro de los <strong>10 días corridos</strong>
        contados desde su recepción, sin necesidad de invocar causa y sin penalidad alguna. El producto debe
        devolverse en las mismas condiciones en que fue recibido: sin uso, con embalaje original, accesorios,
        manuales y etiquetas intactas.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">2. Cambios por Error o Defecto</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Si recibe un producto incorrecto, dañado o con defectos de fábrica, Nexusgamer se hará cargo de los gastos
        de envío de la devolución y del nuevo envío. Dispone de <strong>30 días corridos</strong> desde la recepción
        para notificarnos. Deberá adjuntar fotos del producto y del embalaje para agilizar la gestión.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">3. Cambios por Talla / Modelo / Preferencia</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Si el producto no cumple sus expectativas (talla, color, rendimiento), puede solicitar un cambio dentro de
        los <strong>10 días corridos</strong> desde la recepción. Los gastos de envío de la devolución y del nuevo
        envío corren por cuenta del cliente, salvo que el cambio sea por error nuestro. El producto debe estar sin
        usar, con embalaje y etiquetas originales.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">4. Productos Excluidos del Derecho de Desistimiento</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Por razones de higiene, seguridad o naturaleza del producto, no se admiten devoluciones en:
      </p>
      <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] mb-6">
        <li>Licencias de software, claves digitales, códigos de activación (una vez revelados/enviados).</li>
        <li>Componentes sellados que hayan sido abiertos (thermal paste, disipadores, ventiladores).</li>
        <li>Productos personalizados o fabricados bajo pedido.</li>
        <li>Consumibles abiertos (cintas térmicas, pads, pasta térmica).</li>
      </ul>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">5. Procedimiento de Devolución</h3>
      <ol className="list-decimal list-inside space-y-3 text-[var(--color-text-muted)] mb-6">
        <li>Inicie la solicitud desde <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">Contacto</Link> indicando nº de pedido, motivo y fotos si corresponde.</li>
        <li>Nuestro equipo validará la solicitud en 24-48hs hábiles y le enviará la etiqueta de envío (si corresponde).</li>
        <li>Embale el producto en su caja original, incluya todos los accesorios y pegue la etiqueta.</li>
        <li>Entregue el paquete en el punto de logística indicado (Correo Argentino / Andreani / Pickup).</li>
        <li>Una vez recibido e inspeccionado en nuestro almacén (3-5 días hábiles), procesaremos el reembolso o cambio.</li>
      </ol>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">6. Reembolsos</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        El reembolso se efectuará mediante el mismo medio de pago utilizado en la compra, dentro de los <strong>10 días hábiles</strong>
        posteriores a la recepción e inspección del producto en nuestro almacén. Los gastos de envío originales
        solo se reembolsan si la devolución es por error nuestro o producto defectuoso.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">7. Garantía Legal</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Todos los productos cuentan con la garantía legal mínima de <strong>6 meses</strong> (Ley 24.240 Art. 11)
        para defectos de fabricación. Algunos fabricantes ofrecen garantías extendidas (1-3 años) que se gestionan
        directamente con el servicio técnico oficial del fabricante. Nexusgamer actúa como intermediario para
        facilitar el trámite.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">8. Contacto</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Para iniciar una devolución o consulta: <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">Formulario de Contacto</Link>
        o <span className="text-[var(--color-neon-cyan)]">devoluciones@nexusgamer.com</span> / WhatsApp <span className="text-[var(--color-neon-cyan)]">+54 11 4000-0001</span>.
      </p>
    `,
  },
  envios: {
    titulo: 'Envíos y Entregas',
    descripcion: 'Información sobre métodos, plazos y costos de envío',
    contenido: `
      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">1. Métodos de Envío Disponibles</h3>
      <div className="space-y-4 mb-6">
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-green)] mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1" /></svg>
            Envío Estándar (Correo Argentino)
          </h4>
          <p className="text-[var(--color-text-muted)]">Entrega en 3-7 días hábiles según localidad. Seguimiento incluido.</p>
          <p className="text-[var(--color-neon-cyan)] font-medium mt-1">Gratis en compras > $150.000 | Desde $3.500</p>
        </div>
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-cyan)] mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1" /></svg>
            Envío Express (Andreani / OCA)
          </h4>
          <p className="text-[var(--color-text-muted)]">Entrega en 24-48hs hábiles (CABA/GBA) / 2-4 días interior. Seguimiento prioritario.</p>
          <p className="text-[var(--color-neon-cyan)] font-medium mt-1">Gratis en compras > $250.000 | Desde $6.500</p>
        </div>
        <div className="glass rounded-xl p-5 border border-[var(--color-border)]">
          <h4 className="font-display text-lg font-bold text-[var(--color-neon-pink)] mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Retiro en Showroom (CABA)
          </h4>
          <p className="text-[var(--color-text-muted)]">Disponible en 2-4hs hábiles tras confirmación de pago. Av. Corrientes 1234, Lun-Vie 9-18, Sáb 10-14.</p>
          <p className="text-[var(--color-neon-cyan)] font-medium mt-1"><strong>Gratis</strong> en todos los pedidos</p>
        </div>
      </div>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">2. Cobertura Geográfica</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Realizamos envíos a <strong>todo el territorio argentino</strong> (Continental, Tierra del Fuego, Islas Malvinas).
        Para envíos a países limítrofes (Chile, Uruguay, Paraguay, Bolivia, Brasil), consulte disponibilidad y costos
        a través de <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">Contacto</Link>.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">3. Plazos de Preparación</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Los pedidos confirmados antes de las <strong>14:00hs (días hábiles)</strong> se despachan el mismo día.
        Pedidos posteriores o en fines de semana/feriados se procesan el siguiente día hábil. Recibirá un email con
        el número de seguimiento al despachar.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">4. Costos de Envío</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        El costo final se calcula automáticamente en el checkout según: método elegido, peso/volumen del paquete,
        y código postal de destino. <strong>Envío gratis en compras superiores a $150.000 (Estándar) o $250.000 (Express).</strong>
        El retiro en showroom siempre es gratis.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">5. Seguimiento del Pedido</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Una vez despachado, recibirá un email con el número de tracking y enlace directo al sitio del transportista.
        También puede consultar el estado desde su cuenta en <Link href="/dashboard" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">Mi Cuenta → Mis Pedidos</Link>.
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">6. Entrega y Recepción</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        <strong>Es responsabilidad del cliente asegurar que haya alguien en la dirección de entrega</strong> en el rango
        horario estimado. El transportista realiza hasta <strong>2 intentos de entrega</strong> en días hábiles consecutivos.
        Si no hay nadie, el paquete queda en la sucursal más cercana por 5 días hábiles para retiro. Transcurrido ese
        plazo, regresa a nuestro almacén (generando costo de reenvío).
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">7. Paquetes Dañados o Perdidos</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Al recibir, <strong>verifique el estado del paquete antes de firmar</strong>. Si detecta daños visibles, rechace
        la entrega y anote "paquete dañado" en el comprobante. Notifíquenos en 24hs con fotos para gestionar el
        reclamo con el transportista y enviar reposición sin cargo. En caso de pérdida total, le reembolsamos o reenviamos
        según prefiera, tras confirmación del transportista (5-10 días hábiles).
      </p>

      <h3 className="font-display text-xl font-bold text-gradient-neon mb-4">8. Contacto</h3>
      <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
        Consultas sobre envíos: <Link href="/contacto" className="text-[var(--color-neon-cyan)] hover:text-[var(--color-neon-green)] underline">Formulario de Contacto</Link>
        o <span className="text-[var(--color-neon-cyan)]">envios@nexusgamer.com</span> / WhatsApp <span className="text-[var(--color-neon-cyan)]">+54 11 4000-0001</span>.
      </p>
    `,
  },
};

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const pagina = paginasLegales[slug];

  if (!pagina) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-gradient-neon mb-4">{pagina.titulo}</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">{pagina.descripcion}</p>
      </header>

      <Card variant="gradientBorder" padding="xl">
        <div
          className="prose prose-invert max-w-none text-[var(--color-text-muted)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: pagina.contenido }}
        />
      </Card>

      <div className="text-center pt-8">
        <Link href="/contacto" className="btn-neon-outline neonOutlineCyan btn-lg px-8 py-4 inline-flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          ¿Necesitas ayuda? Contáctanos
        </Link>
      </div>
    </div>
  );
}