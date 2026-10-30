# Despliegue — Netlify

| Campo | Valor |
|---|---|
| Documento | 07_Despliegue/Netlify.md |
| Versión | 1.9 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-29 |
| Estado | **Parcial** |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 20 |

---

## 1. Objetivo del documento

Documentar la configuración de despliegue del portal en Netlify, plataforma prevista según CLAUDE.md.

## 2. Información disponible actualmente

Netlify está **autorizado** como plataforma de hosting (CLAUDE.md sección 20). Según registro en [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md) (2026-08-06), el repositorio ya quedó **conectado a Netlify** con despliegue automático, publicado en una URL temporal (subdominio `.netlify.app`, sin dominio propio todavía — ver [Dominio.md](Dominio.md)). La rama de producción (`main`) y las variables de entorno de las integraciones con Google Calendar y YouTube ya están confirmadas; aún falta por confirmar el directorio de publicación, por lo que la tabla de la sección 3 queda parcialmente completada. No hay `netlify.toml` en el repositorio ni proceso de build: el sitio se publica como archivos estáticos y Netlify despliega además las dos Functions de `netlify/functions/` (excepción serverless autorizada; ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md) e [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)).

## 3. Secciones preparadas para ser completadas

| Elemento | Valor |
|---|---|
| Sitio Netlify | Creado y conectado |
| Repositorio conectado | Sí (GitHub, este repositorio) |
| Rama de despliegue | `main` (producción; cada `push` a `main` activa el despliegue) — confirmada por el equipo |
| Comando de build | N/A (sitio estático, sin build) |
| Directorio de publicación | Por confirmar (previsiblemente raíz del proyecto) |
| Netlify Functions | `netlify/functions/proximos-eventos.mjs` (endpoint público `/api/proximos-eventos`) y `netlify/functions/transmision-actual.mjs` (endpoint público `/api/transmision-actual`), ambas detectadas por defecto |
| Archivos de configuración | No existen `netlify.toml`, `_headers` ni `_redirects` |
| Variables de entorno | `GOOGLE_CALENDAR_ID` (no secreta; disponible para todos los contextos de despliegue) y `GOOGLE_CALENDAR_API_KEY` (secreta; con valor solo en Production; scopes: Builds, Functions y Runtime). Solo nombres: **nunca** se documentan valores. Detalle en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 6. Para YouTube: `YOUTUBE_API_KEY` (secreta) y `YOUTUBE_CHANNEL_ID`, y de forma opcional `YOUTUBE_DETECCION_DIRECTO`; solo nombres, **nunca** valores; detalle en [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 4 |
| URL de producción (temporal) | https://parroquiasanrafaelalajuela.netlify.app/ |
| Dominio personalizado | No tiene aún — ver [Dominio.md](Dominio.md) |
| Plan de Netlify | **Personal** (US$ 9 mensuales, 1 000 créditos mensuales) desde 2026-10-21; antes plan Free (300 créditos). Un production deploy consume 15 créditos; Deploy Previews y branch deploys, 0; el rollback a un deploy anterior no consume |
| Estado de los builds | **Despliegue automático habilitado** desde `main` (confirmado por el responsable del proyecto el 2026-10-24; ver la sección 5.4). Hasta el 2026-10-21 estuvieron detenidos («Stopped builds») |

## 4. Estado

**Parcial.** El sitio está conectado a Netlify (rama `main`), con el despliegue automático habilitado (ver sección 5.4), y está publicado en la URL temporal indicada arriba; las dos Netlify Functions y sus variables de entorno están configuradas y en uso. Queda por confirmar el directorio de publicación, además del dominio personalizado y Cloudflare (ver [Dominio.md](Dominio.md) y [Cloudflare.md](Cloudflare.md)).

---

## 5. Incidente: suspensión de los despliegues de producción por agotamiento de créditos (2026-10-21)

**Estado: resuelto el 2026-10-21** (ver 5.2).

### 5.1 Descripción

**Tipo:** limitación de la plataforma de alojamiento (plan y créditos). **No es un error de código ni de Git.**

**Datos confirmados por el responsable del proyecto** en el panel *Usage & Billing* de Netlify (el 2026-10-21):

| Elemento | Valor |
|---|---|
| Plan | Free, con 300 créditos mensuales |
| Período de facturación | 6 de octubre al 5 de noviembre de 2026 |
| Despliegues de producción en el período | 20, con un consumo de 300 créditos |
| Créditos disponibles para nuevos despliegues | Agotados |
| Créditos operativos restantes | ≈ 29,4 de 30, reservados para mantener el sitio publicado |
| Mensaje de Netlify | Los despliegues de producción quedan suspendidos hasta el próximo ciclo o hasta ampliar el plan |

**Cómo se manifestó:** el commit `3828006` (imágenes del Hero y de «Nuestra historia» de la página Parroquia) se envió correctamente a `origin/main`, pero Netlify no lo publicó: en producción, la página Parroquia respondía 200 con la versión anterior, sin la hoja de estilos nueva, y los archivos `assets/img/parroquia/*` respondían 404. La última versión del sitio verificada en producción corresponde al commit `4d17922` (corrección de Contacto); el commit `d9c364a` solo modifica la bitácora y no tiene efecto visible en el sitio.

**Qué se descartó:** el repositorio está en orden. `HEAD` y `origin/main` coinciden en `3828006`, los archivos HTML, CSS y las imágenes (WebP y PNG originales) están versionados y las capturas temporales de revisión (`_capturas_revision/`) no forman parte del commit. El sitio publicado sigue disponible con la última versión desplegada.

**Decisiones:** no se repiten commits ni pushes para forzar la publicación, no se modifica la configuración de Netlify ni se contratan servicios de pago, y el trabajo continúa y se prueba localmente. Los cambios acumulados se publicarán cuando se reanude el despliegue (nuevo ciclo, ampliación del plan o alternativa de alojamiento).

### 5.2 Resolución (2026-10-21)

- **Decisión:** se mantiene Netlify como alojamiento oficial, la rama `main` y la estructura del repositorio; no se migra a otra plataforma (GitHub Pages y Cloudflare Pages se evaluaron y se descartaron por ahora).
- **Ampliación del plan:** el responsable del proyecto pasó el sitio al plan **Personal** (US$ 9 mensuales, 1 000 créditos mensuales), lo que levantó la suspensión de los despliegues de producción.
- **Publicación del commit `3828006`:** realizada como liberación controlada. En producción se comprobó, por su contenido, que corresponde a ese commit: la hoja de estilos de Parroquia incluye las reglas nuevas, los cuatro WebP de `assets/img/parroquia/` responden 200 con tipo `image/webp`, la página incluye los textos alternativos nuevos, las seis páginas responden 200 y `/api/proximos-eventos` y `/api/transmision-actual` responden 200. El identificador del deploy en el panel de Netlify no fue consultado por el asistente (sin acceso al panel).
- **Control de builds:** el responsable del proyecto informó que dejó configurado «Stopped builds». El asistente no tiene acceso al panel y no verificó ese estado de forma independiente; conviene confirmarlo en el panel después de cada liberación.

### 5.3 Procedimiento de liberaciones controladas

1. **Desarrollo habitual:** trabajo y pruebas en local; los commits locales son libres, pero cada `git push` requiere autorización expresa. Con «Stopped builds», un push a `main` no genera ningún despliegue ni consume créditos.
2. **Liberación (solo con autorización):**
   1. `git push origin main` (si hay commits sin enviar).
   2. En Netlify, reactivar los builds: *Project configuration > Developer settings > Continuous deployment > Build settings > Configure > Build status > Active builds*, o el botón *Activate builds* en *Site overview* o *Deploys*.
   3. En *Deploys*, **Trigger deploy**.
   4. Comprobar en el detalle del deploy que el commit coincide con `git rev-parse origin/main`.
   5. Validar producción (páginas, recursos modificados y los dos endpoints `/api`).
   6. Volver a detener los builds (*Build status > Stopped builds*) y verificar el estado.
3. **Costo:** cada production deploy consume 15 créditos; las liberaciones deben agruparse. El rollback a un deploy anterior no consume créditos.
4. **Riesgos y límites:** (a) olvidar volver a detener los builds, tras lo cual el siguiente push publica; (b) con los builds detenidos, los pushes no se acumulan ni se construyen solos al reactivarlos: hace falta *Trigger deploy* o un push nuevo; (c) *Trigger deploy* y *Retry with latest branch commit* no están disponibles mientras los builds estén detenidos; (d) la documentación consultada no aclara qué commit toma *Trigger deploy*, por eso se verifica siempre el commit del deploy.
5. **Reactivar el flujo automático permanente:** dejar los builds activos (*Active builds*); cada push a `main` volverá a publicar y a consumir créditos.

No se modificó ninguna otra configuración de Netlify, ni se desconectó GitHub ni se cambió la rama de producción.

### 5.4 Actualización (2026-10-24): despliegue automático habilitado y Netlify Forms

- **Estado:** las liberaciones del 22 de octubre (`824b510` y `b75d81d`) y del 24 de octubre (`128d877` y `d3f6c46`, por la mañana, y `86207df` y `a8406b2`, tras el push `ff4796c..a8406b2`, verificada en producción por su contenido) se desplegaron automáticamente tras el `git push`, en menos de un minuto, y el responsable del proyecto confirmó que los despliegues automáticos están habilitados. El procedimiento de la sección 5.3 (builds detenidos entre liberaciones) **ya no describe el estado actual**; se conserva como referencia de lo que se hizo y como opción si se vuelve a detener los builds.
- **Liberaciones posteriores:** el 25 de octubre se publicaron `c06242f` y `39a7126` (push `0d9b722..39a7126`) y el 29 de octubre `e76a398` y `10c4de5` (push `39a7126..10c4de5`, 23:14 hora local), con autorización expresa en ambos casos. Se desplegaron automáticamente y el contenido servido se verificó en producción (la segunda, en VR-26 de [Evidencias.md](../06_Pruebas/Evidencias.md)); sin incidencias. El asistente sigue sin acceso al panel de Netlify.
- **Consecuencias:** cada push a `main` publica y consume créditos (unos 15 por despliegue de producción), también los de solo documentación; conviene agrupar los pushes y mantener la autorización expresa antes de cada uno. El asistente no tiene acceso al panel: no puede ver los créditos consumidos ni el estado de los builds.
- **Netlify Forms:** el formulario `solicitud-grupos` de la página Grupos requiere *Forms > Enable form detection* activo (configurado por el responsable) y se registra en el despliegue; la notificación por correo se configura en *Forms > Form notifications*. Detalle en [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md), sección 16.

---

## Documentos relacionados

- [Integraciones.md](../03_Arquitectura/Integraciones.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)
- [Dominio.md](Dominio.md)
- [Checklist_Despliegue.md](Checklist_Despliegue.md)
