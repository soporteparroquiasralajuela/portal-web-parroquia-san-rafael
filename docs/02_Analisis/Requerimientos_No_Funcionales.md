# Requerimientos No Funcionales

| Campo | Valor |
|---|---|
| Documento | 02_Analisis/Requerimientos_No_Funcionales.md |
| Versión | 1.0 |
| Fecha de creación | 2026-08-05 |
| Estado | Vigente |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 5, 9, 17, 18, 19 |

---

## 1. Objetivo del documento

Registrar los requerimientos no funcionales (cómo debe comportarse el sistema) ya establecidos por el gobierno técnico del proyecto (CLAUDE.md), independientemente de las funcionalidades concretas que se definan más adelante.

## 2. Requerimientos no funcionales vigentes

| ID | Categoría | Descripción | Fuente (CLAUDE.md) |
|---|---|---|---|
| RNF-01 | Responsive | El sitio debe diseñarse con enfoque *Mobile First* usando el grid de Bootstrap 5 | Sección 7 |
| RNF-02 | Accesibilidad | Cumplir buenas prácticas WCAG: contraste suficiente, texto legible, `alt` en imágenes, jerarquía de encabezados correcta, navegación por teclado, ARIA cuando sea necesario | Sección 17 |
| RNF-03 | SEO | Uso correcto de `title`, `description`, Open Graph, URLs limpias, jerarquía H1–H6, texto alternativo, carga rápida | Sección 18 |
| RNF-04 | Rendimiento | Optimización de imágenes, CSS, JavaScript y tiempos de carga | Sección 19 |
| RNF-05 | Mantenibilidad | Código limpio, modular, sin duplicación; CSS con variables y sin `!important` salvo necesidad estricta | Secciones 4, 9, 10 |
| RNF-06 | Compatibilidad tecnológica | Uso exclusivo de HTML5, CSS3, Bootstrap 5 y JavaScript Vanilla; prohibido el uso de frameworks no autorizados | Sección 6 |
| RNF-07 | Documentación | Toda funcionalidad implementada debe quedar documentada de forma sincronizada con el código | Secciones 13, 15 |
| RNF-08 | Diseño institucional | El diseño debe transmitir institucionalidad, modernidad, limpieza, calidez, profesionalismo y accesibilidad, sin efectos exagerados ni sobrecarga visual | Sección 16 |

## 3. Estado

**Vigente.** Estos requerimientos ya están definidos por el gobierno del proyecto y aplican transversalmente a cualquier funcionalidad que se desarrolle. Se verifican mediante el [Checklist_Calidad.md](../06_Pruebas/Checklist_Calidad.md).

---

## Documentos relacionados

- [Requerimientos_Funcionales.md](Requerimientos_Funcionales.md)
- [Guia_Estilos.md](../04_Diseno/Guia_Estilos.md)
- [Checklist_Calidad.md](../06_Pruebas/Checklist_Calidad.md)
