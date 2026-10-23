# Componentes UI

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Componentes_UI.md |
| Versión | 1.7 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-22 |
| Estado | Vigente — registro de uso real al 2026-10-22 |
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
| Curva de Hero (`.hero-wave`) | `components.css` | Las seis | Un solo SVG; relleno `--hero-wave-fill` (crema por defecto) y trazo dorado de 2 px; altura `--hero-wave-height` (44, 64 y 80 px). Requisitos de uso en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Hero con imagen y degradado | `home.css` (`.hero`) y `parroquia.css` (`.parroquia-hero`) | Inicio, Parroquia | `<picture>` con WebP, `object-position` y degradado azul `#1D2A54`; el de Inicio es panorámico |
| Carrusel de imágenes (`.gallery-carousel`) | `home.css` | Inicio | Diapositivas 21:9 (alto mínimo 280 px) con `object-fit: cover` y encuadre por imagen; pie de imagen discreto abajo a la derecha. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Mosaico de galería (`.parroquia-mosaico`) | `parroquia.css` | Parroquia | Cuadrícula de 6 columnas (2 en móvil) con tiles-botón de proporciones variadas, hover sutil con descripción breve y visor ampliado. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Visor de galería (`.parroquia-visor`) | `parroquia.css` + `assets/js/galeria-parroquia.js` | Parroquia | Modal oscuro con imagen, leyenda, contador y botones anterior, siguiente y cerrar de 48 px |
| Tarjeta de horarios de misa (`.mass-card`) | `home.css` | Inicio | Imagen 2:3 con `object-fit: cover` (4/3 apilada; 40 % de ancho en fila desde 992 px); botón «Cómo llegar» alineado al borde inferior con `margin-top: auto`. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13 |
| Hero con marcador de imagen | `grupos.css`, `calendario.css`, `contacto.css`, `transmisiones.css` | Grupos, Calendario, Contacto, Transmisiones | Patrón común de Parroquia; fotografía pendiente |
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
