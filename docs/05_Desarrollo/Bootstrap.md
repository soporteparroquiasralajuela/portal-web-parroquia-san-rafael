# Estándar de uso de Bootstrap

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/Bootstrap.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-08-05 |
| Estado | Vigente — fuente única del inventario de componentes |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 7 |

---

## 1. Objetivo del documento

Definir cómo debe utilizarse Bootstrap en el proyecto.

## 2. Reglas vigentes

- **Bootstrap 5** es el framework CSS principal del proyecto.
- Todo el diseño debe construirse **Mobile First**.
- No sobrescribir Bootstrap innecesariamente; el CSS personalizado debe **complementarlo**, no reemplazarlo.

## 3. Componentes autorizados

| Componente | Uso previsto |
|---|---|
| Container | Estructura general de página |
| Grid | Layout responsive |
| Cards | Bloques de contenido |
| Navbar | Navegación principal |
| Accordion | Contenido colapsable agrupado |
| Collapse | Mostrar/ocultar contenido |
| Carousel | Galerías / contenido destacado |
| Offcanvas | Menús laterales |
| Modal | Ventanas emergentes |
| Buttons | Acciones e interacción |
| Utilities (Flex, Spacing, Typography) | Ajustes de layout y tipografía |

Este documento es la **fuente única de verdad** del inventario de componentes autorizados. [Componentes_UI.md](../04_Diseno/Componentes_UI.md) no repite esta lista: solo registra en qué página se usa cada componente conforme se implementa, evitando mantener el mismo inventario en dos archivos.

## 4. Estado

**Vigente como norma.** Ningún componente ha sido implementado aún (ver [Componentes_UI.md](../04_Diseno/Componentes_UI.md)).

---

## Documentos relacionados

- [Componentes_UI.md](../04_Diseno/Componentes_UI.md)
- [Convenciones.md](Convenciones.md)
