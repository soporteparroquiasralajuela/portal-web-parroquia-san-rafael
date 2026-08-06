---
name: project-portal-parroquia-overview
description: Portal Web Parroquia San Rafael Arcángel — TCU project, current phase, governance, and where things stand
metadata:
  type: project
---

The project is the institutional website for Parroquia San Rafael Arcángel, built as a TCU (Trabajo Comunal Universitario) for Universidad Cenfotec. [CLAUDE.md](../CLAUDE.md) at the repo root is the single source of truth for all technical/process rules (approved stack: HTML5, CSS3, Bootstrap 5, vanilla JS, Bootstrap Icons, Google Fonts — no other frameworks without explicit authorization).

**Phase history:**
- 2026-08-03: repo initialized, empty folder scaffolding, single commit.
- 2026-08-05: CLAUDE.md adopted as governance doc; full initial documentation set built in `/docs` (9 numbered folders per CLAUDE.md section 14 — 01_Gestion_Proyecto through 09_Entregables); a documentation audit was performed and then a self-critical second pass corrected the audit's own overreach (see [[feedback_documentation_freeze]] for the resulting restraint principle).
- 2026-08-05 (same day, later): user declared **Documentation Freeze** — doc structure/content approved, no new files without strong justification, edits only when development surfaces a real need. From this point the project moves into functional analysis, then implementation.

**Why this matters:** the project has zero functional code implemented (`index.html` is empty boilerplate, `assets/`, `components/`, `pages/` etc. are all empty). Requirements have NOT been gathered yet — [Requerimientos_Funcionales.md](../docs/02_Analisis/Requerimientos_Funcionales.md), Casos_de_Uso.md, Historias_de_Usuario.md, Cronograma.md, and Wireframes.md are all explicitly marked Pendiente per CLAUDE.md's own rule against inventing functionality. Before writing any code, functional requirements need to be elicited from the user (the parish) rather than assumed.

**How to apply:** Any future work session should treat `/docs` as authoritative and current as of 2026-08-05. Before recommending anything from this snapshot, verify against current file state (per memory system rules) since active development will change things fast from here.
