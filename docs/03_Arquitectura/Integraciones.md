# Integraciones

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Integraciones.md |
| Versión | 1.4 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-10 |
| Estado | Google Calendar y Netlify implementadas; las demás, previstas |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 20 |

---

## 1. Objetivo del documento

Registrar las integraciones externas previstas y autorizadas para el proyecto, y su estado real de implementación.

## 2. Integraciones autorizadas por CLAUDE.md y su estado

| Integración | Propósito típico | Estado |
|---|---|---|
| Google Maps | Ubicación de la parroquia | No implementada |
| Google Calendar | Calendario de actividades | **Implementada** — doble uso: visualización embebida en la página Calendario y, mediante Google Calendar API v3 y una Netlify Function, las tarjetas de «Próximos eventos» de Inicio. Migración al calendario definitivo de la oficina parroquial **pendiente**. Detalle completo en [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md) |
| Google Forms | Formularios (inscripciones, contacto, etc.) | No implementada — dirección conceptual definida (formulario embebido en Contacto) en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 6 |
| Google Drive | Almacenamiento/compartición de documentos | No implementada |
| YouTube | Contenido audiovisual embebido | No implementada |
| Facebook | Redes sociales | No implementada |
| Instagram | Redes sociales | No implementada |
| WhatsApp | Contacto directo | No implementada — aprobado como botón flotante global (componente en todas las páginas); pendiente el número oficial. Ver [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 7 |
| Correo institucional | Contacto / notificaciones | No implementada |
| Dominio personalizado | Identidad del sitio | No implementada (ver [Dominio.md](../07_Despliegue/Dominio.md)) |
| Netlify | Hosting / despliegue | **Implementada** — hosting con despliegue automático desde la rama `main` y Netlify Function de Google Calendar (ver [Netlify.md](../07_Despliegue/Netlify.md)) |
| Cloudflare | DNS / CDN / seguridad | No implementada (ver [Cloudflare.md](../07_Despliegue/Cloudflare.md)) |
| Analytics | Medición de tráfico | No implementada |

## 3. Estado

**Integraciones activas a la fecha:** Google Calendar (visualización embebida en Calendario y API v3 vía Netlify Function para Inicio) y Netlify (hosting y despliegue). Las demás integraciones de la tabla **no están activas**: la lista enumera las integraciones **autorizadas** por el gobierno del proyecto (CLAUDE.md sección 20) y no implica compromiso de implementación ni cronograma. Cada integración deberá documentarse formalmente (configuración, credenciales gestionadas de forma segura, alcance) en el momento en que se implemente, como se hizo con Google Calendar.

**Excepción serverless:** la Netlify Function de Google Calendar es la única pieza de servidor del portal y constituye una excepción deliberada y autorizada a su arquitectura estática (ver [Arquitectura_General.md](Arquitectura_General.md)).

## 4. Convención para documentación futura de integraciones

Para evitar documentar funcionalidad no decidida (CLAUDE.md sección 24), **no se crean documentos individuales por integración de antemano**. Cuando una integración de esta tabla se implemente realmente, deberá documentarse siguiendo el mismo patrón ya usado en [07_Despliegue](../07_Despliegue/Netlify.md) para Netlify, Dominio y Cloudflare:

- Un documento dedicado, como archivo plano en esta misma carpeta: `03_Arquitectura/Integracion_<Nombre_Servicio>.md` (sin crear subcarpetas). Primer caso: [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md). Se justifica por ser la excepción a la regla de congelamiento documental: la integración está realmente implementada y su configuración y mantenimiento no caben en este documento ni en el Manual Técnico sin duplicación.
- Secciones mínimas: Objetivo, Estado, Configuración, Gestión de credenciales (nunca en texto plano en el repositorio) y Documentos relacionados.
- Actualización de la tabla de la sección 2 de este documento y de [docs/README.md](../README.md) para reflejar el nuevo archivo.

Esta convención existe para que, llegado el momento, cualquier desarrollador documente cada integración de forma consistente sin tener que decidir el formato desde cero.

---

## Documentos relacionados

- [Arquitectura_General.md](Arquitectura_General.md)
- [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)
- [Netlify.md](../07_Despliegue/Netlify.md)
- [Cloudflare.md](../07_Despliegue/Cloudflare.md)
