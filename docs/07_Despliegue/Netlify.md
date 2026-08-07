# Despliegue — Netlify

| Campo | Valor |
|---|---|
| Documento | 07_Despliegue/Netlify.md |
| Versión | 1.3 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-08-07 |
| Estado | **Parcial** |
| Fuente | [CLAUDE.md](../../CLAUDE.md), sección 20 |

---

## 1. Objetivo del documento

Documentar la configuración de despliegue del portal en Netlify, plataforma prevista según CLAUDE.md.

## 2. Información disponible actualmente

Netlify está **autorizado** como plataforma de hosting (CLAUDE.md sección 20). Según registro en [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md) (2026-08-06), el repositorio ya quedó **conectado a Netlify** con despliegue automático, publicado en una URL temporal (subdominio `.netlify.app`, sin dominio propio todavía — ver [Dominio.md](Dominio.md)). Aún faltan por confirmar algunos detalles técnicos (rama de despliegue exacta, directorio de publicación, variables de entorno), por lo que la tabla de la sección 3 queda parcialmente completada. No hay `netlify.toml` en el repositorio ni proceso de build (el sitio es estático).

## 3. Secciones preparadas para ser completadas

| Elemento | Valor |
|---|---|
| Sitio Netlify | Creado y conectado |
| Repositorio conectado | Sí (GitHub, este repositorio) |
| Rama de despliegue | Por confirmar (única rama existente: `main`) |
| Comando de build | N/A (sitio estático, sin build actualmente) |
| Directorio de publicación | Por confirmar (previsiblemente raíz del proyecto) |
| Variables de entorno | Por confirmar (previsiblemente ninguna, sitio estático sin backend) |
| URL de producción (temporal) | https://parroquiasanrafaelalajuela.netlify.app/ |
| Dominio personalizado | No tiene aún — ver [Dominio.md](Dominio.md) |

## 4. Estado

**Parcial.** El sitio ya está conectado a Netlify y publicado en la URL temporal indicada arriba, pero quedan por confirmar la rama exacta de despliegue, el directorio de publicación y las variables de entorno configuradas en el panel de Netlify. Se completará en cuanto se confirmen estos datos.

---

## Documentos relacionados

- [Integraciones.md](../03_Arquitectura/Integraciones.md)
- [Dominio.md](Dominio.md)
- [Checklist_Despliegue.md](Checklist_Despliegue.md)
