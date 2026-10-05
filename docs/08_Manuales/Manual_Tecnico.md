# Manual Técnico

| Campo | Valor |
|---|---|
| Documento | 08_Manuales/Manual_Tecnico.md |
| Versión | 1.3 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-10 |
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
| Hosting | Netlify (despliegue automático desde la rama `main`) |
| Servidor (excepción autorizada) | Netlify Function para consultar Google Calendar API v3 |
| Fuente de eventos | Google Calendar |

No existe base de datos ni proceso de build (no hay `package.json` en el repositorio). La única pieza de servidor es la Netlify Function de Google Calendar, una excepción deliberada y autorizada a la arquitectura estática (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)).

## 3. Requisitos para trabajar en el proyecto

- Editor de código.
- Navegador web moderno.
- Git instalado.
- No se requiere instalar dependencias de Node.js a la fecha, ya que el proyecto no tiene proceso de build. La Netlify Function se ejecuta únicamente en Netlify.
- Para administrar la integración con Google Calendar se necesita acceso al panel de Netlify (variables de entorno y logs) y a Google Cloud / Google Calendar con la cuenta responsable (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 12).

## 4. Cómo previsualizar el sitio actualmente

Al ser un sitio estático sin build, el archivo [index.html](../../index.html) puede abrirse directamente en el navegador o servirse con cualquier servidor estático simple. A la fecha, `index.html` contiene la página de Inicio implementada y desplegada (ver sección 9); no requiere ningún paso de compilación para previsualizarse.

**Limitación al previsualizar localmente:** al servir solo los archivos estáticos (por ejemplo con `python -m http.server`), el endpoint `/api/proximos-eventos` **no existe**, porque la Netlify Function depende del entorno de Netlify. En ese caso la sección «Próximos eventos» de Inicio mostrará su mensaje de error controlado; es el comportamiento esperado. La integración se valida en Production (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 14).

## 5. Estructura del repositorio

Ver el detalle completo en [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md).

## 6. Estado actual del código

| Elemento | Estado |
|---|---|
| `index.html` | Implementado — página de Inicio (ver sección 9) |
| `pages/` | Contiene `parroquia.html`, `grupos.html` y `calendario.html` (implementadas) |
| `assets/css` | Estilos globales (`variables.css`, `main.css`, `components.css`) y específicos de página (`home.css`, `parroquia.css`, `grupos.css`, `calendario.css`) |
| `assets/js` | `grupos.js` (comportamiento móvil de Grupos) y `proximos-eventos.js` (tarjetas de Próximos eventos de Inicio). El resto de la interactividad (navbar, dropdown, carrusel, pestañas) usa el bundle de Bootstrap |
| `netlify/functions/` | `proximos-eventos.mjs` — Netlify Function de Google Calendar (sección 10) |
| `components/`, `config/`, `data/`, `scripts/` | Vacíos |
| Funcionalidad | Inicio, Parroquia, Grupos y Calendario implementadas y desplegadas; integración con Google Calendar activa. Aún sin desarrollar: Transmisiones, Servicios parroquiales (y sus páginas de segundo nivel) y Contacto |

## 7. Gobierno técnico

Todas las reglas técnicas, de arquitectura, diseño y calidad están centralizadas en [CLAUDE.md](../../CLAUDE.md), documento que actúa como fuente única de verdad del proyecto.

## 8. Mantenimiento

**Parcial.** El procedimiento general de mantenimiento del sitio sigue **pendiente de redactarse**. Ya existen páginas funcionales que sirven de referencia, pero aún faltan páginas por desarrollar y el patrón de contenido real (textos, fotografías) está pendiente de la información confirmada por la parroquia.

**Objetivo de esta sección (cuando se complete):** explicar cómo agregar una página nueva siguiendo la convención de nombres ([Convenciones.md](../05_Desarrollo/Convenciones.md)), cómo actualizar contenido e imágenes, cómo actualizar la versión de Bootstrap, y el procedimiento de respaldo del repositorio.

**Ya documentado:** el mantenimiento de la integración con Google Calendar (diagnóstico, rotación de la API key, cambio de calendario y migración al calendario definitivo) está en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), secciones 13 y 14.

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

**Autorizaciones puntuales registradas:** la integración de «Próximos eventos» con Google Calendar (sección 10) se realizó con autorización expresa e incluyó únicamente: cambios mínimos en `index.html` (tarjetas ocultas hasta recibir datos, contenedor de estado y carga del script), una propiedad CSS en `home.css` (cifras alineadas en la fecha de las tarjetas) y el script `assets/js/proximos-eventos.js`. No levantó el congelamiento del resto de la página.

## 10. Integración con Google Calendar (resumen)

Google Calendar es la fuente única de los eventos públicos de la parroquia. La página Calendario los muestra con el iframe oficial de Google; la sección «Próximos eventos» de Inicio los obtiene así:

```
Google Calendar → Google Calendar API v3 → Netlify Function (netlify/functions/proximos-eventos.mjs)
→ /api/proximos-eventos → assets/js/proximos-eventos.js → 3 tarjetas de Inicio
```

- La API key de Google **no está en el repositorio ni llega al navegador**: vive en la variable de entorno secreta `GOOGLE_CALENDAR_API_KEY` de Netlify; el calendario se indica con `GOOGLE_CALENDAR_ID`. Nunca se documentan sus valores.
- La Function devuelve solo los campos necesarios y guarda la respuesta en caché hasta **6 horas**: un cambio en Google Calendar puede tardar ese tiempo en verse en Inicio.
- El calendario actual es **temporal** (cuenta institucional de soporte). Su migración al calendario definitivo de la oficina parroquial es un **pendiente formal antes de la entrega final**.

Detalle completo, diagnóstico y procedimiento de migración: [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md).

---

## Documentos relacionados

- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
- [Convenciones.md](../05_Desarrollo/Convenciones.md)
