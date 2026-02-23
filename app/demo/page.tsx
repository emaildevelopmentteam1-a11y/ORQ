"use client";

import { useState } from "react";
import { ShieldCheck, Zap, Layers, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { LeadForm, LeadFormData } from "@/components/forms/LeadForm";
import { DemoSuccess } from "@/components/marketing/DemoSuccess";

/* ═══════════════════════════════════════════════════════════════
   Demo Page — Página de aterrizaje enfocada en conversión
   
   US-003: Solicitud de demo guiada con captura de lead calificado
   
   Layout (Conversion-Optimized):
   - Izquierda: Propuesta de valor rápida, trust badges
   - Derecha: LeadForm (variant="demo") y DemoSuccess
   - Footer: Omitido o mínimo para evitar fugas (tunneling)
   ═══════════════════════════════════════════════════════════════ */

export default function DemoPage() {
    const [submitted, setSubmitted] = useState<LeadFormData | null>(null);

    return (
        <div className="min-h-screen bg-bg flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col justify-center py-12 lg:py-20">
                <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* ── Columna Izquierda: Value Prop & Trust ── */}
                        <div className="space-y-8 lg:pr-8">
                            <div className="space-y-4">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                                    Demo Personalizada
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight">
                                    Acelera tu transformación operativa
                                </h1>
                                <p className="text-lg text-text-secondary">
                                    Descubre cómo <strong className="text-foreground font-semibold">Orquestra</strong> puede adaptar sus módulos a los procesos exactos de tu empresa.
                                </p>
                            </div>

                            {/* Beneficios Rápidos */}
                            <div className="space-y-5 pt-4 border-t border-border">
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                        <Layers className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground">Arquitectura Modular</h3>
                                        <p className="text-sm text-text-secondary mt-1">Activa solo los componentes que tu organización necesita hoy.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                        <Zap className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground">Time-to-value en días</h3>
                                        <p className="text-sm text-text-secondary mt-1">Implementación rápida sin largos ciclos de desarrollo a la medida.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="size-10 rounded-lg bg-white border border-border flex items-center justify-center shrink-0 shadow-sm">
                                        <ShieldCheck className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-foreground">Seguridad Enterprise</h3>
                                        <p className="text-sm text-text-secondary mt-1">Controles granulares de acceso y auditoría por defecto.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Note */}
                            <div className="bg-primary-light rounded-xl p-5 border border-primary/10 flex items-start gap-4">
                                <BarChart3 className="size-6 text-primary shrink-0" />
                                <p className="text-sm text-text-secondary">
                                    <strong className="text-foreground font-semibold">El 85% de las empresas</strong> que evalúan Orquestra activan su primer módulo la misma semana de la demo técnica.
                                </p>
                            </div>
                        </div>

                        {/* ── Columna Derecha: Formulario de Captura ── */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent rounded-2xl transform translate-x-3 translate-y-3 -z-10" />
                            <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-card relative">
                                {submitted ? (
                                    <DemoSuccess
                                        nombre={submitted.nombre}
                                        email={submitted.email}
                                    />
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                                                Agenda tu sesión
                                            </h2>
                                            <p className="text-sm text-text-secondary">
                                                Llena este formulario y te asignaremos al especialista adecuado para tus necesidades.
                                            </p>
                                        </div>

                                        <LeadForm
                                            variant="demo"
                                            onSuccess={setSubmitted}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
