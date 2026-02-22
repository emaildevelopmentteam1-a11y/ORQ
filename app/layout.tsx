import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@/lib/context/AppContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orquestra — Convierte tu operación en un sistema medible",
  description:
    "Plataforma enterprise para gestión operacional con estructura jerárquica, KPIs e indicadores en tiempo real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
