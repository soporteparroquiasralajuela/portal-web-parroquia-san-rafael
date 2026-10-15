# Estándar JavaScript

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/JavaScript.md |
| Versión | 1.2 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-14 |
| Estado | Vigente |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 10 |

---

## 1. Objetivo del documento

Establecer el estándar de escritura de JavaScript del proyecto.

## 2. Reglas vigentes

- Utilizar **JavaScript Vanilla** exclusivamente (sin frameworks ni librerías como jQuery, salvo autorización explícita — ver [Alcance.md](../01_Gestion_Proyecto/Alcance.md)).
- Código **modular**.
- Funciones pequeñas, con responsabilidad única.
- Variables descriptivas.
- Comentarios únicamente cuando aporten valor (no comentar lo obvio).
- Evitar código duplicado.

## 3. Estado actual

`assets/js/` contiene tres scripts, todos en JavaScript vanilla sin dependencias:

| Script | Función |
|---|---|
| `grupos.js` | En la página Grupos, en pantallas menores a 992 px, lleva al usuario a la ficha del grupo elegido con puntero o toque (no con teclado) y respeta `prefers-reduced-motion`. |
| `proximos-eventos.js` | En Inicio, rellena las 3 tarjetas de «Próximos eventos» con los datos de `/api/proximos-eventos` (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)). |
| `transmisiones.js` | En Transmisiones, consulta `/api/transmision-actual` cada 60 s (solo con la pestaña visible), gestiona los estados del reproductor (comprobando, en vivo, sin transmisión y error), el botón «Copiar enlace» y los videos recientes de «Más de nuestra comunidad» (ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 7). |

El resto de la interactividad (navbar, dropdown, carrusel, pestañas) usa el bundle de Bootstrap, sin JavaScript propio.

Prácticas aplicadas en estos scripts, que deben mantenerse:

- Cada script se encapsula en una función de ejecución inmediata, sin variables globales.
- El contenido que proviene de fuentes externas (por ejemplo Google Calendar) se inserta únicamente con `textContent`, **nunca** con `innerHTML`.
- No se escriben claves, identificadores de calendario o de canal ni credenciales en JavaScript que se ejecute en el navegador.
- El navegador no llama directamente a APIs de terceros que requieran clave: consulta únicamente las Netlify Functions del propio sitio.

Las Netlify Functions de [netlify/functions/](../../netlify/functions/proximos-eventos.mjs) están escritas en JavaScript (módulo ES, `.mjs`) y se rigen por las mismas normas de legibilidad; son una excepción de servidor autorizada y están documentadas en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md) (`proximos-eventos.mjs`) e [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md) (`transmision-actual.mjs`).

## 4. Estado

**Vigente como norma**, aplicada en los scripts existentes.

---

## Documentos relacionados

- [Convenciones.md](Convenciones.md)
- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)
