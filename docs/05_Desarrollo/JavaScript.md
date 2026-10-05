# Estándar JavaScript

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/JavaScript.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-10 |
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

`assets/js/` contiene dos scripts, ambos en JavaScript vanilla sin dependencias:

| Script | Función |
|---|---|
| `grupos.js` | En la página Grupos, en pantallas menores a 992 px, lleva al usuario a la ficha del grupo elegido con puntero o toque (no con teclado) y respeta `prefers-reduced-motion`. |
| `proximos-eventos.js` | En Inicio, rellena las 3 tarjetas de «Próximos eventos» con los datos de `/api/proximos-eventos` (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)). |

El resto de la interactividad (navbar, dropdown, carrusel, pestañas) usa el bundle de Bootstrap, sin JavaScript propio.

Prácticas aplicadas en estos scripts, que deben mantenerse:

- Cada script se encapsula en una función de ejecución inmediata, sin variables globales.
- El contenido que proviene de fuentes externas (por ejemplo Google Calendar) se inserta únicamente con `textContent`, **nunca** con `innerHTML`.
- No se escriben claves, identificadores de calendario ni credenciales en JavaScript que se ejecute en el navegador.

La Netlify Function de [netlify/functions/](../../netlify/functions/proximos-eventos.mjs) está escrita en JavaScript (módulo ES, `.mjs`) y se rige por las mismas normas de legibilidad; es una excepción de servidor autorizada y está documentada en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md).

## 4. Estado

**Vigente como norma**, aplicada en los scripts existentes.

---

## Documentos relacionados

- [Convenciones.md](Convenciones.md)
- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
