import {
    Building2,
    Activity,
    CheckCircle2,
    Users,
    TrendingUp,
    BarChart3,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* ── Page Header ── */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Dashboard
                </h1>
                <p className="text-sm text-text-secondary">
                    Bienvenido a Prisma
                </p>
            </div>

            {/* ── KPI Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* KPI: Resumen organización */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-3 shadow-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Resumen organización
                        </span>
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="size-4 text-primary" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-foreground">12</p>
                        <p className="text-sm text-text-secondary mt-0.5">
                            Áreas activas
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <Users className="size-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                            148 colaboradores
                        </span>
                    </div>
                </div>

                {/* KPI: Actividad reciente */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-3 shadow-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Actividad reciente
                        </span>
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Activity className="size-4 text-primary" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-foreground">24</p>
                        <p className="text-sm text-text-secondary mt-0.5">
                            Acciones hoy
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <TrendingUp className="size-3.5 text-accent-green" />
                        <span className="text-accent-green font-medium">
                            +18% vs. ayer
                        </span>
                    </div>
                </div>

                {/* KPI: Estado del sistema */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-3 shadow-card">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Estado del sistema
                        </span>
                        <div className="size-8 rounded-lg bg-accent-green/10 flex items-center justify-center">
                            <CheckCircle2 className="size-4 text-accent-green" />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-accent-green">
                            100%
                        </p>
                        <p className="text-sm text-text-secondary mt-0.5">
                            Operativo
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="size-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                            Sin incidencias
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Indicadores Section (Empty State) ── */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                    Indicadores
                </h2>
                <p className="text-sm text-text-secondary">
                    Activa la extensión KPI para comenzar a medir el desempeño
                    de tu empresa
                </p>

                <div className="bg-surface rounded-xl border border-dashed border-border p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                            <BarChart3 className="size-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-1">
                            No hay indicadores configurados
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Ve a Extensiones para activar KPI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
