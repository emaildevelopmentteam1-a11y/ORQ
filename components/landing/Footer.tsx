import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   Footer — Footer institucional
   
   Links organizados por columnas, copyright y año actual.
   Estilo enterprise limpio con fondo blanco y borde superior.
   ═══════════════════════════════════════════════════════════════ */

const footerLinks = {
    Producto: [
        { label: "Plataforma", href: "#plataforma" },
        { label: "Extensiones", href: "#capacidades" },
        { label: "Demo", href: "/dashboard" },
    ],
    Empresa: [
        { label: "Contacto", href: "/contacto" },
        { label: "Soporte", href: "#" },
    ],
};

export function Footer() {
    return (
        <footer className="py-12 bg-white border-t border-border/40">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
                    {/* Logo + tagline */}
                    <div className="max-w-xs">
                        <Link href="/" className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-white font-bold text-xs">
                                O
                            </div>
                            <span className="text-base font-bold text-foreground">
                                Orquestra
                            </span>
                        </Link>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            Plataforma enterprise modular para transformar la operación
                            de tu empresa en un sistema medible.
                        </p>
                    </div>

                    {/* Link columns */}
                    <div className="flex gap-16">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                                    {category}
                                </h4>
                                <ul className="space-y-2">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-text-secondary hover:text-foreground transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-6 border-t border-border/40">
                    <p className="text-center text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Orquestra. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
