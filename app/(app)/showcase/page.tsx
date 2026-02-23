"use client";

import {
    Button,
    Badge,
    Card,
    Input,
    KpiCard,
    ExtensionCard,
    Table,
    TableRow,
    TreeItem,
} from "@/components/ui";
import { Search, Users, BarChart3, Building2 } from "lucide-react";

export default function ShowcasePage() {
    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                    Design System Showcase
                </h1>
                <p className="text-text-secondary">
                    Todos los componentes base de Prisma.
                </p>
            </div>

            {/* ── Buttons ────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Button</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="dark">Dark</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="primary" disabled>
                        Disabled
                    </Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
            </section>

            {/* ── Badges ────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Badge</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="info">Info</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                </div>
            </section>

            {/* ── Card ──────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Card</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <p className="text-sm text-text-secondary">Card por defecto</p>
                    </Card>
                    <Card hover>
                        <p className="text-sm text-text-secondary">Card con hover</p>
                    </Card>
                    <Card className="border-primary">
                        <p className="text-sm text-text-secondary">Card con borde activo</p>
                    </Card>
                </div>
            </section>

            {/* ── Input ─────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Input</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <Input label="Nombre" placeholder="Escribe tu nombre" />
                    <Input
                        label="Buscar"
                        placeholder="Buscar..."
                        icon={<Search size={16} />}
                    />
                    <Input
                        label="Con error"
                        placeholder="Email"
                        error="El email no es válido"
                    />
                </div>
            </section>

            {/* ── KPI Card ──────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">KPI Card</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <KpiCard
                        title="Usuarios activos"
                        value="1,284"
                        subtitle="Últimos 30 días"
                        detail={<span className="text-accent-green font-medium">+12.5%</span>}
                        icon={<Users size={20} />}
                    />
                    <KpiCard
                        title="KPIs definidos"
                        value="48"
                        subtitle="En seguimiento"
                        detail={<span className="text-accent-green font-medium">+3 nuevos</span>}
                        icon={<BarChart3 size={20} />}
                    />
                    <KpiCard
                        title="Áreas"
                        value="12"
                        subtitle="Áreas activas"
                        detail={<span className="text-muted-foreground">Sin cambios</span>}
                        icon={<Building2 size={20} />}
                    />
                </div>
            </section>

            {/* ── Extension Card ────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">
                    Extension Card
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ExtensionCard
                        name="KPI Tracker"
                        description="Indicadores clave de rendimiento en tiempo real"
                        iconName="bar-chart-3"
                        status="available"
                        category="Analytics"
                    />
                    <ExtensionCard
                        name="Formularios"
                        description="Crea y gestiona formularios personalizados"
                        iconName="file-text"
                        status="active"
                        category="Productividad"
                    />
                    <ExtensionCard
                        name="Reportes"
                        description="Genera reportes ejecutivos automáticos"
                        iconName="file-bar-chart"
                        status="coming-soon"
                        category="Analytics"
                    />
                </div>
            </section>

            {/* ── Table ─────────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Table Row</h2>
                <Table headers={["Nombre", "Email", "Rol", "Estado"]}>
                    <TableRow
                        cells={[
                            "Carlos Mendoza",
                            "carlos@empresa.com",
                            <Badge key="r1" variant="info">Directivo</Badge>,
                            <Badge key="s1" variant="success">Activo</Badge>,
                        ]}
                    />
                    <TableRow
                        cells={[
                            "Ana Rodríguez",
                            "ana@empresa.com",
                            <Badge key="r2" variant="warning">Responsable</Badge>,
                            <Badge key="s2" variant="success">Activo</Badge>,
                        ]}
                    />
                    <TableRow
                        cells={[
                            "Luis García",
                            "luis@empresa.com",
                            <Badge key="r3" variant="neutral">Colaborador</Badge>,
                            <Badge key="s3" variant="neutral">Inactivo</Badge>,
                        ]}
                    />
                </Table>
            </section>

            {/* ── Tree Item ─────────────────────── */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-text-primary">Tree Item</h2>
                <Card>
                    <TreeItem label="Dirección General" defaultOpen>
                        <TreeItem label="Operaciones" level={1} defaultOpen>
                            <TreeItem label="Logística" level={2} trailing={<Badge variant="info">3 KPIs</Badge>} />
                            <TreeItem label="Producción" level={2} trailing={<Badge variant="info">5 KPIs</Badge>} />
                        </TreeItem>
                        <TreeItem label="Comercial" level={1}>
                            <TreeItem label="Ventas" level={2} />
                            <TreeItem label="Marketing" level={2} />
                        </TreeItem>
                        <TreeItem label="Recursos Humanos" level={1} />
                    </TreeItem>
                </Card>
            </section>
        </div>
    );
}
