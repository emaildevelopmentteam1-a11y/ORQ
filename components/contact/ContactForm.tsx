"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   ContactForm — Formulario corporativo de contacto
   
   US-002 ACs cubiertos:
   - AC-002: Formulario intuitivo con validación inline
   - AC-003: Sugerencias inteligentes de mensaje (chips)
   - AC-004: Envío funcional con loading state
   - AC-009: Honeypot anti-spam

   Arquitectura:
   - Validación con Zod (esquema inline, sin dependencia de resolver
     para mantener el bundle ligero)
   - Chips de sugerencia se inyectan en el textarea al hacer click
   - Honeypot: campo oculto "website" que bots rellenan — si tiene
     valor, el submit es silenciosamente ignorado
   - onSuccess callback notifica al padre para mostrar confirmación
   ═══════════════════════════════════════════════════════════════ */

/* ── Esquema de validación ── */
const contactSchema = z.object({
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z
        .string()
        .min(1, "El correo es requerido")
        .email("Ingresa un correo válido"),
    organizacion: z.string().min(2, "La organización es requerida"),
    rol: z.string().min(1, "Selecciona tu rol"),
    mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
    // Opcionales
    telefono: z.string().optional(),
    tamano: z.string().optional(),
    interes: z.string().optional(),
    // Honeypot (AC-009)
    website: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ── Chips de sugerencia (AC-003) ── */
const SUGGESTION_CHIPS = [
    "Quisiera una demostración personalizada",
    "Necesito información sobre planes y precios",
    "Estoy interesado en la arquitectura técnica",
    "Quiero evaluar la plataforma para mi equipo",
    "Me gustaría saber sobre integraciones disponibles",
    "Busco una solución enterprise para mi organización",
];

/* ── Opciones de select ── */
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

/* ── Props ── */
interface ContactFormProps {
    onSuccess: (data: ContactFormData) => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ContactFormData>({
        defaultValues: {
            nombre: "",
            email: "",
            organizacion: "",
            rol: "",
            mensaje: "",
            telefono: "",
            tamano: "",
            interes: "",
            website: "", // honeypot
        },
    });

    const mensajeValue = watch("mensaje");

    /* ── Insertar chip de sugerencia en textarea (AC-003) ── */
    const insertSuggestion = (text: string) => {
        const current = mensajeValue || "";
        const separator = current.length > 0 ? "\n" : "";
        setValue("mensaje", current + separator + text, { shouldValidate: true });
        // Focus en el textarea después de insertar
        setTimeout(() => textareaRef.current?.focus(), 50);
    };

    /* ── Submit handler (AC-004) ── */
    const onSubmit = async (data: ContactFormData) => {
        // AC-009: Si el honeypot tiene valor, un bot lo llenó → ignorar silenciosamente
        if (data.website && data.website.length > 0) {
            // Simular éxito para no revelar al bot que fue detectado
            await new Promise((r) => setTimeout(r, 1500));
            onSuccess(data);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simular envío a servidor (demo mock)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // En producción aquí iría:
            // await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })
            console.log("[ContactForm] Datos enviados:", data);

            onSuccess(data);
        } catch (error) {
            console.error("[ContactForm] Error al enviar:", error);
            // En producción: mostrar toast de error
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ── Estilos reutilizables ── */
    const inputBase =
        "w-full px-4 py-3 bg-white border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed";
    const labelBase = "block text-sm font-medium text-foreground mb-1.5";
    const errorText = "text-xs text-accent-red mt-1";
    const optionalTag = (
        <span className="text-muted-foreground font-normal ml-1">(opcional)</span>
    );

    /* ── Validación manual con Zod ── */
    const validate = (field: keyof ContactFormData) => ({
        ...register(field),
        onChange: async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            register(field).onChange(e);
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                // Validar con Zod antes de enviar
                const result = contactSchema.safeParse(data);
                if (result.success) {
                    await onSubmit(result.data);
                }
            })}
            className="space-y-5"
            noValidate
        >
            {/* ── Honeypot (AC-009): campo invisible para bots ── */}
            <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                    type="text"
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                />
            </div>

            {/* ── Nombre (requerido) ── */}
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
                    {...register("nombre", { required: "El nombre es requerido", minLength: { value: 2, message: "Al menos 2 caracteres" } })}
                />
                {errors.nombre && <p className={errorText}>{errors.nombre.message}</p>}
            </div>

            {/* ── Email (requerido) ── */}
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
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Ingresa un correo válido" },
                    })}
                />
                {errors.email && <p className={errorText}>{errors.email.message}</p>}
            </div>

            {/* ── Organización + Rol (2 cols) ── */}
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
                        {...register("organizacion", { required: "La organización es requerida", minLength: { value: 2, message: "Al menos 2 caracteres" } })}
                    />
                    {errors.organizacion && <p className={errorText}>{errors.organizacion.message}</p>}
                </div>
                <div>
                    <label htmlFor="rol" className={labelBase}>
                        Tu rol <span className="text-accent-red">*</span>
                    </label>
                    <select
                        id="rol"
                        className={inputBase}
                        disabled={isSubmitting}
                        {...register("rol", { required: "Selecciona tu rol" })}
                    >
                        {ROLES.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                    {errors.rol && <p className={errorText}>{errors.rol.message}</p>}
                </div>
            </div>

            {/* ── Teléfono + Tamaño org (opcionales, 2 cols) ── */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
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
                        Tamaño de la organización {optionalTag}
                    </label>
                    <select
                        id="tamano"
                        className={inputBase}
                        disabled={isSubmitting}
                        {...register("tamano")}
                    >
                        {ORG_SIZES.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ── Interés principal (opcional) ── */}
            <div>
                <label htmlFor="interes" className={labelBase}>
                    Interés principal {optionalTag}
                </label>
                <select
                    id="interes"
                    className={inputBase}
                    disabled={isSubmitting}
                    {...register("interes")}
                >
                    {INTERESTS.map((i) => (
                        <option key={i.value} value={i.value}>
                            {i.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* ── Sugerencias de mensaje (AC-003) ── */}
            <div>
                <label className={labelBase}>Sugerencias rápidas</label>
                <div className="flex flex-wrap gap-2">
                    {SUGGESTION_CHIPS.map((chip) => (
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

            {/* ── Mensaje (requerido) ── */}
            <div>
                <label htmlFor="mensaje" className={labelBase}>
                    Mensaje <span className="text-accent-red">*</span>
                </label>
                <textarea
                    id="mensaje"
                    rows={5}
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

            {/* ── Botón de envío (AC-004) ── */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px]"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    <>
                        <Send className="size-4" />
                        Enviar solicitud
                    </>
                )}
            </button>

            {/* Nota de campos requeridos */}
            <p className="text-xs text-muted-foreground text-center">
                Los campos marcados con <span className="text-accent-red">*</span> son obligatorios.
            </p>
        </form>
    );
}
