# Alcance del Proyecto

| Campo | Valor |
|---|---|
| Documento | 01_Gestion_Proyecto/Alcance.md |
| Versión | 1.0 |
| Fecha de creación | 2026-08-05 |
| Estado | Vigente (alcance tecnológico) / Pendiente (alcance funcional) |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 6, 11 y 22 |

---

## 1. Objetivo del documento

Delimitar qué está dentro y qué está fuera del proyecto, en función de lo definido en CLAUDE.md. Este documento **no define funcionalidades del sitio**, ya que aún no han sido levantadas formalmente (ver [Requerimientos_Funcionales.md](../02_Analisis/Requerimientos_Funcionales.md)).

## 2. Dentro del alcance — Tecnologías autorizadas

| Categoría | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 |
| Framework CSS | Bootstrap 5 |
| Interactividad | JavaScript Vanilla |
| Iconografía | Bootstrap Icons |
| Tipografía | Google Fonts |

## 3. Fuera del alcance — Tecnologías no autorizadas

Según CLAUDE.md sección 6, quedan explícitamente excluidas:

- React, Angular, Vue, Svelte
- Tailwind CSS
- jQuery (salvo autorización explícita)
- Node.js como framework de aplicación
- PHP, Laravel, ASP.NET
- Cualquier otro framework no aprobado

## 4. Alcance arquitectónico

El proyecto debe respetar la estructura de carpetas definida en CLAUDE.md sección 11 (`assets/`, `components/`, `pages/`, `config/`, `data/`, `scripts/`, `docs/`). El detalle del estado actual de esta estructura se documenta en [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md).

## 5. Alcance funcional — estado actual

**No se ha definido aún el alcance funcional del sitio** (páginas, secciones, contenido). CLAUDE.md sección 22 únicamente ofrece **ejemplos de convención de nombres** de archivo, no una lista confirmada de páginas del sitio:

```
about.html
historia.html
sacramentos.html
ministerios.html
eventos.html
contacto.html
```

Estos nombres se documentan aquí como referencia de convención de nomenclatura, **no como funcionalidades comprometidas**. El alcance funcional real se definirá y documentará formalmente en la fase de Análisis ([Requerimientos_Funcionales.md](../02_Analisis/Requerimientos_Funcionales.md), [Casos_de_Uso.md](../02_Analisis/Casos_de_Uso.md)) antes de iniciar cualquier desarrollo.

## 6. Alcance documental

Debe mantenerse la estructura documental completa definida en CLAUDE.md sección 14, cubriendo gestión de proyecto, análisis, arquitectura, diseño, desarrollo, pruebas, despliegue, manuales y entregables.

## 7. Estado actual del proyecto respecto al alcance

| Dimensión | Estado |
|---|---|
| Alcance tecnológico | Definido y vigente |
| Alcance arquitectónico (carpetas) | Definido; contenido pendiente de desarrollo |
| Alcance funcional (páginas/contenido) | Pendiente de levantamiento |
| Alcance documental | En construcción (esta entrega) |

---

## Documentos relacionados

- [Vision.md](Vision.md)
- [Objetivos.md](Objetivos.md)
- [Requerimientos_Funcionales.md](../02_Analisis/Requerimientos_Funcionales.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
