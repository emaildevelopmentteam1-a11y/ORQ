"use client";

import { useState } from "react";
import { Building2, Mail, Phone, Globe } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSuccess } from "@/components/contact/ContactSuccess";

/* ═══════════════════════════════════════════════════════════════
   Contacto — Página corporativa de contacto
   
   US-002: Página de contacto con confirmación de envío
   
   Layout:
   ┌──────────────────────────────────────────┐
   │ Navbar (reutilizada de landing)          │
   ├──────────────┬───────────────────────────┤
   │ Info empresa │ Formulario de contacto    │
   │ • Dirección  │ o Confirmación de éxito   │
   │ • Email      │                           │
   │ • Teléfono   │                           │
   │ • Web        │                           │
   ├──────────────┴───────────────────────────┤
   │ Footer (reutilizado de landing)          │
   └──────────────────────────────────────────┘
   
   AC-001: Diseño corporativo alineado al design system
   AC-008: Responsive premium (1 col en móvil, 2 en desktop)
   ═══════════════════════════════════════════════════════════════ */

interface SubmitData {
    nombre: string;
    email: string;
}

export default function ContactoPage() {
    const [submitted, setSubmitted] = useState<SubmitData | null>(null);

    return (
        <div className="min-h-screen bg-bg flex flex-col">
            <Navbar />

            {/* ── Contenido principal ── */}
            <main className="flex-1 py-16 lg:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Encabezado */}
                    <div className="text-center mb-12">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 block">
                            Contacto
                        </span>
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
                            Hablemos sobre tu empresa
                        </h1>
                        <p className="text-base text-text-secondary max-w-xl mx-auto">
                            Completa el formulario y un especialista de Orquestra te
                            contactará para explorar cómo podemos ayudarte.
                        </p>
                    </div>

                    {/* ── Grid 2 columnas ── */}
                    <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
                        {/* Columna izquierda: información de contacto */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Card de info */}
                            <div className="bg-surface rounded-xl border border-border p-6 shadow-card space-y-5">
                                <h2 className="text-sm font-semibold text-foreground">
                                    Información de contacto
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Building2 className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Oficinas</p>
                                            <p className="text-sm text-text-secondary">
                                                Av. Reforma 505, Piso 12
                                                <br />
                                                Ciudad de México, CDMX 06600
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Mail className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Email</p>
                                            <p className="text-sm text-text-secondary">contacto@orquestra.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Phone className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Teléfono</p>
                                            <p className="text-sm text-text-secondary">+52 55 1234 5678</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Globe className="size-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">Sitio web</p>
                                            <p className="text-sm text-text-secondary">www.orquestra.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card de confianza */}
                            <div className="bg-cta-dark rounded-xl p-6 text-white space-y-3">
                                <h3 className="text-sm font-semibold">
                                    ¿Por qué elegir Orquestra?
                                </h3>
                                <ul className="space-y-2 text-sm text-white/70">
                                    <li className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
                                        Plataforma modular que crece contigo
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
                                        Soporte dedicado enterprise
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
                                        Implementación en menos de 2 semanas
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
                                        Seguridad y gobierno de datos
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Columna derecha: formulario o éxito */}
                        <div className="lg:col-span-3">
                            <div className="bg-surface rounded-xl border border-border p-6 lg:p-8 shadow-card relative">
                                {submitted ? (
                                    <ContactSuccess
                                        nombre={submitted.nombre}
                                        email={submitted.email}
                                    />
                                ) : (
                                    <>
                                        <h2 className="text-lg font-bold text-foreground mb-1">
                                            Solicita información
                                        </h2>
                                        <p className="text-sm text-text-secondary mb-6">
                                            Completa los campos y te responderemos en menos de 24 horas.
                                        </p>
                                        <ContactForm
                                            onSuccess={(data) =>
                                                setSubmitted({
                                                    nombre: data.nombre,
                                                    email: data.email,
                                                })
                                            }
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
