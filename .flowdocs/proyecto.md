# 🧠 PROMPT MAESTRO — Landing Enterprise Orquestra

Actúa como un **arquitecto de software senior especializado en aplicaciones SaaS empresariales modernas**.

Tu objetivo es generar una **landing page enterprise de alta calidad para Orquestra**, enfocada exclusivamente en:

* presentación del producto
* captura de leads
* solicitud de demo

⚠️ IMPORTANTE:

* El código debe ser limpio, tipado y bien organizado.
* Debes incluir **comentarios explicativos en archivos clave**.
* Debes proponer una **estructura de directorios profesional**.
* Debe verse como producto enterprise (no startup genérica).
* Prioriza claridad visual, conversión y calidad UX.

---

# 🎯 Objetivo del sistema

Construir una landing donde un director o CTO pueda:

1. Entender rápidamente qué es Orquestra.
2. Comprender el modelo de plataforma modular por extensiones.
3. Confiar en el producto (look enterprise).
4. Solicitar información de contacto.
5. Solicitar una demo.
6. Recibir confirmación visual y por correo.

⚠️ NO construir dashboard ni app interna.

---

# 🧱 Stack obligatorio

Usar:

**Framework**

* Next.js (App Router)
* TypeScript

**UI**

* Tailwind CSS
* Componentes reutilizables
* Diseño enterprise moderno

**Backend / BaaS**

* Supabase (para envío y persistencia de leads)
* API routes de Next.js si es necesario

**Estado**

* React Hook Form (formularios)
* Zod (validación)

---

# 📁 Estructura de directorios requerida

Debes generar algo similar a:

```
orquestra-landing/
  app/
    (marketing)/
      page.tsx
      contacto/
      demo/
  components/
    layout/
    marketing/
    forms/
    ui/
  lib/
    supabase/
    validations/
  services/
    leads/
  types/
  docs/
```

⚠️ Explica brevemente el propósito de cada carpeta.

---

# 🧩 Componentes obligatorios

## 🔷 Layout público

### MarketingLayout

Debe incluir:

* Navbar sticky
* Contenedor centrado
* Footer corporativo
* Soporte responsive

Agregar comentarios explicando decisiones.

---

## 🔷 Navbar

Debe contener:

* Logo Orquestra
* Links:

  * Producto
  * Capacidades
  * Contacto
* CTA “Solicitar demo”

Requisitos:

* Sticky
* Responsive con menú móvil
* Estados hover y focus

---

## 🔷 LandingPage (HOME)

Debe ser **claramente enterprise**.

### Secciones obligatorias

#### 1. Hero estratégico

Debe incluir:

* H1 fuerte orientado a transformación empresarial
* Subtítulo mencionando plataforma modular por extensiones
* Mockup/dashboard decorativo
* CTA primario: Solicitar demo
* CTA secundario: Contacto

---

#### 2. Propuesta de valor

Explicar:

* Plataforma modular
* Activación por extensiones
* Time-to-value
* Enfoque enterprise

---

#### 3. Cómo funciona (3 pasos)

Visual flow:

1. Configura tu organización
2. Activa extensiones
3. Opera con visibilidad total

Debe ser visual y claro.

---

#### 4. Extensiones destacadas

Mostrar cards mock:

* KPI
* Encuestas
* BI

Cada card con badge:

🧩 EXTENSIÓN

---

#### 5. Beneficios cloud / enterprise

Ejemplos:

* Seguridad
* Escalabilidad
* Multi-organización
* Alta disponibilidad

---

#### 6. CTA final de conversión

Bloque premium con:

* Headline de cierre
* Botón Solicitar demo
* Botón Contacto

---

# 📨 Página de Contacto

Ruta:

```
/contacto
```

## Requisitos del formulario

Campos:

* Nombre completo
* Correo corporativo
* Organización
* Rol
* Mensaje

Opcionales:

* Teléfono
* Tamaño de empresa
* Interés principal

---

## Comportamientos obligatorios

* Validación con Zod
* React Hook Form
* Loading state
* Prevención doble submit
* Mensaje de éxito inline
* Accesibilidad básica

---

## ✨ Sugerencias inteligentes

Mostrar chips clicables como:

* "Quiero conocer precios"
* "Necesito una demo técnica"
* "Evaluando para mi organización"
* "Información de arquitectura"

Al hacer clic → se insertan en el textarea.

---

## 📩 Integración Supabase

Al enviar:

1. Guardar lead en tabla `leads`
2. Enviar email al equipo
3. Enviar email de confirmación al usuario

⚠️ Usa variables de entorno.

---

# 🎬 Página Solicitar Demo

Ruta:

```
/demo
```

⚠️ IMPORTANTE: reutilizar el mismo componente base de formulario.

Patrón esperado:

```
<LeadForm variant="contact" />
<LeadForm variant="demo" />
```

---

## Diferencias demo vs contacto

Demo debe:

* copy orientado a demo
* campo opcional:

  * "¿Qué te gustaría ver en la demo?"
* marcar lead como `type: demo_request`

---

## Confirmación post-envío

El usuario debe ver:

* mensaje claro
* tono corporativo
* tiempo estimado de respuesta
* estado accesible (aria-live)

---

# 🧠 Estilo visual obligatorio

Look & feel:

* Enterprise moderno
* Mucho espacio en blanco
* Cards suaves
* Bordes redondeados
* Sombras sutiles
* Tipografía profesional

Inspiración implícita:

* plataformas tipo Salesforce
* SaaS B2B moderno
* GovTech limpio

---

# 🧪 Nivel de fidelidad

Esto es un **demo comercial de alto impacto**.

Debe:

* Verse vendible
* Ser completamente navegable
* Tener empty states
* Tener loading states
* Tener validaciones reales

---

# 📚 Documentación requerida

Generar en `/docs`:

* README.md (cómo correr)
* Arquitectura.md
* Flujo de leads.md

---

# 🚨 Reglas estrictas

NO:

* No dashboard
* No marketplace funcional
* No lógica innecesaria
* No componentes gigantes
* No estilos inline caóticos

SÍ:

* Componentes pequeños
* Tipado fuerte
* Comentarios útiles
* Arquitectura limpia
* Reutilización del formulario

---

# ✅ Entregable esperado de la IA

Debe generar:

1. Estructura de carpetas
2. Landing funcional
3. Página contacto
4. Página demo
5. Formulario reutilizable
6. Integración Supabase
7. Datos mock si aplica
8. Documentación mínima
9. Instrucciones para correr

---