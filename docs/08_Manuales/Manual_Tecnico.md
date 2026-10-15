# Manual Técnico

| Campo | Valor |
|---|---|
| Documento | 08_Manuales/Manual_Tecnico.md |
| Versión | 1.6 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-14 |
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
| Servidor (excepción autorizada) | Dos Netlify Functions: una para consultar Google Calendar API v3 y otra para YouTube Data API v3 |
| Fuente de eventos | Google Calendar |
| Fuente de transmisiones y videos | Canal oficial de YouTube |

No existe base de datos ni proceso de build (no hay `package.json` en el repositorio). Las únicas piezas de servidor son las dos Netlify Functions (Google Calendar y YouTube), una excepción deliberada y autorizada a la arquitectura estática (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md) e [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)). Toda Function adicional requiere autorización expresa.

## 3. Requisitos para trabajar en el proyecto

- Editor de código.
- Navegador web moderno.
- Git instalado.
- No se requiere instalar dependencias de Node.js a la fecha, ya que el proyecto no tiene proceso de build. Las Netlify Functions se ejecutan únicamente en Netlify.
- Para administrar la integración con Google Calendar se necesita acceso al panel de Netlify (variables de entorno y logs) y a Google Cloud / Google Calendar con la cuenta responsable (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 12).
- Para administrar la integración con YouTube se necesita acceso al panel de Netlify (variables de entorno y logs), a Google Cloud (clave de YouTube Data API v3) y a YouTube Studio del canal oficial (ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), secciones 4 y 11).

## 4. Cómo previsualizar el sitio actualmente

Al ser un sitio estático sin build, el archivo [index.html](../../index.html) puede abrirse directamente en el navegador o servirse con cualquier servidor estático simple. A la fecha, `index.html` contiene la página de Inicio implementada y desplegada (ver sección 9); no requiere ningún paso de compilación para previsualizarse.

**Limitación al previsualizar localmente:** al servir solo los archivos estáticos (por ejemplo con `python -m http.server`), los endpoints `/api/proximos-eventos` y `/api/transmision-actual` **no existen**, porque las Netlify Functions dependen del entorno de Netlify. En ese caso la sección «Próximos eventos» de Inicio y la página Transmisiones mostrarán su mensaje de error controlado; es el comportamiento esperado. Las integraciones se validan en Production (ver [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 14, e [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 11).

## 5. Estructura del repositorio

Ver el detalle completo en [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md).

## 6. Estado actual del código

| Elemento | Estado |
|---|---|
| `index.html` | Implementado — página de Inicio (ver sección 9) |
| `pages/` | Contiene `parroquia.html`, `grupos.html`, `calendario.html` y `transmisiones.html` (implementadas y publicadas) |
| `assets/css` | Estilos globales (`variables.css`, `main.css`, `components.css`) y específicos de página (`home.css`, `parroquia.css`, `grupos.css`, `calendario.css`, `transmisiones.css`) |
| `assets/js` | `grupos.js` (comportamiento móvil de Grupos), `proximos-eventos.js` (tarjetas de Próximos eventos de Inicio) y `transmisiones.js` (estados del reproductor y videos recientes de Transmisiones). El resto de la interactividad (navbar, dropdown, carrusel, pestañas) usa el bundle de Bootstrap |
| `netlify/functions/` | `proximos-eventos.mjs` — Netlify Function de Google Calendar (sección 10) y `transmision-actual.mjs` — Netlify Function de YouTube (sección 11) |
| `components/`, `config/`, `data/`, `scripts/` | Vacíos |
| Funcionalidad | Inicio, Parroquia, Grupos, Calendario y Transmisiones implementadas y desplegadas; integración con Google Calendar completada y operativa; integración con YouTube funcional dentro del alcance aprobado (validada con una transmisión pública real; la visualización automática de grabaciones de transmisiones finalizadas está excluida del alcance). Aún sin desarrollar: Servicios parroquiales (y sus páginas de segundo nivel) y Contacto. Estructura de las cuatro páginas congeladas (Inicio, Parroquia, Grupos y Calendario) en línea base temporal; Transmisiones **no está congelada**; contenido real pendiente de incorporación y validación (sección 9) |

## 7. Gobierno técnico

Todas las reglas técnicas, de arquitectura, diseño y calidad están centralizadas en [CLAUDE.md](../../CLAUDE.md), documento que actúa como fuente única de verdad del proyecto.

## 8. Mantenimiento

**Parcial.** El procedimiento general de mantenimiento del sitio sigue **pendiente de redactarse**. Ya existen páginas funcionales que sirven de referencia, pero aún faltan páginas por desarrollar y el patrón de contenido real (textos, fotografías) está pendiente de la información confirmada por la parroquia.

**Objetivo de esta sección (cuando se complete):** explicar cómo agregar una página nueva siguiendo la convención de nombres ([Convenciones.md](../05_Desarrollo/Convenciones.md)), cómo actualizar contenido e imágenes, cómo actualizar la versión de Bootstrap, y el procedimiento de respaldo del repositorio.

**Ya documentado:** el mantenimiento de la integración con Google Calendar (diagnóstico, rotación de la API key y procedimiento de cambio de calendario) está en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), secciones 13 y 14; el de la integración con YouTube (configuración, alcance, diagnóstico y mantenimiento) está en [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), secciones 4, 10 y 11.

## 9. Línea base temporal y congelamiento de páginas

El proyecto avanza según esta cadena metodológica del TCU:

```
levantamiento → diseño → implementación estructural → congelamiento temporal
→ incorporación y validación de contenido real → validación con la parroquia
→ ajustes → documentación y transferencia → cierre
```

Al 2026-10-10 el proyecto se encuentra en la etapa de **congelamiento temporal** de las páginas ya implementadas. Esta sección documenta qué abarca esa línea base, qué no abarca y cómo se modifica. La decisión quedó registrada en [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md) (entrada 2026-10-10).

### 9.1 Principio

> El congelamiento temporal establece como línea base la estructura, composición visual, navegación y comportamiento actualmente aprobados de las páginas desarrolladas. No constituye aceptación final del contenido editorial ni multimedia. Los textos, datos, imágenes, enlaces, horarios, información institucional y demás contenido específico de la parroquia podrán ser sustituidos, completados o validados posteriormente sin que ello implique, por sí mismo, una modificación del diseño congelado.

### 9.2 Tres estados que no deben confundirse

| Estado | Qué significa | Situación al 2026-10-10 |
|---|---|---|
| Congelamiento temporal de desarrollo | La estructura, composición y comportamiento actuales se usan como línea base de trabajo | **Vigente** para Inicio, Parroquia, Grupos, Calendario y la navegación común. Inicio ya contaba con un congelamiento formal previo (sección 9.12) |
| Incorporación y validación de contenido real | Sustitución de placeholders y contenido provisional por información suministrada o validada por la parroquia | **Pendiente.** No consta en el repositorio ni en la documentación que la parroquia haya validado el contenido de estas páginas |
| Aceptación final | Etapa posterior a incorporar el contenido real, realizar las validaciones y atender los ajustes | **No alcanzada** |

Estar en el primer estado no implica haber cumplido el segundo ni el tercero.

### 9.3 Alcance de la línea base

**Incluido** (verificado contra el repositorio):

- Páginas implementadas: Inicio (`index.html`), Parroquia (`pages/parroquia.html`), Grupos (`pages/grupos.html`) y Calendario (`pages/calendario.html`), con sus hojas de estilo y scripts.
- Navegación común (sección 9.8), footer y botón flotante de WhatsApp, en su estructura y comportamiento actuales.
- Referencia de código: la línea base se estableció sobre el commit `2853c32`. Los cambios posteriores publicados sobre estas páginas, todos con autorización puntual y sin levantar el congelamiento, son: el enlace de ubicación de «Próximos eventos» (commit `7b0b821acfefbc5822b2faf7b9b90a943d895352`, sección 9.12); la referencia al calendario secundario del sitio web en la página Calendario (commit `4bfa4e2276cc5018cfab86985cb591e2a067a2f5`, 2026-10-13); y el enlace del ícono de YouTube del pie de página al canal oficial en Inicio, Parroquia, Grupos y Calendario (commit `26f5dad0709433d3f71a4d9f466f88ca892442d7`, 2026-10-14). No se creó ninguna etiqueta (tag) de Git para esta línea base.

**No incluido:** Transmisiones (implementada y publicada, pero **no congelada**) y Servicios parroquiales, Sacramentos, Gestiones, Documentos e información y Contacto (todavía no existen como páginas implementadas). Estas secciones cuentan con diseño conceptual y decisiones previas ([Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 6) y con enlaces ya presentes en la navegación, pero eso es distinto de una implementación existente y no está congelado.

**Estado de Transmisiones (2026-10-14):** página implementada y **publicada** (`pages/transmisiones.html`, `assets/css/transmisiones.css` y `assets/js/transmisiones.js`; commits `45416f28174fb5c253c8944ea882ab70e1c9bccc` y `27560ca0a6d6b36f53ab0100fa9aa5a1b7f4c461`), conectada con YouTube mediante la Netlify Function `transmision-actual` (commit `cf3b751d5f60070991e6bd3136984b12a169190f`). La Fase 1 visual del 2026-10-11 corresponde al commit `3f23ba40b18216e2059e60d059794ad796ea92fb` (citado antes como `c3d7ad9`; el contenido es idéntico y solo cambió el identificador por un rebase). Está **funcional y completada dentro del alcance aprobado**: validada con una transmisión pública real (detección, reproducción integrada y retiro automático) y con un video público normal. **No está congelada** y su contenido editorial y multimedia (por ejemplo, la fotografía institucional) sigue siendo provisional. **Fuera del alcance:** la visualización automática de grabaciones de transmisiones finalizadas, excluida por decisión del proyecto tras una investigación técnica (ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 10).

### 9.4 Qué está congelado y qué no

**Capa A — estructura y comportamiento (congelados temporalmente):**

- estructura de cada página y orden de sus secciones;
- composición visual y layout;
- navegación y jerarquía de contenido;
- componentes utilizados;
- comportamiento responsive existente;
- interacciones existentes;
- integraciones ya implementadas;
- decisiones de diseño aprobadas;
- relaciones entre páginas y flujos funcionales definidos.

**Capa B — contenido editorial y multimedia (NO congelado ni validado):**

- textos reales, historia, misión, visión y valores;
- información de templos, horarios y datos de contacto (teléfonos, correo, dirección, WhatsApp);
- datos reales de los grupos (nombres, descripciones, reuniones, lugares, destinatarios);
- sacramentos, requisitos, procedimientos y documentos, cuando se desarrollen;
- eventos reales;
- enlaces oficiales y redes sociales;
- transmisiones, mapas, formularios y sus destinos;
- responsables y párroco;
- fotografías reales, imágenes representativas y galerías;
- cualquier placeholder o contenido genérico, demostrativo o pendiente de validación.

La existencia de contenido dentro de una página **no significa que haya sido validado por la parroquia.**

### 9.5 Estado por página

| Aspecto | Inicio | Parroquia | Grupos | Calendario |
|---|---|---|---|---|
| Diseño y estructura | Congelado temporalmente (formal, sección 9.12) | Congelado temporalmente | Congelado temporalmente | Congelado temporalmente, salvo lo indicado en 9.9 |
| Implementación HTML | Implementada | Implementada | Implementada | Implementada |
| CSS y responsive | Implementado (`home.css`) | Implementado (`parroquia.css`) | Implementado (`grupos.css`) | Implementado (`calendario.css`); limitación abierta del embed a ≈ 375 px (9.9) |
| JavaScript | `proximos-eventos.js` | No aplica (solo Bootstrap) | `grupos.js` y pestañas de Bootstrap | No aplica |
| Integraciones | Google Calendar API v3 mediante Netlify Function (completada y operativa, con el calendario secundario institucional) | Ninguna propia | Formulario visual: no envía información | Iframe de Google Calendar (completado y operativo, con el calendario secundario institucional) |
| Contenido real de la parroquia | Pendiente | Pendiente | Pendiente | Pendiente |
| Imágenes definitivas | Pendientes (9 placeholders) | Pendientes (16 placeholders) | Pendientes (21 placeholders) | Pendientes (1 placeholder) |
| Validación con la parroquia | Pendiente | Pendiente | Pendiente | Pendiente |
| Estado para entrega final | No alcanzada: pendiente de contenido, imágenes y validación | Ídem | Ídem | Ídem, más la limitación del embed a ≈ 375 px (9.9) |

Los placeholders son los elementos `.img-placeholder` del código; el único recurso gráfico real incorporado es el logo institucional (`assets/img/logo/Logo.jpeg`).

### 9.6 Contenido provisional y pendiente de información real

Una parte importante del contenido visible de las cuatro páginas es genérico, provisional, demostrativo o pendiente de validación. No debe presentarse como información institucional validada.

| Página | Pendiente de información real o validación |
|---|---|
| Inicio | Texto de bienvenida del Hero y frases decorativas (Hero, carruseles, llamadas), fotografías, horarios de misa y de confesiones de los dos templos (hoy «Pendiente de confirmar»), datos de contacto del footer, número de WhatsApp, URL de las redes sociales, eventos reales en el calendario |
| Parroquia | Misión, visión, valores y comunidad, historia y su cita, patrono (y destino del botón asociado), galería de fotografías, información y fotografía del párroco |
| Grupos | Introducción; nombres, descripciones, reuniones, lugares, destinatarios y fotografías de los grupos (hoy 10 grupos de referencia con nombre «pendiente de confirmar»); número real de grupos; plataforma y destino del formulario |
| Calendario | Textos de apoyo, fotografía del Hero y calendario con eventos reales |
| Transmisiones (no congelada) | Fotografía institucional del estado sin transmisión (hoy marcador sin imagen), textos de apoyo y validación con la parroquia |

Precisiones que deben mantenerse:

- Los horarios marcados «Pendiente de confirmar» no se presentan como confirmados.
- El formulario de Grupos es **visual**: su botón está deshabilitado de forma accesible (`aria-disabled`) y no envía información; no debe describirse como formulario funcional.
- El botón flotante de WhatsApp **no es una integración operativa** mientras no tenga número o destino configurado.
- Los íconos de redes sociales **sin URL** no son integraciones operativas.
- Los tres eventos que devolvía el calendario durante la validación inicial **no se documentan como eventos reales de la parroquia**: no existe evidencia suficiente para determinar si eran reales o datos de prueba. La incorporación de eventos reales es una tarea de contenido, independiente de la integración técnica.

### 9.7 Integraciones

| Clasificación | Integración |
|---|---|
| Operativas | Google Calendar embebido (página Calendario); Google Calendar API v3 mediante Netlify Function (Próximos eventos); enlace simple de búsqueda de Google Maps desde la ubicación de cada evento (sin API ni clave); YouTube Data API v3 mediante Netlify Function (Transmisiones: transmisión en vivo y videos públicos normales recientes; funcional dentro del alcance aprobado y validada con una transmisión pública real); enlace del ícono de YouTube del pie de página al canal oficial; Netlify como hosting |
| Configuradas según información del equipo, no verificables por completo desde el repositorio | Google Cloud y API keys; variables de entorno de Netlify (`GOOGLE_CALENDAR_API_KEY`, `GOOGLE_CALENDAR_ID`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` y, opcional, `YOUTUBE_DETECCION_DIRECTO`) |
| Visuales o parciales | WhatsApp sin número ni destino; formulario de Grupos sin envío; redes sociales (Facebook e Instagram) sin URL |
| Excluidas del alcance por decisión del proyecto | Visualización automática de grabaciones de transmisiones en vivo finalizadas (YouTube); ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 10 |
| Planificadas, no implementadas | Google Maps embebido o mediante API (por ejemplo, el mapa de Contacto); Google Forms |
| Pendientes | Dominio propio; Cloudflare; analítica |

Ninguna integración planificada o visual debe considerarse implementada por el solo hecho de este congelamiento. Detalle técnico: [Integraciones.md](../03_Arquitectura/Integraciones.md), [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md) e [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md).

### 9.8 Navegación común

Verificada en el código e idéntica en las cinco páginas implementadas (las cuatro congeladas y Transmisiones):

`Inicio · Parroquia · Grupos · Calendario · Transmisiones · Servicios parroquiales ▾ · Contacto`

con el submenú de Servicios parroquiales: `Sacramentos · Gestiones · Documentos e información`. No incluye buscador. Coincide con la arquitectura de navegación aprobada ([Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 4) y forma parte de la línea base: no se modifica sin autorización (sección 9.10).

Hoy los enlaces a Servicios parroquiales, Sacramentos, Gestiones, Documentos e información y Contacto (y el enlace `contacto.html#como-llegar` de Inicio) apuntan a páginas **que aún no existen**. Es una consecuencia de las páginas pendientes, no una modificación pendiente de la navegación. El enlace a Transmisiones ya apunta a una página existente.

### 9.9 Calendario: lo que queda fuera del congelamiento

La estructura de Calendario entra en el congelamiento temporal. Quedan **expresamente fuera**:

- la incorporación y validación de eventos reales (la integración técnica con el calendario secundario institucional está completada);
- la limitación conocida de la vista mensual embebida alrededor de 375 px (se recorta la última columna y se ocultan el botón «Hoy» y el selector de vista; la vista Agenda se ve correctamente). Es un **pendiente abierto**, no un comportamiento aprobado.

El congelamiento no modifica la integración con Google Calendar ya completada, cuyo procedimiento de cambio de calendario está en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 13.

### 9.10 Reglas de cambio y excepciones

Un error, una necesidad funcional, un requisito nuevo de la parroquia, o un problema de accesibilidad, seguridad o responsive **pueden justificar proponer** una modificación a una página congelada, pero **no autorizan a realizarla automáticamente**. Todo cambio estructural, visual o funcional sobre una página congelada debe:

1. identificarse;
2. justificarse;
3. presentarse previamente;
4. recibir autorización expresa del usuario;
5. implementarse únicamente después de esa autorización.

Esta regla es compatible con [CLAUDE.md](../../CLAUDE.md) (secciones 12, 29.6 y 29.9) y con las reglas estrictas de Inicio (sección 9.12), que se mantienen. Una autorización puntual cubre únicamente el cambio autorizado.

### 9.11 Sustitución de contenido real

Reemplazar contenido provisional por contenido real **no descongela automáticamente la estructura**. Aplica, entre otros, a: textos, historia, misión, visión y valores, nombres y descripciones, información de grupos, horarios, información de contacto, teléfonos, WhatsApp, enlaces, redes sociales, fotografías, imágenes, información de templos y del párroco, eventos, ubicaciones, requisitos, procedimientos y contenido multimedia.

La sustitución se realiza únicamente cuando exista información real suministrada o confirmada, o cuando el usuario autorice incorporarla. Si incorporar contenido real exige cambiar estructura, clases, componentes, navegación o comportamiento, ese cambio se trata como **modificación de la línea base** y requiere autorización previa (sección 9.10).

### 9.12 Reglas estrictas de la página Inicio

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

**Segunda autorización puntual (2026-10-11):** el texto de ubicación de las tarjetas de «Próximos eventos» pasó a ser un enlace a una búsqueda de Google Maps (commit `7b0b821acfefbc5822b2faf7b9b90a943d895352`). Modificó únicamente `assets/js/proximos-eventos.js`: no se tocó `index.html`, ningún CSS, la Netlify Function ni las variables de entorno. Conserva el texto visible, no genera enlace para eventos sin ubicación y mantiene como texto plano las ubicaciones que ya son una dirección web. Detalle en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 10.6. No levantó el congelamiento del resto de la página.

**Tercera autorización puntual (2026-10-14):** el destino del ícono de YouTube del pie de página de `index.html` pasó de un marcador sin destino al canal oficial de YouTube (commit `26f5dad0709433d3f71a4d9f466f88ca892442d7`, que aplicó el mismo cambio al pie de Parroquia, Grupos y Calendario). Solo se modificó el enlace de ese ícono (`href`, apertura en pestaña nueva y su etiqueta accesible); no se tocó ningún otro elemento de Inicio. No levantó el congelamiento del resto de la página.

## 10. Integración con Google Calendar (resumen)

Google Calendar es la fuente única de los eventos públicos de la parroquia. La página Calendario los muestra con el iframe oficial de Google; la sección «Próximos eventos» de Inicio los obtiene así:

```
Google Calendar → Google Calendar API v3 → Netlify Function (netlify/functions/proximos-eventos.mjs)
→ /api/proximos-eventos → assets/js/proximos-eventos.js → 3 tarjetas de Inicio
```

- La API key de Google **no está en el repositorio ni llega al navegador**: vive en la variable de entorno secreta `GOOGLE_CALENDAR_API_KEY` de Netlify; el calendario se indica con `GOOGLE_CALENDAR_ID`. Nunca se documentan sus valores.
- La Function devuelve solo los campos necesarios y guarda la respuesta en caché hasta **6 horas**: un cambio en Google Calendar puede tardar ese tiempo en verse en Inicio.
- La ubicación de cada evento es un enlace a una búsqueda de Google Maps (sección 10.6 del documento de integración); no usa API ni clave.
- **Estado: completada y operativa.** Ambos componentes usan el **calendario secundario institucional** de la parroquia (la página Calendario lo referencia desde el 2026-10-13, commit `4bfa4e2`). El responsable del proyecto confirmó el 2026-10-14 que la integración está actualizada, funcional y finalizada.

Detalle completo, diagnóstico y procedimiento de cambio de calendario: [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md).

## 11. Integración con YouTube (resumen)

La página Transmisiones obtiene la transmisión en vivo y los videos públicos normales recientes del canal oficial así:

```
Canal de YouTube → YouTube Data API v3 → Netlify Function (netlify/functions/transmision-actual.mjs)
→ /api/transmision-actual → assets/js/transmisiones.js → reproductor y «Más de nuestra comunidad»
```

- La clave de la API **no está en el repositorio ni llega al navegador**: vive en la variable de entorno secreta `YOUTUBE_API_KEY` de Netlify; el canal se indica con `YOUTUBE_CHANNEL_ID`. Nunca se documentan sus valores.
- El navegador consulta `/api/transmision-actual` cada 60 s solo con la pestaña visible; una consulta fallida se muestra como error y **nunca** como «sin transmisión».
- Para que una transmisión se reproduzca dentro de la página, debe tener activada la opción **«Permitir inserción»** en YouTube Studio; de lo contrario se muestra el mensaje «Esta transmisión está disponible en YouTube» y el botón «Ver en YouTube» abre el directo.
- Un cambio en YouTube puede tardar hasta unos 2 minutos en verse (caché del CDN más el sondeo).
- **Validado:** transmisión pública real (detección, reproducción integrada y retiro automático) y video público normal en «Más de nuestra comunidad».
- **Fuera del alcance (decisión del proyecto):** la visualización automática de **grabaciones de transmisiones en vivo finalizadas**. No es un error ni una tarea pendiente: se investigó técnicamente y se decidió no continuar. No debe confundirse con los videos públicos normales, que sí se muestran.

Detalle completo, contrato de la Function, diagnóstico y alcance: [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md).

---

## Documentos relacionados

- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
- [Convenciones.md](../05_Desarrollo/Convenciones.md)
