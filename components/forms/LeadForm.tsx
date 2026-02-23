"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send, CalendarCheck } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   LeadForm — Formulario corporativo reutilizable (Contact / Demo)
   
   US-003 ACs cubiertos:
   - AC-003: Formulario optimizado para lead calificado
   - AC-004: Envío y estado de carga
   - AC-008: Experiencia responsive premium

   Arquitectura:
   - Validación inline con Zod
   - Dos variantes ("contact" y "demo") que ajustan los campos
     y las sugerencias dinámicamente.
   - Honeypot anti-spam.
   ═══════════════════════════════════════════════════════════════ */

const leadSchema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().min(1, "El correo es requerido").email("Ingresa un correo válido"),
    organizacion: z.string().min(2, "La organización es requerida"),
    rol: z.string().min(1, "Selecciona tu rol"),
    // Opcionales
    mensaje: z.string().optional(),
    detalles_demo: z.string().optional(),
    telefono: z.string().optional(),
    tamano: z.string().optional(),
    interes: z.string().optional(),
    // Metadata interna
    type: z.enum(["contact_request", "demo_request"]).optional(),
    // Honeypot (AC-009)
    website: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

const CONTACT_CHIPS = [
    "Necesito información sobre planes y precios",
    "Quiero evaluar la plataforma para mi equipo",
];

const DEMO_CHIPS = [
    "Quiero conocer los precios de los planes",
    "Necesito una demo técnica",
    "Evaluando para mi organización",
    "Información sobre configuración de módulos",
];

const ROLES = [
    { value: "", label: "Selecciona tu rol" },
    { value: "cto", label: "CTO / Director de Tecnología" },
    { value: "coo", label: "COO / Director de Operaciones" },
    { value: "director", label: "Director General" },
    { value: "gerente", label: "Gerente de Área" },
    { value: "analista", label: "Analista / Evaluador" },
    { value: "otro", label: "Otro" },
];

const ORG_SIZES = [
    { value: "", label: "Selecciona (opcional)" },
    { value: "1-50", label: "1 – 50 empleados" },
    { value: "51-200", label: "51 – 200 empleados" },
    { value: "201-1000", label: "201 – 1,000 empleados" },
    { value: "1000+", label: "Más de 1,000 empleados" },
];

const INTERESTS = [
    { value: "", label: "Selecciona (opcional)" },
    { value: "demo", label: "Demostración del producto" },
    { value: "pricing", label: "Planes y precios" },
    { value: "partnership", label: "Partnership / Integración" },
    { value: "support", label: "Soporte técnico" },
    { value: "general", label: "Información general" },
];

interface LeadFormProps {
    variant: "contact" | "demo";
    onSuccess: (data: LeadFormData) => void;
}

export function LeadForm({ variant, onSuccess }: LeadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const isDemo = variant === "demo";

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<LeadFormData>({
        defaultValues: {
            nombre: "",
            email: "",
            organizacion: "",
            rol: "",
            mensaje: "",
            detalles_demo: "",
            telefono: "",
            tamano: "",
            interes: "",
            type: isDemo ? "demo_request" : "contact_request",
            website: "",
        },
    });

    const targetField = isDemo ? "detalles_demo" : "mensaje";
    const currentValue = watch(targetField);

    const insertSuggestion = (text: string) => {
        const current = currentValue || "";
        const separator = current.length > 0 ? "\n" : "";
        setValue(targetField, current + separator + text, { shouldValidate: true });
        setTimeout(() => textareaRef.current?.focus(), 50);
    };

    const onSubmit = async (data: LeadFormData) => {
        setFormError(null);

        // Honeypot check
        if (data.website && data.website.length > 0) {
            await new Promise((r) => setTimeout(r, 1500));
            onSuccess(data);
            return;
        }

        setIsSubmitting(true);
        try {
            const endpoint = isDemo ? "/api/demo" : "/api/contact";
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Ocurrió un error inesperado al enviar la solicitud.");
            }

            console.log(`[LeadForm - ${data.type}] Datos enviados exitosamente.`);
            onSuccess(data);
        } catch (error: any) {
            console.error("[LeadForm] Error al enviar:", error);
            setFormError(error.message || "No pudimos conectar con el servidor. Por favor, intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputBase =
        "w-full px-4 py-3 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed";
    const labelBase = "block text-sm font-medium text-foreground mb-1.5";
    const errorText = "text-xs text-accent-red mt-1";
    const optionalTag = <span className="text-muted-foreground font-normal ml-1">(opcional)</span>;

    const currentChips = isDemo ? DEMO_CHIPS : CONTACT_CHIPS;

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                const result = leadSchema.safeParse(data);
                if (result.success) await onSubmit(result.data);
            })}
            className="space-y-5"
            noValidate
        >
            {/* Honeypot invisible */}
            <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            {/* Badge visual para reforzar contexto dentro del formulario */}
            {isDemo && (
                <div className="flex items-center gap-2 mb-2 p-3 bg-accent-amber/10 border border-accent-amber/20 rounded-lg">
                    <CalendarCheck className="size-4 text-accent-amber shrink-0" />
                    <span className="text-xs font-medium text-amber-800">
                        Sesión técnica guiada con un especialista
                    </span>
                </div>
            )}

            {/* Error General de API */}
            {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    {formError}
                </div>
            )}

            {/* Nombre */}
            <div>
                <label htmlFor="nombre" className={labelBase}>
                    Nombre completo <span className="text-accent-red">*</span>
                </label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Ej. Carlos Mendoza"
                    className={inputBase}
                    disabled={isSubmitting}
                    {...register("nombre", { required: "El nombre es requerido", minLength: 2 })}
                />
                {errors.nombre && <p className={errorText}>{errors.nombre.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className={labelBase}>
                    Correo corporativo <span className="text-accent-red">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="carlos@empresa.com"
                    className={inputBase}
                    disabled={isSubmitting}
                    {...register("email", {
                        required: "El correo es requerido",
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                />
                {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>

            {/* Organización + Rol */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="organizacion" className={labelBase}>
                        Organización <span className="text-accent-red">*</span>
                    </label>
                    <input
                        id="organizacion"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        className={inputBase}
                        disabled={isSubmitting}
                        {...register("organizacion", { required: "La organización es requerida", minLength: 2 })}
                    />
                    {errors.organizacion && <p className={errorText}>{errors.organizacion.message}</p>}
                </div>
                <div>
                    <label htmlFor="rol" className={labelBase}>
                        Tu rol <span className="text-accent-red">*</span>
                    </label>
                    <select id="rol" className={inputBase} disabled={isSubmitting} {...register("rol", { required: "Selecciona tu rol" })}>
                        {ROLES.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                    {errors.rol && <p className={errorText}>{errors.rol.message}</p>}
                </div>
            </div>

            {/* Teléfono + Tamaño org */}
            <div className={`grid ${!isDemo ? "sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
                <div className={isDemo ? "hidden md:block" : ""}>
                    <label htmlFor="telefono" className={labelBase}>
                        Teléfono {optionalTag}
                    </label>
                    <input
                        id="telefono"
                        type="tel"
                        placeholder="+52 55 1234 5678"
                        className={inputBase}
                        disabled={isSubmitting}
                        {...register("telefono")}
                    />
                </div>
                <div>
                    <label htmlFor="tamano" className={labelBase}>
                        Tamaño de organización {optionalTag}
                    </label>
                    <select id="tamano" className={inputBase} disabled={isSubmitting} {...register("tamano")}>
                        {ORG_SIZES.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Interés principal (Solo en Contacto) */}
            {!isDemo && (
                <div>
                    <label htmlFor="interes" className={labelBase}>
                        Interés principal {optionalTag}
                    </label>
                    <select id="interes" className={inputBase} disabled={isSubmitting} {...register("interes")}>
                        {INTERESTS.map((i) => (
                            <option key={i.value} value={i.value}>{i.label}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Sugerencias */}
            <div>
                <label className={labelBase}>Sugerencias rápidas</label>
                <div className="flex flex-wrap gap-2">
                    {currentChips.map((chip) => (
                        <button
                            key={chip}
                            type="button"
                            onClick={() => insertSuggestion(chip)}
                            disabled={isSubmitting}
                            className="px-3 py-1.5 text-xs font-medium text-primary bg-primary-light rounded-full border border-primary/20 hover:bg-primary/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mensaje (Solo Contacto) */}
            {!isDemo && (
                <div>
                    <label htmlFor="mensaje" className={labelBase}>
                        Mensaje <span className="text-accent-red">*</span>
                    </label>
                    <textarea
                        id="mensaje"
                        rows={4}
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        className={`${inputBase} resize-none`}
                        disabled={isSubmitting}
                        {...register("mensaje", { required: "El mensaje es requerido", minLength: { value: 10, message: "Al menos 10 caracteres" } })}
                        ref={(e) => {
                            register("mensaje").ref(e);
                            textareaRef.current = e;
                        }}
                    />
                    {errors.mensaje && <p className={errorText}>{errors.mensaje.message}</p>}
                </div>
            )}

            {/* Detalles Demo (Solo Demo) - Campo opcional adicional */}
            {isDemo && (
                <div>
                    <label htmlFor="detalles_demo" className={labelBase}>
                        ¿Qué te gustaría ver en la demo? {optionalTag}
                    </label>
                    <textarea
                        id="detalles_demo"
                        rows={4}
                        placeholder="Cuéntanos tus retos principales para enfocar la sesión..."
                        className={`${inputBase} resize-none`}
                        disabled={isSubmitting}
                        {...register("detalles_demo")}
                        ref={(e) => {
                            register("detalles_demo").ref(e);
                            textareaRef.current = e;
                        }}
                    />
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px]"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        {isDemo ? "Procesando solicitud..." : "Enviando..."}
                    </>
                ) : (
                    <>
                        {isDemo ? <CalendarCheck className="size-4" /> : <Send className="size-4" />}
                        {isDemo ? "Solicitar demo personalizada" : "Enviar información"}
                    </>
                )}
            </button>

            <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                    Los campos marcados con <span className="text-accent-red">*</span> son obligatorios.
                </p>
                <div className="text-xs text-text-secondary bg-muted/50 p-3 rounded-lg border border-border/50">
                    {isDemo ? (
                        <span>
                            <strong className="text-foreground">Expectativa:</strong> Un ejecutivo de cuentas estudiará tu caso y te contactará en menos de 24 horas laborables para <strong>agendar el horario</strong> de la demo.
                        </span>
                    ) : (
                        <span>
                            <strong className="text-foreground">Siguientes pasos:</strong> Nuestro equipo de soporte e información revisará tus inquietudes y te enviará una <strong>respuesta informativa</strong> estructurada a la brevedad.
                        </span>
                    )}
                </div>
            </div>
        </form>
    );
}
