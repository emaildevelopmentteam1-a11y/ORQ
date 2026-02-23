"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   AppContext — Estado global de la aplicación
   
   Gestiona:
   - Usuario actual (mock)
   - Rol actual (cambiable desde el header)
   - Extensiones (activables/desactivables desde marketplace)
   
   El sidebar consume este contexto para:
   - Filtrar ítems de navegación según el rol
   - Inyectar módulos de extensiones activas dinámicamente
   ═══════════════════════════════════════════════════════════════ */

// ── Tipos ──────────────────────────────────

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export type Role = "directivo" | "responsable_area" | "colaborador";

/** Metadatos de un rol para UI (label, descripción) */
export interface RoleMeta {
    label: string;
    description: string;
}

/** Mapa de roles con sus metadatos para el selector de rol */
export const ROLE_META: Record<Role, RoleMeta> = {
    directivo: { label: "Directivo", description: "Acceso total" },
    responsable_area: { label: "Resp. de Área", description: "Gestión parcial" },
    colaborador: { label: "Colaborador", description: "Solo lectura" },
};

export interface Extension {
    id: string;
    name: string;
    description: string;
    icon: string;       // nombre del icono Lucide (e.g. "bar-chart-3")
    active: boolean;
    category: string;
    /** Ruta del módulo en el sidebar cuando está activa */
    route?: string;
    /** Label corto para el sidebar */
    sidebarLabel?: string;
}

export interface AppState {
    currentUser: User;
    currentRole: Role;
    activeExtensions: Extension[];
    setRole: (role: Role) => void;
    toggleExtension: (extensionId: string) => void;
}

// ── Datos iniciales ────────────────────────

const defaultUser: User = {
    id: "usr-001",
    name: "Carlos Mendoza",
    email: "carlos@orquestra.com",
    avatar: undefined,
};

/**
 * Extensiones disponibles en el marketplace.
 * 
 * `route` y `sidebarLabel` definen cómo se inyectan en el sidebar
 * cuando están activas. Solo extensiones con `route` aparecen en nav.
 */
const defaultExtensions: Extension[] = [
    {
        id: "ext-kpi",
        name: "KPI Tracker",
        description: "Indicadores clave de rendimiento en tiempo real",
        icon: "bar-chart-3",
        active: false,
        category: "analytics",
        route: "/modules/kpi",
        sidebarLabel: "Indicadores KPI",
    },
    {
        id: "ext-forms",
        name: "Formularios",
        description: "Crea y gestiona formularios personalizados",
        icon: "file-text",
        active: false,
        category: "productivity",
        route: "/modules/formularios",
        sidebarLabel: "Formularios",
    },
    {
        id: "ext-reports",
        name: "Reportes",
        description: "Genera reportes ejecutivos automáticos",
        icon: "file-bar-chart",
        active: false,
        category: "analytics",
        route: "/modules/reportes",
        sidebarLabel: "Reportes BI",
    },
];

// ── Context ────────────────────────────────

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentRole, setCurrentRole] = useState<Role>("directivo");
    const [extensions, setExtensions] = useState<Extension[]>(defaultExtensions);

    const toggleExtension = useCallback((extensionId: string) => {
        setExtensions((prev) =>
            prev.map((ext) =>
                ext.id === extensionId ? { ...ext, active: !ext.active } : ext
            )
        );
    }, []);

    const value: AppState = {
        currentUser: defaultUser,
        currentRole,
        activeExtensions: extensions,
        setRole: setCurrentRole,
        toggleExtension,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppState {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de <AppProvider>");
    }
    return context;
}
