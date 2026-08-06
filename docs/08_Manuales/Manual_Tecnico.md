# Manual Técnico

| Campo | Valor |
|---|---|
| Documento | 08_Manuales/Manual_Tecnico.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-08-05 |
| Estado | Vigente (estado actual del proyecto) |

---

## 1. Objetivo del documento

Permitir que un desarrollador externo comprenda el estado técnico actual del proyecto y pueda continuarlo, únicamente leyendo esta documentación (CLAUDE.md sección 28).

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 + Bootstrap 5 |
| Interactividad | JavaScript Vanilla |
| Iconografía | Bootstrap Icons |
| Tipografía | Google Fonts |
| Control de versiones | Git / GitHub |
| Hosting previsto | Netlify (no configurado aún) |

No existe backend, base de datos, ni proceso de build (no hay `package.json` en el repositorio).

## 3. Requisitos para trabajar en el proyecto

- Editor de código.
- Navegador web moderno.
- Git instalado.
- No se requiere instalar dependencias de Node.js a la fecha, ya que el proyecto no tiene proceso de build.

## 4. Cómo previsualizar el sitio actualmente

Al ser un sitio estático sin build, el archivo [index.html](../../index.html) puede abrirse directamente en el navegador o servirse con cualquier servidor estático simple. A la fecha, `index.html` no tiene contenido visible (solo boilerplate HTML5), por lo que no hay una experiencia funcional que previsualizar todavía.

## 5. Estructura del repositorio

Ver el detalle completo en [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md).

## 6. Estado actual del código

| Elemento | Estado |
|---|---|
| `index.html` | Boilerplate vacío |
| `assets/css`, `assets/js` | Vacíos |
| `components/`, `pages/`, `config/`, `data/`, `scripts/` | Vacíos |
| Funcionalidad | Ninguna implementada |

## 7. Gobierno técnico

Todas las reglas técnicas, de arquitectura, diseño y calidad están centralizadas en [CLAUDE.md](../../CLAUDE.md), documento que actúa como fuente única de verdad del proyecto.

## 8. Mantenimiento

**Pendiente.** No existe todavía ningún patrón real de desarrollo (cero páginas, cero componentes implementados) sobre el cual documentar un procedimiento de mantenimiento; escribirlo ahora sería especulativo.

**Objetivo de esta sección (cuando se complete):** explicar cómo agregar una página nueva siguiendo la convención de nombres ([Convenciones.md](../05_Desarrollo/Convenciones.md)), cómo actualizar contenido e imágenes, cómo actualizar la versión de Bootstrap, y el procedimiento de respaldo del repositorio.

**Se completará** en cuanto exista al menos una página funcional real que sirva de referencia, evitando documentar un proceso de mantenimiento antes de que exista algo que mantener.

---

## Documentos relacionados

- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
- [Convenciones.md](../05_Desarrollo/Convenciones.md)
