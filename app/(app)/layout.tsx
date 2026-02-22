"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Building2,
    Users,
    Puzzle,
    HelpCircle,
    Mail,
    ChevronDown,
    User,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
    { href: "/dashboard", label: "Inicio", icon: LayoutGrid },
    { href: "/organizacion", label: "Organización", icon: Building2 },
    { href: "/usuarios", label: "Usuarios", icon: Users },
    { href: "/extensiones", label: "Extensiones", icon: Puzzle },
];

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-bg">
            {/* ── Sidebar ── */}
            <aside className="w-64 shrink-0 bg-surface border-r border-border flex flex-col">
                {/* Logo */}
                <div className="h-16 px-6 flex items-center gap-2.5 border-b border-border">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">O</span>
                    </div>
                    <span className="text-base font-bold text-foreground tracking-tight">
                        Orquestra
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                                    isActive
                                        ? "text-primary bg-primary-light"
                                        : "text-text-secondary hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="size-5 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 shrink-0 bg-surface border-b border-border px-6 flex items-center justify-end gap-3">
                    {/* Selector de Rol */}
                    <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        <User className="size-4 text-muted-foreground" />
                        <span>Directivo</span>
                        <ChevronDown className="size-3.5 text-muted-foreground" />
                    </button>

                    {/* Acciones rápidas */}
                    <button className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <HelpCircle className="size-5" />
                    </button>
                    <button className="size-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Mail className="size-5" />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
