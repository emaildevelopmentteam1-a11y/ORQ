"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
    LayoutGrid,
    Building2,
    Users,
    MonitorPlay,
    Puzzle,
    HelpCircle,
    Bell,
    Search,
    ChevronDown,
    Check,
    Menu,
    X,
    BarChart3,
    FileText,
    FileBarChart,
} from "lucide-react";
import clsx from "clsx";
import { useAppContext, ROLE_META, type Role } from "@/lib/context/AppContext";

/* ═══════════════════════════════════════════════════════════════
   AppLayout — App Shell con Sidebar Dinámica y Header
   
   US-003: App Shell y Layout Autenticado
   
   Arquitectura del menú:
   ┌─────────────────────────────────────────┐
   │ SIDEBAR                                 │
   │ ① Ítems fijos (siempre visibles)        │
   │    - Inicio, Organización, Contenidos,  │
   │      Extensiones                        │
   │ ② Ítems por rol (solo admin/gestor)     │
   │    - Usuarios                           │
   │ ③ Ítems dinámicos (extensiones activas) │
   │    - Se inyectan desde AppContext       │
   │    - Aparecen bajo separador visual     │
   └─────────────────────────────────────────┘
   
   Cómo se construye el menú:
   1. `baseNavItems` son siempre visibles
   2. `adminNavItems` se filtran por rol (solo directivo/responsable)
   3. `extensionNavItems` se generan desde las extensiones activas
      en AppContext que tengan `route` definido
   
   Cómo se inyectan módulos:
   - Al activar una extensión en /extensiones, el AppContext
     actualiza `activeExtensions`
   - Este layout consume ese estado y renderiza los ítems
     automáticamente bajo el separador "Módulos activos"
   ═══════════════════════════════════════════════════════════════ */

/* ── Mapa de iconos Lucide por nombre (para extensiones) ── */
const iconMap: Record<string, React.ElementType> = {
    "bar-chart-3": BarChart3,
    "file-text": FileText,
    "file-bar-chart": FileBarChart,
};

/* ── Ítems de navegación fija ── */
interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
}

/** Ítems base: siempre visibles para todos los roles */
const baseNavItems: NavItem[] = [
    { href: "/dashboard", label: "Inicio", icon: LayoutGrid },
    { href: "/organizacion", label: "Organización", icon: Building2 },
    { href: "/contenidos", label: "Contenidos", icon: MonitorPlay },
    { href: "/extensiones", label: "Extensiones", icon: Puzzle },
];

/**
 * Ítems de administración: solo visibles para roles con permisos.
 * AC-009: Cuando el rol cambia a Colaborador (viewer), estos desaparecen.
 */
const adminNavItems: NavItem[] = [
    { href: "/usuarios", label: "Usuarios", icon: Users },
];

/** Roles que pueden ver la sección de administración */
const ADMIN_ROLES: Role[] = ["directivo", "responsable_area"];

/* ══════════════════════════════════════════════════════════════
   Componente: SidebarNavItem
   ═══════════════════════════════════════════════════════════════ */

function SidebarNavItem({
    item,
    isActive,
    onClick,
}: {
    item: NavItem;
    isActive: boolean;
    onClick?: () => void;
}) {
    const Icon = item.icon;
    return (
        <Link
            href={item.href}
            onClick={onClick}
            className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                isActive
                    ? "text-primary bg-primary-light"
                    : "text-text-secondary hover:bg-muted hover:text-foreground"
            )}
        >
            <Icon className="size-5 shrink-0" />
            <span>{item.label}</span>
        </Link>
    );
}

/* ══════════════════════════════════════════════════════════════
   Componente: RoleSelector (Header)
   
   AC-007: Selector de rol con dropdown funcional.
   Al cambiar el rol, el sidebar se recalcula inmediatamente.
   ═══════════════════════════════════════════════════════════════ */

function RoleSelector() {
    const { currentRole, setRole } = useAppContext();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    /* Cerrar al hacer click fuera */
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const currentMeta = ROLE_META[currentRole];
    const roles = Object.entries(ROLE_META) as [Role, typeof currentMeta][];

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={clsx(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                    open ? "bg-muted text-foreground" : "text-foreground"
                )}
            >
                {/* Avatar con iniciales */}
                <div className="size-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    CM
                </div>
                <span>{currentMeta.label}</span>
                <ChevronDown className={clsx("size-3.5 text-muted-foreground transition-transform", open && "rotate-180")} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-surface rounded-xl border border-border shadow-modal py-1 z-50 animate-fade-in-up">
                    <div className="px-3 py-2 border-b border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Cambiar rol (demo)
                        </p>
                    </div>
                    {roles.map(([roleKey, meta]) => (
                        <button
                            key={roleKey}
                            onClick={() => {
                                setRole(roleKey);
                                setOpen(false);
                            }}
                            className={clsx(
                                "w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors",
                                "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
                                currentRole === roleKey ? "text-primary font-medium" : "text-foreground"
                            )}
                        >
                            <div>
                                <p className="font-medium">{meta.label}</p>
                                <p className="text-xs text-muted-foreground">{meta.description}</p>
                            </div>
                            {currentRole === roleKey && <Check className="size-4 text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   Componente: AppLayout Principal
   ═══════════════════════════════════════════════════════════════ */

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { currentRole, activeExtensions } = useAppContext();
    const [mobileOpen, setMobileOpen] = useState(false);

    /* ── Construir nav items dinámicos ── */

    // ① Ítems fijos (siempre visibles)
    const fixedItems = baseNavItems;

    // ② Ítems de admin (filtrados por rol) — AC-009
    const adminItems = ADMIN_ROLES.includes(currentRole) ? adminNavItems : [];

    // ③ Ítems de extensiones activas (inyección dinámica) — AC-003
    const extensionItems: NavItem[] = activeExtensions
        .filter((ext) => ext.active && ext.route)
        .map((ext) => ({
            href: ext.route!,
            label: ext.sidebarLabel || ext.name,
            icon: iconMap[ext.icon] || Puzzle,
        }));

    /** Verifica si una ruta está activa */
    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    /** Contenido del sidebar (compartido entre desktop y mobile) */
    const sidebarContent = (
        <>
            {/* ── Logo (AC-006) ── */}
            <div className="h-16 px-5 flex items-center gap-2.5 border-b border-border shrink-0">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-primary-foreground">O</span>
                    </div>
                    <span className="text-base font-bold text-foreground tracking-tight">
                        Prisma
                    </span>
                </Link>
            </div>

            {/* ── Navegación ── */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                {/* Ítems fijos */}
                {fixedItems.map((item) => (
                    <SidebarNavItem
                        key={item.href}
                        item={item}
                        isActive={isActive(item.href)}
                        onClick={() => setMobileOpen(false)}
                    />
                ))}

                {/* Ítems de admin (condicional por rol) */}
                {adminItems.length > 0 && (
                    <>
                        {adminItems.map((item) => (
                            <SidebarNavItem
                                key={item.href}
                                item={item}
                                isActive={isActive(item.href)}
                                onClick={() => setMobileOpen(false)}
                            />
                        ))}
                    </>
                )}

                {/* ── Separador + Extensiones activas (AC-003) ── */}
                {extensionItems.length > 0 && (
                    <>
                        <div className="pt-4 pb-2 px-3">
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                                Módulos activos
                            </span>
                        </div>
                        {extensionItems.map((item) => (
                            <SidebarNavItem
                                key={item.href}
                                item={item}
                                isActive={isActive(item.href)}
                                onClick={() => setMobileOpen(false)}
                            />
                        ))}
                    </>
                )}
            </nav>

            {/* ── Footer del sidebar: info del usuario ── */}
            <div className="p-3 border-t border-border shrink-0">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        CM
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Carlos Mendoza</p>
                        <p className="text-xs text-muted-foreground truncate">carlos@prisma.com</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-bg">
            {/* ── Sidebar Desktop (AC-005: ~240px, fondo blanco, borde derecho) ── */}
            <aside className="hidden lg:flex w-60 shrink-0 bg-surface border-r border-border flex-col">
                {sidebarContent}
            </aside>

            {/* ── Sidebar Mobile: overlay + drawer ── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop oscuro */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    {/* Drawer */}
                    <aside className="relative w-72 h-full bg-surface flex flex-col shadow-modal animate-fade-in-up">
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-4 size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors z-10"
                            aria-label="Cerrar menú"
                        >
                            <X className="size-5" />
                        </button>
                        {sidebarContent}
                    </aside>
                </div>
            )}

            {/* ── Main Content ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* ── Header (AC-007, AC-008) ── */}
                <header className="h-16 shrink-0 bg-surface border-b border-border px-4 lg:px-6 flex items-center justify-between gap-3">
                    {/* Izquierda: hamburguesa (mobile) + nombre org */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            aria-label="Abrir menú"
                        >
                            <Menu className="size-5" />
                        </button>
                        <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                            Prisma Inc.
                        </span>
                    </div>

                    {/* Derecha: utilidades + selector de rol */}
                    <div className="flex items-center gap-1">
                        {/* AC-008: Íconos de utilidad */}
                        <button className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                            <Search className="size-[18px]" />
                        </button>
                        <button className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                            <Bell className="size-[18px]" />
                        </button>
                        <button className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                            <HelpCircle className="size-[18px]" />
                        </button>

                        {/* Separador visual */}
                        <div className="w-px h-6 bg-border mx-2" />

                        {/* AC-007: Selector de rol */}
                        <RoleSelector />
                    </div>
                </header>

                {/* ── Page Content ── */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
