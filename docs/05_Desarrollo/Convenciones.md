# Convenciones de Desarrollo

| Campo | Valor |
|---|---|
| Documento | 05_Desarrollo/Convenciones.md |
| Versión | 1.0 |
| Fecha de creación | 2026-08-05 |
| Estado | Vigente |
| Fuente | [CLAUDE.md](../../CLAUDE.md), secciones 4, 10, 21, 22 |

---

## 1. Objetivo del documento

Establecer las convenciones generales de desarrollo del proyecto: nomenclatura, control de versiones y principios de código.

## 2. Nomenclatura de archivos (CLAUDE.md sección 22)

- Nombres de archivo descriptivos y no ambiguos, en minúsculas.
- Ejemplos de convención (nombres de referencia, no páginas confirmadas — ver [Alcance.md](../01_Gestion_Proyecto/Alcance.md)):

```
about.html
historia.html
sacramentos.html
ministerios.html
eventos.html
contacto.html
```

## 3. Principios generales de código (CLAUDE.md secciones 4 y 10)

- Código limpio, modular y mantenible.
- Funciones pequeñas y con responsabilidad única.
- Variables y funciones con nombres descriptivos.
- Evitar código duplicado.
- Comentarios únicamente cuando aporten valor real (no comentar lo obvio).
- No diseñar para requerimientos hipotéticos; no sobre-ingeniería.

## 4. Control de versiones (CLAUDE.md sección 21)

- Uso correcto de Git.
- Commits descriptivos, que reflejen el motivo del cambio.
- No eliminar archivos históricos sin justificación.
- No modificar documentación sin actualizar sus referencias cruzadas.

## 5. Estado

**Vigente.** Estas convenciones aplican desde ya a cualquier código o documentación que se incorpore al repositorio.

---

## Documentos relacionados

- [Bootstrap.md](Bootstrap.md)
- [HTML.md](HTML.md)
- [CSS.md](CSS.md)
- [JavaScript.md](JavaScript.md)
