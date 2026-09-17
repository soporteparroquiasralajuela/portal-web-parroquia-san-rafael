# Estructura del Proyecto

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Estructura_Proyecto.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-09-16 |
| Estado | Vigente |
| Fuente | Estado real del repositorio + [CLAUDE.md](../../CLAUDE.md) sección 11 |

---

## 1. Objetivo del documento

Documentar la estructura real y actual de carpetas del repositorio, y el propósito de cada una según CLAUDE.md.

## 2. Árbol de directorios actual (raíz del repositorio)

```
.
├── index.html                  # Punto de entrada del sitio (vacío, solo boilerplate)
├── README.md
├── LICENSE                     # Vacío, licencia no definida
├── CLAUDE.md                   # Manual operativo / gobierno técnico del proyecto
├── .gitignore
│
├── assets/                     # Recursos estáticos
│   ├── css/                    # (vacía)
│   ├── js/                     # (vacía)
│   ├── fonts/                  # (vacía)
│   ├── icons/                  # (vacía)
│   ├── downloads/               # (vacía)
│   ├── videos/                  # (vacía)
│   └── img/
│       ├── eventos/             # (vacía)
│       ├── galeria/             # (vacía)
│       ├── grupos/              # (vacía)
│       ├── logo/                # Logo.jpeg
│       ├── parroquia/           # (vacía)
│       ├── sacerdotes/          # (vacía)
│       └── transmisiones/       # (vacía)
│
├── components/                  # Componentes de interfaz reutilizables (vacía)
├── pages/                       # Páginas del sitio (vacía)
├── config/                      # Configuración del proyecto (vacía)
├── data/                        # Datos del sitio (vacía)
├── scripts/                     # Scripts / utilidades (vacía)
│
└── docs/                        # Documentación oficial del proyecto
    └── (ver estructura en docs/README.md)
```

> Nota: `assets/img/` ya no tiene una carpeta `ministerios/`; fue reemplazada por `grupos/`, alineada con el ítem de navegación "Grupos" (ver [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)). Se agregó además `transmisiones/`. El detalle y propósito de cada categoría de `assets/img/` se documenta en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 3, para no duplicarlo aquí.

## 3. Propósito de cada carpeta (según CLAUDE.md sección 11)

| Carpeta | Propósito | Estado actual |
|---|---|---|
| `assets/css/` | Hojas de estilo del proyecto | Vacía |
| `assets/js/` | Scripts JavaScript del sitio | Vacía |
| `assets/img/` | Imágenes, organizadas por categoría (eventos, galería, grupos, logo, parroquia, sacerdotes, transmisiones — detalle en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)) | Todas vacías salvo `logo/` (`Logo.jpeg`) |
| `assets/fonts/` | Tipografías locales, si aplica | Vacía |
| `assets/icons/` | Iconografía propia (más allá de Bootstrap Icons) | Vacía |
| `assets/downloads/` | Archivos descargables (documentos, boletines, etc.) | Vacía |
| `assets/videos/` | Contenido de video | Vacía |
| `components/` | Fragmentos de interfaz reutilizables | Vacía |
| `pages/` | Páginas del sitio distintas de `index.html` | Vacía |
| `config/` | Archivos de configuración del proyecto | Vacía |
| `data/` | Datos utilizados por el sitio | Vacía |
| `scripts/` | Scripts de utilidad / automatización | Vacía |
| `docs/` | Documentación oficial del proyecto | En construcción (esta entrega) |

## 4. Nota sobre carpetas heredadas

El repositorio contenía adicionalmente un conjunto de carpetas vacías bajo `docs/` (`arquitectura`, `diseño`, `entregables`, `manuales`, `requerimientos`, `reuniones`) creadas antes de la formalización de CLAUDE.md. No formaban parte de la estructura oficial definida en CLAUDE.md sección 14 y no contenían archivos. Ver la [Bitácora](../01_Gestion_Proyecto/Bitacora.md) para el registro del cambio de estructura documental.

## 5. Mapa del sitio

**Parcial.** `pages/` sigue vacía (no hay páginas implementadas), pero ya existe una arquitectura de navegación conceptual aprobada — ver [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 4. Un mapa del sitio formal, ligado a requerimientos funcionales confirmados, sigue pendiente (ver nota de contradicción en [Alcance.md](../01_Gestion_Proyecto/Alcance.md), sección 5, todavía no actualizada respecto a esta arquitectura conceptual).

---

## Documentos relacionados

- [Arquitectura_General.md](Arquitectura_General.md)
- [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)
- [Alcance.md](../01_Gestion_Proyecto/Alcance.md)
- [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md)
