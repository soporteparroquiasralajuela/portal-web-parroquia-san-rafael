# Estándar HTML

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/HTML.md |
| Versión | 1.0 |
| Fecha de creación | 2026-08-05 |
| Estado | Vigente |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 8 |

---

## 1. Objetivo del documento

Establecer el estándar de escritura de HTML del proyecto.

## 2. Reglas vigentes

- Seguir **HTML5 semántico**.
- Utilizar correctamente las etiquetas semánticas:

| Etiqueta | Uso |
|---|---|
| `header` | Encabezado de página o sección |
| `main` | Contenido principal único de la página |
| `footer` | Pie de página o sección |
| `section` | Agrupación temática de contenido |
| `article` | Contenido autocontenido y reutilizable |
| `aside` | Contenido relacionado, no principal |
| `nav` | Bloques de navegación |
| `figure` / `figcaption` | Contenido multimedia con descripción |
| `time` | Fechas y horas |
| `address` | Información de contacto |

- Evitar el uso de `div` innecesarios cuando exista una etiqueta semántica adecuada.

## 3. Estado actual

`index.html` existe pero está vacío (solo boilerplate `<!doctype html>`, `head` y `body` vacío). No hay HTML funcional que auditar todavía.

## 4. Estado

**Vigente como norma.** Se aplicará desde la primera implementación de contenido HTML.

---

## Documentos relacionados

- [Convenciones.md](Convenciones.md)
- [Requerimientos_No_Funcionales.md](../02_Analisis/Requerimientos_No_Funcionales.md)
