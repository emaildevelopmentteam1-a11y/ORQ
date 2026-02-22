import { Shield, Server, Users2, Clock } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   EnterpriseFeatures — Beneficios enterprise y cloud
   
   AC-006: Beneficios enterprise y cloud
   - Seguridad, escalabilidad, multi-tenant, alta disponibilidad
   - Lenguaje orientado a directores de TI
   - Diseño visual diferenciado (sección premium con fondo oscuro)
   - Claims con contexto real (no vacíos)
   ═══════════════════════════════════════════════════════════════ */

const features = [
    {
        icon: Shield,
        title: "Seguridad corporativa",
        description:
            "Roles granulares, permisos por módulo y control de acceso basado en grupos organizacionales.",
    },
    {
        icon: Server,
        title: "Arquitectura escalable",
        description:
            "Infraestructura preparada para crecer con tu organización: de 10 a 10,000 usuarios sin cambios.",
    },
    {
        icon: Users2,
        title: "Multi-tenant nativo",
        description:
            "Cada organización opera en su propio espacio aislado con datos, roles y extensiones independientes.",
    },
    {
        icon: Clock,
        title: "Alta disponibilidad",
        description:
            "Plataforma cloud-native con monitoreo 24/7, backups automáticos y SLA enterprise.",
    },
];

export function EnterpriseFeatures() {
    return (
        <section className="py-20 bg-cta-dark text-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* ── Encabezado ── */}
                <div className="text-center mb-14">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">
                        Enterprise-grade
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                        Diseñada para los estándares de tu industria
                    </h2>
                    <p className="text-sm text-white/60 max-w-2xl mx-auto">
                        Orquestra cumple con los requisitos técnicos y de seguridad que tu
                        equipo de TI necesita para aprobar la adopción.
                    </p>
                </div>

                {/* ── Grid de features ── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {features.map((feat) => (
                        <div
                            key={feat.title}
                            className="bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors duration-200"
                        >
                            <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                                <feat.icon className="size-5 text-primary" />
                            </div>
                            <h3 className="text-sm font-semibold mb-2">{feat.title}</h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                {feat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
