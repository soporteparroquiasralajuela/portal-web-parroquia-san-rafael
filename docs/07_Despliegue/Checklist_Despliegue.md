# Checklist de Despliegue

| Campo | Valor |
|---|---|
| Documento | 07_Despliegue/Checklist_Despliegue.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-10 |
| Estado | Plantilla vigente — verificación **pendiente** |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 15 (cláusula de extensión de la sección 14) |

---

## 1. Objetivo del documento

Proveer el checklist a verificar antes de cada despliegue a producción.

## 2. Checklist

| # | Criterio | Verificado |
|---|---|---|
| 1 | Checklist de calidad aprobado ([Checklist_Calidad.md](../06_Pruebas/Checklist_Calidad.md)) | ☐ |
| 2 | Plan de pruebas ejecutado sin errores críticos | ☐ |
| 3 | Configuración de Netlify verificada | ☐ |
| 4 | Dominio y DNS verificados | ☐ |
| 5 | Certificado SSL activo | ☐ |
| 6 | Documentación actualizada (manuales, bitácora) | ☐ |
| 7 | Variables de entorno de Netlify configuradas para el contexto de despliegue (`GOOGLE_CALENDAR_API_KEY`, `GOOGLE_CALENDAR_ID`), sin valores en el repositorio ([Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 6) | ☐ |
| 8 | Integración con Google Calendar apuntando al **calendario definitivo** de la oficina parroquial: `GOOGLE_CALENDAR_ID` en Netlify y, por separado, el iframe y el enlace de `pages/calendario.html` (pendiente antes de la entrega final; sección 13 del mismo documento) | ☐ |

## 3. Estado

**Plantilla vigente, sin aplicar de forma sistemática todavía.** El sitio ya se despliega automáticamente en Netlify desde la rama `main`, pero este checklist no se ha ejecutado formalmente.

---

## Documentos relacionados

- [Netlify.md](Netlify.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Dominio.md](Dominio.md)
- [Cloudflare.md](Cloudflare.md)
