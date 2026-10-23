# Estructura del Proyecto

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Estructura_Proyecto.md |
| Versión | 1.6 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-22 |
| Estado | Vigente |
| Fuente | Estado real del repositorio + [CLAUDE.md](../../CLAUDE.md) sección 11 |

---

## 1. Objetivo del documento

Documentar la estructura real y actual de carpetas del repositorio, y el propósito de cada una según CLAUDE.md.

## 2. Árbol de directorios actual (raíz del repositorio)

```
.
├── index.html                  # Página de Inicio (implementada)
├── favicon.ico                 # Favicon institucional (derivado del logotipo)
├── README.md
├── LICENSE                     # Vacío, licencia no definida
├── CLAUDE.md                   # Manual operativo / gobierno técnico del proyecto
├── .gitignore
│
├── assets/                     # Recursos estáticos
│   ├── css/                    # variables.css, main.css, components.css (globales);
│   │                           # home.css, parroquia.css, grupos.css, calendario.css, transmisiones.css, contacto.css (por página)
│   ├── js/                     # grupos.js, proximos-eventos.js, transmisiones.js, galeria-parroquia.js
│   ├── fonts/                  # (vacía)
│   ├── icons/                  # favicon-32x32.png, apple-touch-icon.png
│   ├── downloads/              # (vacía)
│   ├── videos/                 # (vacía)
│   └── img/
│       ├── eventos/            # (vacía)
│       ├── galeria/            # Carrusel de Inicio (3 PNG originales + 4 versiones WebP de cada uno)
│       ├── grupos/             # (vacía)
│       ├── logo/               # Logo.jpeg
│       ├── parroquia/          # Hero, historia, patrono, Hero de Inicio, Diaconía y galería (parroquiagal1–12; originales + WebP)
│       ├── sacerdotes/         # (vacía)
│       └── transmisiones/      # (vacía)
│
├── pages/                      # parroquia.html, grupos.html, calendario.html, transmisiones.html, contacto.html
├── netlify/
│   └── functions/              # proximos-eventos.mjs (Google Calendar), transmision-actual.mjs (YouTube)
├── components/                 # Componentes de interfaz reutilizables (vacía)
├── config/                     # Configuración del proyecto (vacía)
├── data/                       # Datos del sitio (vacía)
├── scripts/                    # Scripts / utilidades (vacía)
├── memory/                     # Notas de contexto del proyecto para asistentes de desarrollo (no forma parte del sitio)
│
└── docs/                        # Documentación oficial del proyecto
    └── (ver estructura en docs/README.md)
```

> Nota: `assets/img/` ya no tiene una carpeta `ministerios/`; fue reemplazada por `grupos/`, alineada con el ítem de navegación "Grupos" (ver [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)). Se agregó además `transmisiones/`. El detalle y propósito de cada categoría de `assets/img/` se documenta en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 3, para no duplicarlo aquí.

> Nota: durante la revisión visual se usa una carpeta local `_capturas_revision/` (capturas de pantalla) que **no** se versiona ni forma parte del sitio.

> Nota: Git no versiona carpetas vacías. Las carpetas marcadas como "(vacía)" existen en el entorno de trabajo del proyecto, pero no aparecen en una copia nueva del repositorio hasta que contengan archivos.

> Nota: `netlify/` es la única carpeta del árbol que no figura en la lista original de CLAUDE.md sección 11. Es la ubicación estándar de las Netlify Functions y se añadió, con autorización expresa, para la integración con Google Calendar (ver [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)) y se amplió, también con autorización expresa, para la integración con YouTube (ver [Integracion_YouTube.md](Integracion_YouTube.md)). No hay `netlify.toml`: Netlify detecta esta carpeta por defecto.

## 3. Propósito de cada carpeta (según CLAUDE.md sección 11)

| Carpeta | Propósito | Estado actual |
|---|---|---|
| `assets/css/` | Hojas de estilo del proyecto | Con contenido: 3 globales y 6 específicas de página |
| `assets/js/` | Scripts JavaScript del sitio | Con contenido: `grupos.js`, `proximos-eventos.js`, `transmisiones.js` y `galeria-parroquia.js` |
| `assets/img/` | Imágenes, organizadas por categoría (eventos, galería, grupos, logo, parroquia, sacerdotes, transmisiones — detalle en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)) | Con contenido: `logo/` (`Logo.jpeg`) y `parroquia/` (recreaciones digitales en PNG y WebP; ver [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 12); el resto, vacías |
| `assets/fonts/` | Tipografías locales, si aplica | Vacía |
| `assets/icons/` | Iconografía propia (más allá de Bootstrap Icons) | Con contenido: favicon de 32 px y `apple-touch-icon.png`; el `favicon.ico` vive en la raíz |
| `assets/downloads/` | Archivos descargables (documentos, boletines, etc.) | Vacía |
| `assets/videos/` | Contenido de video | Vacía |
| `components/` | Fragmentos de interfaz reutilizables | Vacía |
| `pages/` | Páginas del sitio distintas de `index.html` | Con contenido: Parroquia, Grupos, Calendario, Transmisiones y Contacto |
| `netlify/functions/` | Netlify Functions (código serverless alojado en Netlify) | Con contenido: `proximos-eventos.mjs` y `transmision-actual.mjs` |
| `config/` | Archivos de configuración del proyecto | Vacía |
| `data/` | Datos utilizados por el sitio | Vacía |
| `scripts/` | Scripts de utilidad / automatización | Vacía |
| `memory/` | Notas de contexto del proyecto para asistentes de desarrollo | Con contenido; no forma parte del sitio |
| `docs/` | Documentación oficial del proyecto | Vigente (ver [docs/README.md](../README.md)) |

## 4. Nota sobre carpetas heredadas

El repositorio contenía adicionalmente un conjunto de carpetas vacías bajo `docs/` (`arquitectura`, `diseño`, `entregables`, `manuales`, `requerimientos`, `reuniones`) creadas antes de la formalización de CLAUDE.md. No formaban parte de la estructura oficial definida en CLAUDE.md sección 14 y no contenían archivos. Ver la [Bitácora](../01_Gestion_Proyecto/Bitacora.md) para el registro del cambio de estructura documental.

## 5. Mapa del sitio

**Parcial.** Páginas implementadas: Inicio (`index.html`) y, en `pages/`, Parroquia, Grupos, Calendario, Transmisiones y Contacto. Aún no existen las páginas de Servicios parroquiales (y sus páginas de segundo nivel), aunque la navegación global ya enlaza a ellas. La arquitectura de navegación conceptual aprobada está en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 4. Un mapa del sitio formal, ligado a requerimientos funcionales confirmados, sigue pendiente (ver nota de contradicción en [Alcance.md](../01_Gestion_Proyecto/Alcance.md), sección 5, todavía no actualizada respecto a esta arquitectura conceptual).

---

## Documentos relacionados

- [Arquitectura_General.md](Arquitectura_General.md)
- [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)
- [Integracion_YouTube.md](Integracion_YouTube.md)
- [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)
- [Alcance.md](../01_Gestion_Proyecto/Alcance.md)
- [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md)
