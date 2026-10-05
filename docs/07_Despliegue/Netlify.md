# Despliegue — Netlify

| Campo | Valor |
|---|---|
| Documento | 07_Despliegue/Netlify.md |
| Versión | 1.4 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-10 |
| Estado | **Parcial** |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 20 |

---

## 1. Objetivo del documento

Documentar la configuración de despliegue del portal en Netlify, plataforma prevista según CLAUDE.md.

## 2. Información disponible actualmente

Netlify está **autorizado** como plataforma de hosting (CLAUDE.md sección 20). Según registro en [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md) (2026-08-06), el repositorio ya quedó **conectado a Netlify** con despliegue automático, publicado en una URL temporal (subdominio `.netlify.app`, sin dominio propio todavía — ver [Dominio.md](Dominio.md)). La rama de producción (`main`) y las variables de entorno de la integración con Google Calendar ya están confirmadas; aún falta por confirmar el directorio de publicación, por lo que la tabla de la sección 3 queda parcialmente completada. No hay `netlify.toml` en el repositorio ni proceso de build: el sitio se publica como archivos estáticos y Netlify despliega además la Function de `netlify/functions/` (excepción serverless autorizada; ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)).

## 3. Secciones preparadas para ser completadas

| Elemento | Valor |
|---|---|
| Sitio Netlify | Creado y conectado |
| Repositorio conectado | Sí (GitHub, este repositorio) |
| Rama de despliegue | `main` (producción; cada `push` a `main` activa el despliegue) — confirmada por el equipo |
| Comando de build | N/A (sitio estático, sin build) |
| Directorio de publicación | Por confirmar (previsiblemente raíz del proyecto) |
| Netlify Functions | `netlify/functions/proximos-eventos.mjs`, detectada por defecto; endpoint público `/api/proximos-eventos` |
| Archivos de configuración | No existen `netlify.toml`, `_headers` ni `_redirects` |
| Variables de entorno | `GOOGLE_CALENDAR_ID` (no secreta; disponible para todos los contextos de despliegue) y `GOOGLE_CALENDAR_API_KEY` (secreta; con valor solo en Production; scopes: Builds, Functions y Runtime). Solo nombres: **nunca** se documentan valores. Detalle en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 6 |
| URL de producción (temporal) | https://parroquiasanrafaelalajuela.netlify.app/ |
| Dominio personalizado | No tiene aún — ver [Dominio.md](Dominio.md) |

## 4. Estado

**Parcial.** El sitio está conectado a Netlify, se despliega desde `main` y está publicado en la URL temporal indicada arriba; la Netlify Function y sus variables de entorno están configuradas y en uso. Queda por confirmar el directorio de publicación, además del dominio personalizado y Cloudflare (ver [Dominio.md](Dominio.md) y [Cloudflare.md](Cloudflare.md)).

---

## Documentos relacionados

- [Integraciones.md](../03_Arquitectura/Integraciones.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Dominio.md](Dominio.md)
- [Checklist_Despliegue.md](Checklist_Despliegue.md)
