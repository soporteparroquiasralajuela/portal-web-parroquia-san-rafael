# Componentes UI

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Componentes_UI.md |
| Versión | 1.11 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-24 |
| Estado | Vigente — registro de uso real al 2026-10-24 |
| Fuente | [Bootstrap.md](../05_Desarrollo/Bootstrap.md) (inventario canónico); [CLAUDE.md](../../CLAUDE.md) sección 7 |

---

## 1. Objetivo del documento

Registrar el **uso real** de componentes de interfaz en el sitio (qué página usa qué componente) y, más adelante, los componentes propios que se construyan sobre `components/`.

El inventario y las reglas de uso de los componentes Bootstrap autorizados **no se repiten aquí**: viven de forma única en [Bootstrap.md](../05_Desarrollo/Bootstrap.md) (05_Desarrollo), para evitar mantener la misma lista en dos archivos que puedan desincronizarse.

## 2. Registro de uso real

### 2.1 Componentes de Bootstrap en uso

| Componente | Páginas | Notas |
|---|---|---|
| Navbar, Collapse y Dropdown | Las seis | `navbar-expand-xl`: menú expandido desde 1200 px y colapsado por debajo; submenú de Servicios parroquiales |
| Carousel | Inicio | Carrusel de tres imágenes (recreaciones digitales), sin rotación automática. Parroquia ya no usa carrusel: su galería es un mosaico |
| Modal | Parroquia | Visor ampliado de la galería, a pantalla completa (`modal-fullscreen`) |
| Grid, Cards, Buttons y utilidades | Las seis | Uso general |
| Tabs / Pills | Grupos | Directorio de grupos (ver [JavaScript.md](../05_Desarrollo/JavaScript.md)) |

El inventario y las reglas de uso de los componentes Bootstrap viven en [Bootstrap.md](../05_Desarrollo/Bootstrap.md).

### 2.2 Componentes propios (CSS del proyecto)

| Componente | Dónde se define | Páginas | Notas |
|---|---|---|---|
| Navegación (`.site-navbar`) | `components.css` (HTML duplicado en cada página) | Las seis | Marca en dos líneas por debajo de 576 px; relleno de enlaces reducido entre 1200 y 1399 px |
| Footer estandarizado (`.site-footer*`) | `components.css` (HTML duplicado en cada página) | Las seis | Marca, enlaces rápidos, «Contáctanos» (teléfono, WhatsApp, correo, ubicación y horario), Facebook y YouTube; «Servicios parroquiales» sin enlace hasta que exista la página |
| Botón flotante de WhatsApp (`.whatsapp-float`) | `components.css` | Las seis | Enlace `wa.me`; el footer reserva espacio a la derecha para no quedar tapado |
| Doble curva de Hero (`.hero-curva`) | `components.css` | Las seis | Un SVG de cuatro capas: banda azul `#1D2A54` translúcida, eco dorado tenue, curva del color de la sección siguiente (`--hero-wave-fill`, crema por defecto) y filete dorado de 2 px; altura `--hero-curva-height` (59, 86 y 108 px). Sustituye a `.hero-wave`, que ya no usa ninguna página. Requisitos de uso en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Altura de Hero interior (`.hero-interior`) | `components.css` | Parroquia, Grupos, Calendario, Transmisiones y Contacto | Altura mínima común `--hero-min-height` (460 px móvil, 520 px tableta, 520–620 px desde 992 px); variante `.hero-interior--compacto` (≈ 80 %) para Heroes sin fotografía (sin uso a la fecha: los seis Heroes ya tienen imagen). Inicio tiene altura propia en `home.css` (referencia + 30 px en escritorio) |
| Hero con imagen y degradado | `home.css` (`.hero`), `parroquia.css` (`.parroquia-hero`), `grupos.css` y `calendario.css` | Inicio, Parroquia, Grupos, Calendario | `<picture>` con WebP, `object-position` y degradado azul `#1D2A54`; el de Inicio es panorámico |
| Carrusel de imágenes (`.gallery-carousel`) | `home.css` | Inicio | Diapositivas 21:9 (alto mínimo 280 px) con `object-fit: cover` y encuadre por imagen; pie de imagen discreto abajo a la derecha. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Hero e introducción de Grupos (`.grupos-hero`, `.grupos-intro`) | `grupos.css` | Grupos | Hero con imagen panorámica (WebP responsivos, recorte móvil), degradado azul desde la base, cita bíblica a la derecha y doble curva `.hero-curva`; introducción editorial con ornamento dorado y bloque de invitación. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Formulario de solicitud de Grupos (`.grupos-interes`, `.grupos-form`) | `grupos.css` + `assets/js/solicitud-grupos.js` | Grupos | Formulario con validación en línea, casilla de consentimiento, mensajes de éxito, error e incertidumbre, y campo trampa; se activa o desactiva con `data-estado`. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 16 |
| Mosaico de galería (`.parroquia-mosaico`) | `parroquia.css` | Parroquia | Cuadrícula de 6 columnas (2 en móvil) con tiles-botón de proporciones variadas, hover sutil con descripción breve y visor ampliado. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Visor de galería (`.parroquia-visor`) | `parroquia.css` + `assets/js/galeria-parroquia.js` | Parroquia | Modal oscuro con imagen, leyenda, contador y botones anterior, siguiente y cerrar de 48 px |
| Tarjeta de horarios de misa (`.mass-card`) | `home.css` | Inicio | Imagen 2:3 con `object-fit: cover` (4/3 apilada; 40 % de ancho en fila desde 992 px); botón «Cómo llegar» alineado al borde inferior con `margin-top: auto`. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Hero de Calendario (`.calendario-hero`) | `calendario.css` | Calendario | Imagen `herocalendario` (WebP responsivos), título con acento dorado y un párrafo, sin botones; apilado por debajo de 992 px y superpuesto con degradado y máscara vertical desde 992 px. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Hero de Transmisiones (`.transmisiones-hero`) | `transmisiones.css` | Transmisiones | Imagen `herotransmisiones` (WebP responsivos), título en cursiva con segunda línea dorada, párrafo y tres barras doradas; apilado por debajo de 992 px y superpuesto con degradado azul desde 992 px; altura estándar `.hero-interior`. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Hero de Contacto (`.contacto-hero`) | `contacto.css` | Contacto | Imagen `herocontacto` (WebP responsivos; recreación digital), título en cursiva, subtítulo dorado y texto de apoyo; apilado por debajo de 992 px y superpuesto con degradado azul horizontal (el de Transmisiones) desde 992 px; altura estándar `.hero-interior`. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Transición hacia el footer (`.wave-transition`) | CSS de cada página (copia local) | Las seis | Cinta navy/dorada sin insignia; no cambió |
| Marcador de imagen (`.img-placeholder`) y etiqueta (`.eyebrow`) | `components.css` | Varias | Utilidades compartidas |

## 3. Componentes reutilizables y carpeta `components/`

La carpeta `components/` sigue vacía: el sitio no usa includes ni JavaScript para repetir fragmentos, de modo que el navbar y el footer se **duplican en cada página** y cualquier cambio debe replicarse en las seis. La decisión conceptual del botón flotante de WhatsApp está en [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md), sección 7.

## 4. Estado

**Vigente.** Se actualiza al incorporar o modificar un componente.

---

## Documentos relacionados

- [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md)
- [Guia_Estilos.md](Guia_Estilos.md)
- [Wireframes.md](Wireframes.md)
- [Bootstrap.md](../05_Desarrollo/Bootstrap.md)
