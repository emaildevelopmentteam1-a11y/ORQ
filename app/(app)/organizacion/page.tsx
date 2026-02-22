"use client";

import { useState } from "react";
import {
    Building2,
    Users,
    ChevronRight,
    Plus,
    Search,
    MapPin,
    Phone,
    Mail,
    Globe,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

/* ── Datos mock del organigrama ── */
interface Area {
    id: string;
    name: string;
    manager: string;
    members: number;
    status: "active" | "inactive";
    children?: Area[];
}

const orgData: Area[] = [
    {
        id: "dir",
        name: "Dirección General",
        manager: "Carlos Mendoza",
        members: 5,
        status: "active",
        children: [
            {
                id: "ops",
                name: "Operaciones",
                manager: "Ana García",
                members: 32,
                status: "active",
                children: [
                    { id: "prod", name: "Producción", manager: "Luis Torres", members: 18, status: "active" },
                    { id: "logistica", name: "Logística", manager: "María López", members: 14, status: "active" },
                ],
            },
            {
                id: "comercial",
                name: "Comercial",
                manager: "Roberto Díaz",
                members: 24,
                status: "active",
                children: [
                    { id: "ventas", name: "Ventas", manager: "Patricia Ruiz", members: 16, status: "active" },
                    { id: "marketing", name: "Marketing", manager: "Jorge Herrera", members: 8, status: "active" },
                ],
            },
            {
                id: "admin",
                name: "Administración",
                manager: "Laura Morales",
                members: 15,
                status: "active",
                children: [
                    { id: "rrhh", name: "Recursos Humanos", manager: "Sandra Vega", members: 6, status: "active" },
                    { id: "finanzas", name: "Finanzas", manager: "Miguel Sánchez", members: 9, status: "active" },
                ],
            },
            { id: "ti", name: "Tecnología", manager: "Diego Ramírez", members: 12, status: "active" },
        ],
    },
];

/* ── Componente TreeNode ── */
function OrgTreeNode({ area, level = 0 }: { area: Area; level?: number }) {
    const [open, setOpen] = useState(level < 2);
    const hasChildren = !!area.children?.length;

    return (
        <div>
            <button
                onClick={() => hasChildren && setOpen(!open)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors"
                style={{ paddingLeft: `${16 + level * 28}px` }}
            >
                <span className="size-4 flex items-center justify-center text-muted-foreground shrink-0">
                    {hasChildren ? (
                        <ChevronRight
                            className={`size-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                        />
                    ) : (
                        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                    )}
                </span>

                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 className="size-4 text-primary" />
                </div>

                <div className="flex-1 text-left min-w-0">
                    <span className="font-medium text-foreground">{area.name}</span>
                </div>

                <span className="text-xs text-muted-foreground shrink-0">
                    {area.manager}
                </span>

                <Badge variant={area.status === "active" ? "success" : "neutral"} dot>
                    {area.members} miembros
                </Badge>
            </button>

            {hasChildren && open && (
                <div>
                    {area.children!.map((child) => (
                        <OrgTreeNode key={child.id} area={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ── Página principal ── */
export default function OrganizacionPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">
                        Organización
                    </h1>
                    <p className="text-sm text-text-secondary">
                        Estructura jerárquica de la empresa
                    </p>
                </div>
                <Button size="md">
                    <Plus className="size-4" />
                    Nueva área
                </Button>
            </div>

            {/* Búsqueda */}
            <Input
                icon={<Search className="size-4" />}
                placeholder="Buscar área o responsable..."
            />

            {/* Organigrama (Tree View) */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-card">
                <div className="px-5 py-3.5 border-b border-border">
                    <h2 className="text-sm font-semibold text-foreground">
                        Estructura organizacional
                    </h2>
                </div>
                <div className="divide-y divide-border">
                    {orgData.map((area) => (
                        <OrgTreeNode key={area.id} area={area} />
                    ))}
                </div>
            </div>

            {/* Información de empresa */}
            <div className="bg-surface rounded-xl border border-border p-5 shadow-card">
                <h2 className="text-sm font-semibold text-foreground mb-4">
                    Datos de la empresa
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-muted-foreground shrink-0" />
                        <div>
                            <p className="font-medium text-foreground">Dirección</p>
                            <p className="text-muted-foreground">Av. Reforma 505, CDMX</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="size-4 text-muted-foreground shrink-0" />
                        <div>
                            <p className="font-medium text-foreground">Teléfono</p>
                            <p className="text-muted-foreground">+52 55 1234 5678</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="size-4 text-muted-foreground shrink-0" />
                        <div>
                            <p className="font-medium text-foreground">Email</p>
                            <p className="text-muted-foreground">contacto@empresa.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe className="size-4 text-muted-foreground shrink-0" />
                        <div>
                            <p className="font-medium text-foreground">Sitio web</p>
                            <p className="text-muted-foreground">www.empresa.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
