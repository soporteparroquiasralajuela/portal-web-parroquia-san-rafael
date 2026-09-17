# Componentes UI

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Componentes_UI.md |
| Versión | 1.3 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-09-16 |
| Estado | Registro de uso real — implementación **pendiente** |
| Fuente | [Bootstrap.md](../05_Desarrollo/Bootstrap.md) (inventario canónico); [CLAUDE.md](../../CLAUDE.md) sección 7 |

---

## 1. Objetivo del documento

Registrar el **uso real** de componentes de interfaz en el sitio (qué página usa qué componente) y, más adelante, los componentes propios que se construyan sobre `components/`.

El inventario y las reglas de uso de los componentes Bootstrap autorizados **no se repiten aquí**: viven de forma única en [Bootstrap.md](../05_Desarrollo/Bootstrap.md) (05_Desarrollo), para evitar mantener la misma lista en dos archivos que puedan desincronizarse.

## 2. Estado de implementación

Ningún componente ha sido implementado todavía; `pages/` y `components/` están vacías.

### 2.1 Registro de uso real (se completa conforme se implemente)

| Componente (según Bootstrap.md) | Página(s) donde se usa | Estado |
|---|---|---|
| _Por definir_ | _Por definir_ | Pendiente |

## 3. Componentes propios (`components/`)

La carpeta `components/` existe pero está vacía; no se ha construido ningún componente reutilizable propio todavía. Sin embargo, ya existe una decisión aprobada para un componente global — ver detalle completo (requisitos, accesibilidad, estado pendiente del número oficial) en [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md), sección 7.

| Componente | Descripción | Estado |
|---|---|---|
| Botón flotante de WhatsApp | Componente global de contacto directo, presente en todas las páginas del portal (incluidas las futuras páginas internas de Servicios parroquiales) | Aprobado — implementación y número oficial de WhatsApp pendientes |
| _Otros_ | _Por definir_ | Pendiente |

## 4. Estado

**Pendiente de implementación.** Este documento se actualizará conforme se vayan construyendo componentes concretos en `components/` y páginas en `pages/`.

---

## Documentos relacionados

- [Diseno_Conceptual_Aprobado.md](Diseno_Conceptual_Aprobado.md)
- [Guia_Estilos.md](Guia_Estilos.md)
- [Wireframes.md](Wireframes.md)
- [Bootstrap.md](../05_Desarrollo/Bootstrap.md)
