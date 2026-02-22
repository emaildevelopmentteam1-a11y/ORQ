import { Puzzle, Layers, Zap } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ValueProposition — Propuesta de valor empresarial
   
   AC-002: Sección de propuesta de valor
   - Explica el modelo de extensiones bajo demanda
   - Lenguaje corporativo, no técnico excesivo
   - Jerarquía visual que guía la lectura ejecutiva
   - Layout 2 columnas: texto principal + 3 value pillars
   ═══════════════════════════════════════════════════════════════ */

const valuePillars = [
    {
        icon: Puzzle,
        title: "Extensiones bajo demanda",
        description:
            "Activa solo los módulos que tu organización necesita. Sin software innecesario, sin costos ocultos.",
    },
    {
        icon: Layers,
        title: "Plataforma unificada",
        description:
            "Toda tu operación en un solo lugar: estructura organizacional, métricas, encuestas y reportes.",
    },
    {
        icon: Zap,
        title: "Time-to-value acelerado",
        description:
            "Implementación inmediata. Habilita nuevas capacidades en segundos, sin proyectos complejos.",
    },
];

export function ValueProposition() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* ── Encabezado ── */}
                <div className="max-w-2xl mb-14">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">
                        Propuesta de valor
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                        Construye la solución que tu empresa necesita, módulo a módulo
                    </h2>
                    <p className="text-base text-text-secondary leading-relaxed">
                        Orquestra es una plataforma enterprise diseñada para activar
                        capacidades operativas a través de{" "}
                        <strong className="text-foreground font-semibold">
                            extensiones especializadas
                        </strong>
                        . Cada organización elige qué necesita, sin complejidad innecesaria.
                    </p>
                </div>

                {/* ── Pilares de valor ── */}
                <div className="grid md:grid-cols-3 gap-6">
                    {valuePillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="group relative bg-bg rounded-xl border border-border/60 p-6 hover:shadow-card-hover transition-all duration-200"
                        >
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                                <pillar.icon className="size-5 text-primary" />
                            </div>
                            <h3 className="text-base font-semibold text-foreground mb-2">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
