# Guía de Estilos

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Guia_Estilos.md |
| Versión | 2.0 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-09-28 |
| Estado | Vigente — Design System cerrado |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 6, 9, 16; logo oficial de la parroquia (paleta); [assets/css/variables.css](../../assets/css/variables.css) |

---

## 1. Objetivo del documento

Definir de forma cerrada y reutilizable el Design System del portal: paleta institucional, colores neutros y semánticos, tipografías, jerarquía tipográfica, fondos, botones, bordes, radios, sombras, espaciado y consideraciones de accesibilidad. Toda esta información tiene su reflejo exacto en [assets/css/variables.css](../../assets/css/variables.css); ningún valor de este documento debe divergir de ese archivo.

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

## 4. Historial de la paleta

La paleta institucional vigente se deriva de los colores del logotipo oficial de la Parroquia San Rafael Arcángel. La paleta anterior ("Luz Compartida", heredada de un archivo Figma de referencia) queda retirada como paleta institucional. Los tokens de tipografía, espaciado, radios y sombras de ese mismo Figma se mantienen sin cambios — solo se sustituyó el color.

## 5. Paleta institucional

| Token | HEX | Rol |
|---|---|---|
| `--color-primary` | `#1D2A54` | Azul institucional principal — color de marca dominante (navbar, footer, botones primarios, enlaces activos) |
| `--color-primary-dark` | `#141D39` | Estado hover/active de elementos en `--color-primary`. Derivado del mismo tono al ~68% de luminosidad, preservando el matiz |
| `--color-secondary` | `#DA981B` | Dorado institucional principal — segundo color de marca; llamadas a la acción cálidas, acentos destacados |
| `--color-secondary-dark` | `#B46912` | Ocre / dorado oscuro — complementario; estado hover/active de elementos en `--color-secondary`, y acentos que requieran mayor contraste que el dorado principal |
| `--color-highlight` | `#F9C94C` | Dorado claro — **uso moderado**: pequeños detalles, subrayados, íconos o resaltes puntuales. No usar como color de fondo extenso ni como color de texto |

## 6. Colores neutros (funcionales)

| Token | HEX | Rol |
|---|---|---|
| `--color-bg` | `#F7F5F1` | Fondo general de página (crema cálido) |
| `--color-bg-alt` | `#FFFFFF` | Fondo alterno — tarjetas, encabezados de formulario, superficies elevadas |
| `--color-text-primary` | `#2B2B2B` | Texto principal (títulos, cuerpo, botones sobre fondos claros) |
| `--color-text-secondary` | `#5C5750` | Texto secundario (subtítulos, notas, pies de foto) |
| `--color-border-light` | `#EAE6DE` | Bordes sutiles entre secciones y componentes |

Estos colores no derivan del logo; son neutros funcionales de interfaz y se conservan sin cambio respecto a la paleta anterior.

## 7. Colores semánticos (funcionales)

| Token | HEX | Rol |
|---|---|---|
| `--color-state-success` | `#4B7A51` | Confirmaciones, mensajes de éxito |
| `--color-state-warning` | `#C98A2C` | Advertencias |
| `--color-state-error` | `#B3413B` | Errores, validaciones fallidas |

No derivan del logo ni requieren derivar de él — son colores de estado estándar de interfaz, sin uso todavía en el código (no hay formularios ni validaciones implementadas aún).

## 8. Tipografías

| Familia | Token | Uso |
|---|---|---|
| Cormorant Garamond | `--font-heading` | Encabezados y títulos (Display, H1–H4) |
| Poppins | `--font-accent` | Navegación, botones, etiquetas y elementos de acento |
| Nunito Sans | `--font-body` | Cuerpo de texto |

## 9. Jerarquía tipográfica

Escala responsive (móvil / tablet ≥768px / escritorio ≥1200px). Todos los tamaños viven en `variables.css`.

| Nivel | Familia | Peso | Tamaño (móvil / tablet / escritorio) | Variables | Uso |
|---|---|---|---|---|---|
| Display/Hero | Cormorant Garamond | 700 (Bold) | 32 / 42 / 52 px | `--fs-display`, `--weight-bold` | Titular principal del Hero de cada página |
| H1 | Cormorant Garamond | 700 (Bold) | 28 / 34 / 40 px | `--fs-h1`, `--weight-bold` | Título principal de una página sin Hero propio |
| H2 | Cormorant Garamond | 600 (SemiBold) | 22 / 27 / 32 px | `--fs-h2`, `--weight-semibold` | Título de sección (p. ej. "Próximos eventos") |
| H3 | Cormorant Garamond | 600 (SemiBold) | 19 / 21 / 24 px | `--fs-h3`, `--weight-semibold` | Subtítulo de sección o título de tarjeta destacada |
| H4 | Cormorant Garamond | 500 (Medium) | 17 / 18 / 20 px | `--fs-h4`, `--weight-medium` | Título menor (p. ej. dentro de una tarjeta) |
| Body | Nunito Sans | 400 (Regular) | 16 / 16 / 18 px | `--fs-body`, `--weight-regular` | Texto de párrafo estándar |
| Body small | Nunito Sans | 400 (Regular) | 14 / 14 / 15 px | `--fs-body-sm`, `--weight-regular` | Texto secundario, notas, pies de foto |
| Eyebrow/label | Poppins | 600 (SemiBold) | 11 / 12 / 12 px | `--fs-eyebrow`, `--weight-semibold` | Etiquetas cortas en mayúsculas: badges, antetítulos, encabezados de columna de footer |
| Botones | Poppins | 600 (SemiBold) | 16 / 16 / 16 px | `--fs-button`, `--weight-semibold` | Texto de botones |
| Navegación | Poppins | 500 (Medium) | 15 / 16 / 16 px | `--fs-nav`, `--weight-medium` | Enlaces del navbar |

Interlineado: `--lh-heading: 1.2` (Display/H1–H4) y `--lh-body: 1.6` (Body/Body small), ambos ya en uso implícito en `main.css` y ahora formalizados como variables reutilizables.

### 9.1 Pesos a cargar desde Google Fonts

Para cubrir toda la jerarquía sin cargar pesos innecesarios:

| Familia | Pesos necesarios |
|---|---|
| Cormorant Garamond | 500, 600, 700 |
| Poppins | 500, 600 |
| Nunito Sans | 400 |

`index.html` hoy solo carga Cormorant Garamond 700, Poppins 600 y Nunito Sans 400 (suficiente únicamente para la landing "en construcción"). Al implementar componentes que usen H2–H4 o navegación, habrá que ampliar el `<link>` de Google Fonts con los pesos 500 y 600 de Cormorant Garamond y 500 de Poppins.

## 10. Fondos

- `--color-bg` (crema): fondo por defecto de la página y de secciones generales.
- `--color-bg-alt` (blanco): tarjetas, formularios y cualquier superficie que deba destacar ligeramente sobre el fondo general.
- No usar `--color-primary`, `--color-secondary` ni `--color-highlight` como fondo de bloques extensos de texto — son colores de marca/acento, no de fondo de lectura (principio de "no sobrecargar la interfaz", sección 2).

## 11. Botones

| Rol | Fondo | Texto | Hover/Active |
|---|---|---|---|
| Primario | `--color-primary` | Blanco | Fondo `--color-primary-dark` |
| Secundario / CTA cálido | `--color-secondary` | `--color-text-primary` (**no blanco**, ver sección 13) | Fondo `--color-secondary-dark` |
| Outline | Transparente, borde `--color-text-secondary` | `--color-text-secondary` | Fondo `--color-text-secondary`, texto blanco |

Tipografía de botones: Poppins 600, `--fs-button` (sección 9). Radio: `--radius-sm`. Sombra: `--shadow-sm` en reposo, `--shadow-hover` al pasar el cursor.

El mapeo exacto de qué botón usa cada rol en cada página (p. ej. el CTA dorado del Hero de Inicio) se definirá en [Componentes_UI.md](Componentes_UI.md) al implementar cada página — este documento fija las reglas de color/tipografía, no el detalle de cada instancia.

## 12. Bordes y radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 8px | Botones, inputs |
| `--radius-md` | 12px | Tarjetas |
| `--radius-pill` | 999px | Badges, íconos circulares (redes sociales, logo) |
| `--color-border-light` | `#EAE6DE` | Color de borde estándar para separar componentes sin usar sombra |

## 13. Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-sm` | `0 2px 6px rgba(31,41,56,0.08)` | Elevación sutil en reposo (botones, tarjetas) |
| `--shadow-hover` | `0 6px 16px rgba(31,41,56,0.14)` | Elevación al interactuar (hover/focus) |

Estos valores no se recalcularon a partir de la nueva paleta (siguen usando un neutro oscuro independiente del azul institucional): funcionan igual de bien con cualquier color de marca y CLAUDE.md pide no rediseñar innecesariamente lo que ya funciona.

## 14. Espaciado

Escala base de 8px, sin cambios:

| Token | Valor |
|---|---|
| `--space-1` | 8px |
| `--space-2` | 16px |
| `--space-3` | 24px |
| `--space-4` | 32px |
| `--space-5` | 48px |
| `--space-6` | 64px |
| `--space-7` | 96px |

## 15. Uso recomendado de cada color

| Color | Cuándo usarlo | Cuándo evitarlo |
|---|---|---|
| `--color-primary` (#1D2A54) | Navbar, footer, botones primarios, enlaces activos, elementos de marca dominantes | Como color de texto sobre fondos oscuros (usar blanco) |
| `--color-primary-dark` (#141D39) | Hover/active de lo anterior | Como color base (reservado a interacción) |
| `--color-secondary` (#DA981B) | CTAs cálidos, acentos que deban destacar (p. ej. botón principal del Hero), badges | Como color de texto pequeño sobre fondo blanco (contraste insuficiente, ver sección 16) |
| `--color-secondary-dark` (#B46912) | Hover/active de lo anterior; acentos que requieran más contraste que el dorado principal | Bloques grandes de fondo con texto pequeño encima |
| `--color-highlight` (#F9C94C) | Detalles puntuales, subrayados decorativos, pequeños resaltes | Fondos extensos, texto, o cualquier uso que compita visualmente con `--color-secondary` |
| Neutros (`--color-bg`, `--color-bg-alt`, textos, bordes) | Base de toda la interfaz | — |
| Semánticos (éxito/advertencia/error) | Únicamente para retroalimentación de estado (formularios, validaciones) | Como colores decorativos |

## 16. Consideraciones de contraste y accesibilidad (WCAG)

Contraste calculado (fórmula de luminancia relativa WCAG 2.x) para las combinaciones relevantes de la nueva paleta:

| Combinación | Ratio aproximado | Resultado |
|---|---|---|
| Blanco sobre `--color-primary` (#1D2A54) | ≈13.9:1 | Cumple AAA |
| Blanco sobre `--color-primary-dark` (#141D39) | ≈16.6:1 | Cumple AAA |
| `--color-text-primary` sobre `--color-secondary` (#DA981B) | ≈5.7:1 | Cumple AA (texto normal) |
| **Blanco sobre `--color-secondary`** (#DA981B) | ≈2.5:1 | **No cumple** — no usar |
| Blanco sobre `--color-secondary-dark` (#B46912) | ≈4.2:1 | Cumple AA solo para texto grande/negrita o iconos; no usar en texto pequeño |
| `--color-text-primary` sobre `--color-highlight` (#F9C94C) | ≈9.1:1 | Cumple AAA |
| `--color-text-secondary` sobre `--color-bg` | ≈6.6:1 | Cumple AA |

**Regla de oro:** sobre cualquier fondo dorado (`--color-secondary` o `--color-highlight`), usar siempre `--color-text-primary` (oscuro) como color de texto — nunca blanco. El blanco solo se usa sobre `--color-primary` o `--color-primary-dark`.

Otras reglas heredadas de CLAUDE.md sección 17 (siguen vigentes, sin cambio): texto legible, `alt` en imágenes, jerarquía de encabezados correcta, navegación por teclado, ARIA cuando sea necesario.

## 17. Iconografía

Se usará **Bootstrap Icons** como librería base (CLAUDE.md sección 6). La selección de íconos específicos por componente/página sigue pendiente — no bloquea el cierre del Design System de color/tipografía, se define al implementar cada componente en [Componentes_UI.md](Componentes_UI.md).

## 18. Estado

**Vigente — Design System cerrado.** Paleta, tipografía, jerarquía tipográfica, fondos, botones, bordes, radios, sombras, espaciado y contraste están definidos y reflejados en `variables.css`. Lo único que queda abierto (y no es parte del Design System base) es la selección de íconos específicos por componente, que se resuelve caso a caso durante la implementación.

---

## Documentos relacionados

- [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md)
- [Componentes_UI.md](Componentes_UI.md)
- [CSS.md](../05_Desarrollo/CSS.md)
- [Requerimientos_No_Funcionales.md](../02_Analisis/Requerimientos_No_Funcionales.md)
