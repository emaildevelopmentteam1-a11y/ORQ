import { Building2, Puzzle, BarChart3, ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PlatformFlow — Modelo de plataforma modular (visual flow)
   
   AC-003: Modelo de plataforma modular
   - Flujo visual: Organización → Activar Extensiones → Solución Operativa
   - Se entiende sin texto largo (iconos + números + flechas)
   - Refuerza el concepto de escalabilidad
   ═══════════════════════════════════════════════════════════════ */

const steps = [
    {
        number: "01",
        icon: Building2,
        title: "Crea tu organización",
        description:
            "Define la estructura jerárquica de tu empresa: áreas, departamentos, equipos y responsables.",
    },
    {
        number: "02",
        icon: Puzzle,
        title: "Activa extensiones",
        description:
            "Habilita solo los módulos que necesitas desde el marketplace: KPIs, encuestas, BI y más.",
    },
    {
        number: "03",
        icon: BarChart3,
        title: "Opera y mide",
        description:
            "Gestiona tu equipo, monitorea indicadores y toma decisiones basadas en datos reales.",
    },
];

export function PlatformFlow() {
    return (
        <section id="plataforma" className="py-20 bg-bg">
            <div className="max-w-7xl mx-auto px-6">
                {/* ── Encabezado ── */}
                <div className="text-center mb-14">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">
                        Cómo funciona
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                        De la estructura organizacional a la solución operativa
                    </h2>
                    <p className="text-sm text-text-secondary max-w-2xl mx-auto">
                        Tres pasos para transformar la operación de tu empresa con una
                        plataforma que escala contigo.
                    </p>
                </div>

                {/* ── Steps flow ── */}
                <div className="grid md:grid-cols-3 gap-6 relative">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative flex flex-col items-center text-center">
                            {/* Flecha conectora entre pasos (solo desktop, no en última) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex absolute right-0 top-12 translate-x-1/2 z-10 text-border">
                                    <ArrowRight className="size-5" />
                                </div>
                            )}

                            {/* Número + Icono */}
                            <div className="relative mb-5">
                                <div className="size-16 rounded-2xl bg-white border border-border shadow-card flex items-center justify-center">
                                    <step.icon className="size-7 text-primary" />
                                </div>
                                <span className="absolute -top-2 -right-2 size-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                                    {step.number}
                                </span>
                            </div>

                            {/* Texto */}
                            <h3 className="text-base font-semibold text-foreground mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
