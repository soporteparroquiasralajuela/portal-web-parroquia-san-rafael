# Guía de Estilos

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Guia_Estilos.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-09-16 |
| Estado | Parcial — principios definidos, paleta y tipografía **pendientes de extracción formal** |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 6, 9, 16; [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md) |

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

Existe ya una referencia visual aprobada: los siete diseños conceptuales en [Referencias_Conceptuales/](Referencias_Conceptuales/) (ver [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md)) definen la dirección visual del portal. Sin embargo, **no se han transcrito aquí valores HEX exactos** para evitar registrar una paleta formal sin verificarla directamente contra el archivo de diseño durante la implementación. Se completará esta tabla al implementar, extrayendo los colores reales de esas referencias y respetando el principio de contraste suficiente (WCAG, ver [Requerimientos_No_Funcionales.md](../02_Analisis/Requerimientos_No_Funcionales.md)).

| Uso | Color (HEX) | Estado |
|---|---|---|
| Primario | — | Pendiente |
| Secundario | — | Pendiente |
| Acento | — | Pendiente |
| Fondo | — | Pendiente |
| Texto | — | Pendiente |

## 5. Tipografía

**Pendiente de definición formal.** Se seleccionará de Google Fonts, respetando legibilidad y jerarquía tipográfica, y tomando como referencia visual las fuentes utilizadas en los diseños conceptuales aprobados ([Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md)).

| Uso | Familia tipográfica | Estado |
|---|---|---|
| Encabezados | — | Pendiente |
| Cuerpo de texto | — | Pendiente |

## 6. Iconografía

Se usará **Bootstrap Icons** como librería base (CLAUDE.md sección 6). No se han seleccionado íconos específicos aún, ya que depende del contenido funcional definido.

## 7. Estado

**Parcial.** Los principios y restricciones ya son vigentes. Existe ya una referencia visual aprobada (sección 4), pero la extracción formal de paleta, tipografía e iconografía específicas sigue pendiente hasta la implementación.

---

## Documentos relacionados

- [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md)
- [Componentes_UI.md](Componentes_UI.md)
- [CSS.md](../05_Desarrollo/CSS.md)
- [Requerimientos_No_Funcionales.md](../02_Analisis/Requerimientos_No_Funcionales.md)
