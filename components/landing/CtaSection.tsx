import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   CtaSection — CTA final orientado a decisión
   
   AC-009: CTA final orientado a decisión
   - Ubicado antes del footer
   - Mensaje orientado a valor de negocio
   - Botón primario consistente con design system
   - CTA refuerza confianza enterprise
   ═══════════════════════════════════════════════════════════════ */

export function CtaSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                    ¿Listo para transformar la operación de tu empresa?
                </h2>
                <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
                    Agenda una demostración personalizada y descubre cómo Orquestra puede
                    adaptarse a las necesidades específicas de tu organización.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 min-h-[44px]"
                    >
                        Ver demo ahora
                        <ArrowRight className="size-4" />
                    </Link>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center px-6 py-3 text-sm text-foreground font-semibold rounded-lg border border-border bg-white hover:bg-muted transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                    >
                        Solicitar información
                    </Link>
                </div>
            </div>
        </section>
    );
}
