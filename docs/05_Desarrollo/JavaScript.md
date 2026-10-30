# Estándar JavaScript

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/JavaScript.md |
| Versión | 1.6 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-29 |
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

`assets/js/` contiene los siguientes scripts, todos en JavaScript vanilla sin dependencias:

| Script | Función |
|---|---|
| `grupos.js` | En la página Grupos, en pantallas menores a 992 px, lleva al usuario a la ficha del grupo elegido con puntero o toque (no con teclado) y respeta `prefers-reduced-motion`. |
| `proximos-eventos.js` | En Inicio, rellena las 3 tarjetas de «Próximos eventos» con los datos de `/api/proximos-eventos` (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)). |
| `transmisiones.js` | En Transmisiones, consulta `/api/transmision-actual` cada 60 s (solo con la pestaña visible), gestiona los estados del reproductor (comprobando, en vivo, sin transmisión y error), el botón «Copiar enlace» y los videos recientes de «Más de nuestra comunidad» (ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 7). |
| `galeria-parroquia.js` | En Parroquia, abre el visor ampliado (Modal de Bootstrap) al elegir una fotografía del mosaico, carga la variante de mayor resolución, navega con los botones y las flechas del teclado (circular), anuncia «Fotografía n de 12» en una región `role="status"` y devuelve el foco a la miniatura al cerrar. Escape, el bloqueo del desplazamiento y la trampa de foco los aporta Bootstrap. Se carga con `defer` tras el bundle. Ver [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 13. |
| `servicios-parroquiales.js` | Solo en local. En Servicios parroquiales valida en el navegador los formularios preliminares (`.solicitud-form`: obligatorios, correo, teléfono y consentimiento, con mensajes en español) y, como el envío aún no existe, informa que la solicitud no se envió; la ventana emergente «¡Solicitud recibida!» solo se abre si `enviarSolicitud()` confirma un envío (hoy siempre se rechaza). Admite `?vista-previa=confirmacion` como ayuda de revisión visual. Ver [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 18. |
| `solicitud-grupos.js` | En Grupos, gestiona el formulario de solicitud de información (Netlify Forms): construye el selector con los nombres de la lista de grupos y añade `grupo-id`; valida los campos con mensajes en español y la casilla de consentimiento; envía por `fetch` (POST url-encoded a `/`) y muestra éxito solo ante una respuesta HTTP satisfactoria; evita envíos duplicados, conserva un `solicitud-id` único por solicitud y distingue el error del servidor de la falta de respuesta; descarta los envíos con el campo trampa lleno. Ver [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 16. |

El resto de la interactividad (navbar, carrusel, pestañas, acordeones) usa el bundle de Bootstrap, sin JavaScript propio.

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
