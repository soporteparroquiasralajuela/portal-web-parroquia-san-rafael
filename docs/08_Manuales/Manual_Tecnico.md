# Manual Técnico

| Campo | Valor |
|---|---|
| Documento | 08_Manuales/Manual_Tecnico.md |
| Versión | 2.5 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-24 |
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
| `pages/` | Contiene `parroquia.html`, `grupos.html`, `calendario.html`, `transmisiones.html` y `contacto.html` (implementadas y publicadas) |
| `assets/css` | Estilos globales (`variables.css`, `main.css`, `components.css`) y específicos de página (`home.css`, `parroquia.css`, `grupos.css`, `calendario.css`, `transmisiones.css`, `contacto.css`); `components.css` incluye la navegación, el footer, el botón flotante de WhatsApp y el sistema compartido de Heroes interiores (`.hero-interior`, `.hero-curva`; sección 13) |
| `assets/js` | `grupos.js` (comportamiento móvil de Grupos), `proximos-eventos.js` (tarjetas de Próximos eventos de Inicio) y `transmisiones.js` (estados del reproductor y videos recientes de Transmisiones), `galeria-parroquia.js` (visor ampliado de la galería de Parroquia) y `solicitud-grupos.js` (formulario de solicitud de información de Grupos). El resto de la interactividad (navbar, dropdown, carrusel, pestañas, modal) usa el bundle de Bootstrap |
| `netlify/functions/` | `proximos-eventos.mjs` — Netlify Function de Google Calendar (sección 10) y `transmision-actual.mjs` — Netlify Function de YouTube (sección 11) |
| `favicon.ico` y `assets/icons/` | Favicon institucional (`favicon.ico` en la raíz; `favicon-32x32.png` y `apple-touch-icon.png` en `assets/icons/`), sección 12.3 |
| `assets/img/` | `logo/Logo.jpeg` y `parroquia/` (imágenes PNG con sus versiones WebP), sección 12; las demás subcarpetas siguen vacías |
| `components/`, `config/`, `data/`, `scripts/` | Vacíos |
| Funcionalidad | Inicio, Parroquia, Grupos, Calendario, Transmisiones y Contacto implementadas y desplegadas; integración con Google Calendar completada y operativa; integración con YouTube funcional dentro del alcance aprobado (validada con una transmisión pública real; la visualización automática de grabaciones de transmisiones finalizadas está excluida del alcance). Aún sin desarrollar: Servicios parroquiales (y sus páginas de segundo nivel). Estructura de las cuatro páginas congeladas (Inicio, Parroquia, Grupos y Calendario) en línea base temporal; Transmisiones y Contacto **no están congeladas**; contenido real pendiente de incorporación y validación (sección 9) |

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

**No incluido:** Transmisiones y Contacto (implementadas y publicadas, pero **no congeladas**) y Servicios parroquiales, Sacramentos, Gestiones y Documentos e información (todavía no existen como páginas implementadas). Estas secciones cuentan con diseño conceptual y decisiones previas ([Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 6) y con enlaces ya presentes en la navegación, pero eso es distinto de una implementación existente y no está congelado.

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
| JavaScript | `proximos-eventos.js` | `galeria-parroquia.js` | `grupos.js`, `solicitud-grupos.js` y pestañas de Bootstrap | No aplica |
| Integraciones | Google Calendar API v3 mediante Netlify Function (completada y operativa, con el calendario secundario institucional) | Ninguna propia | Formulario visual: no envía información | Iframe de Google Calendar (completado y operativo, con el calendario secundario institucional) |
| Contenido real de la parroquia | Pendiente de validación (horarios y enlaces de Maps aportados por el equipo; ver 9.6) | Textos editoriales propuestos, pendientes de validación institucional (9.6) | Pendiente | Pendiente |
| Imágenes definitivas | Hero con recreación digital (publicado); 8 placeholders pendientes | Hero, historia y patrono con recreaciones digitales (publicados); 13 placeholders pendientes | Pendientes (21 placeholders) | Hero con recreación digital (`herocalendario`, publicado el 2026-10-24, commit `a8406b2`); sin placeholders |
| Validación con la parroquia | Pendiente | Pendiente | Pendiente | Pendiente |
| Estado para entrega final | No alcanzada: pendiente de contenido, imágenes y validación | Ídem | Ídem | Ídem, más la limitación del embed a ≈ 375 px (9.9) |

Los placeholders son los elementos `.img-placeholder` del código. Los recursos gráficos reales incorporados son el logo institucional (`assets/img/logo/Logo.jpeg`), el favicon derivado de él y las recreaciones digitales de Inicio y Parroquia descritas en la sección 12 (no son fotografías documentales).

### 9.6 Contenido provisional y pendiente de información real

Una parte importante del contenido visible de las cuatro páginas es genérico, provisional, demostrativo o pendiente de validación. No debe presentarse como información institucional validada.

| Página | Pendiente de información real o validación |
|---|---|
| Inicio | Texto de bienvenida del Hero (redacción final por validar), frase decorativa de la llamada final, confirmación de que las recreaciones digitales (Hero, templo, Diaconía y carrusel) representan fielmente el edificio y las celebraciones reales, validación contra el panfleto oficial de los horarios de misa, confesiones, Hora Santa y Ermita María Auxiliadora y del nombre del templo principal, confirmación de que el enlace de Google Maps de la Ermita corresponde a su ubicación (Google Maps lo muestra como «Salón María Auxiliadora»), eventos reales en el calendario |
| Parroquia | Validación institucional de los textos editoriales propuestos (Hero, misión, visión, valores, comunidad, historia —contrastada con fuentes, sección 12.4— y patrono), constancia escrita de la autorización de uso y del consentimiento de las personas que aparecen en la galería (confirmados verbalmente por el responsable del proyecto el 2026-10-22; sección 12.5), biografía, cita y fotografía del párroco (el nombre «Pbro. Alexander Ramírez Arguedas» ya figura y coincide con la página de la Diócesis de Alajuela) |
| Grupos | Introducción; nombres, descripciones, reuniones, lugares, destinatarios y fotografías de los grupos (hoy 10 grupos de referencia con nombre «pendiente de confirmar»); número real de grupos; política de conservación y borrado de las solicitudes recibidas y quién tendrá acceso al panel de Netlify (sección 16.2) |
| Calendario | Confirmación de que la recreación digital del Hero representa fielmente el templo, validación de los textos del Hero y de «Nuestra agenda parroquial» (aportados por el responsable del proyecto) y calendario con eventos reales |
| Transmisiones (no congelada) | Confirmación de que la composición digital del Hero (basada en una fotografía real del interior del templo, con una cámara de video añadida digitalmente) representa fielmente la parroquia; fotografía institucional del estado sin transmisión del reproductor (hoy marcador sin imagen), textos de apoyo y validación con la parroquia |
| Contacto (no congelada) | Confirmación de que la recreación digital del Hero (un espacio de atención parroquial ilustrado: no es una fotografía de la oficina real) representa fielmente la parroquia, y validación con la parroquia de los datos de contacto y de los textos de apoyo |

Precisiones que deben mantenerse:

- Los horarios marcados «Pendiente de confirmar» no se presentan como confirmados.
- El formulario de Grupos es **funcional** (Netlify Forms, sección 16.2): envía solicitudes reales, que Netlify almacena y notifica por correo al buzón institucional. Los nombres de los grupos siguen siendo provisionales («pendiente de confirmar») y así aparecen también en el selector.
- El botón flotante de WhatsApp es un enlace a `wa.me` con el número de la oficina parroquial (6170-5997) y está operativo; ese número y los demás datos de contacto siguen sujetos a la validación final de la parroquia.
- Los footers enlazan a Facebook y YouTube con las URL oficiales proporcionadas; Instagram no se usa.
- Los tres eventos que devolvía el calendario durante la validación inicial **no se documentan como eventos reales de la parroquia**: no existe evidencia suficiente para determinar si eran reales o datos de prueba. La incorporación de eventos reales es una tarea de contenido, independiente de la integración técnica.

### 9.7 Integraciones

| Clasificación | Integración |
|---|---|
| Operativas | Google Calendar embebido (página Calendario); Google Calendar API v3 mediante Netlify Function (Próximos eventos); enlace simple de búsqueda de Google Maps desde la ubicación de cada evento (sin API ni clave); YouTube Data API v3 mediante Netlify Function (Transmisiones: transmisión en vivo y videos públicos normales recientes; funcional dentro del alcance aprobado y validada con una transmisión pública real); enlace del ícono de YouTube del pie de página al canal oficial; Contacto: Google Forms embebido (consultas generales) y mapa embebido de Google Maps con la ubicación de la oficina; enlaces «Cómo llegar» a Google Maps (templo principal, Diaconía, Ermita y oficina); botón flotante de WhatsApp (`wa.me`) y enlaces `tel:`/`mailto:`; enlaces a Facebook y YouTube en los footers; Netlify como hosting; Netlify Forms (formulario de solicitud de información de Grupos, con notificación por correo; sección 16.2) |
| Configuradas según información del equipo, no verificables por completo desde el repositorio | Google Cloud y API keys; variables de entorno de Netlify (`GOOGLE_CALENDAR_API_KEY`, `GOOGLE_CALENDAR_ID`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` y, opcional, `YOUTUBE_DETECCION_DIRECTO`) |
| Excluidas del alcance por decisión del proyecto | Visualización automática de grabaciones de transmisiones en vivo finalizadas (YouTube); ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 10 |
| Planificadas, no implementadas | Google Drive (documentos descargables); analítica |
| Pendientes | Dominio propio; Cloudflare; analítica |

Ninguna integración planificada o visual debe considerarse implementada por el solo hecho de este congelamiento. Detalle técnico: [Integraciones.md](../03_Arquitectura/Integraciones.md), [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md) e [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md).

### 9.8 Navegación común

Verificada en el código e idéntica en las seis páginas implementadas (las cuatro congeladas, Transmisiones y Contacto):

`Inicio · Parroquia · Grupos · Calendario · Transmisiones · Servicios parroquiales ▾ · Contacto`

con el submenú de Servicios parroquiales: `Sacramentos · Gestiones · Documentos e información`. No incluye buscador. Coincide con la arquitectura de navegación aprobada ([Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md), sección 4) y forma parte de la línea base: no se modifica sin autorización (sección 9.10).

Hoy los enlaces a Sacramentos, Gestiones y Documentos e información apuntan a páginas **que aún no existen**, y en los footers «Servicios parroquiales» se muestra sin enlace para evitar un error 404. Es una consecuencia de las páginas pendientes, no una modificación pendiente de la navegación. Los enlaces a Transmisiones y Contacto (incluido `contacto.html#como-llegar`) apuntan a páginas existentes.

**Adaptabilidad (2026-10-21):** el menú se expande desde 1200 px y se colapsa por debajo (`navbar-expand-xl`); ver sección 13. No cambiaron las opciones ni sus nombres.

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

**Autorización puntual sobre los Heroes de Parroquia, Grupos y Calendario (2026-10-24, publicado en el commit `a8406b2`):** estandarización de su altura y de su curva inferior (sección 13) y, en Calendario, el nuevo Hero con la imagen `herocalendario` y el encabezado «Nuestra agenda parroquial» de su tarjeta. Solo se modificaron el bloque del Hero de cada página (en Parroquia, únicamente la etiqueta `<section>` y el SVG de la curva, conservando íntegros sus cambios locales anteriores) y las reglas CSS del Hero; no se tocaron la integración con Google Calendar, la navegación, los eventos ni las demás secciones.

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

**Cuarta autorización puntual (2026-10-18, commits `ddd8d14` y `6375d5a`):** en Inicio, enlaces de Google Maps del templo principal y de la Diaconía, horarios de misa y franja complementaria (confesiones, Hora Santa, Ermita María Auxiliadora), botón «Cómo llegar» del Hero, footer estandarizado y botón flotante de WhatsApp (en las seis páginas), menor espacio entre Horarios y Contacto y retiro de la insignia circular de la transición previa al footer. Detalle en [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md).

**Quinta autorización puntual (2026-10-22, publicada en la liberación conjunta del commit `824b510`):** rediseño del Hero de Inicio como hero panorámico con imagen de fondo y sustitución de su transición inferior por la curva `.hero-wave`, que se unificó en las demás páginas (secciones 12 y 13). Conserva los textos, botones y enlaces del Hero; los cambios en `index.html` se limitan al bloque del Hero.

**Sexta autorización puntual (2026-10-24, publicado en el commit `a8406b2`):** alineación del Hero de Inicio con el sistema compartido de Heroes (sección 13): `index.html` solo cambia el SVG de la curva (de `.hero-wave` a la doble curva `.hero-curva`) y `home.css` solo cambia la altura mínima y el relleno inferior de `.hero`. Se conservan íntegros los textos, botones, enlaces, imagen, degradado y el resto de la página; Inicio mantiene una altura propia algo mayor que la referencia de los Heroes interiores (sección 13).

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

## 12. Recursos gráficos, favicon y optimización de imágenes

### 12.1 Archivos

Las imágenes reales viven en `assets/img/parroquia/` (más `assets/img/logo/Logo.jpeg`, 1080×1045 px, 344 KB). Cada imagen conserva su **PNG original como respaldo** y tiene versiones **WebP** optimizadas:

| Uso | Original (PNG) | Versiones WebP |
|---|---|---|
| Hero de Parroquia | `parroquiahero.png` — 1983×793, 2,55 MB | `parroquiahero-1280.webp` (105 KB), `parroquiahero-1983.webp` (211 KB) |
| «Nuestra historia» | `parroquiahistoria.png` — 1024×1536, 2,40 MB | `parroquiahistoria-640.webp` (99 KB), `parroquiahistoria-1024.webp` (210 KB) |
| «Nuestro Patrono» | `parroquiapatrono.png` — 1536×1024, 2,92 MB | `parroquiapatrono-640.webp` (74 KB), `parroquiapatrono-1024.webp` (157 KB) |
| «Horarios de misa» de Inicio (Diaconía) | `iniciodiaconia.png` — 1024×1536, 2,84 MB | `iniciodiaconia-640.webp` (92 KB, 640×960), `iniciodiaconia-1024.webp` (216 KB, 1024×1536), calidad 72 |
| Carrusel de Inicio | `assets/img/galeria/iniciogaleria1.png`, `iniciogaleria2.png`, `iniciogaleria3.png` — 1672×941 (16:9), 2,2 a 2,4 MB cada una | `iniciogaleriaN-640.webp` (43–46 KB), `-960.webp` (76–88 KB), `-1280.webp` (111–138 KB) y `-1672.webp` (154–201 KB), calidad 78 |
| Galería de Parroquia (12 fotografías **reales**) | `parroquiagal1` a `parroquiagal12` (`.jpg`; la 11 es `.png`) en `assets/img/parroquia/` — de 480×640 a 2048×1536, 29 a 568 KB, 2,8 MB en total | `parroquiagalN-ANCHO.webp` (28 archivos, 21 a 231 KB) más cuatro `-ampliada.webp` de 141 a 289 KB para el visor; detalle en la sección 12.5 |
| Hero de Grupos | `assets/img/grupos/herogrupos.png` — 1958×803, 2,43 MB | `herogrupos-960.webp` (64 KB), `-1440.webp` (120 KB), `-1958.webp` (188 KB) y `-mobile.webp` (900×602, recorte del templo y las velas, 92 KB), calidad 80 |
| Hero de Inicio | `parroquiainiciohero.png` — 1983×793, 2,48 MB | `parroquiainiciohero-1280.webp` (117 KB), `parroquiainiciohero-1983.webp` (222 KB), `parroquiainiciohero-mobile.webp` (900×793, recorte centrado en el templo, 104 KB) |
| Hero de Calendario | `assets/img/galeria/herocalendario.png` — 1672×941, 2,33 MB | `herocalendario-960.webp` (101 KB), `-1280.webp` (149 KB) y `-1672.webp` (214 KB), calidad 80 |
| Hero de Transmisiones | `assets/img/transmisiones/herotransmisiones.png` — 1673×940, 2,02 MB | `herotransmisiones-960.webp` (72 KB), `-1280.webp` (99 KB) y `-1673.webp` (135 KB), calidad 80 |
| Hero de Contacto | `assets/img/galeria/herocontacto.png` — 1672×940, 1,85 MB | `herocontacto-960.webp` (53 KB), `-1280.webp` (75 KB) y `-1672.webp` (101 KB), calidad 80 |

Las tres imágenes del carrusel de Inicio también son recreaciones digitales. **Los números de archivo no siguen el orden de las diapositivas:** `iniciogaleria3` (interior del templo) es la diapositiva 1, `iniciogaleria2` (comunidad reunida) la 2 e `iniciogaleria1` (San Rafael y Tobías) la 3. La tarjeta del templo principal de «Horarios de misa» de Inicio **reutiliza** `parroquiahistoria` (PNG y los dos WebP) sin generar archivos nuevos. Las imágenes del Hero y de «Nuestra historia» de Parroquia, la de «Nuestro Patrono», la del Hero de Inicio, la del Hero de Calendario (`herocalendario`: el templo al atardecer con una agenda abierta, un bolígrafo y un crucifijo), la de la Diaconía, la del Hero de Transmisiones (`herotransmisiones`: composición digital basada en una fotografía real del interior del templo, con una cámara profesional de video en primer plano) y la del Hero de Contacto (`herocontacto`: ilustración de un espacio de atención parroquial con escritorio, crucifijo, imagen de San Rafael y entrada iluminada; no es una fotografía documental de la oficina real) son **recreaciones digitales** del templo y de San Rafael Arcángel, aportadas por el equipo del proyecto: sus textos alternativos las identifican así y no deben presentarse como fotografías documentales. Queda pendiente confirmar con la parroquia que representan fielmente el edificio real (por ejemplo, las dos vistas del templo difieren en algunos detalles).

### 12.2 Cómo se generan y se incorporan

- Los WebP se generan **fuera del repositorio** (no hay tooling de build): se redimensiona con filtro Lanczos a los anchos indicados y se guarda en WebP con calidad 80 (por ejemplo, con Pillow). Los originales no se modifican. Reducen el peso entre 10 y 40 veces.
- En el HTML se usa `<picture>` con `<source type="image/webp" srcset="… 1280w, … 1983w" sizes="…">` y un `<img>` con el PNG como respaldo, con rutas relativas (`../assets/img/parroquia/…` desde `pages/`).
- Cada `<img>` declara `width` y `height` (evita saltos de diseño) y un texto alternativo descriptivo que indica que es una recreación digital.
- **Hero visible al abrir la página** (Inicio, Parroquia, Grupos, Calendario, Transmisiones y Contacto): `fetchpriority="high"` y **sin** `loading="lazy"`. Imágenes de más abajo (historia, patrono): `loading="lazy"` y un color de reserva (`--color-border-light`) mientras cargan.
- El recorte se controla con `object-fit: cover` y `object-position` (no con imágenes de fondo CSS), de modo que el navegador descarga una sola variante. En el Hero de Inicio se usa, por debajo de 768 px, la versión `-mobile.webp` mediante `<source media="(max-width: 767.98px)">`.
- **«Horarios de misa» (Inicio):** las dos imágenes (2:3) llevan `loading="lazy"` y `sizes="(min-width: 1200px) 230px, (min-width: 992px) 190px, (min-width: 768px) 340px, calc(100vw - 24px)"`. Se colocan en posición absoluta dentro de `.mass-card__media` (color de reserva `--color-border-light`) con `object-fit: cover`, de modo que no condicionan la altura de la tarjeta. Encuadre: `object-position` 50 % 24 % (templo) y 50 % 56 % (Diaconía) en móvil y tableta; 50 % 30 % y 72 % 50 % desde 992 px.
- **Carrusel de Inicio:** `<picture>` con cuatro variantes WebP por imagen y `sizes="(max-width: 500px) 500px, 100vw"` (en móvil la imagen se recorta a 280 px de alto y se muestra más ancha que la pantalla, de ahí los 500 px). Las tres llevan `loading="lazy"` porque el carrusel está bajo el Hero y no debe competir con su imagen; las diapositivas inactivas están ocultas y no se descargan hasta mostrarse. El navegador puede reutilizar una variante mayor ya en caché.
- **Galería de Parroquia:** las miniaturas usan `srcset` con las variantes de 480 a 1280 px y `sizes` según el tamaño real de cada tile; el visor ampliado usa además la variante `-ampliada` (resolución nativa del recorte). Todas llevan `loading="lazy"`, `decoding="async"` y `width`/`height`. El `<img src>` de respaldo es la variante de 960 px (no hay PNG de respaldo porque el recorte y la mejora difieren del original).
- Para reemplazar una imagen: conservar el nombre, regenerar los WebP y comprobar que los textos alternativos sigan siendo correctos.

### 12.3 Favicon

`favicon.ico` en la raíz (16, 32 y 48 px; evita el 404 que el navegador genera al pedirlo por defecto), `assets/icons/favicon-32x32.png` y `assets/icons/apple-touch-icon.png` (180 px, fondo crema), generados a partir del logotipo oficial recortado al sello circular y enlazados con `<link rel="icon">` y `<link rel="apple-touch-icon">` en las seis páginas. A 16 px el sello se reconoce pero pierde detalle; se evaluó y se mantuvo esta versión (decisión del responsable del proyecto, 2026-10-21).

### 12.4 Verificación de la reseña histórica de Parroquia

El texto de «Nuestra historia» se contrastó el 2026-10-21 con la página de la Diócesis de Alajuela (fundación en 1960; fiesta patronal el 24 de octubre) y con la memoria histórica «memoria y fotos solicitadas» de la parroquia (oratorio público desde el 9/6/1912; Coadjutoría Territorial de San Rafael de Ojo de Agua el 17/6/1935; parroquia proclamada el 21/12/1959 y vigente desde el 1/1/1960; construcción del templo actual desde 1970; retablo del altar mayor bendecido el 23/10/2021 tras unos 17 años de trabajo). La frase «raíces que se remontan a la época colonial» **no está respaldada** por esas fuentes y se sustituyó por «más de un siglo de historia documentada». Los textos de Hero, misión, visión, valores y comunidad son **propuestas editoriales pendientes de validación institucional**.

### 12.5 Mejora de las fotografías de la galería de Parroquia

Las doce fotografías son **reales** (no recreaciones digitales) y de calidad desigual. Se evaluaron una por una (resolución, exposición, balance de blancos, ruido y encuadre) y se mejoraron **sin IA generativa ni reconstrucción de detalles**, con Pillow y numpy fuera del repositorio: recorte de composición, balance de blancos limitado (±8 %), estiramiento de niveles conservador, recuperación suave de sombras y altas luces, contraste y saturación moderados, reducción de ruido que respeta bordes y nitidez aplicada al tamaño final. **Los originales no se modificaron.** No se ampliaron imágenes: las variantes nunca superan el ancho nativo del recorte.

| Foto | Original | Observación y ajuste principal |
|---|---|---|
| 1 | 480×640 | Muy baja resolución; reducción de ruido, sombras; se muestra sin ampliar |
| 2 | 632×485 | Baja resolución, tono cálido; ruido y sombras; recorte 4:3 |
| 3 | 1080×1920 | Mitad inferior oscura; sombras y recorte a 3:4 |
| 4 | 1500×2000 | Tinte gris; balance de blancos y recorte a 4:3 sobre la nave |
| 5 | 1200×1600 | Destello de lente (no corregible) y marca de agua «RFfotografic»; el recorte vertical a la fachada deja la marca fuera |
| 6 | 1200×1600 | Mitad inferior sin interés; recorte 4:3 sobre altar y celebrante |
| 7 | 1599×899 | Auto, reflejo y cables; recorte hacia el templo, balance de blancos y contraste |
| 8 | 1200×1600 | Cielo gris apagado y cables; contraste, saturación y recorte 4:3 |
| 9 | 1536×1024 | Vista aérea; sombras y altas luces |
| 10 | 554×554 | Foto antigua sepia, cielo quemado; solo reducción de ruido, sin colorear |
| 11 | 800×600 | Borde blanco a la derecha (recortado), colores desvaídos; conserva su etiqueta de catálogo |
| 12 | 2048×1536 | Interior de misa; sombras y balance de blancos suaves |

**Limitaciones sin resolver:** las fotos 1 y 2 se ven blandas a pantalla grande; el destello de la 5; los cables y el reflejo de las 7 y 8; el cielo quemado de la 10. **Autorización de uso y consentimiento:** el responsable del proyecto confirmó en el chat, el 2026-10-22 y antes de la liberación, que la parroquia cuenta con la autorización de uso de las 12 fotografías (incluidas la 5, con marca de agua «RFfotografic», y la 11, con etiqueta de catálogo) y con el consentimiento de las personas identificables de las fotos 4, 6, 8 y 12 (hay niños en la 4). La confirmación es verbal: **no hay constancia escrita en el repositorio, que es público**. Se recomienda archivar la autorización fuera del repositorio y retirar de inmediato cualquier fotografía si su autor o una persona retratada lo solicita. Sugerencia: reemplazar las fotos 1, 2, 7 y 10 por originales de mejor calidad si se consiguen.

## 13. Componentes visuales compartidos y adaptabilidad

Resumen; el registro de uso está en [Componentes_UI.md](../04_Diseno/Componentes_UI.md).

- **Navegación:** `navbar-expand-xl`. Desde 1200 px el menú se muestra expandido; por debajo, colapsado. Antes se expandía desde 992 px y la marca más los siete elementos (~1105 px) no cabían en el contenedor de 960 px, con desborde horizontal entre ≈ 992 y 1159 px (incidencia resuelta, [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md)). Entre 1200 y 1399 px se acorta el relleno lateral de los enlaces (`components.css`). Por debajo de 576 px el nombre de la marca puede pasar a dos líneas (a 320 px no cabía en una).
- **Footer estandarizado** (igual en las seis páginas): marca, enlaces rápidos, bloque «Contáctanos» (teléfono 2438-0379, WhatsApp 6170-5997, correo, ubicación y horario administrativo) y redes sociales (Facebook y YouTube; Instagram no se usa). «Servicios parroquiales» aparece sin enlace hasta que exista la página. El HTML del navbar y del footer está duplicado en cada página (no hay includes ni JavaScript): **todo cambio debe replicarse en las seis páginas**.
- **Botón flotante de WhatsApp:** enlace real a `https://wa.me/50661705997` (nueva pestaña, `rel="noopener noreferrer"`, nombre accesible), idéntico en las seis páginas. El espacio inferior del footer reserva sitio **a la derecha** para que no tape el texto.
- **Altura común de los Heroes interiores (`.hero-interior`, `components.css`; 2026-10-24, publicado en `a8406b2`):** Parroquia, Grupos, Calendario, Transmisiones y Contacto comparten una altura mínima de referencia, `--hero-min-height`: 460 px en móvil, 520 px entre 768 y 991 px y, desde 992 px, `min(clamp(520px, 42vw, 620px), max(480px, 100vh − --navbar-height − 100px))` (605 px a 1440 px; 620 px a 1920 px). El segundo término evita que el Hero ocupe toda la pantalla en ventanas poco altas y deja a la vista ≈ 100 px de la sección siguiente. Es un **mínimo**: si el contenido es más alto, el Hero crece y no se recorta ningún texto ni botón (por eso Grupos, con su cita, mide 607 px a 768 px y los Heroes apilados de móvil miden entre 484 y 570 px). Cada página añade la clase `hero-interior` a su `<section>` (que aporta `position: relative`, `isolation: isolate` y la altura) y conserva en su hoja solo lo propio de su composición: imagen, degradado, textos y relleno inferior `calc(var(--hero-curva-height) + …)`. En los Heroes apilados (Grupos, Calendario, Transmisiones y Contacto, por debajo de 992 px) la imagen va arriba y, desde 768 px, se limita a una franja de `clamp(260px, 40vw, 380px)` para que el total se acerque a la referencia. **Excepción justificada:** la variante `.hero-interior--compacto` (≈ 80 % de la referencia: `--hero-min-height-compacto`, 400 px en móvil, 440 px en tableta y entre 420 y 500 px desde 992 px) está pensada para Heroes que todavía no tienen fotografía (a la altura completa quedarían casi vacíos). **A la fecha ninguna página la usa:** Transmisiones y Contacto la utilizaron hasta incorporar su fotografía (2026-10-24) y ya adoptan la altura de referencia. Sigue definida en `components.css` para páginas futuras, por ejemplo las de Servicios parroquiales. **Inicio** es la portada y conserva una altura algo mayor (`home.css`): 620 px en móvil, 600 px en tableta y, desde 992 px, la referencia + 30 px; en móvil y tableta el texto va sobre la base de la imagen y necesita espacio libre arriba para que se vean las torres.
- **Doble curva Hero → contenido (`.hero-curva`, `components.css`; 2026-10-24, publicado en `a8406b2`):** identidad visual común de las seis páginas, sustituye a la curva simple `.hero-wave`. SVG a todo el ancho (`viewBox` 1440×120) con cuatro capas: una banda azul institucional `#1D2A54` al 34 % de opacidad detrás (`__azul`), un eco dorado de 1 px al 50 % (`__eco`), la curva principal con el color de la sección siguiente (`__crema`, `--hero-wave-fill`; crema por defecto, blanco en Grupos) y un filete dorado `#DA981B` de 2 px (`__linea`); los trazos usan `vector-effect: non-scaling-stroke`. Altura `--hero-curva-height` = 1,35 × `--hero-wave-height` (59, 86 y 108 px a 44, 64 y 80 px). Para usarla en un Hero nuevo: `position: relative` (lo aporta `hero-interior`), **sin** `overflow: hidden`, relleno inferior de al menos `var(--hero-curva-height)` y el SVG con sus cuatro `<path>` (copiar de `index.html`) al final del Hero. Sobresale 2 px bajo el Hero para ocultar la unión con la sección siguiente. El componente `.hero-wave` (curva simple, 2026-10-22) **ya no lo usa ninguna página**; sigue definido en `components.css` hasta que se autorice retirarlo. La transición navy/dorada previa al footer (`.wave-transition`) es otro componente y no cambió.
- **Hero de Inicio:** hero panorámico de ancho completo, con altura propia (620 px en móvil, 600 px en tableta y 550–650 px desde 992 px; ver la altura común de los Heroes interiores); imagen con degradado azul `#1D2A54` (de izquierda a centro desde 992 px; desde abajo por debajo); título blanco, texto superior dorado y botón «Cómo llegar» con borde blanco. El contraste medido del texto sobre la imagen (peor 5 % de cada zona) es ≥ 4,5 en todos los anchos probados (medido el 2026-10-22; no se repitió tras el ajuste de altura del 2026-10-24, que no cambió el degradado ni el texto).
- **Carrusel de Inicio (`.gallery-carousel`, `home.css`):** carrusel de Bootstrap sin JavaScript propio, **sin rotación automática** (no tiene `data-bs-ride`), con flechas, tres indicadores, deslizamiento táctil (`data-bs-touch`) y teclado (← →). Cada `.carousel-item` mantiene proporción 21:9 con alto mínimo de 280 px y color de reserva; la imagen (16:9) va en posición absoluta con `object-fit: cover`. Encuadre (`object-position`): interior del templo 50 % 20 % (retablo y altar), comunidad 50 % 35 %, San Rafael y Tobías 47 % 28 % (ambos rostros visibles desde 320 px). Los pies de imagen («La belleza de nuestro templo», «Una comunidad reunida en la fe», «Guiados por la fe y la esperanza») son `<p>` en `.gallery-carousel__caption`, abajo a la derecha sobre un degradado; por debajo de 576 px son más pequeños (1,05 rem) y quedan sobre la franja de indicadores para no cubrir a los protagonistas. Accesibilidad: cada diapositiva es un `role="group"` con `aria-roledescription="diapositiva"` y «n de 3»; los controles se llaman «Imagen anterior/siguiente»; los textos alternativos las presentan como recreaciones digitales. Bootstrap ya anula la transición con `prefers-reduced-motion`. Con 1920 px el carrusel mide 816 px y los originales (1672 px) se amplían un 14 %.
- **Galería de Parroquia (`.parroquia-mosaico`, `parroquia.css`):** mosaico editorial que sustituye al carrusel de 12 diapositivas. CSS Grid de 6 columnas desde 768 px y de 2 columnas en móvil; la unidad de fila se mide en `cqw` (contenedor con `container-type: inline-size`) para conservar proporciones a cualquier ancho. Composición: tres fotografías destacadas (4 columnas), tres verticales (2 columnas) y seis miniaturas, en cinco bandas; la posición de cada una se fija por `:nth-child` y **el orden del HTML es el orden de lectura** (9, 3, 12, 5, 4, 8, 6, 1, 2, 7, 11, 10: se abre con las mejores y las antiguas van al final). Separación de 14 px (12 px en móvil), esquinas redondeadas y recorte máximo de 15 % en escritorio y tableta (28 % en móvil). Cada tile es un `<button>` con `aria-label` «Ampliar fotografía: …»; al pasar el cursor (solo con puntero y sin `prefers-reduced-motion`) aparecen un acercamiento suave, una descripción breve y un icono de ampliar, y también al enfocar con teclado; en pantallas táctiles no hay hover. Los títulos y los textos alternativos solo describen lo que se ve, sin fechas ni celebraciones.
- **Visor ampliado de la galería (`#parroquiaVisor`, `assets/js/galeria-parroquia.js`):** modal de Bootstrap a pantalla completa, sin librerías nuevas. Muestra la fotografía (variante `-ampliada` cuando existe), su descripción y «n de 12»; botones anterior, siguiente y cerrar de 48 px; navegación con ← →, cierre con Escape y circularidad (de la 12 a la 1). Bootstrap aporta la trampa de foco, el bloqueo del desplazamiento y `aria-modal`; el script añade la navegación, un `role="status"` que anuncia «Fotografía n de 12: …» y devuelve el foco a la miniatura de origen al cerrar. En móvil anterior y siguiente van abajo; desde 768 px, a los costados. No hay gesto de deslizamiento táctil (solo botones visibles). Para añadir una fotografía hay que crear su tile, asignarle posición en el CSS y, si procede, su variante `-ampliada`.
- **Hero e introducción de Grupos (`.grupos-hero`, `.grupos-intro`, `grupos.css`):** la imagen `herogrupos.png` (composición de dos fotografías: vista aérea del templo y personas orando con velas) va como `<picture>` con WebP responsivos (recorte móvil por debajo de 768 px) y el PNG original como respaldo; no se modifica la imagen ni se añade desenfoque propio. Por debajo de 992 px la imagen va arriba y el texto debajo, sobre el azul `#1D2A54`; desde 992 px el texto se superpone en la base, sobre un degradado azul (altura de referencia compartida de los Heroes interiores), con la cita bíblica a la derecha (`<figure>`, `<blockquote>` y `<figcaption>` «Mateo 18,20» en dorado). El contraste, medido sobre la imagen y el degradado reales, es ≥ 6,2 en el título, ≥ 8,1 en la descripción y ≥ 6,4 en la cita (percentil 5; mínimo absoluto 3,4 en texto grande; medido con la altura anterior, sin repetirlo tras la estandarización del 2026-10-24). La curva inferior es el componente compartido `.hero-curva`. La introducción es una composición editorial: ornamento dorado (icono entre dos filetes), título `<h2>`, descripción y una invitación en un bloque crema con filete dorado.
- **Hero de Calendario (`.calendario-hero`, `calendario.css`; 2026-10-24, publicado en `a8406b2`):** la imagen `herocalendario` (recreación digital: el templo con sus dos torres al fondo y, en primer plano, una agenda abierta, un bolígrafo y un crucifijo) va como `<picture>` con tres WebP (`sizes="(max-width: 767.98px) 120vw, 100vw"`) y el PNG original como respaldo, con `fetchpriority="high"` y `width`/`height`. Textos exactos aprobados: título «Juntos en **cada momento**» (la segunda parte en dorado) y un párrafo, sin botones. Por debajo de 992 px la imagen va arriba (3:2 en móvil, franja de `clamp(260px, 40vw, 380px)` desde 768 px) y el texto debajo, sobre el azul `#1D2A54`; desde 992 px el texto se superpone a la izquierda, sobre el follaje, con un degradado horizontal azul y una máscara vertical (`mask-image`) que lo desvanece hacia abajo para que la agenda y el crucifijo conserven sus colores (entre 992 y 1199 px la máscara se extiende más abajo para que la última línea del párrafo no quede sobre las flores). `object-position`: 58 % 50 % en móvil, 50 % 55 % en tableta y 50 % 58 % en escritorio. Contraste del texto calculado sobre la imagen y el degradado reales (percentil 5, 2026-10-24 con la altura anterior): título ≥ 11, párrafo ≥ 5,9 y acento dorado ≥ 4,4 en texto grande; no se repitió tras la reducción de altura. En la tarjeta del calendario, el encabezado pasó a «Nuestra agenda parroquial» con su texto de apoyo aprobado; el iframe de Google Calendar y el botón «Abrir en Google Calendar» no cambiaron. La altura de escritorio se redujo ≈ 19–20 % respecto de la versión inicial (749 → 605 px a 1440 px; 780 → 620 px a 1920 px).
- **Hero de Transmisiones (`.transmisiones-hero`, `transmisiones.css`; 2026-10-24, publicado en `a8406b2`):** la imagen `herotransmisiones` (composición digital basada en una fotografía real del interior del templo: altar y retablo dorado al fondo y, en primer plano a la derecha, una cámara profesional de video) va como `<picture>` con tres WebP (`sizes="(max-width: 767.98px) 120vw, 100vw"`) y el PNG original como respaldo, con `fetchpriority="high"` y `width`/`height`; su texto alternativo la identifica como recreación digital. Usa `.hero-interior` con la altura compartida (la variante compacta se eliminó) y la doble curva `.hero-curva`, sin ningún otro elemento gráfico sobre la imagen. Se conservan íntegros el título «Una misma fe, sin distancias» (en cursiva; la segunda línea en dorado), el párrafo «Transmisiones en vivo de nuestras celebraciones y actividades parroquiales» y las tres barras doradas, ahora en blanco sobre la imagen. Por debajo de 992 px la imagen va arriba (3:2 en móvil, franja de `clamp(260px, 40vw, 380px)` desde 768 px) y el texto debajo, sobre el azul `#1D2A54`; desde 992 px el texto se superpone a la izquierda con un degradado azul horizontal (entre 992 y 1199 px, con la columna de texto limitada a 360 px y el degradado opaco hasta más a la derecha). `object-position`: 80 % 50 % en móvil, 70 % 65 % en tableta y 50 % 75 % en escritorio (se priorizan el altar y el cuerpo de la cámara por encima de la curva; se recortan la lámpara y la cornisa). Altura efectiva: 460 px en móvil, 571 px a 768 px (el contenido apilado supera el mínimo de 520), 520 px a 1024 px, 605 px a 1440 px y 620 px a 1920 px. Contraste del texto, calculado sobre la imagen y el degradado reales (percentil 5): título ≥ 10,7, párrafo ≥ 5,6 y acento dorado ≥ 4,46 (texto grande); en los anchos apilados el texto va sobre azul liso (≥ 11). Limitaciones: a la izquierda el texto cubre la estatua de San Rafael y parte del retablo bajo el degradado; a 320 px el lateral derecho de la cámara queda algo recortado (se ven el visor, el objetivo y el cuerpo). El reproductor, la franja de categorías, las Netlify Functions y `transmisiones.js` no se modificaron.
- **Hero de Contacto (`.contacto-hero`, `contacto.css`; 2026-10-24, publicado en `a8406b2`):** la imagen `herocontacto` (recreación digital de un espacio de atención parroquial) va como `<picture>` con tres WebP (`sizes="(max-width: 767.98px) 120vw, 100vw"`) y el PNG original como respaldo, con `fetchpriority="high"` y `width`/`height`; su texto alternativo la presenta como recreación digital y no como una fotografía de la oficina real. Usa `.hero-interior` con la altura compartida (la variante compacta se eliminó) y la doble curva `.hero-curva`, sin elementos gráficos sobre la imagen. Se conservan el título «Contacto», el subtítulo «Estamos para servirte» y la frase «Tu inquietud también es parte de nuestra comunidad.». **Tipografía estandarizada** (revisión visual del 2026-10-24): título Cormorant Garamond 700 en cursiva a `--fs-display` (52 px en escritorio) con `--lh-heading`, idéntico al de Parroquia; subtítulo como mensaje secundario destacado en Nunito Sans 600 a `--fs-h4` (20 px) en dorado `#DA981B`; frase como texto de apoyo en Nunito Sans 400 a `--fs-body` (18 px), blanca al 92 %, sin cursiva (igual que el párrafo de Calendario, Grupos y Parroquia). La frase pasó de estar a la derecha del título a ir debajo del subtítulo, a la izquierda, en todos los anchos. **Degradado:** el mismo patrón horizontal de Transmisiones (94 % → 88 % al 26 % → 60 % al 38 % → 16 % al 50 % → 0 % al 58 %; entre 992 y 1199 px la variante extendida), sin máscara vertical; una primera versión con máscara vertical formaba una mancha azul aislada alrededor del texto y se descartó. Por debajo de 992 px la imagen va arriba (4:3 en móvil, franja de `clamp(260px, 40vw, 380px)` desde 768 px) y el texto debajo, sobre el azul `#1D2A54`. `object-position`: 28 % 50 % en móvil, 40 % 30 % en tableta y 50 % 30 % en escritorio. Altura efectiva: 460 px a 320 px, 485 px a 390 px, 540 px a 768 px (el contenido apilado supera el mínimo de 520), 520 px a 1024 px, 605 px a 1440 px y 620 px a 1920 px. Contraste calculado sobre la imagen y el degradado reales (percentil 5): título ≥ 12, frase ≥ 8,7 y subtítulo dorado ≥ 4,79. Limitación: desde 992 px el degradado uniforme deja la imagen de San Rafael y el crucifijo tenues bajo el texto; en tableta y móvil se ven completos. El cartel y el folleto con el nombre de la parroquia forman parte de la ilustración. El formulario de Google, el mapa, los datos de contacto, los enlaces de WhatsApp, `tel:` y `mailto:`, la navegación y el footer no se modificaron.
- **Tarjetas de «Horarios de misa» (`.mass-card`, `home.css`):** por debajo de 992 px la imagen va arriba (proporción 4/3) y desde 992 px a la izquierda (40 % del ancho, alto completo). Entre 768 y 991 px se apilan y no se colocan en fila porque la ventana de imagen quedaba en ≈ 134×560 px y se perdía la arquitectura. El cuerpo (`.mass-card__body`) usa `flex: 1 1 auto` y su botón `margin-top: auto`, de modo que **«Cómo llegar» queda en el borde inferior y alineado entre ambas tarjetas** (25 px bajo el botón) aunque una tenga menos horarios; no se rellena el espacio con contenido. Con una tarjeta por fila (móvil) no sobra alto y el botón queda a 16 px de los horarios.
- **Contacto:** la fila `row g-lg-5` excede en 12 px el relleno de su contenedor; entre 992 y 1199 px `contacto.css` reserva ese margen mínimo (`max-width: min(960px, calc(100% - 1.5rem))`), lo que evitó un desborde de ≈ 4 px con 992–998 px y barra de desplazamiento clásica. No se usa `overflow-x: hidden`.

## 14. Publicación en Netlify

Los **despliegues automáticos desde `main` están habilitados** (confirmado por el responsable del proyecto el 2026-10-24; así se comportaron las liberaciones del 22 y 24 de octubre): cada `git push` a `main` publica en producción y consume créditos (unos 15 por despliegue), por lo que los pushes siguen requiriendo autorización expresa y conviene agruparlos. El incidente de suspensión por agotamiento de créditos, el procedimiento de liberaciones controladas (con los builds detenidos, ya no vigente de forma permanente) y la actualización de estado están en [Netlify.md](../07_Despliegue/Netlify.md), secciones 5.1 a 5.4. Plan actual: Personal (US$ 9 mensuales, 1 000 créditos).

## 15. Liberación conjunta del 2026-10-22

Incluidos en la liberación conjunta del 2026-10-22, autorizada por el responsable del proyecto y publicada en el commit `824b510`: imagen y textos de «Nuestro Patrono» y nombre del párroco en Parroquia; Hero panorámico de Inicio con su imagen y WebP; componente `.hero-wave` en las seis páginas; imágenes de las dos tarjetas de «Horarios de misa» de Inicio (autorización puntual sobre una página congelada, sin cambiar nombres, horarios ni enlaces), con el cambio de apilado entre 768 y 991 px y la alineación de los botones «Cómo llegar»; las tres imágenes del carrusel con sus pies de imagen (reemplazan los marcadores provisionales y las citas de ejemplo); y la galería de Parroquia con las 12 fotografías mejoradas, el mosaico y el visor ampliado (`assets/js/galeria-parroquia.js`, estilos en `parroquia.css`). Los pendientes de contenido, autorización y validación siguen listados en la sección 9 y en la sección 12.5; esta liberación no los da por resueltos.

## 16. Formulario de solicitud de información de Grupos

### 16.1 Decisión de arquitectura

El formulario de la página Grupos se procesa con **Netlify Forms**, el mecanismo nativo del hosting: no hay backend propio ni Netlify Function. Se eligió frente a un formulario de Google embebido (como el de Contacto) porque no depende de un tercero adicional, mantiene el diseño del portal y, según la documentación de Netlify consultada, **los formularios son gratuitos e ilimitados en los planes por créditos** (Personal incluido); un proyecto pausado por agotar los créditos deja de recibir envíos. El detalle de la integración está en [Integraciones.md](../03_Arquitectura/Integraciones.md).

### 16.2 Funcionamiento

- **Registro en Netlify:** el formulario está en el HTML estático (`pages/grupos.html`) con `name="solicitud-grupos"`, `data-netlify="true"`, `netlify-honeypot="campo-trampa"` y el campo `form-name`. Netlify lo detecta al publicar y retira esos atributos del HTML servido (es la señal de que lo registró). **No debe quitarse del HTML ni generarse con JavaScript**, o dejaría de detectarse.
- **Campos enviados:** `grupo` (nombre elegido), `grupo-id` (identificador estable `grupo-1` a `grupo-10`, tomado del `aria-controls` de la lista), `nombre`, `email` (se llama así para que «Responder» llegue a la persona), `telefono` (opcional), `mensaje` (opcional, 1 000 caracteres), `consentimiento` («Acepto»), `solicitud-id` (identificador único por solicitud), `subject` (asunto fijo del correo), `form-name` y el campo trampa `campo-trampa`.
- **Selector de grupos:** se construye al cargar la página con los nombres de la lista de grupos (`#gruposTab`), sin duplicar datos; al confirmar los nombres reales solo se editan la lista y la ficha. Las diez opciones se muestran con su nombre provisional y no existe una opción «general».
- **Envío (`assets/js/solicitud-grupos.js`):** POST url-encoded a `/` con `fetch`, sin recargar la página; sin JavaScript el formulario se envía de forma nativa (Netlify muestra su página de confirmación) y la validación nativa queda activa. El mensaje de éxito aparece **solo** si el servidor responde con un código HTTP satisfactorio.
- **Validación (español, `aria-invalid` y mensajes asociados):** grupo obligatorio; nombre y apellido; correo con dominio; teléfono opcional con formato válido; mensaje de hasta 1 000 caracteres; casilla de consentimiento obligatoria, inicialmente desmarcada («Acepto que la Parroquia San Rafael Arcángel utilice los datos proporcionados para atender mi solicitud de información sobre los grupos parroquiales.»). El foco pasa al primer campo inválido.
- **Spam:** Akismet (automático en Netlify) y el campo trampa (fuera de pantalla, sin `display:none`, fuera del orden de tabulación; si se llena, el envío se descarta sin aviso). No se usa reCAPTCHA (accesibilidad y privacidad); puede añadirse si hubiera abuso.
- **Duplicados:** el botón queda inactivo mientras se envía y tras el éxito hasta que la persona edita algún campo; cada solicitud lleva un `solicitud-id` (UUID) que **se conserva en los reintentos** y cambia solo tras un éxito, de modo que el personal puede reconocer duplicados en el panel. Si no hay respuesta (tiempo de 15 s agotado o red caída) no se sabe si la solicitud llegó: se muestra «No pudimos confirmar si tu solicitud fue recibida…» sin recomendar el reenvío; si el servidor responde con error, se muestra el mensaje de error y se conservan los datos. Netlify no descarta duplicados por sí mismo.
- **Aviso de privacidad (texto propuesto, sin política institucional aprobada ni plazos de conservación):** «Usaremos los datos que escribas únicamente para atender tu solicitud de información sobre el grupo elegido. Tu envío será recibido y almacenado mediante Netlify, el proveedor tecnológico de este sitio.»
- **Interruptor:** el atributo `data-estado` de `.grupos-interes` controla la visibilidad. **Estado actual: `"activo"`** (formulario visible). Con `"inactivo"` se muestra el aviso «Estamos preparando este formulario…» con un enlace a Contacto y el formulario se oculta con CSS, **sin salir del HTML**, por lo que Netlify lo mantiene detectado; sirve para desactivarlo con un solo cambio (por ejemplo, ante una oleada de spam). El modo de prueba `?formulario=prueba`, que existió durante la validación inicial, se retiró.
- **Pruebas locales:** con un servidor estático el POST devuelve 501 (el formulario muestra su error); la lógica se probó simulando `fetch` (sección «Pruebas» de [Evidencias.md](../06_Pruebas/Evidencias.md)).

### 16.3 Configuración en Netlify y gestión de solicitudes

- **Configurado por el responsable del proyecto:** *Forms > Enable form detection* activo; notificación por correo (*Forms > Form notifications > Email notification*, evento «New form submission», solo para `solicitud-grupos`) hacia el correo institucional de la parroquia. El responsable confirmó el 2026-10-24 que un envío de prueba quedó en *Verified submissions*, con todos los campos, identificadores y consentimiento, y que la notificación llegó al buzón.
- **Consulta:** *Forms > solicitud-grupos > Verified submissions* (los envíos marcados como spam por Akismet están en *Spam submissions*). **Exportar:** *Download as CSV* (solo verificados). **Borrar:** marcar las solicitudes y *Delete submission* (permanente); Netlify recomienda exportar y borrar periódicamente los datos personales.
- **Mantenimiento:** el nombre del formulario y de sus campos es lo que Netlify registra; cambiarlos crea un formulario nuevo o campos distintos. Para añadir un campo hay que añadirlo en el HTML.

### 16.4 Pendientes y riesgos

- **Nombres provisionales:** las solicitudes llegan con «Grupo N — nombre pendiente de confirmar»; el `grupo-id` permite relacionarlas con el grupo real cuando se confirmen los nombres (las solicitudes antiguas conservan el nombre provisional).
- **Sin definir por la parroquia:** plazo de conservación y borrado de las solicitudes, quién tendrá acceso al panel de Netlify (no se confirmó si el plan permite más usuarios) y el texto definitivo de privacidad.
- **Tiempo agotado:** una solicitud recibida por el servidor pero no confirmada al navegador puede reenviarse; el `solicitud-id` ayuda a detectarla.
- **`subject` modificable:** el asunto del correo es un campo oculto que puede alterar quien manipule el HTML; el riesgo es bajo.

## 17. Liberación del 2026-10-24: Heroes estandarizados e imágenes de Calendario, Transmisiones y Contacto

Aprobados visualmente por el responsable del proyecto y **publicados el 2026-10-24** mediante el push `ff4796c..a8406b2` a `main` (commits `86207df` y `a8406b2`). El despliegue automático de Netlify se verificó en producción: las seis páginas responden 200 con la doble curva y las alturas de la tabla siguiente, las imágenes de Calendario, Transmisiones y Contacto son idénticas a las del repositorio, el formulario de Grupos sigue activo y los endpoints `/api/proximos-eventos` y `/api/transmision-actual` responden con normalidad (registro en [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md)).

| Aspecto | Detalle |
|---|---|
| Alcance | Altura común y doble curva en los seis Heroes (sección 13); nuevo Hero de Calendario con la imagen `herocalendario`; encabezado «Nuestra agenda parroquial» en la tarjeta del calendario; nuevo Hero de Transmisiones con la imagen `herotransmisiones`; nuevo Hero de Contacto con la imagen `herocontacto` |
| CSS | `components.css` (sistema `.hero-interior`, `.hero-interior--compacto` y `.hero-curva`), `home.css`, `parroquia.css`, `grupos.css`, `calendario.css`, `transmisiones.css`, `contacto.css` |
| HTML | `index.html`, `pages/parroquia.html`, `grupos.html`, `calendario.html`, `transmisiones.html` y `contacto.html` (solo la etiqueta del Hero y su SVG; en Calendario, además, el Hero y el encabezado de la tarjeta) |
| Imágenes nuevas | `assets/img/galeria/herocalendario.png`, `assets/img/transmisiones/herotransmisiones.png` y `assets/img/galeria/herocontacto.png`, con tres WebP cada una (sección 12.1) |
| Independiente | `pages/parroquia.html` incluye además sus cambios anteriores (reformateo del marcado y el pie de imagen aprobado «Sacerdote y fieles»), que no forman parte de esta estandarización; la verificación del renderizado (VR-20) confirmó que el reformateo no alteró su contenido |
| Capturas | Carpetas locales no versionadas `_capturas_revision/heroes_estandar/` (antes y después; escritorio, tableta y móvil) `_capturas_revision/transmisiones_hero/` y `_capturas_revision/contacto_hero/` |

Altura de cada Hero en píxeles (anterior → nueva), medida con una ventana de 900 px de alto (844 px en móvil):

| Página | 390 px | 768 px | 1024 px | 1440 px | 1920 px |
|---|---|---|---|---|---|
| Inicio | 680 → 620 | 680 → 600 | 540 → 550 | 634 → 635 | 650 → 650 |
| Parroquia | 440 → 460 | 380 → 520 | 380 → 520 | 518 → 605 | 540 → 620 |
| Grupos | 542 → ≈ 565 | 586 → 607 | 520 → 520 | 634 → 605 | 640 → 620 |
| Calendario | 484 → ≈ 490 | 645 → 529 | 540 → 520 | 749 → 605 | 780 → 620 |
| Transmisiones | 320 → 460 | 360 → 571 | 360 → 520 | 365 → 605 | 365 → 620 |
| Contacto | 360 → 485 | 360 → 540 | 360 → 520 | 360 → 605 | 360 → 620 |

Reducción real de Calendario: −19,2 % a 1440 px, −20,5 % a 1920 px y −18,0 % a 768 px; en móvil casi no cambia porque ya era bajo. Transmisiones y Contacto se midieron con la altura estándar (ninguna usa ya la variante compacta). Validaciones: VR-15 a VR-20 en [Evidencias.md](../06_Pruebas/Evidencias.md). Pendientes: ningún Hero reutiliza ya `.hero-wave` (candidato a retirarse con autorización); el contraste del texto no se volvió a medir tras el cambio de altura; el iframe de Google Calendar no se pudo ver cargado en el navegador de pruebas (su código no cambió).

---

## Documentos relacionados

- [Arquitectura_General.md](../03_Arquitectura/Arquitectura_General.md)
- [Diseno_Conceptual_Aprobado.md](../04_Diseno/Diseno_Conceptual_Aprobado.md)
- [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md)
- [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
- [Componentes_UI.md](../04_Diseno/Componentes_UI.md)
- [Netlify.md](../07_Despliegue/Netlify.md)
- [Convenciones.md](../05_Desarrollo/Convenciones.md)
