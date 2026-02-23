import { CheckCircle2, Clock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   ContactSuccess — Confirmación visual post-envío
   
   AC-005: Confirmación visual inmediata
   - Mensaje de éxito claro sin abandonar la página
   - Tono corporativo y tranquilizador
   - Expectativa de tiempo de respuesta
   - ARIA live para lectores de pantalla

   AC-006 / AC-007: En producción los correos se enviarían desde
   el backend. Aquí mostramos la confirmación visual demo.
   ═══════════════════════════════════════════════════════════════ */

interface ContactSuccessProps {
    nombre: string;
    email: string;
}

export function ContactSuccess({ nombre, email }: ContactSuccessProps) {
    return (
        <div
            className="text-center space-y-6 py-8"
            role="status"
            aria-live="polite"
        >
            {/* Icono de éxito animado */}
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-accent-green/10 mx-auto">
                <CheckCircle2 className="size-8 text-accent-green" />
            </div>

            {/* Mensaje principal */}
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">
                    ¡Mensaje enviado con éxito!
                </h2>
                <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Gracias, <strong className="text-foreground">{nombre}</strong>.
                    Hemos recibido tu solicitud y nuestro equipo se pondrá en
                    contacto contigo muy pronto.
                </p>
            </div>

            {/* Expectativa de respuesta */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>Respuesta en menos de 24 horas hábiles</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="size-4" />
                    <span>Confirmación enviada a <strong className="text-foreground">{email}</strong></span>
                </div>
            </div>

            {/* Qué esperar */}
            <div className="bg-primary-light rounded-xl border border-primary/10 p-5 max-w-md mx-auto text-left">
                <h3 className="text-sm font-semibold text-foreground mb-2">
                    ¿Qué sigue?
                </h3>
                <ul className="space-y-1.5 text-sm text-text-secondary">
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">1.</span>
                        Un ejecutivo revisará tu solicitud
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">2.</span>
                        Te contactaremos para agendar una demo personalizada
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">3.</span>
                        Recibirás acceso a un ambiente de prueba
                    </li>
                </ul>
            </div>

            {/* Link de regreso */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
            >
                <ArrowLeft className="size-4" />
                Volver al inicio
            </Link>
        </div>
    );
}
