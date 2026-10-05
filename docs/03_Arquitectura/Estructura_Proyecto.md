# Estructura del Proyecto

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Estructura_Proyecto.md |
| Versión | 1.2 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-10 |
| Estado | Vigente |
| Fuente | Estado real del repositorio + [CLAUDE.md](../../CLAUDE.md) sección 11 |

---

## 1. Objetivo del documento

Documentar la estructura real y actual de carpetas del repositorio, y el propósito de cada una según CLAUDE.md.

## 2. Árbol de directorios actual (raíz del repositorio)

```
.
├── index.html                  # Página de Inicio (implementada)
├── README.md
├── LICENSE                     # Vacío, licencia no definida
├── CLAUDE.md                   # Manual operativo / gobierno técnico del proyecto
├── .gitignore
│
├── assets/                     # Recursos estáticos
│   ├── css/                    # variables.css, main.css, components.css (globales);
│   │                           # home.css, parroquia.css, grupos.css, calendario.css (por página)
│   ├── js/                     # grupos.js, proximos-eventos.js
│   ├── fonts/                  # (vacía)
│   ├── icons/                  # (vacía)
│   ├── downloads/              # (vacía)
│   ├── videos/                 # (vacía)
│   └── img/
│       ├── eventos/            # (vacía)
│       ├── galeria/            # (vacía)
│       ├── grupos/             # (vacía)
│       ├── logo/               # Logo.jpeg
│       ├── parroquia/          # (vacía)
│       ├── sacerdotes/         # (vacía)
│       └── transmisiones/      # (vacía)
│
├── pages/                      # parroquia.html, grupos.html, calendario.html
├── netlify/
│   └── functions/              # proximos-eventos.mjs (Netlify Function de Google Calendar)
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

> Nota: Git no versiona carpetas vacías. Las carpetas marcadas como "(vacía)" existen en el entorno de trabajo del proyecto, pero no aparecen en una copia nueva del repositorio hasta que contengan archivos.

> Nota: `netlify/` es la única carpeta del árbol que no figura en la lista original de CLAUDE.md sección 11. Es la ubicación estándar de las Netlify Functions y se añadió, con autorización expresa, para la integración con Google Calendar (ver [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)). No hay `netlify.toml`: Netlify detecta esta carpeta por defecto.

## 3. Propósito de cada carpeta (según CLAUDE.md sección 11)

| Carpeta | Propósito | Estado actual |
|---|---|---|
| `assets/css/` | Hojas de estilo del proyecto | Con contenido: 3 globales y 4 específicas de página |
| `assets/js/` | Scripts JavaScript del sitio | Con contenido: `grupos.js` y `proximos-eventos.js` |
| `assets/img/` | Imágenes, organizadas por categoría (eventos, galería, grupos, logo, parroquia, sacerdotes, transmisiones — detalle en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)) | Todas vacías salvo `logo/` (`Logo.jpeg`) |
| `assets/fonts/` | Tipografías locales, si aplica | Vacía |
| `assets/icons/` | Iconografía propia (más allá de Bootstrap Icons) | Vacía |
| `assets/downloads/` | Archivos descargables (documentos, boletines, etc.) | Vacía |
| `assets/videos/` | Contenido de video | Vacía |
| `components/` | Fragmentos de interfaz reutilizables | Vacía |
| `pages/` | Páginas del sitio distintas de `index.html` | Con contenido: Parroquia, Grupos y Calendario |
| `netlify/functions/` | Netlify Functions (código serverless alojado en Netlify) | Con contenido: `proximos-eventos.mjs` |
| `config/` | Archivos de configuración del proyecto | Vacía |
| `data/` | Datos utilizados por el sitio | Vacía |
| `scripts/` | Scripts de utilidad / automatización | Vacía |
| `memory/` | Notas de contexto del proyecto para asistentes de desarrollo | Con contenido; no forma parte del sitio |
| `docs/` | Documentación oficial del proyecto | Vigente (ver [docs/README.md](../README.md)) |

## 4. Nota sobre carpetas heredadas

El repositorio contenía adicionalmente un conjunto de carpetas vacías bajo `docs/` (`arquitectura`, `diseño`, `entregables`, `manuales`, `requerimientos`, `reuniones`) creadas antes de la formalización de CLAUDE.md. No formaban parte de la estructura oficial definida en CLAUDE.md sección 14 y no contenían archivos. Ver la [Bitácora](../01_Gestion_Proyecto/Bitacora.md) para el registro del cambio de estructura documental.

## 5. Mapa del sitio

**Parcial.** Páginas implementadas: Inicio (`index.html`) y, en `pages/`, Parroquia, Grupos y Calendario. Aún no existen las páginas de Transmisiones, Servicios parroquiales (y sus páginas de segundo nivel) ni Contacto, aunque la navegación global ya enlaza a ellas. La arquitectura de navegación conceptual aprobada está en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 4. Un mapa del sitio formal, ligado a requerimientos funcionales confirmados, sigue pendiente (ver nota de contradicción en [Alcance.md](../01_Gestion_Proyecto/Alcance.md), sección 5, todavía no actualizada respecto a esta arquitectura conceptual).

---

## Documentos relacionados

- [Arquitectura_General.md](Arquitectura_General.md)
- [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)
- [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)
- [Alcance.md](../01_Gestion_Proyecto/Alcance.md)
- [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md)
