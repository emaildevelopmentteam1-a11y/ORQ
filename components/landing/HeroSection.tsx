import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   HeroSection — Posicionamiento ejecutivo above-the-fold
   
   AC-001: Hero con posicionamiento ejecutivo
   - Badge "Plataforma Enterprise Modular" para anclar posicionamiento
   - H1 orientado a transformación operativa medible
   - Subtítulo que menciona explícitamente las extensiones
   - Mockup limpio tipo dashboard enterprise
   - CTA primario "Ver demo" → /dashboard
   - CTA secundario "Solicitar información" → /contacto
   
   El valor modular se entiende en ≤5 segundos gracias al badge
   y subtítulo que mencionan "extensiones bajo demanda".
   ═══════════════════════════════════════════════════════════════ */

/* ── Wireframe decorativo del hero — simula un dashboard real ── */
function HeroMockup() {
    return (
        <div className="relative w-full max-w-[540px] aspect-[4/3]">
            {/* Glow decorativo detrás del mockup */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl" />

            <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-border/60 p-5 overflow-hidden">
                {/* Barra superior del mockup */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-md" />
                        <div className="w-20 h-3 bg-gray-200 rounded-full" />
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-5 h-5 bg-gray-100 rounded-full" />
                        <div className="w-5 h-5 bg-gray-100 rounded-full" />
                    </div>
                </div>

                {/* KPI cards placeholder */}
                <div className="flex gap-3 mb-4">
                    {[
                        { color: "bg-primary/10", accent: "bg-primary" },
                        { color: "bg-accent-green/10", accent: "bg-accent-green" },
                        { color: "bg-accent-amber/10", accent: "bg-accent-amber" },
                    ].map((kpi, i) => (
                        <div key={i} className={`flex-1 ${kpi.color} rounded-xl p-3`}>
                            <div className={`w-4 h-4 ${kpi.accent} rounded-sm mb-2 opacity-60`} />
                            <div className="w-3/4 h-2 bg-current/10 rounded-full mb-1.5" />
                            <div className="w-1/2 h-3 bg-current/20 rounded-full" />
                        </div>
                    ))}
                </div>

                {/* Gráfica placeholder */}
                <div className="w-24 h-3 bg-gray-300 rounded-full mb-3" />
                <div className="flex items-end gap-2 h-20 px-2">
                    {[40, 65, 45, 80, 60, 90, 75, 55, 85, 70].map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-primary/15 rounded-t-sm transition-all"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function HeroSection() {
    return (
        <section id="producto" className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                {/* ── Texto hero ── */}
                <div className="flex-1 max-w-xl">
                    {/* Badge de posicionamiento — ancla la categoría del producto */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-light text-primary text-xs font-semibold rounded-full ring-1 ring-primary/20 mb-6">
                        <span className="size-1.5 rounded-full bg-primary" />
                        Plataforma Enterprise Modular
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] text-balance mb-5">
                        Convierte la operación de tu empresa en un sistema{" "}
                        <span className="text-primary">medible</span>
                    </h1>

                    <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8">
                        Prisma centraliza tu organización y activa capacidades de gestión
                        bajo demanda mediante{" "}
                        <strong className="text-foreground font-semibold">extensiones modulares</strong>.
                        Usa solo lo que necesitas, cuando lo necesitas.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 min-h-[44px]"
                        >
                            Ver demo
                            <ArrowRight className="size-4" />
                        </Link>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center px-6 py-3 text-sm bg-white text-foreground font-semibold rounded-lg border border-border hover:bg-muted transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                        >
                            Solicitar información
                        </Link>
                    </div>
                </div>

                {/* ── Mockup decorativo ── */}
                <div className="flex-1 flex justify-center lg:justify-end">
                    <HeroMockup />
                </div>
            </div>
        </section>
    );
}
