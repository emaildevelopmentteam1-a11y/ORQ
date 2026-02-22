export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-bg">
            {/* Sidebar — se implementará en US-002 */}
            <aside className="w-60 bg-surface border-r border-border shrink-0">
                <div className="p-6">
                    <span className="text-primary font-bold text-xl">🔵 Orquestra</span>
                </div>
                <nav className="px-3 space-y-1">
                    <a href="/dashboard" className="block px-3 py-2 rounded-button text-text-secondary hover:bg-primary-light hover:text-primary text-sm transition-colors">
                        Inicio
                    </a>
                    <a href="/organizacion" className="block px-3 py-2 rounded-button text-text-secondary hover:bg-primary-light hover:text-primary text-sm transition-colors">
                        Organización
                    </a>
                    <a href="/usuarios" className="block px-3 py-2 rounded-button text-text-secondary hover:bg-primary-light hover:text-primary text-sm transition-colors">
                        Usuarios
                    </a>
                    <a href="/extensiones" className="block px-3 py-2 rounded-button text-text-secondary hover:bg-primary-light hover:text-primary text-sm transition-colors">
                        Extensiones
                    </a>
                </nav>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
    );
}
