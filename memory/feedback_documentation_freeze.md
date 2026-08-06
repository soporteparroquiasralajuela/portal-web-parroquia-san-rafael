---
name: feedback-documentation-freeze
description: Documentation Freeze rule declared 2026-08-05 — docs structure is approved, no new doc files unless strongly justified
metadata:
  type: feedback
---

As of 2026-08-05 the user declared the `/docs` structure and content "congelada" (frozen) and approved. Rule going forward:

- Do NOT create new documentation files unless there is a genuinely important technical justification (not just "nice to have" or organizational tidiness).
- New information discovered during development must be incorporated into existing documents, not new ones.
- Do NOT modify existing documentation unless a real need arises during development (a decision changes, a requirement is discovered, an integration is actually implemented, etc.) — no more proactive/speculative documentation passes.

**Why:** This follows two prior rounds of documentation work — an initial full doc set build-out ([[project_portal_parroquia_overview]]), then a self-critical audit where several proposed new files (Control_de_Cambios.md, Manual_Mantenimiento.md, Glosario.md, per-integration files) were deliberately rejected in favor of extending existing docs, on the principle "menos documentos pero mejor organizados." The freeze formalizes that same restraint as a standing rule for the development phase that follows.

**How to apply:** Before creating any new file under `/docs`, stop and ask whether the same need can be met by extending an existing document (Bitacora.md doubles as Control de Cambios; Integraciones.md carries a convention note for future integration docs; Manual_Tecnico.md has a pending Mantenimiento section). Only propose a new file if none of the existing structure can reasonably hold the content, and explain the justification to the user before creating it — don't just create it.
