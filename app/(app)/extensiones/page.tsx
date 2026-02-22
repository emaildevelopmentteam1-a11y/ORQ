"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { ExtensionCard } from "@/components/ui/ExtensionCard";
import { useAppContext } from "@/lib/context/AppContext";
import type { ExtensionStatus } from "@/components/ui/ExtensionCard";

/* ── Catálogo completo de extensiones ── */
interface ExtensionDef {
    id: string;
    name: string;
    description: string;
    iconName: string;
    category: string;
    available: boolean; // false = coming-soon
}

const catalog: ExtensionDef[] = [
    {
        id: "ext-kpi",
        name: "KPI Tracker",
        description: "Indicadores clave de rendimiento en tiempo real para medir objetivos y resultados de cada área.",
        iconName: "bar-chart-3",
        category: "Analítica",
        available: true,
    },
    {
        id: "ext-forms",
        name: "Formularios",
        description: "Crea y gestiona formularios personalizados para recopilar información de colaboradores.",
        iconName: "file-text",
        category: "Productividad",
        available: true,
    },
    {
        id: "ext-reports",
        name: "Reportes",
        description: "Genera reportes ejecutivos automáticos con datos consolidados de toda la organización.",
        iconName: "file-bar-chart",
        category: "Analítica",
        available: true,
    },
    {
        id: "ext-timetrack",
        name: "Control de Tiempo",
        description: "Registro y seguimiento de horas trabajadas por colaborador y proyecto.",
        iconName: "clock",
        category: "Productividad",
        available: true,
    },
    {
        id: "ext-docs",
        name: "Documentos",
        description: "Gestión centralizada de documentos con control de versiones y permisos.",
        iconName: "folder-open",
        category: "Gestión",
        available: true,
    },
    {
        id: "ext-feedback",
        name: "Feedback 360°",
        description: "Sistema de evaluación y retroalimentación continua entre equipos y colaboradores.",
        iconName: "message-circle",
        category: "Talento",
        available: false,
    },
    {
        id: "ext-automation",
        name: "Automatización",
        description: "Flujos de trabajo automatizados para procesos repetitivos y aprobaciones.",
        iconName: "zap",
        category: "Productividad",
        available: false,
    },
    {
        id: "ext-calendar",
        name: "Calendario",
        description: "Calendario compartido con eventos, reuniones y fechas importantes de la empresa.",
        iconName: "calendar",
        category: "Gestión",
        available: false,
    },
];

/* ── Página ── */
export default function ExtensionesPage() {
    const { activeExtensions, toggleExtension } = useAppContext();

    const getStatus = (ext: ExtensionDef): ExtensionStatus => {
        if (!ext.available) return "coming-soon";
        const isActive = activeExtensions.find((e) => e.id === ext.id)?.active;
        return isActive ? "active" : "available";
    };

    const activeCount = activeExtensions.filter((e) => e.active).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                    Extensiones
                </h1>
                <p className="text-sm text-text-secondary">
                    {catalog.length} extensiones disponibles · {activeCount} activas
                </p>
            </div>

            {/* Búsqueda */}
            <Input
                icon={<Search className="size-4" />}
                placeholder="Buscar extensión..."
            />

            {/* Grid de extensiones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {catalog.map((ext) => (
                    <ExtensionCard
                        key={ext.id}
                        name={ext.name}
                        description={ext.description}
                        iconName={ext.iconName}
                        status={getStatus(ext)}
                        category={ext.category}
                        onToggle={() => toggleExtension(ext.id)}
                    />
                ))}
            </div>
        </div>
    );
}
