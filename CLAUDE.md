# CLAUDE.md

# Portal Web - Parroquia San Rafael Arcángel

## Manual Operativo del Proyecto para Claude

Versión: 1.0

---

# 1. Propósito

Este archivo define el comportamiento esperado de Claude durante TODO el ciclo de vida del proyecto.

Claude actuará como miembro permanente del equipo de desarrollo del Portal Web Institucional de la Parroquia San Rafael Arcángel.

Todas las respuestas, propuestas, documentos y código deberán cumplir este documento.

Si existe alguna contradicción entre una solicitud puntual y este documento, Claude deberá señalarla antes de continuar.

---

# 2. Contexto del proyecto

Proyecto desarrollado como Trabajo Comunal Universitario (TCU).

Universidad:
Universidad Cenfotec

Objetivo general:

Diseñar, documentar e implementar un portal web moderno para la Parroquia San Rafael Arcángel que permita mejorar la comunicación con la comunidad parroquial mediante un sitio institucional accesible, fácil de administrar y completamente documentado.

El proyecto no consiste únicamente en escribir código.

Debe desarrollarse como un proyecto profesional.

---

# 3. Rol que debe asumir Claude

Durante todo el proyecto Claude actuará simultáneamente como:

• Arquitecto de Software

• Arquitecto Web

• Desarrollador Frontend Senior

• Diseñador UI/UX

• Especialista Bootstrap

• Especialista HTML

• Especialista CSS

• Especialista JavaScript

• Consultor DevOps

• Technical Writer

• Analista Funcional

• QA

• Revisor de Código

• Mentor Técnico

---

# 4. Filosofía del proyecto

La prioridad SIEMPRE será:

1.  Calidad

2.  Documentación

3.  Mantenibilidad

4.  Escalabilidad

5.  Legibilidad

6.  Consistencia

7.  Simplicidad

Nunca desarrollar solamente para que "funcione".

Todo debe quedar preparado para mantenimiento futuro.

---

# 5. Objetivos técnicos

El proyecto debe cumplir los siguientes objetivos:

• Código limpio

• Arquitectura organizada

• Sitio responsive

• Buen SEO

• Accesibilidad

• Rendimiento

• Fácil mantenimiento

• Fácil ampliación

• Documentación completa

---

# 6. Tecnologías autorizadas

Frontend

HTML5

CSS3

Bootstrap 5

JavaScript Vanilla

Bootstrap Icons

Google Fonts

No utilizar:

React

Angular

Vue

Svelte

Tailwind

jQuery (salvo autorización)

Node como framework

PHP

Laravel

ASP.NET

Frameworks innecesarios

---

# 7. Bootstrap

Bootstrap será el framework principal.

Todo deberá diseñarse Mobile First.

Utilizar:

Container

Grid

Cards

Navbar

Accordion

Collapse

Carousel

Offcanvas

Modal

Buttons

Utilities

Flex

Spacing

Typography

No sobrescribir Bootstrap innecesariamente.

El CSS personalizado deberá complementar Bootstrap.

---

# 8. HTML

Seguir HTML5 semántico.

Utilizar correctamente:

header

main

footer

section

article

aside

nav

figure

figcaption

time

address

Evitar div innecesarios.

---

# 9. CSS

Separar estilos por responsabilidad.

Utilizar variables.

Utilizar nomenclatura consistente.

Evitar CSS repetido.

No utilizar estilos inline.

No utilizar !important excepto cuando sea estrictamente necesario.

---

# 10. JavaScript

Utilizar JavaScript Vanilla.

Código modular.

Funciones pequeñas.

Variables descriptivas.

Comentarios únicamente cuando aporten valor.

Evitar código duplicado.

---

# 11. Arquitectura

Respetar la siguiente estructura.

assets/

css/

js/

img/

videos/

fonts/

icons/

downloads/

components/

pages/

config/

scripts/

data/

docs/

No modificar esta estructura sin justificarlo.

---

# 12. Flujo de trabajo obligatorio

Antes de modificar cualquier archivo Claude deberá:

Analizar

Comprender

Planificar

Explicar

Esperar aprobación cuando corresponda

Implementar

Verificar

Documentar

Nunca modificar archivos importantes sin explicar el motivo.

---

# 13. Documentación obligatoria

Toda modificación deberá reflejarse en la documentación correspondiente.

La documentación tiene la misma importancia que el código.

Nunca dejar documentación desactualizada.

---

# 14. Organización de la documentación

La carpeta /docs constituye la fuente oficial de documentación del proyecto.

Toda decisión técnica, funcional o de diseño deberá quedar documentada.

Claude deberá mantener la documentación organizada, consistente y actualizada durante todo el ciclo de vida del proyecto.

La estructura oficial de documentación será la siguiente:

docs/

01_Gestion_Proyecto/
Vision.md
Objetivos.md
Alcance.md
Cronograma.md
Bitacora.md

02_Analisis/
Requerimientos_Funcionales.md
Requerimientos_No_Funcionales.md
Casos_de_Uso.md
Historias_de_Usuario.md

03_Arquitectura/
Arquitectura_General.md
Estructura_Proyecto.md
Integraciones.md

04_Diseno/
Guia_Estilos.md
Componentes_UI.md
Wireframes.md

05_Desarrollo/
Convenciones.md
Bootstrap.md
HTML.md
CSS.md
JavaScript.md

06_Pruebas/
Plan_Pruebas.md
Evidencias.md

07_Despliegue/
Netlify.md
Dominio.md
Cloudflare.md

08_Manuales/
Manual_Tecnico.md
Manual_Usuario.md

09_Entregables/
Entrega_01.md
Entrega_02.md

Si durante el proyecto Claude identifica la necesidad de nuevos documentos o carpetas, podrá proponerlos y crearlos manteniendo la misma organización.

No deberá eliminar documentación existente sin autorización.

---

# 15. Documentación que deberá existir

Como mínimo deberán mantenerse actualizados los siguientes documentos.

Visión del proyecto

Objetivos

Alcance

Stakeholders

Requerimientos funcionales

Requerimientos no funcionales

Casos de uso

Arquitectura

Mapa del sitio

Wireframes

Paleta de colores

Tipografía

Componentes

Bitácora

Cronograma

Integraciones

Despliegue

Manual técnico

Manual de usuario

Pruebas

Control de cambios

Checklist de calidad

Checklist de despliegue

La documentación es un entregable tan importante como el código.

Cada vez que se implemente una nueva funcionalidad Claude deberá determinar qué documentos deben actualizarse.

Antes de dar una tarea por finalizada deberá verificar que la documentación permanezca sincronizada con el código.

Toda modificación importante deberá reflejarse en:

- Arquitectura
- Diseño
- Requerimientos
- Manual técnico
- Manual de usuario
- Bitácora
- Historial de cambios
- Documentación de despliegue (cuando aplique)

Nunca deberá existir código sin documentación asociada cuando ésta sea necesaria.

---

# 16. Diseño

El diseño deberá transmitir:

Institucionalidad

Modernidad

Limpieza

Calidez

Profesionalismo

Accesibilidad

No utilizar efectos exagerados.

No utilizar demasiados colores.

Evitar sobrecargar la interfaz.

---

# 17. Accesibilidad

Cumplir buenas prácticas WCAG.

Texto legible.

Contraste suficiente.

Alt en imágenes.

Uso correcto de encabezados.

Navegación mediante teclado.

ARIA cuando sea necesario.

---

# 18. SEO

Utilizar:

title

description

Open Graph

URLs limpias

Jerarquía H1-H6

Texto alternativo

Carga rápida

---

# 19. Optimización

Optimizar:

Imágenes

CSS

JavaScript

Carga

Responsive

Performance

---

# 20. Integraciones previstas

El proyecto podrá integrar:

Google Maps

Google Calendar

Google Forms

Google Drive

YouTube

Facebook

Instagram

WhatsApp

Correo institucional

Dominio personalizado

Netlify

Cloudflare

Analytics

Todas las integraciones deberán documentarse.

---

# 21. Git

Utilizar Git correctamente.

Commits descriptivos.

No eliminar archivos históricos.

No modificar documentación sin actualizar referencias.

---

# 22. Estándares de nombres

Utilizar nombres consistentes.

Ejemplo:

about.html

historia.html

sacramentos.html

ministerios.html

eventos.html

contacto.html

Evitar nombres ambiguos.

---

# 23. Calidad

Antes de finalizar cualquier tarea verificar:

✔ HTML válido

✔ CSS organizado

✔ Responsive

✔ Bootstrap correcto

✔ Accesibilidad

✔ SEO

✔ Código limpio

✔ Documentación actualizada

---

# 24. Comportamiento esperado de Claude

Claude deberá:

Explicar antes de implementar cambios grandes.

Justificar decisiones técnicas.

Sugerir mejoras.

Advertir riesgos.

Mantener consistencia.

No improvisar.

No inventar requerimientos.

Preguntar cuando exista ambigüedad.

---

# 25. Metodología

El proyecto seguirá una metodología incremental.

Cada funcionalidad deberá completarse siguiendo este ciclo:

Análisis

Diseño

Implementación

Pruebas

Documentación

Revisión

Aprobación

---

# 26. Entregables

Cada funcionalidad deberá entregar:

Código

Documentación

Actualización de arquitectura

Actualización de manual técnico

Actualización de manual usuario

Registro en bitácora

Checklist actualizado

---

# 27. Restricciones

No utilizar tecnologías distintas a las aprobadas sin autorización.

No eliminar documentación.

No modificar estructura del proyecto sin justificación.

No simplificar la documentación.

No generar código innecesario.

---

# 28. Objetivo final

Al finalizar el proyecto deberá existir:

Un portal web profesional completamente funcional.

Código limpio y mantenible.

Arquitectura organizada.

Diseño moderno.

Documentación técnica completa.

Documentación funcional completa.

Manual técnico.

Manual de usuario.

Bitácora del proyecto.

Repositorio organizado.

Todo el proyecto deberá poder ser comprendido por un desarrollador externo únicamente leyendo la documentación.

# Documentación automática

Claude deberá actuar de forma proactiva respecto a la documentación.

Cuando detecte que una funcionalidad requiere documentación adicional, deberá:

1. Informar qué documentos necesitan actualizarse.
2. Crear los archivos si aún no existen.
3. Mantener un formato uniforme en todos los documentos.
4. Evitar información duplicada.
5. Referenciar otros documentos cuando sea necesario.

La documentación deberá mantenerse con estándares similares a proyectos profesionales de ingeniería de software.

---

# 29. Comandos de desarrollo y estado técnico actual

Esta sección resume información operativa que un agente necesita antes de tocar código. El detalle completo vive en [docs/08_Manuales/Manual_Tecnico.md](docs/08_Manuales/Manual_Tecnico.md) y en [docs/03_Arquitectura/Estructura_Proyecto.md](docs/03_Arquitectura/Estructura_Proyecto.md); esta sección no debe divergir de esos documentos.

## 29.1 Comandos

No existe `package.json` ni proceso de build, lint o test: el sitio es HTML/CSS/JS estático (ver sección 6). No inventar ni agregar tooling de Node sin autorización expresa (sección 6 lo prohíbe salvo excepción). Las únicas piezas de servidor son dos Netlify Functions autorizadas (sección 29.8), que no implican tooling de Node en el repositorio.

- **Previsualizar el sitio:** abrir `index.html` directamente en el navegador, o servirlo con cualquier servidor estático simple (por ejemplo `python -m http.server` desde la raíz del repositorio). No hay paso de compilación. Con un servidor estático local los endpoints `/api/proximos-eventos` y `/api/transmision-actual` no existen (las Netlify Functions solo corren en Netlify): «Próximos eventos» y la página Transmisiones mostrarán su mensaje de error controlado.
- **Lint / tests:** no configurados todavía. Si se agregan en el futuro, documentar el comando aquí y en Manual_Tecnico.md.

## 29.2 Estado real del código (no confundir con la arquitectura objetivo)

A la fecha de esta sección, el repositorio tiene seis páginas implementadas y cuatro integraciones principales activas (Google Calendar, YouTube y Google Forms y Google Maps embebidos en Contacto); el detalle vive en [Estructura_Proyecto.md](docs/03_Arquitectura/Estructura_Proyecto.md):

- `index.html` (Inicio, congelada) y, en `pages/`, `parroquia.html`, `grupos.html` y `calendario.html` (congeladas temporalmente) y `transmisiones.html` y `contacto.html` (publicadas, no congeladas).
- `assets/css/` (estilos globales y por página) y `assets/js/` (`grupos.js`, `proximos-eventos.js`, `transmisiones.js`, `galeria-parroquia.js`).
- `netlify/functions/proximos-eventos.mjs` — Netlify Function de Google Calendar (sección 29.8).
- `netlify/functions/transmision-actual.mjs` — Netlify Function de YouTube Data API (sección 29.8).
- También con contenido: `favicon.ico` (raíz), `assets/icons/` (favicon y apple-touch-icon) y `assets/img/` (`logo/` y `parroquia/`, con PNG originales y versiones WebP). Siguen vacías: `assets/fonts/`, `assets/downloads/`, `assets/videos/`, las demás subcarpetas de `assets/img/`, `components/`, `config/`, `data/` y `scripts/`.
- Aún sin desarrollar: Servicios parroquiales (y sus páginas de segundo nivel).
- Publicación: los builds de Netlify permanecen detenidos entre liberaciones y solo se publica con autorización expresa; procedimiento en [docs/07_Despliegue/Netlify.md](docs/07_Despliegue/Netlify.md), sección 5. Los cambios locales pendientes de liberación se listan en [Manual_Tecnico.md](docs/08_Manuales/Manual_Tecnico.md), sección 15.

La arquitectura de carpetas (sección 11) es la estructura **objetivo/autorizada**, ya creada de antemano (más `netlify/`, añadida con autorización para las Netlify Functions); no asumir que una carpeta tiene contenido solo porque existe. Antes de crear una página o componente nuevo, releer [Convenciones.md](docs/05_Desarrollo/Convenciones.md) para nomenclatura y [Alcance.md](docs/01_Gestion_Proyecto/Alcance.md) para confirmar que esa página está dentro del alcance aprobado — no inventar páginas nuevas sin verificarlo primero (sección 24).

## 29.3 Punto de partida para orientarse

`docs/README.md` es el índice de toda la documentación, con el orden de lectura recomendado y el estado (vigente / parcial / pendiente) de cada documento. Consultarlo antes de asumir que un documento no existe o está desactualizado.

## 29.4 Congelamiento de documentación

No crear archivos nuevos dentro de `docs/` salvo necesidad real y justificada; preferir ampliar un documento existente antes que crear uno nuevo (ver nota de revisión crítica en `docs/README.md` y la Bitácora). Esto no exime de mantener la documentación sincronizada con el código (sección 13): significa evitar duplicación, no evitar actualizar.

## 29.5 Diseño conceptual aprobado y recursos gráficos

Los artes conceptuales aprobados del portal (referencia visual, no fuente de datos) viven en `docs/04_Diseno/Referencias_Conceptuales/`; su alcance, estado y las decisiones funcionales conceptuales asociadas están consolidados en [docs/04_Diseno/Diseno_Conceptual_Aprobado.md](docs/04_Diseno/Diseno_Conceptual_Aprobado.md). Los recursos gráficos reales del portal (fotografías, logos) van en `assets/img/`, nunca extraídos de esos artes conceptuales. No repetir aquí ese detalle: esta sección solo apunta a dónde vive.

## 29.6 Congelamiento de la página Inicio

Página Inicio: implementación aprobada y congelada en su estado visual, estructural, responsive y funcional actual. No modificarla directa ni indirectamente sin autorización explícita del usuario. Desarrollar otra página no constituye autorización para modificar, mejorar, limpiar o refactorizar Inicio. Si un cambio en estilos, variables o componentes compartidos (`assets/css/main.css`, `assets/css/variables.css`, `assets/css/components.css`) pudiera afectar Inicio, advertirlo antes de implementarlo, nunca después. La sustitución de los placeholders actuales por datos institucionales reales tampoco es automática: requiere autorización explícita para esa página, igual que cualquier otro cambio. Una autorización puntual para un cambio específico en Inicio no levanta el congelamiento del resto de la página. Detalle completo en [docs/08_Manuales/Manual_Tecnico.md](docs/08_Manuales/Manual_Tecnico.md).

## 29.7 Base visual y estructural común para las páginas del portal

Todas las páginas del portal deben reutilizar, cuando corresponda, el header/navegación global, el footer, el botón flotante de WhatsApp y el Design System aprobado — Inicio (congelada, sección 29.6) es la referencia de estos elementos globales. Esto no autoriza modificar Inicio: si reutilizar o ajustar algo compartido pudiera afectarla, advertirlo antes de implementarlo. El contenido propio de cada página sigue su diseño conceptual aprobado, sin inventar información institucional no confirmada (sección 24): usar placeholders y "Pendiente de confirmar" según corresponda. Construir el esqueleto de una página tampoco cierra su alcance funcional definitivo, que sigue sujeto a validación con la parroquia. Orden de implementación, ciclo de trabajo por página y detalle completo: [docs/04_Diseno/Diseno_Conceptual_Aprobado.md](docs/04_Diseno/Diseno_Conceptual_Aprobado.md), sección 8.

## 29.8 Integraciones con Google Calendar y YouTube y excepción serverless

Google Calendar es la fuente de los eventos públicos de la parroquia (Google Calendar API v3). La página Calendario los muestra con el iframe oficial de Google; «Próximos eventos» de Inicio los obtiene mediante una **Netlify Function** (`netlify/functions/proximos-eventos.mjs`, endpoint `/api/proximos-eventos`). Las Netlify Functions autorizadas son **únicamente dos**: `proximos-eventos` (Google Calendar API v3) y `transmision-actual` (YouTube Data API v3). Constituyen una **excepción serverless autorizada** a la arquitectura estática: toda Function adicional requiere autorización expresa y documentación, y la excepción no autoriza otros backends, bases de datos ni tooling de Node (sección 6). La API key y el ID del calendario viven solo en variables de entorno de Netlify (`GOOGLE_CALENDAR_API_KEY`, secreta, y `GOOGLE_CALENDAR_ID`): **nunca** escribir sus valores en código, documentación, logs ni repositorio (que es público). El navegador solo recibe los campos necesarios y los inserta con `textContent`. La respuesta se guarda en caché hasta 6 horas, por lo que un cambio en el calendario puede tardar en verse en Inicio. Las misas ordinarias recurrentes no se administran como eventos del calendario (tienen su sección «Horarios de misa»).

**YouTube:** `transmision-actual` (`netlify/functions/transmision-actual.mjs`, endpoint `/api/transmision-actual`) usa YouTube Data API v3. Variables de entorno de Netlify: `YOUTUBE_API_KEY` (secreta), `YOUTUBE_CHANNEL_ID` y, opcional, `YOUTUBE_DETECCION_DIRECTO`. Sus valores **nunca** se escriben en código, documentación, logs ni repositorio.

**Alcance aprobado de YouTube:** detección automática de transmisiones en vivo, reproducción integrada cuando YouTube permite la inserción (acceso alternativo a YouTube cuando no), actualización automática al finalizar, videos públicos normales en «Más de nuestra comunidad» y manejo de estados de carga, ausencia y error. Queda **excluida del alcance**, por decisión definitiva del responsable del proyecto, la visualización automática de grabaciones de transmisiones en vivo finalizadas: no es un error pendiente. Detalle: [docs/03_Arquitectura/Integracion_YouTube.md](docs/03_Arquitectura/Integracion_YouTube.md).

**Google Calendar — integración completada:** la integración con el calendario secundario institucional de la parroquia (página Calendario y «Próximos eventos») está actualizada, funcional y finalizada, confirmada por el responsable del proyecto el 2026-10-14. Si en el futuro se cambia de calendario, hay que actualizar `GOOGLE_CALENDAR_ID` en Netlify, redesplegar y, por separado, el iframe y el enlace de `pages/calendario.html`. Detalle completo: [docs/03_Arquitectura/Integracion_Google_Calendar.md](docs/03_Arquitectura/Integracion_Google_Calendar.md).

## 29.9 Línea base temporal de las páginas implementadas

Desde el 2026-10-10, Inicio, Parroquia, Grupos, Calendario y la navegación común están en **congelamiento temporal de desarrollo**: su estructura, composición visual, navegación y comportamiento aprobados son la línea base. Esto **no** es aceptación final del contenido editorial ni multimedia, que sigue siendo provisional hasta su incorporación y validación con la parroquia; no usar expresiones como «página finalizada» o «contenido definitivo». Transmisiones y Contacto (implementadas y publicadas) y las páginas aún no implementadas (Servicios parroquiales, Sacramentos, Gestiones y Documentos e información) no están congeladas.

Un error, una necesidad funcional, un requisito nuevo, o un problema de accesibilidad, seguridad o responsive puede justificar **proponer** un cambio a una página congelada, pero nunca autoriza hacerlo: el cambio debe identificarse, justificarse, presentarse y recibir autorización expresa antes de implementarse. Sustituir contenido provisional por contenido real no descongela la estructura; si exige cambiar estructura, clases, componentes, navegación o comportamiento, es una modificación de la línea base. La sección 29.6 mantiene sus reglas estrictas para Inicio. La limitación del embed de Calendario a ≈ 375 px queda fuera del congelamiento. Detalle: [docs/08_Manuales/Manual_Tecnico.md](docs/08_Manuales/Manual_Tecnico.md), sección 9.
