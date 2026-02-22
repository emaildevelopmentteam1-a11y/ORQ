import { BarChart3, ClipboardList, PieChart } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ExtensionsShowcase — Extensiones destacadas como marketplace
   
   AC-005: Extensiones destacadas como marketplace
   - 3 extensiones: KPI, Encuestas, BI
   - Cada card con badge "🧩 Extensión"
   - Se entiende que se activan bajo demanda
   - La sección transmite mentalidad de ecosystem
   
   Diseño inspirado en AppExchange / marketplace de extensiones.
   Cada card enfatiza que son módulos activables, no features fijas.
   ═══════════════════════════════════════════════════════════════ */

const extensions = [
    {
        icon: BarChart3,
        name: "Indicadores KPI",
        description:
            "Define, monitorea y comparte indicadores clave de rendimiento con semáforo visual y tendencias históricas.",
        category: "Analytics",
        status: "Disponible",
    },
    {
        icon: ClipboardList,
        name: "Encuestas",
        description:
            "Crea encuestas de satisfacción, clima laboral o evaluación y visualiza los resultados con gráficas interactivas.",
        category: "Productividad",
        status: "Disponible",
    },
    {
        icon: PieChart,
        name: "Tableros BI",
        description:
            "Dashboard ejecutivo con gráficas avanzadas, reportes descargables y filtros por período y departamento.",
        category: "Analytics",
        status: "Disponible",
    },
];

export function ExtensionsShowcase() {
    return (
        <section className="py-20 bg-bg">
            <div className="max-w-7xl mx-auto px-6">
                {/* ── Encabezado ── */}
                <div className="text-center mb-14">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">
                        Marketplace de extensiones
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                        Activa solo lo que necesitas
                    </h2>
                    <p className="text-sm text-text-secondary max-w-2xl mx-auto">
                        Cada extensión es un módulo independiente que puedes habilitar
                        con un clic desde el marketplace integrado.
                    </p>
                </div>

                {/* ── Grid de extensiones ── */}
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {extensions.map((ext) => (
                        <div
                            key={ext.name}
                            className="group bg-surface rounded-xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col"
                        >
                            {/* Header: icono + badge */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                                    <ext.icon className="size-5 text-primary" />
                                </div>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-light text-primary text-[10px] font-semibold rounded-full ring-1 ring-primary/20">
                                    🧩 Extensión
                                </span>
                            </div>

                            {/* Info */}
                            <h3 className="text-base font-semibold text-foreground mb-1">
                                {ext.name}
                            </h3>
                            <span className="text-xs text-muted-foreground mb-3">
                                {ext.category}
                            </span>
                            <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                                {ext.description}
                            </p>

                            {/* Status */}
                            <div className="flex items-center justify-between pt-4 border-t border-border/60">
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-green">
                                    <span className="size-1.5 rounded-full bg-accent-green" />
                                    {ext.status}
                                </span>
                                <span className="text-xs text-muted-foreground font-medium">
                                    Activar en demo →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
