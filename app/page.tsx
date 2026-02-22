import Link from "next/link";

/* ── Iconos SVG inline para las feature cards ── */
function IconEstructura() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="32" height="36" rx="4" stroke="#2563EB" strokeWidth="2.5" fill="none" />
      <rect x="14" y="14" width="8" height="6" rx="1.5" stroke="#2563EB" strokeWidth="2" fill="none" />
      <rect x="26" y="14" width="8" height="6" rx="1.5" stroke="#2563EB" strokeWidth="2" fill="none" />
      <line x1="14" y1="28" x2="34" y2="28" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="34" x2="28" y2="34" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconKPI() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="28" width="6" height="12" rx="1.5" stroke="#2563EB" strokeWidth="2.5" fill="none" />
      <rect x="21" y="20" width="6" height="20" rx="1.5" stroke="#2563EB" strokeWidth="2.5" fill="none" />
      <rect x="32" y="10" width="6" height="30" rx="1.5" stroke="#2563EB" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

function IconActivacion() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 6L16 26H24L20 42L36 20H27L28 6Z" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ── Wireframe decorativo del hero ── */
function HeroMockup() {
  return (
    <div className="relative w-full max-w-[520px] aspect-[4/3] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border/60 p-5 overflow-hidden">
      {/* Barra superior */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-3 bg-gray-200 rounded-full" />
        <div className="flex gap-1.5">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="w-5 h-5 bg-gray-300 rounded-full" />
        </div>
      </div>
      {/* KPI cards placeholder */}
      <div className="flex gap-3 mb-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 bg-primary-light rounded-xl p-3 flex items-start gap-2">
            <div className="w-4 h-4 bg-primary rounded-sm mt-0.5" />
            <div className="flex-1 space-y-1.5">
              <div className="w-full h-2 bg-primary/20 rounded-full" />
              <div className="w-3/4 h-2 bg-primary/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      {/* Sección de contenido */}
      <div className="w-24 h-3 bg-gray-300 rounded-full mb-3" />
      <div className="space-y-2.5">
        {[100, 95, 85, 90, 80].map((w, i) => (
          <div key={i} className="h-3 bg-gray-100 rounded-full" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-border/60 p-6 hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Landing Page — Orquestra
   ═══════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FF]">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
        <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">
              O
            </div>
            <span className="text-lg font-bold text-text-primary">
              Orquestra
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden sm:flex items-center gap-6">
            <a href="#producto" className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
              Producto
            </a>
            <a href="#capacidades" className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
              Capacidades
            </a>
            <Link href="/contacto" className="text-sm text-text-secondary hover:text-text-primary transition-colors font-medium">
              Contacto
            </Link>
          </div>
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <section id="producto" className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Texto hero */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-[2.25rem] font-bold text-text-primary leading-tight mb-5">
              Convierte la operación de tu empresa en un sistema medible.
            </h1>
            <p className="text-[15px] text-text-secondary leading-relaxed mb-6">
              Orquestra centraliza tu organización y activa capacidades de
              gestión bajo demanda.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
              >
                Ver demo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-5 py-2 text-sm bg-white text-text-primary font-semibold rounded-lg border border-border hover:bg-gray-50 transition-colors"
              >
                Solicitar información
              </Link>
            </div>
          </div>

          {/* Mockup decorativo */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── Sección Capacidades ── */}
      <section id="capacidades" className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-[1.75rem] font-bold text-text-primary mb-3">
              Capacidades que se adaptan a tu operación
            </h2>
            <p className="text-sm text-text-secondary max-w-2xl mx-auto">
              Activa solo lo que necesitas, cuando lo necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <FeatureCard
              icon={<IconEstructura />}
              title="Estructura empresarial"
              description="Visualiza y gestiona tu organización de forma clara y escalable."
            />
            <FeatureCard
              icon={<IconKPI />}
              title="Indicadores KPI"
              description="Mide el desempeño de tu empresa con indicadores personalizados."
            />
            <FeatureCard
              icon={<IconActivacion />}
              title="Activación inmediata"
              description="Habilita nuevas capacidades en segundos, sin complicaciones."
            />
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-14 md:py-20 bg-[#F0F2FA]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-text-primary mb-3">
            ¿Listo para transformar tu operación?
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Descubre cómo Orquestra puede ayudarte a gestionar mejor tu empresa.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
          >
            Solicitar información
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 bg-white border-t border-border/40">
        <p className="text-center text-sm text-muted-foreground">
          © 2026 Orquestra. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}
