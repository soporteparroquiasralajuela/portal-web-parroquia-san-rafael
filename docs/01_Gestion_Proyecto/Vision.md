# Visión del Proyecto

| Campo | Valor |
|---|---|
| Documento | 01_Gestion_Proyecto/Vision.md |
| Versión | 1.0 |
| Fecha de creación | 2026-08-05 |
| Estado | Vigente |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 2, 4 y 28 |

---

## 1. Objetivo del documento

Establecer la visión general del proyecto **Portal Web – Parroquia San Rafael Arcángel**, de modo que cualquier persona del equipo (o un desarrollador externo) comprenda el propósito del proyecto sin necesidad de contexto adicional.

## 2. Contexto

El proyecto se desarrolla como **Trabajo Comunal Universitario (TCU)** de la **Universidad Cenfotec**, para la **Parroquia San Rafael Arcángel**.

No es un ejercicio académico aislado: el gobierno del proyecto (CLAUDE.md) exige que se desarrolle **como un proyecto profesional de ingeniería de software**, con la misma disciplina de documentación, arquitectura y calidad que un proyecto de industria.

## 3. Visión

> Diseñar, documentar e implementar un portal web moderno para la Parroquia San Rafael Arcángel que permita mejorar la comunicación con la comunidad parroquial mediante un sitio institucional accesible, fácil de administrar y completamente documentado.

## 4. Filosofía del proyecto

De acuerdo con CLAUDE.md sección 4, el proyecto se rige por el siguiente orden de prioridades:

| Prioridad | Criterio |
|---|---|
| 1 | Calidad |
| 2 | Documentación |
| 3 | Mantenibilidad |
| 4 | Escalabilidad |
| 5 | Legibilidad |
| 6 | Consistencia |
| 7 | Simplicidad |

**Principio rector:** nunca desarrollar únicamente para que "funcione"; todo debe quedar preparado para mantenimiento futuro por parte de la Parroquia o de otro equipo de desarrollo.

## 5. Estado actual del proyecto

El proyecto se encuentra en **fase de arranque documental y arquitectónico**. A la fecha de este documento:

- Existe un repositorio Git inicializado (`main`), con un commit inicial (`Initial project structure`).
- La estructura de carpetas base está creada, pero mayormente vacía (ver [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)).
- No se ha implementado ninguna funcionalidad ni contenido visual del sitio (`index.html` es un documento HTML vacío).
- El gobierno técnico del proyecto está formalizado en [CLAUDE.md](../../CLAUDE.md).

No se documenta ninguna funcionalidad futura en este documento; el detalle de alcance se gestiona en [Alcance.md](Alcance.md).

## 6. Objetivo final esperado (según CLAUDE.md sección 28)

Al finalizar el proyecto deberá existir un portal web profesional y completamente funcional, con código limpio y mantenible, arquitectura organizada, diseño moderno, y documentación técnica y funcional completa (manual técnico, manual de usuario, bitácora), de forma que el proyecto **pueda ser comprendido por un desarrollador externo únicamente leyendo la documentación**.

---

## Documentos relacionados

- [Objetivos.md](Objetivos.md)
- [Alcance.md](Alcance.md)
- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
