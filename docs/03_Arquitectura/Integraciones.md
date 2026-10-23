# Integraciones

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Integraciones.md |
| Versión | 1.6 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-22 |
| Estado | Google Calendar, YouTube, Google Forms, Google Maps, WhatsApp, redes sociales (enlaces) y Netlify implementadas; las demás, previstas |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 20 |

---

## 1. Objetivo del documento

Registrar las integraciones externas previstas y autorizadas para el proyecto, y su estado real de implementación.

## 2. Integraciones autorizadas por CLAUDE.md y su estado

| Integración | Propósito típico | Estado |
|---|---|---|
| Google Maps | Ubicación de la parroquia | **Implementada (sin API ni clave)** — mapa embebido (iframe oficial) con la ubicación de la oficina parroquial en Contacto, y enlaces «Cómo llegar» a Google Maps desde Inicio (templo principal, Diaconía y Ermita María Auxiliadora) y desde el footer. Pendiente de validar con la parroquia: que el enlace de la Ermita corresponda a su ubicación (Google Maps la muestra como «Salón María Auxiliadora») |
| Google Calendar | Calendario de actividades | **Implementada, completada y operativa** — doble uso: visualización embebida en la página Calendario y, mediante Google Calendar API v3 y una Netlify Function, las tarjetas de «Próximos eventos» de Inicio, con el calendario secundario institucional de la parroquia (cerrada por el responsable del proyecto el 2026-10-14). Detalle completo en [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md) |
| Google Forms | Formularios (inscripciones, contacto, etc.) | **Implementada** — formulario de consultas generales embebido en Contacto, con un enlace alternativo para abrirlo en Google Forms. La recepción de respuestas en Google Sheets y las notificaciones fueron configuradas en Google por el equipo del proyecto; el repositorio solo contiene la URL pública del formulario y su funcionamiento de extremo a extremo no se ha verificado desde él. Dirección conceptual en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 6 |
| Google Drive | Almacenamiento/compartición de documentos | No implementada |
| YouTube | Contenido audiovisual embebido | **Implementada** — página Transmisiones: transmisión en vivo y videos recientes del canal oficial mediante YouTube Data API v3 y una Netlify Function. Funcional dentro del alcance aprobado y validada con una transmisión pública real. Queda **excluida del alcance**, por decisión del proyecto, la visualización automática de grabaciones de transmisiones finalizadas. Detalle en [Integracion_YouTube.md](Integracion_YouTube.md) |
| Facebook | Redes sociales | **Implementada (enlace)** — ícono en los footers de las seis páginas hacia la página oficial de la parroquia (nueva pestaña, `rel="noopener noreferrer"`) |
| Instagram | Redes sociales | No se utiliza — retirado de los footers por decisión del responsable del proyecto |
| WhatsApp | Contacto directo | **Implementada** — botón flotante global en las seis páginas (enlace `https://wa.me/50661705997` a la oficina parroquial) y enlace en el bloque de contacto. El número queda sujeto a la validación final de la parroquia. Ver [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 7 |
| Correo institucional | Contacto / notificaciones | **Implementada (enlace `mailto:`)** — correo de la oficina parroquial en Contacto y en los footers; el sitio no envía correos propios |
| Dominio personalizado | Identidad del sitio | No implementada (ver [Dominio.md](../07_Despliegue/Dominio.md)) |
| Netlify | Hosting / despliegue | **Implementada** — hosting con despliegue automático desde la rama `main` y dos Netlify Functions: Google Calendar y YouTube; plan Personal, con los builds detenidos entre liberaciones autorizadas (ver [Netlify.md](../07_Despliegue/Netlify.md)) |
| Cloudflare | DNS / CDN / seguridad | No implementada (ver [Cloudflare.md](../07_Despliegue/Cloudflare.md)) |
| Analytics | Medición de tráfico | No implementada |

## 3. Estado

**Integraciones activas a la fecha:** Google Calendar (visualización embebida en Calendario y API v3 vía Netlify Function para Inicio), YouTube (YouTube Data API v3 vía Netlify Function para Transmisiones), Google Forms y Google Maps embebidos en Contacto, enlaces de Google Maps, WhatsApp, Facebook, YouTube y correo (enlaces) y Netlify (hosting y despliegue). Las demás integraciones de la tabla **no están activas**: la lista enumera las integraciones **autorizadas** por el gobierno del proyecto (CLAUDE.md sección 20) y no implica compromiso de implementación ni cronograma. Cada integración deberá documentarse formalmente (configuración, credenciales gestionadas de forma segura, alcance) en el momento en que se implemente, como se hizo con Google Calendar y YouTube.

**Excepción serverless:** las dos Netlify Functions (`proximos-eventos`, de Google Calendar, y `transmision-actual`, de YouTube) son las únicas piezas de servidor del portal y constituyen una excepción deliberada y autorizada a su arquitectura estática (ver [Arquitectura_General.md](Arquitectura_General.md)). Toda Function adicional requiere autorización expresa y documentación.

## 4. Convención para documentación futura de integraciones

Para evitar documentar funcionalidad no decidida (CLAUDE.md sección 24), **no se crean documentos individuales por integración de antemano**. Cuando una integración de esta tabla se implemente realmente, deberá documentarse siguiendo el mismo patrón ya usado en [07_Despliegue](../07_Despliegue/Netlify.md) para Netlify, Dominio y Cloudflare:

- Un documento dedicado, como archivo plano en esta misma carpeta: `03_Arquitectura/Integracion_<Nombre_Servicio>.md` (sin crear subcarpetas). Primer caso: [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md); segundo caso: [Integracion_YouTube.md](Integracion_YouTube.md). Se justifica por ser la excepción a la regla de congelamiento documental: la integración está realmente implementada y su configuración y mantenimiento no caben en este documento ni en el Manual Técnico sin duplicación.
- Secciones mínimas: Objetivo, Estado, Configuración, Gestión de credenciales (nunca en texto plano en el repositorio) y Documentos relacionados.
- Actualización de la tabla de la sección 2 de este documento y de [docs/README.md](../README.md) para reflejar el nuevo archivo.

Esta convención existe para que, llegado el momento, cualquier desarrollador documente cada integración de forma consistente sin tener que decidir el formato desde cero.

---

## Documentos relacionados

- [Arquitectura_General.md](Arquitectura_General.md)
- [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)
- [Integracion_YouTube.md](Integracion_YouTube.md)
- [Netlify.md](../07_Despliegue/Netlify.md)
- [Cloudflare.md](../07_Despliegue/Cloudflare.md)
