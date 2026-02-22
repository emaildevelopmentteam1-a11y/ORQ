---
name: orquestra-design
description: Sistema de diseño completo de Orquestra — tokens semánticos Tailwind v4, componentes con variantes, layouts enterprise, patrones de interacción y reglas visuales basados en el prototipo Figma oficial
---

# Orquestra Design System

> Stack: **Tailwind CSS v4** + **Lucide React** + **clsx/tailwind-variants**
> Fuente de verdad: Prototipo Figma oficial de Orquestra

---

## 1. Design Tokens — Base de Todo

### 1.1 Colores — Definidos en `globals.css` vía `@theme inline`

```css
@import "tailwindcss";

@theme inline {
  /* ── Marca ── */
  --color-primary: #2563EB;
  --color-primary-light: #EEF2FF;
  --color-primary-hover: #1D4ED8;
  --color-primary-foreground: #FFFFFF;

  /* ── Acentos semánticos ── */
  --color-accent-green: #16A34A;
  --color-accent-green-light: #F0FDF4;
  --color-accent-red: #DC2626;
  --color-accent-red-light: #FEF2F2;
  --color-accent-amber: #D97706;
  --color-accent-amber-light: #FFFBEB;

  /* ── Superficies ── */
  --color-surface: #FFFFFF;
  --color-bg: #F0F4FF;
  --color-muted: #F1F5F9;
  --color-border: #E2E8F0;
  --color-cta-dark: #0F172A;

  /* ── Texto ── */
  --color-foreground: #0F172A;
  --color-text-primary: #0F172A;
  --color-text-secondary: #64748B;
  --color-muted-foreground: #94A3B8;
  --color-text-muted: #94A3B8;

  /* ── Tipografía ── */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* ── Radios ── */
  --radius-sm: 0.375rem;    /* 6px — badges pequeños */
  --radius-md: 0.5rem;      /* 8px — botones, inputs */
  --radius-lg: 0.75rem;     /* 12px — cards */
  --radius-xl: 1rem;        /* 16px — containers grandes */
  --radius-pill: 999px;     /* badges pill */

  /* ── Sombras ── */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.15);
}

body {
  background: var(--color-bg);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

> **REGLA**: NUNCA usar valores hardcoded (`bg-[#ff00ff]`). Siempre tokens semánticos.

### 1.2 Tipografía — Escala Semántica

```html
<!-- Display: Hero de landing page -->
<h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-balance leading-[1.1] text-foreground">

<!-- Page Title: H1 de cada vista interna -->
<h1 class="text-2xl font-bold text-foreground tracking-tight">

<!-- Section Heading: Títulos de sección -->
<h2 class="text-lg font-semibold text-foreground">

<!-- Card Label: Subtítulo de KPI, labels -->
<span class="text-xs font-medium text-muted-foreground uppercase tracking-wider">

<!-- Body: Contenido principal -->
<p class="text-sm text-text-secondary leading-relaxed">

<!-- Caption: Metadata, timestamps -->
<span class="text-xs text-muted-foreground">

<!-- Subtitle: Debajo de H1 -->
<p class="text-sm text-text-secondary">
```

**Reglas de Oro:**
- `tracking-tight` en headings grandes (H1, H2)
- `tracking-wider + uppercase + text-xs` para labels de KPI y sección
- `leading-relaxed` en párrafos de body
- **NUNCA** `text-black` o `text-white` hardcoded → usar `text-foreground`, `text-primary-foreground`
- Subtítulos bajo H1 siempre en `text-text-secondary text-sm`

### 1.3 Espaciado

| Concepto         | Valor         | Clase Tailwind |
|------------------|---------------|----------------|
| Gap entre cards  | `16px`        | `gap-4`        |
| Padding de card  | `20-24px`     | `p-5` / `p-6`  |
| Padding de página| `24px`        | `p-6`          |
| Gap entre secciones | `24px`     | `space-y-6`    |
| Sidebar padding  | `12px`        | `p-3`          |
| Header height    | `64px`        | `h-16`         |

---

## 2. Layouts — Estructuras Probadas

### 2.1 App Shell (Dashboard y vistas internas)

```jsx
<div className="flex h-screen bg-bg">
  {/* Sidebar */}
  <aside className="w-64 shrink-0 bg-surface border-r border-border flex flex-col">
    <div className="h-16 px-6 flex items-center border-b border-border">
      {/* Logo: círculo azul + texto */}
    </div>
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
      {/* Nav items */}
    </nav>
  </aside>

  {/* Main */}
  <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
    <header className="h-16 shrink-0 bg-surface border-b border-border px-6 flex items-center justify-end gap-3">
      {/* Rol selector, help icon, mail icon */}
    </header>
    <main className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Contenido */}
      </div>
    </main>
  </div>
</div>
```

### 2.2 Sidebar — Nav Item

```jsx
// Item de navegación
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              text-text-secondary hover:bg-muted transition-colors">
  <Icon className="size-5 shrink-0" />
  <span>Label</span>
</a>

// Item activo (solo cambia color, NO background)
<a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              text-primary">
  <Icon className="size-5 shrink-0" />
  <span>Label</span>
</a>
```

| Icono (Lucide)     | Label        | Ruta            |
|--------------------|--------------|-----------------|
| `LayoutGrid`       | Inicio       | `/dashboard`    |
| `Building2`        | Organización | `/organizacion` |
| `Users`            | Usuarios     | `/usuarios`     |
| `MonitorPlay`      | Contenidos   | `/contenidos`   |
| `Puzzle`           | Extensiones  | `/extensiones`  |

### 2.3 Page Header Pattern

```jsx
<div className="space-y-1">
  <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
  <p className="text-sm text-text-secondary">Bienvenido a Orquestra</p>
</div>
```

### 2.4 Landing Page (ruta: `/`)

- **Navbar**: fondo blanco, borde inferior sutil, `h-16`
- **Hero**: layout 2 columnas, fondo `bg` con gradiente sutil
- **CTA primario**: `bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium shadow-sm hover:bg-primary-hover`
- **CTA secundario**: `bg-transparent border border-border text-foreground rounded-lg px-6 py-3 font-medium hover:bg-muted`
- **Capabilities**: grid de 3 cards con icono, título bold, descripción

---

## 3. Componentes UI

### 3.1 KPI Card

```jsx
<div className="bg-surface rounded-xl border border-border p-5 space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
      Resumen organización
    </span>
    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
      <Building2 className="size-4 text-primary" />
    </div>
  </div>
  <div>
    <p className="text-2xl font-bold text-foreground">12</p>
    <p className="text-sm text-text-secondary">Áreas activas</p>
  </div>
  <div className="flex items-center gap-1 text-xs">
    <span className="text-accent-green font-medium">148 colaboradores</span>
  </div>
</div>
```

**Grid**: `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4`

### 3.2 Extension Card

```jsx
<div className="bg-surface rounded-xl border border-border p-5 flex flex-col">
  <div className="flex items-start gap-3 mb-3">
    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="size-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h3 className="text-sm font-semibold text-foreground truncate">Nombre</h3>
        <Badge status="success">Disponible</Badge>
      </div>
      <p className="text-xs text-muted-foreground">Categoría</p>
    </div>
  </div>
  <p className="text-sm text-text-secondary mb-4 flex-1">Descripción...</p>
  <Button variant="dark" size="sm" className="w-full">Activar</Button>
</div>
```

**Grid**: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`

### 3.3 Badges

```jsx
const badge = {
  success: "bg-accent-green-light text-accent-green ring-1 ring-accent-green/20",
  warning: "bg-accent-amber-light text-accent-amber ring-1 ring-accent-amber/20",
  error:   "bg-accent-red-light text-accent-red ring-1 ring-accent-red/20",
  info:    "bg-primary-light text-primary ring-1 ring-primary/20",
  neutral: "bg-muted text-muted-foreground ring-1 ring-border",
};

// Clase base
"inline-flex items-center gap-1 rounded-full text-xs font-medium px-2.5 py-0.5"
```

- Siempre **pill** (`rounded-full`)
- Indicador de dot para estados: `<span className="size-1.5 rounded-full bg-accent-green" />`

### 3.4 Buttons

```jsx
const variants = {
  primary:   "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm",
  secondary: "bg-transparent border border-border text-foreground hover:bg-muted",
  dark:      "bg-cta-dark text-white hover:opacity-90",
  ghost:     "hover:bg-muted text-text-secondary hover:text-foreground",
  danger:    "bg-accent-red text-white hover:bg-accent-red/90",
};

const sizes = {
  sm: "text-xs px-3 py-1.5 h-8",
  md: "text-sm px-4 py-2 h-9",
  lg: "text-sm px-5 py-2.5 h-10",
};

// Clase base
"inline-flex items-center justify-center gap-2 rounded-lg font-medium
 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2
 focus-visible:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
```

### 3.5 Inputs

```jsx
// Input base
<div className="space-y-1.5">
  <label className="text-sm font-medium text-foreground">
    Etiqueta
  </label>
  <input className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm
                    text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                    transition-colors" />
</div>

// Input con ícono
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Search className="size-4 text-muted-foreground" />
  </div>
  <input className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-surface text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
</div>
```

### 3.6 Tabla de Datos

```jsx
<div className="bg-surface rounded-xl border border-border overflow-hidden">
  {/* Header */}
  <div className="px-6 py-4 border-b border-border flex items-center justify-between">
    <h3 className="text-sm font-semibold text-foreground">Usuarios</h3>
    <div className="flex items-center gap-2">
      {/* Search + Actions */}
    </div>
  </div>
  {/* Table */}
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-border bg-muted/40">
        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Nombre
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="px-6 py-4 text-foreground">María García</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 3.7 Árbol Jerárquico (Organización)

```jsx
<div className="flex items-center gap-2 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
     style={{ paddingLeft: `${depth * 24 + 16}px` }}>
  {hasChildren && (
    <ChevronRight className={clsx("size-4 text-muted-foreground transition-transform",
                                    expanded && "rotate-90")} />
  )}
  <span className="text-sm font-medium text-foreground">{name}</span>
  <span className="ml-auto text-xs text-muted-foreground">{employeeCount} empleados</span>
</div>
```

---

## 4. Patrones de Interacción

### 4.1 Hover States

| Elemento        | Hover                                         |
|-----------------|-----------------------------------------------|
| Fila tabla      | `hover:bg-muted/30 transition-colors`         |
| Nav item        | `hover:bg-muted transition-colors`            |
| Card            | `hover:shadow-card-hover transition-shadow`   |
| Botón primary   | `hover:bg-primary-hover`                      |
| Botón ghost     | `hover:bg-muted hover:text-foreground`        |

### 4.2 Focus Rings (Accesibilidad)

```html
class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
```

### 4.3 Transiciones

```html
transition-colors duration-150    <!-- default para mayoría -->
transition-shadow duration-200    <!-- cards hover -->
transition-transform duration-200 <!-- chevrons, scale -->
transition-all duration-200       <!-- elementos con múltiples cambios -->
```

### 4.4 Empty State

```jsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="size-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
    <InboxIcon className="size-8 text-muted-foreground" />
  </div>
  <h3 className="text-sm font-semibold text-foreground mb-1">Sin resultados</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Descripción con CTA hacia la acción necesaria.
  </p>
  <Button variant="secondary" size="sm">Acción</Button>
</div>
```

### 4.5 Loading Skeleton

```jsx
<div className="space-y-3 animate-pulse">
  <div className="h-4 bg-muted rounded w-3/4" />
  <div className="h-4 bg-muted rounded w-1/2" />
  <div className="h-4 bg-muted rounded w-5/6" />
</div>
```

---

## 5. Responsive

| Breakpoint | Comportamiento                                |
|------------|-----------------------------------------------|
| base       | Mobile portrait, 1 columna                    |
| `sm:640px` | KPIs en 2 cols                                |
| `md:768px` | Sidebar drawer, extensiones en 2 cols         |
| `lg:1024px`| Sidebar visible fijo, layout completo         |
| `xl:1280px`| KPIs en 3+ cols, extensiones en 3 cols        |

---

## 6. Iconografía

**Librería**: Lucide React — NUNCA mezclar con otra librería

| Tamaño    | Clase     | Uso                     |
|-----------|-----------|-------------------------|
| `size-4`  | 16px      | Inline con texto, badges|
| `size-5`  | 20px      | Sidebar nav, botones    |
| `size-6`  | 24px      | Cards header            |
| `size-8`  | 32px      | Empty states, features  |

---

## 7. Anti-Patterns — NUNCA Hacer

```html
<!-- ❌ Valores hardcoded -->
<div class="bg-[#1a1a2e] text-[#e94560]">

<!-- ❌ text-black / text-white sin token -->
<p class="text-black">

<!-- ❌ Fuentes genéricas sin personalidad (Arial, Helvetica) -->
font-family: Arial, sans-serif

<!-- ❌ Utility soup repetida sin componente -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg ...">

<!-- ✅ Correcto: tokens semánticos -->
<div class="bg-primary text-primary-foreground">
<p class="text-foreground">
<Button variant="primary" size="md">
```

---

## 8. Reglas de Implementación

1. **Fondo app shell**: Siempre `bg-bg` (#F0F4FF) — el tinte azulado sutil es identitario
2. **Cards sobre fondo**: `bg-surface border border-border rounded-xl` — siempre `rounded-xl` (12px)
3. **Sombras sutiles**: Diseño clean/minimalista, solo `shadow-card` en reposo
4. **Iconos solo Lucide**: No mezclar con FontAwesome, Heroicons, etc.
5. **Texto en español**: Toda la UI en español
6. **Transiciones con propósito**: 150ms para color, 200ms para shadow/transform
7. **Espaciado generoso**: El diseño respira — `space-y-6` entre secciones, `gap-4` entre cards
8. **Jerarquía tipográfica**: `font-bold tracking-tight` para H1, `text-xs uppercase tracking-wider` para labels
9. **Focus visible**: Todos los interactivos deben tener `focus-visible:ring-2 ring-primary/50`
10. **No sombras agresivas**: Máximo `shadow-card-hover` en hover, nunca `shadow-2xl`

---

## 9. Referencia Visual

Las capturas del prototipo Figma son la fuente de verdad:

| Vista       | Referencia                         |
|-------------|-------------------------------------|
| Landing     | `figma_landing_*.png`              |
| Dashboard   | `figma_dashboard_*.png`            |
| Organización| `figma_org_*.png`                  |
| Usuarios    | `figma_users_*.png`                |
| Extensiones | `figma_ext_*.png`                  |
| Contacto    | `figma_contact_*.png`              |

> Ante cualquier duda, la fuente de verdad es el prototipo Figma y estas capturas.
