"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   Navbar — Navegación corporativa sticky
   
   AC-007: Navegación corporativa
   - Sticky con backdrop blur
   - Responsive con menú hamburguesa en móvil
   - Estados hover y focus accesibles por teclado
   - CTA "Acceder al demo" como botón primario
   ═══════════════════════════════════════════════════════════════ */

const navLinks = [
    { href: "#producto", label: "Producto" },
    { href: "#plataforma", label: "Plataforma" },
    { href: "#capacidades", label: "Capacidades" },
    { href: "/contacto", label: "Contacto", isRoute: true },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
            <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* ── Logo ── */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        O
                    </div>
                    <span className="text-lg font-bold text-foreground tracking-tight">
                        Orquestra
                    </span>
                </Link>

                {/* ── Desktop Nav ── */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.isRoute ? (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-text-secondary hover:text-foreground transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md px-1"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-text-secondary hover:text-foreground transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md px-1"
                            >
                                {link.label}
                            </a>
                        )
                    )}
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                    >
                        Solicitar demo
                    </Link>
                </div>

                {/* ── Mobile Toggle ── */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-text-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
                    aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </nav>

            {/* ── Mobile Menu ── */}
            {mobileOpen && (
                <div className="md:hidden border-t border-border/40 bg-white px-6 py-4 space-y-1 animate-fade-in-up">
                    {navLinks.map((link) =>
                        link.isRoute ? (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        )
                    )}
                    <Link
                        href="/demo"
                        onClick={() => setMobileOpen(false)}
                        className="block mt-3 text-center px-4 py-2.5 text-sm bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
                    >
                        Solicitar demo
                    </Link>
                </div>
            )}
        </header>
    );
}
