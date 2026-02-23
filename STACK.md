# Stack Tecnológico — Prisma

## Framework: Next.js 15 (App Router)
- **Por qué**: SSR/SSG nativo, routing basado en filesystem, React Server Components, optimización automática de imágenes y fuentes.
- **Versión**: 16.x (última estable al momento de inicializar con `create-next-app@latest`).
- **Router**: App Router con route groups para separar landing `(landing)` y app interna `(app)`.

## Lenguaje: TypeScript (strict)
- **Por qué**: Tipado estático para prevenir errores en tiempo de desarrollo, autocompletado y refactoring seguro.
- **Config**: `strict: true`, path alias `@/*` → `./`.

## Estilos: Tailwind CSS v4
- **Por qué**: Utilidades atómicas, design tokens vía `@theme inline`, sin overhead de CSS-in-JS.
- **Tokens custom**: Colores, border-radius, sombras y fuentes definidos en `globals.css`.

## Backend Mock: JSON Server
- **Por qué**: API REST completa sin código backend. Ideal para prototipado rápido con datos persistentes en `db.json`.
- **Puerto**: 3001
- **Script**: `npm run mock-api`

## Formularios: React Hook Form + Zod
- **Por qué**: Performance (re-renders mínimos), validación declarativa con schemas Zod, integración vía `@hookform/resolvers`.
- **Uso**: Contacto, CRUD de áreas/usuarios, configuración de extensiones.

## Iconografía: Lucide React
- **Por qué**: Iconos SVG tree-shakeable, estilo outlined/linear consistente, 1500+ iconos disponibles.

## Utilidades: clsx
- **Por qué**: Composición condicional de clases CSS limpia y tipada.

## Estado Global: React Context
- **Por qué**: Suficiente para el scope del proyecto (user, role, extensiones activas). Sin overhead de librerías externas.
- **Patrón**: `AppContext` + `useAppContext()` hook.

---

## Estructura de carpetas

```
orq/
├── app/                   # App Router (rutas)
│   ├── globals.css        # Tokens del design system
│   ├── layout.tsx         # Layout raíz (Inter + AppProvider)
│   ├── page.tsx           # Landing page (/)
│   ├── contacto/          # /contacto (sin sidebar)
│   └── (app)/             # Route group — vistas internas con sidebar
│       ├── layout.tsx     # AppLayout con sidebar
│       ├── dashboard/
│       ├── organizacion/
│       ├── usuarios/
│       └── extensiones/
├── components/
│   └── ui/                # Componentes reutilizables del design system
├── lib/
│   └── context/           # React Context (AppContext)
├── types/                 # Interfaces TypeScript compartidas
├── db.json                # Datos mock para JSON Server
├── STACK.md               # Este archivo
└── package.json
```
