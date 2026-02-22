import type { Metadata } from "next";
import {
  Navbar,
  HeroSection,
  ValueProposition,
  PlatformFlow,
  CapabilitiesSection,
  ExtensionsShowcase,
  EnterpriseFeatures,
  CtaSection,
  Footer,
} from "@/components/landing";

/* ═══════════════════════════════════════════════════════════════
   Landing Page — Orquestra
   
   US-001: Landing enterprise orientada a decisión ejecutiva
   
   Composición de secciones en orden de información architecture:
   1. Navbar (AC-007)      → Navegación corporativa sticky
   2. Hero (AC-001)        → Posicionamiento ejecutivo above-the-fold
   3. ValueProposition     → Propuesta de valor: extensiones bajo demanda (AC-002)
   4. PlatformFlow (AC-003)→ Visual flow: Org → Extensiones → Solución
   5. Capabilities (AC-004)→ Capacidades enterprise en grid
   6. Extensions (AC-005)  → Extensiones destacadas tipo marketplace
   7. Enterprise (AC-006)  → Beneficios cloud/enterprise (sección premium)
   8. CTA (AC-009)         → Bloque de conversión final
   9. Footer               → Footer institucional
   
   AC-008: Responsive premium — todos los componentes soportan
   320px móvil hasta 1280px+ desktop sin scroll horizontal.
   ═══════════════════════════════════════════════════════════════ */

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: "Orquestra — Plataforma Enterprise Modular",
  description:
    "Centraliza la operación de tu empresa y activa capacidades de gestión bajo demanda. Estructura organizacional, KPIs, encuestas y tableros BI en una sola plataforma.",
  openGraph: {
    title: "Orquestra — Plataforma Enterprise Modular",
    description:
      "Activa solo las capacidades que tu organización necesita. Plataforma enterprise con marketplace de extensiones.",
    type: "website",
    locale: "es_MX",
    siteName: "Orquestra",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <PlatformFlow />
      <CapabilitiesSection />
      <ExtensionsShowcase />
      <EnterpriseFeatures />
      <CtaSection />
      <Footer />
    </main>
  );
}
