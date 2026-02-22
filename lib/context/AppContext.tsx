"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// ── Tipos ──────────────────────────────────
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export type Role = "directivo" | "responsable_area" | "colaborador";

export interface Extension {
    id: string;
    name: string;
    description: string;
    icon: string;
    active: boolean;
    category: string;
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
    email: "carlos@empresa.com",
    avatar: undefined,
};

const defaultExtensions: Extension[] = [
    {
        id: "ext-kpi",
        name: "KPI Tracker",
        description: "Indicadores clave de rendimiento en tiempo real",
        icon: "bar-chart-3",
        active: false,
        category: "analytics",
    },
    {
        id: "ext-forms",
        name: "Formularios",
        description: "Crea y gestiona formularios personalizados",
        icon: "file-text",
        active: false,
        category: "productivity",
    },
    {
        id: "ext-reports",
        name: "Reportes",
        description: "Genera reportes ejecutivos automáticos",
        icon: "file-bar-chart",
        active: false,
        category: "analytics",
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
