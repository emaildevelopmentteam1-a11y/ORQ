import { CheckCircle2, Clock, Mail, ArrowLeft, CalendarCheck } from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   DemoSuccess — Confirmación visual post-solicitud de demo
   
   AC-005: Confirmación post-solicitud
   - Mensaje visible sin abandonar la página
   - Tono corporativo y orientado a agendar sesión
   - Incluye tiempo estimado de respuesta
   - ARIA live presente
   ═══════════════════════════════════════════════════════════════ */

interface DemoSuccessProps {
    nombre: string;
    email: string;
}

export function DemoSuccess({ nombre, email }: DemoSuccessProps) {
    return (
        <div
            className="text-center space-y-6 py-8"
            role="status"
            aria-live="polite"
        >
            {/* Icono animado */}
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-accent-green/10 mx-auto">
                <CalendarCheck className="size-8 text-accent-green" />
            </div>

            {/* Mensaje principal */}
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">
                    ¡Solicitud de Demo recibida!
                </h2>
                <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Excelente decisión, <strong className="text-foreground">{nombre}</strong>.
                    Hemos priorizado tu solicitud. Nuestro equipo de cuentas se pondrá en
                    contacto contigo a la brevedad para coordinar la sesión.
                </p>
            </div>

            {/* Expectativa */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>Contacto en menos de 24 horas hábiles</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4" />
                    <span>Confirmación enviada a <strong className="text-foreground">{email}</strong></span>
                </div>
            </div>

            {/* Próximos pasos (orientado a la demo) */}
            <div className="bg-primary-light rounded-xl border border-primary/10 p-5 max-w-md mx-auto text-left">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                    Próximos pasos
                </h3>
                <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">1.</span>
                        Revisaremos el perfil de tu organización
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">2.</span>
                        Te enviaremos opciones de calendario para la sesión técnica
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">3.</span>
                        Prepararemos un entorno enfocado en tus casos de uso
                    </li>
                </ul>
            </div>

            {/* Link de regreso */}
            <div className="pt-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                    <ArrowLeft className="size-4" />
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
