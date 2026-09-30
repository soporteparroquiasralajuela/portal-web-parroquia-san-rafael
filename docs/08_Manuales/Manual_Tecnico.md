# Manual Técnico

| Campo | Valor |
|---|---|
| Documento | 08_Manuales/Manual_Tecnico.md |
| Versión | 1.2 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-09-29 |
| Estado | Vigente (estado actual del proyecto) |

---

## 1. Objetivo del documento

Permitir que un desarrollador externo comprenda el estado técnico actual del proyecto y pueda continuarlo, únicamente leyendo esta documentación (CLAUDE.md sección 28).

## 2. Stack tecnológico

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 |
| Estilos | CSS3 + Bootstrap 5 |
| Interactividad | JavaScript Vanilla |
| Iconografía | Bootstrap Icons |
| Tipografía | Google Fonts |
| Control de versiones | Git / GitHub |
| Hosting previsto | Netlify (no configurado aún) |

No existe backend, base de datos, ni proceso de build (no hay `package.json` en el repositorio).

## 3. Requisitos para trabajar en el proyecto

- Editor de código.
- Navegador web moderno.
- Git instalado.
- No se requiere instalar dependencias de Node.js a la fecha, ya que el proyecto no tiene proceso de build.

## 4. Cómo previsualizar el sitio actualmente

Al ser un sitio estático sin build, el archivo [index.html](../../index.html) puede abrirse directamente en el navegador o servirse con cualquier servidor estático simple. A la fecha, `index.html` contiene la página de Inicio implementada y desplegada (ver sección 9); no requiere ningún paso de compilación para previsualizarse.

## 5. Estructura del repositorio

Ver el detalle completo en [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md).

## 6. Estado actual del código

| Elemento | Estado |
|---|---|
| `index.html` | Implementado — página de Inicio (ver sección 9) |
| `assets/css` | Contiene los estilos de Inicio (`variables.css`, `main.css`, `components.css`, `home.css`) |
| `assets/js` | Vacía — la interactividad de Inicio (navbar, dropdown, carrusel) usa el bundle de Bootstrap, sin JavaScript propio |
| `components/`, `pages/`, `config/`, `data/`, `scripts/` | Vacíos |
| Funcionalidad | Página de Inicio implementada y desplegada; el resto de páginas del portal aún no se han desarrollado |

## 7. Gobierno técnico

Todas las reglas técnicas, de arquitectura, diseño y calidad están centralizadas en [CLAUDE.md](../../CLAUDE.md), documento que actúa como fuente única de verdad del proyecto.

## 8. Mantenimiento

**Pendiente.** No existe todavía ningún patrón real de desarrollo (cero páginas, cero componentes implementados) sobre el cual documentar un procedimiento de mantenimiento; escribirlo ahora sería especulativo.

**Objetivo de esta sección (cuando se complete):** explicar cómo agregar una página nueva siguiendo la convención de nombres ([Convenciones.md](../05_Desarrollo/Convenciones.md)), cómo actualizar contenido e imágenes, cómo actualizar la versión de Bootstrap, y el procedimiento de respaldo del repositorio.

**Se completará** en cuanto exista al menos una página funcional real que sirva de referencia, evitando documentar un proceso de mantenimiento antes de que exista algo que mantener.

## 9. Congelamiento de la página Inicio

**Página Inicio: implementación aprobada y congelada en su estado visual, estructural, responsive y funcional actual.** No modificarla directa ni indirectamente sin autorización explícita del usuario.

Esto incluye: `index.html` y su composición aprobada — header/navegación, Hero, transición Hero→contenido, Próximos eventos, carrusel panorámico, Horarios de misa, CTA de contacto, transición CTA→footer, footer, botón flotante de WhatsApp, y su comportamiento responsive actual.

**Reglas:**
- Prohibido sin autorización explícita: cambios visuales, de estructura, de copy, de organización de secciones, de comportamiento responsive, refactorizaciones no solicitadas, cambios de clases que afecten Inicio, o modificaciones a componentes globales que alteren su apariencia o comportamiento en Inicio.
- **Desarrollar otra página no constituye autorización** para modificar, mejorar, limpiar o refactorizar Inicio.
- Al desarrollar páginas nuevas, reutilizar el Design System y los componentes globales normalmente — pero si el cambio necesario en `assets/css/main.css`, `assets/css/variables.css` o `assets/css/components.css` pudiera producir una regresión visual o funcional en Inicio, detenerse y advertirlo *antes* de aplicarlo, nunca después.
- **La sustitución de los placeholders actuales (fotografías, horarios, teléfono, correo, dirección, redes sociales, número de WhatsApp, etc.) por datos institucionales reales tampoco es automática**: aunque la parroquia entregue esa información, modificarla en Inicio requiere una instrucción explícita del usuario para esa página, igual que cualquier otro cambio.
- **Una autorización puntual no levanta el congelamiento general.** Si el usuario autoriza un cambio específico en Inicio, esa autorización cubre únicamente ese cambio; el resto de la página permanece congelado tal como estaba.

**Excepción:** esta regla solo se levanta cuando el usuario autoriza explícitamente un cambio en Inicio.

---

## Documentos relacionados

- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
- [Convenciones.md](../05_Desarrollo/Convenciones.md)
