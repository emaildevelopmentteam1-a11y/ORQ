import {
    Building2,
    BarChart3,
    Settings2,
    ShieldCheck,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CapabilitiesSection — Capacidades empresariales clave
   
   AC-004: Capacidades empresariales
   - Cards orientadas a empresa (no usuario individual)
   - Iconografía Lucide consistente
   - Grid responsive con hover states
   - 4 capacidades enterprise: multi-organización, KPI,
     automatización de procesos, gobierno de datos
   ═══════════════════════════════════════════════════════════════ */

const capabilities = [
    {
        icon: Building2,
        title: "Multi-organización",
        description:
            "Gestiona múltiples áreas, departamentos y equipos con una estructura jerárquica clara y escalable.",
    },
    {
        icon: BarChart3,
        title: "Indicadores KPI",
        description:
            "Monitorea métricas clave del negocio con semáforo visual, alertas y dashboard de rendimiento en tiempo real.",
    },
    {
        icon: Settings2,
        title: "Automatización operativa",
        description:
            "Flujos de trabajo automatizados para encuestas, reportes y distribución de información entre equipos.",
    },
    {
        icon: ShieldCheck,
        title: "Gobierno de datos",
        description:
            "Roles granulares, permisos por módulo y auditoría de accesos para cumplir con los estándares de tu sector.",
    },
];

export function CapabilitiesSection() {
    return (
        <section id="capacidades" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* ── Encabezado ── */}
                <div className="text-center mb-14">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">
                        Capacidades
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                        Capacidades diseñadas para la empresa
                    </h2>
                    <p className="text-sm text-text-secondary max-w-2xl mx-auto">
                        Cada funcionalidad está pensada para resolver necesidades
                        reales de gestión corporativa a escala.
                    </p>
                </div>

                {/* ── Grid de capacidades ── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {capabilities.map((cap) => (
                        <div
                            key={cap.title}
                            className="group bg-surface rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
                        >
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                                <cap.icon className="size-5 text-primary" />
                            </div>
                            <h3 className="text-sm font-semibold text-foreground mb-2">
                                {cap.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {cap.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
