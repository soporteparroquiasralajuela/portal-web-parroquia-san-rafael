# Guía de Estilos

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Guia_Estilos.md |
| Versión | 1.0 |
| Fecha de creación | 2026-08-05 |
| Estado | Parcial — principios definidos, paleta y tipografía **pendientes** |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 6, 9, 16 |

---

## 1. Objetivo del documento

Definir los principios visuales del portal y, una vez establecidos, la paleta de colores, tipografía e iconografía oficiales.

## 2. Principios de diseño (vigentes, CLAUDE.md sección 16)

El diseño del portal debe transmitir:

- Institucionalidad
- Modernidad
- Limpieza
- Calidez
- Profesionalismo
- Accesibilidad

Restricciones explícitas:

- No utilizar efectos exagerados.
- No utilizar demasiados colores.
- Evitar sobrecargar la interfaz.

## 3. Restricciones técnicas vigentes

- Framework base: **Bootstrap 5**; el CSS personalizado complementa, no sobrescribe innecesariamente (sección 7).
- Uso de **variables CSS** y nomenclatura consistente (sección 9).
- Prohibido el uso de estilos inline y de `!important`, salvo necesidad estricta (sección 9).
- Iconografía autorizada: **Bootstrap Icons** (sección 6).
- Tipografía autorizada: **Google Fonts** (sección 6).

## 4. Paleta de colores

**Pendiente de definición.** No se ha establecido aún una paleta institucional. Se documentará aquí (colores primarios, secundarios, de acento, y de estado) una vez definida, respetando el principio de contraste suficiente (WCAG, ver [Requerimientos_No_Funcionales.md](../02_Analisis/Requerimientos_No_Funcionales.md)).

| Uso | Color (HEX) | Estado |
|---|---|---|
| Primario | — | Pendiente |
| Secundario | — | Pendiente |
| Acento | — | Pendiente |
| Fondo | — | Pendiente |
| Texto | — | Pendiente |

## 5. Tipografía

**Pendiente de definición.** Se seleccionará de Google Fonts, respetando legibilidad y jerarquía tipográfica.

| Uso | Familia tipográfica | Estado |
|---|---|---|
| Encabezados | — | Pendiente |
| Cuerpo de texto | — | Pendiente |

## 6. Iconografía

Se usará **Bootstrap Icons** como librería base (CLAUDE.md sección 6). No se han seleccionado íconos específicos aún, ya que depende del contenido funcional definido.

## 7. Estado

**Parcial.** Los principios y restricciones ya son vigentes; la paleta, tipografía e iconografía específicas están pendientes hasta la fase de Diseño UI/UX.

---

## Documentos relacionados

- [Componentes_UI.md](Componentes_UI.md)
- [CSS.md](../05_Desarrollo/CSS.md)
- [Requerimientos_No_Funcionales.md](../02_Analisis/Requerimientos_No_Funcionales.md)
