Perfecto. A continuación tienes un **prompt maestro listo para pegar en una IA generadora de código** (tipo Copilot, Cursor, Claude Code, etc.).

Está diseñado para que te genere un **demo enterprise funcional de Orquestra**, con arquitectura clara, componentes bien definidos y comentarios.

Puedes copiarlo tal cual 👇

---

# 🧠 PROMPT MAESTRO — Generación de demo Orquestra

Actúa como un **arquitecto de software senior especializado en aplicaciones SaaS empresariales modernas**.

Tu objetivo es generar un **demo funcional de la plataforma Orquestra**, con enfoque enterprise, modular y escalable.

⚠️ IMPORTANTE:

* El código debe ser limpio y bien organizado.
* Debes incluir **comentarios explicativos en los archivos clave**.
* Debes proponer una **estructura de directorios profesional**.
* El demo debe ser funcional pero con datos mock donde sea necesario.
* Prioriza claridad visual y arquitectura sobre complejidad.

---

# 🎯 Objetivo del sistema

Construir un demo web donde el usuario pueda:

1. Entrar a una landing page.
2. Acceder a un dashboard empresarial.
3. Ver un marketplace de extensiones.
4. Activar extensiones (KPI, Encuestas, BI).
5. Ver cómo el menú se actualiza dinámicamente.
6. Gestionar usuarios, roles granulares y grupos.
7. Crear un KPI de ejemplo.
8. Navegar entre módulos.

---

# 🧱 Stack tecnológico sugerido

Usa este stack salvo que propongas uno mejor y lo justifiques:

**Frontend**

* React + TypeScript
* Vite o Next.js
* Tailwind CSS
* Componentes modulares
* Estado simple (Zustand o Context)

**Backend (ligero para demo)**

* Node.js + Express o NestJS
* API REST
* Datos mock en memoria o JSON
* Arquitectura preparada para escalar

---

# 📁 Estructura de directorios requerida

Debes generar algo similar a:

```
orquestra-demo/
  apps/
    web/
      src/
        components/
        layouts/
        pages/
        modules/
        store/
        services/
        types/
        mock/
  server/
    src/
      modules/
      routes/
      services/
      data/
  docs/
```

⚠️ Debes explicar brevemente el propósito de cada carpeta.

---

# 🧩 Componentes obligatorios a generar

## 🔷 Layouts

### 1. AppLayout

Debe incluir:

* Sidebar dinámica
* Header superior
* Área de contenido
* Soporte para menú por roles
* Soporte para módulos activados

Agregar comentarios explicando:

* Cómo se construye el menú
* Cómo se inyectan módulos

---

## 🔷 Navegación

### 2. Sidebar

Debe soportar:

* Items base
* Items por rol
* Items por extensión activada
* Estado colapsado
* Highlight activo

⚠️ Muy comentado.

---

### 3. HeaderBar

Debe incluir:

* Selector de rol (demo)
* Nombre de organización
* Botón de contacto
* Avatar de usuario

---

## 🔷 Landing

### 4. LandingPage

Secciones:

* Hero con CTA
* Beneficios
* Cómo funciona (3 pasos)
* Extensiones destacadas
* Beneficios cloud
* CTA final

Debe verse enterprise.

---

## 🔷 Marketplace de extensiones

### 5. ExtensionsMarketplace

Debe mostrar:

Extensiones mock:

* Indicadores KPI
* Encuestas
* Tableros BI

Cada tarjeta debe tener:

* Badge 🧩 EXTENSIÓN
* Estado (Disponible / Activo)
* Botón Habilitar

---

### 6. ExtensionCard

Reusable.

Props:

* name
* description
* status
* onActivate

---

# 📊 Módulos funcionales

## 7. KPI Module

Pantallas:

* KPIListPage
* CreateKPIModal
* KPIWidget (dashboard)

Funcionalidad mock:

* Crear KPI
* Listar KPI
* Mostrar semáforo

---

## 8. Surveys Module (extensión)

Pantallas:

* SurveyListPage
* SurveyResults (mock chart)

---

## 9. BI Module (extensión)

Pantalla:

* BIDashboard

Con gráficas mock (puede usar chart library simple).

---

# 🔐 Sistema de usuarios y seguridad (CLAVE)

## 10. User Management

Pantallas:

* UserListPage
* UserDetail

Debe permitir:

* Usuario con múltiples roles
* Chips de roles
* Asignación de grupos

---

## 11. Roles & Permissions

Pantalla crítica.

Debe incluir:

* Roles list
* PermissionMatrix

Permisos ejemplo:

* view_kpi
* edit_kpi
* activate_extensions
* manage_users

⚠️ Debe verse enterprise.

---

## 12. User Groups

Pantalla:

* GroupList
* GroupDetail

Funcionalidad mock:

* Crear grupo
* Asignar usuarios
* Asignar rol por grupo

---

# 🧠 Estado global requerido

Debes implementar store para:

* Rol actual
* Extensiones activas
* Usuario actual
* Organización actual

Debe permitir:

✅ Activar extensión
✅ Refrescar sidebar
✅ Cambiar rol

---

# ✨ Comportamientos críticos

Debes implementar:

### Activar extensión

Al hacer clic en Habilitar:

* Cambia estado a Activo
* Muestra toast
* Actualiza sidebar

---

### Sidebar dinámica

Debe recalcularse según:

* Rol
* Extensiones activas

---

### Datos mock

Crear carpeta:

```
mock/
```

Con:

* users.mock.ts
* roles.mock.ts
* extensions.mock.ts
* kpis.mock.ts

---

# 🎨 Estilo visual

Usar Tailwind.

Look:

* Enterprise moderno
* Mucho espacio en blanco
* Cards suaves
* Bordes redondeados
* Sombras ligeras

---

# 🧪 Nivel de fidelidad

Esto es un **demo de alto impacto**, no un MVP feo.

Debe:

* Verse profesional
* Ser navegable
* Tener estados realistas
* Tener loading y empty states básicos

---

# 📚 Documentación requerida

Debes generar en `/docs`:

* README.md con instrucciones
* Arquitectura.md
* Cómo agregar nuevas extensiones.md

---

# 🚨 Reglas estrictas

NO:

* No código desordenado
* No componentes gigantes
* No lógica duplicada
* No estilos inline caóticos

SÍ:

* Componentes pequeños
* Tipado fuerte
* Comentarios útiles
* Estructura enterprise

---

# ✅ Entregable esperado de la IA

La IA debe entregar:

1. Estructura de carpetas
2. Código base funcional
3. Componentes principales
4. Datos mock
5. Documentación mínima
6. Instrucciones para correr el proyecto

STACK NEXTJS, TAILWIND, SUPABASE