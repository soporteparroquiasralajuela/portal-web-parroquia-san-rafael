# Integraciones

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Integraciones.md |
| Versión | 1.3 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-09-16 |
| Estado | Previstas — ninguna implementada |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 20 |

---

## 1. Objetivo del documento

Registrar las integraciones externas previstas y autorizadas para el proyecto, y su estado real de implementación.

## 2. Integraciones previstas (autorizadas por CLAUDE.md, no implementadas)

| Integración | Propósito típico | Estado |
|---|---|---|
| Google Maps | Ubicación de la parroquia | No implementada |
| Google Calendar | Calendario de actividades | No implementada — dirección conceptual definida (embebido) en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 6 |
| Google Forms | Formularios (inscripciones, contacto, etc.) | No implementada — dirección conceptual definida (formulario embebido en Contacto) en [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 6 |
| Google Drive | Almacenamiento/compartición de documentos | No implementada |
| YouTube | Contenido audiovisual embebido | No implementada |
| Facebook | Redes sociales | No implementada |
| Instagram | Redes sociales | No implementada |
| WhatsApp | Contacto directo | No implementada — aprobado como botón flotante global (componente en todas las páginas); pendiente el número oficial. Ver [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 7 |
| Correo institucional | Contacto / notificaciones | No implementada |
| Dominio personalizado | Identidad del sitio | No implementada (ver [Dominio.md](../07_Despliegue/Dominio.md)) |
| Netlify | Hosting / despliegue | No implementada (ver [Netlify.md](../07_Despliegue/Netlify.md)) |
| Cloudflare | DNS / CDN / seguridad | No implementada (ver [Cloudflare.md](../07_Despliegue/Cloudflare.md)) |
| Analytics | Medición de tráfico | No implementada |

## 3. Estado

**Ninguna integración se encuentra activa a la fecha.** Esta lista es exclusivamente la enumeración de integraciones **autorizadas** por el gobierno del proyecto (CLAUDE.md sección 20); no implica compromiso de implementación ni cronograma. Cada integración deberá documentarse formalmente (configuración, credenciales gestionadas de forma segura, alcance) en el momento en que se implemente.

## 4. Convención para documentación futura de integraciones

Para evitar documentar funcionalidad no decidida (CLAUDE.md sección 24), **no se crean documentos individuales por integración de antemano**. Cuando una integración de esta tabla se implemente realmente, deberá documentarse siguiendo el mismo patrón ya usado en [07_Despliegue](../07_Despliegue/Netlify.md) para Netlify, Dominio y Cloudflare:

- Un documento dedicado (ubicación sugerida: `03_Arquitectura/Integraciones/<Nombre_Servicio>.md`).
- Secciones mínimas: Objetivo, Estado, Configuración, Gestión de credenciales (nunca en texto plano en el repositorio) y Documentos relacionados.
- Actualización de la tabla de la sección 2 de este documento y de [docs/README.md](../README.md) para reflejar el nuevo archivo.

Esta convención existe para que, llegado el momento, cualquier desarrollador documente cada integración de forma consistente sin tener que decidir el formato desde cero.

---

## Documentos relacionados

- [Arquitectura_General.md](Arquitectura_General.md)
- [Netlify.md](../07_Despliegue/Netlify.md)
- [Cloudflare.md](../07_Despliegue/Cloudflare.md)
