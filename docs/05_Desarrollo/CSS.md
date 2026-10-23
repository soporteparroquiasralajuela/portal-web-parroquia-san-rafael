# Estándar CSS

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/CSS.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-22 |
| Estado | Vigente |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 9 |

---

## 1. Objetivo del documento

Establecer el estándar de escritura de CSS del proyecto.

## 2. Reglas vigentes

- Separar estilos por responsabilidad (archivos/organización clara dentro de `assets/css/`).
- Utilizar **variables CSS**.
- Utilizar nomenclatura consistente.
- Evitar CSS repetido.
- **No** utilizar estilos inline.
- **No** utilizar `!important`, excepto cuando sea estrictamente necesario.

## 3. Organización y patrones vigentes

`assets/css/` contiene tres hojas globales y una por página; cada hoja de página es independiente de las demás:

| Hoja | Contenido |
|---|---|
| `variables.css` | Tokens de diseño (colores, tipografía, espaciado, radios, sombras, alturas) |
| `main.css` | Base global y ajustes de Bootstrap |
| `components.css` | Componentes compartidos: navegación, footer, botón flotante de WhatsApp, curva `.hero-wave` y utilidades (`.eyebrow`, `.img-placeholder`) |
| `home.css`, `parroquia.css`, `grupos.css`, `calendario.css`, `transmisiones.css`, `contacto.css` | Estilos propios de cada página (Hero, secciones y la transición hacia el footer) |

Patrones que se aplican:

- **Mobile first** con los puntos de quiebre de Bootstrap (576, 768, 992, 1200 y 1400 px). Ojo con los contenedores: 960 px entre 992 y 1199 px y 1140 px entre 1200 y 1399 px.
- **Variables CSS** para colores y espaciado (`--color-*`, `--space-*`) y para parámetros de componentes (`--hero-wave-height`, `--hero-wave-fill`).
- **Componente compartido:** si un patrón se repite en varias páginas, se define una vez en `components.css` con clases propias (`.hero-wave`, `.hero-wave__fill`, `.hero-wave__line`) y se documentan sus requisitos de uso ([Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13).
- **Sobrescribir Bootstrap:** Bootstrap fija algunos estilos con alta especificidad (por ejemplo, el relleno de `.navbar-expand-xl .navbar-nav .nav-link`); la regla propia debe igualar o superar esa especificidad (`.site-navbar .navbar-nav .nav-link`) y cargarse después. Una regla `.site-navbar .nav-link` no lo logra.
- **Imágenes:** `object-fit` y `object-position` para el recorte, `aspect-ratio` para reservar espacio y un color de reserva mientras cargan (sección 12 del Manual Técnico).
- **Recortes con `overflow: hidden`:** no usarlo en contenedores con elementos que deben sobresalir a propósito (la curva del Hero); tampoco como parche de un desbordamiento horizontal: se corrige la causa.
- **`!important`:** no se usa en las hojas del proyecto.

## 4. Estado

**Vigente.** Norma aplicada en todas las hojas del proyecto.

---

## Documentos relacionados

- [Guia_Estilos.md](../04_Diseno/Guia_Estilos.md)
- [Convenciones.md](Convenciones.md)
