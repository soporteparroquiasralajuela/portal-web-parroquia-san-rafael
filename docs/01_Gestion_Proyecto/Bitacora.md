# Bitácora del Proyecto y Control de Cambios

| Campo | Valor |
|---|---|
| Documento | 01_Gestion_Proyecto/Bitacora.md |
| Versión | 1.4 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-08-07 |
| Estado | Vigente (registro vivo) |

---

## 1. Objetivo del documento

Registrar cronológicamente los hechos, decisiones, cambios documentales y entregas relevantes del proyecto, sirviendo como fuente histórica única y verificable.

Este documento cumple simultáneamente los dos roles exigidos por CLAUDE.md sección 15: **Bitácora** (registro narrativo de eventos) y **Control de cambios** (historial de modificaciones a decisiones/documentos). Se mantienen unificados en un solo archivo, en lugar de duplicarlos en dos documentos con estructura casi idéntica, para evitar el mismo riesgo de duplicación identificado en la auditoría documental del proyecto (ver [Entrega_01.md](../09_Entregables/Entrega_01.md)). Si en el futuro el volumen de cambios documentales lo justifica, se evaluará separarlos.

## 2. Registro de entradas

| Fecha | Tipo | Descripción | Responsable |
|---|---|---|---|
| 2026-08-03 | Evento | Creación del repositorio Git y estructura inicial de carpetas (commit `Initial project structure`) | Soporte Tecnológico Parroquia San Rafael Arcángel |
| 2026-08-05 | Evento | Incorporación de `CLAUDE.md` como manual operativo y fuente de verdad del proyecto | Soporte Tecnológico Parroquia San Rafael Arcángel |
| 2026-08-05 | Evento | Creación de la estructura oficial de documentación (`/docs`) definida en CLAUDE.md sección 14, y de los documentos iniciales del proyecto, documentando únicamente el estado actual | Claude (asistente técnico) |
| 2026-08-05 | Evento | Auditoría documental inicial: verificación de enlaces, identificación de duplicados y propuesta de documentos faltantes (Control de cambios, integraciones, mantenimiento, glosario) | Claude (asistente técnico) |
| 2026-08-05 | Decisión técnica | Revisión crítica de la auditoría anterior: se descarta crear `Control_de_Cambios.md`, `Manual_Mantenimiento.md` y `Glosario.md` como archivos nuevos por bajo valor/riesgo de duplicación; se consolida "Control de cambios" en este documento; se define convención (no contenido) para integraciones futuras en `Integraciones.md`; se elimina duplicación real del inventario de componentes Bootstrap entre `Bootstrap.md` y `Componentes_UI.md` | Claude (asistente técnico) |
| 2026-08-06 | Evento | Implementación de la primera versión funcional de la página de inicio ("Sitio en construcción"), con diseño responsive validado en varios dispositivos (commit `feat: implement responsive under construction landing page`, registrado en Git el 2026-08-07 00:30 por cruzar la sesión la medianoche); conexión del repositorio a Netlify para despliegue automático. Detalle técnico del despliegue (URL, rama, directorio de publicación) pendiente de completar en [Netlify.md](../07_Despliegue/Netlify.md) | Soporte Tecnológico Parroquia San Rafael Arcángel |
| 2026-08-07 | Cambio de documento | Creación de [Bitacora_Horas_TCU.md](Bitacora_Horas_TCU.md): registro ejecutivo de horas dedicadas por sesión de trabajo, requerido para efectos del TCU ante Universidad Cenfotec. Documento separado de este por tener un formato y propósito distinto (horas por sesión vs. eventos/decisiones técnicas) | Claude (asistente técnico) |

## 3. Convención de registro

Cada nueva entrada debe incluir: fecha (formato `AAAA-MM-DD`), tipo (`Evento`, `Cambio de documento` o `Decisión técnica`), descripción breve y responsable. Deben registrarse: decisiones técnicas, cambios de alcance, cambios estructurales a la documentación, entregas, incidencias y aprobaciones.

---

## Documentos relacionados

- [Bitacora_Horas_TCU.md](Bitacora_Horas_TCU.md)
- [Cronograma.md](Cronograma.md)
- [Entrega_01.md](../09_Entregables/Entrega_01.md)
