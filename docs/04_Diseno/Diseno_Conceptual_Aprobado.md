# Diseño Conceptual Aprobado

| Campo | Valor |
|---|---|
| Documento | 04_Diseno/Diseno_Conceptual_Aprobado.md |
| Versión | 1.1 |
| Fecha de creación | 2026-09-16 |
| Última actualización | 2026-09-16 |
| Estado | Vigente |
| Fuente | [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md) (entradas 2026-09-05, 2026-09-06, 2026-09-13); [CLAUDE.md](../../CLAUDE.md) secciones 14, 16, 20, 24 |

---

## 1. Objetivo del documento

Consolidar en un solo lugar las decisiones de arquitectura de navegación, diseño visual conceptual y alcance funcional preliminar que ya fueron aprobadas para el portal, evitando que queden dispersas o dupliquen contenido entre [Guia_Estilos.md](Guia_Estilos.md), [Componentes_UI.md](Componentes_UI.md) y [Wireframes.md](Wireframes.md).

Este documento describe **decisiones conceptuales aprobadas**, no requerimientos funcionales formales ni una fuente oficial de datos institucionales. No sustituye el levantamiento y validación de información real con la parroquia.

## 2. Referencias conceptuales aprobadas

Ubicación: [`docs/04_Diseno/Referencias_Conceptuales/`](Referencias_Conceptuales/)

### 2.1 Qué son y qué NO son

Estos artes representan:

- la composición, jerarquía visual y distribución de secciones de cada página;
- el estilo visual deseado para el portal;
- la referencia principal a reproducir con la mayor fidelidad razonable durante la implementación responsive (escritorio, tablet y móvil).

Estos artes **no constituyen una fuente oficial de datos**. En consecuencia:

- textos, nombres, horarios, teléfonos, correos, eventos y demás contenido mostrado en ellos pueden ser placeholders conceptuales;
- la información real deberá provenir del levantamiento y validación con la parroquia (ver [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md), entrada 2026-09-05, y el proceso descrito en la guía de reunión de descubrimiento del proyecto);
- las imágenes ilustrativas presentes dentro de los artes **no deben extraerse ni utilizarse automáticamente** como recursos reales del sitio — los recursos reales deben obtenerse desde [`assets/img/`](../../assets/img/) (ver sección 3 de este documento).

### 2.2 Inventario

| Página conceptual | Archivo | Estado |
|---|---|---|
| Inicio | `Diseño inicio.png` | Aprobado |
| Parroquia | `Diseño Pagina Parroquia.png` | Aprobado |
| Grupos | `Diseño Pagina Grupos.png` | Aprobado |
| Calendario | `Diseño Pagina Calendario.png` | Aprobado |
| Transmisiones | `Diseño Pagina Transmisiones.png` | Aprobado |
| Servicios parroquiales | `Diseño Pagina Servicios.png` | Aprobado |
| Contacto | `Diseño Pagina Contacto.png` | Aprobado |

### 2.3 Jerarquía de fuentes de verdad para la implementación

Estas referencias conceptuales fueron elaboradas en distintas iteraciones, y algunas contienen elementos superados por decisiones posteriores (ver, por ejemplo, la nota de navegación en la sección 4). Para resolver cualquier diferencia entre un arte conceptual y una decisión ya registrada en este documento, la futura implementación deberá seguir este orden de prioridad:

1. Este documento (`Diseno_Conceptual_Aprobado.md`) — arquitectura, navegación y decisiones funcionales aprobadas.
2. Los PNG de [`Referencias_Conceptuales/`](Referencias_Conceptuales/) — composición, distribución, jerarquía visual y apariencia de cada página.
3. [Guia_Estilos.md](Guia_Estilos.md) — reglas visuales reutilizables.
4. [Componentes_UI.md](Componentes_UI.md) — comportamiento y reutilización de componentes.

**Si existe una diferencia entre un arte conceptual y una decisión explícitamente registrada en este documento, prevalece la decisión documentada aquí.**

## 3. Estructura de recursos gráficos reales (`assets/img/`)

Los recursos reales del portal deberán obtenerse desde `assets/img/` y **no** desde las imágenes de los diseños conceptuales de la sección 2.

| Carpeta | Propósito |
|---|---|
| `eventos/` | Imágenes relacionadas con actividades y eventos parroquiales |
| `galeria/` | Fotografías destinadas principalmente a galerías y carruseles fotográficos |
| `grupos/` | Fotografías y recursos correspondientes a grupos y comunidades parroquiales |
| `logo/` | Logotipos oficiales y recursos de identidad institucional |
| `parroquia/` | Fotografías generales de la parroquia, templos y otros recursos institucionales |
| `sacerdotes/` | Fotografías del párroco y otros sacerdotes cuando corresponda |
| `transmisiones/` | Portadas, miniaturas u otros recursos gráficos relacionados con transmisiones |

Estado real de estas carpetas al momento de este documento: todas vacías salvo `logo/`, que contiene `Logo.jpeg`. Ver [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md) para el detalle completo y actualizado de la estructura del repositorio.

## 4. Arquitectura de navegación conceptual aprobada

Navegación **oficial y definitiva** (confirmada 2026-09-16):

```
Inicio
Parroquia
Grupos
Calendario
Transmisiones
Servicios parroquiales
  - Sacramentos
  - Gestiones
  - Documentos e información
Contacto
```

**El portal NO tendrá botón, ícono ni elemento de "Buscar" en la navegación.**

**No se han creado todavía** las páginas internas de Sacramentos, Gestiones ni Documentos e información — su contenido definitivo queda pendiente del levantamiento con la oficina parroquial (ver sección 6).

> **Nota sobre los artes conceptuales:** las 7 imágenes en [Referencias_Conceptuales/](Referencias_Conceptuales/) corresponden a distintas iteraciones de diseño y no son consistentes entre sí en dos puntos, ya superados por esta decisión:
> - Las imágenes de Parroquia, Grupos, Calendario, Transmisiones y Contacto muestran "Servicios" (sin la palabra "parroquiales", sin indicador de submenú) **antes** de "Transmisiones" — orden distinto al oficial.
> - Las 7 imágenes muestran un ícono de búsqueda en la navegación.
>
> Ambos elementos pertenecen a iteraciones anteriores a esta decisión y **deben ignorarse** durante la implementación. Prevalece el orden y el contenido de navegación definidos arriba (ver también sección 2.3, Jerarquía de fuentes de verdad).

Esta arquitectura es la referencia para un futuro mapa del sitio formal; ver la nota correspondiente en [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md), sección "Mapa del sitio".

## 5. Principios de diseño e implementación

- Portal sencillo de utilizar para la comunidad.
- Administración de contenidos de baja complejidad.
- Evitar funcionalidades que requieran mantenimiento constante si no existe una persona responsable en la parroquia.
- Diseño responsive para escritorio, tablet y móvil.
- Mantener coherencia visual entre todas las páginas.
- Reutilizar header, navegación y footer como componentes visuales comunes.
- Mantener la identidad visual definida en las referencias conceptuales (sección 2).
- Priorizar soluciones simples y sostenibles.
- Evitar backend o complejidad innecesaria mientras no exista un requisito validado que lo justifique.

## 6. Decisiones funcionales ya definidas

Estas decisiones son de **dirección conceptual**, no requerimientos funcionales formales. Su detalle final (contenido, datos, configuración) queda sujeto a validación con la parroquia.

### Calendario
- Se plantea utilizar **Google Calendar embebido**.
- Google Calendar funcionará como fuente de actualización del calendario parroquial.
- Objetivo: evitar mantener manualmente los eventos directamente en el código.

### Contacto
- Se plantea utilizar un **formulario embebido de Google Forms** para consultas generales.
- La página contempla además: información de contacto de la parroquia, un bloque "¿Cómo llegar?" con **mapa de ubicación embebido**, dirección, y acceso para obtener indicaciones.
- Los datos oficiales (teléfono, correo, dirección) y la configuración técnica definitiva de ambos embebidos (IDs, API keys, coordenadas, URLs) se validarán y configurarán posteriormente con la parroquia — no se definen en este documento.

### Transmisiones
- Las transmisiones serán ocasionales; actualmente no existe un equipo dedicado exclusivamente a realizarlas.
- Por esta razón **no se contempla** una sección de "Próximas transmisiones" que requiera alimentación constante.
- La página debe poder funcionar aunque en determinado momento no exista una transmisión activa.
- Se contempla integración/enlace con plataformas como Facebook y eventualmente YouTube, sujeto a disponibilidad oficial.

### Grupos
- Se plantea una interfaz donde los grupos aparezcan en un listado seleccionable.
- Al seleccionar un grupo se mostrará su información dentro de la misma experiencia/página.
- Se contempla un mecanismo sencillo para solicitar información sobre un grupo.
- Los grupos y datos reales todavía deben validarse con la parroquia.

### Parroquia
La página conceptual integra en una misma página: misión, visión, valores, "nuestra comunidad", historia, patrono San Rafael Arcángel, galería fotográfica e información del párroco.
- No se crearán páginas adicionales para estas secciones salvo que posteriormente se defina lo contrario.

### Servicios parroquiales
Estructura conceptual: Sacramentos, Gestiones, Documentos e información.
- Los accesos rápidos son parte de la misma sección "¿Cómo podemos ayudarte?" y no constituyen una sección independiente.
- El contenido definitivo de Sacramentos, Gestiones y Documentos e información queda pendiente del levantamiento con la oficina parroquial.

## 7. Componentes globales aprobados

### Botón flotante de WhatsApp

- Aprobado como **componente global**, presente en todas las páginas del portal: Inicio, Parroquia, Grupos, Calendario, Transmisiones, Servicios parroquiales, Contacto, las futuras páginas internas de Sacramentos, Gestiones y Documentos e información, y cualquier otra página interna futura.
- Propósito: facilitar el contacto directo con la parroquia mediante WhatsApp.
- Requisitos aprobados:
  - Ícono reconocible de WhatsApp.
  - Flotante y visible durante la navegación.
  - Ubicación preferente: esquina inferior derecha.
  - Funcional en escritorio, tablet y móvil.
  - Márgenes adecuados respecto a los bordes de la pantalla.
  - No debe cubrir botones, formularios, contenido importante ni elementos de navegación.
  - Apariencia coherente con el diseño general del portal.
  - Accesible mediante teclado, con nombre accesible (accessible name) apropiado.
- Implementación prevista como **componente global reutilizable** (ver [Componentes_UI.md](Componentes_UI.md)), sin duplicarse manualmente página por página.
- **Pendiente de configurar:** el número oficial de WhatsApp de la parroquia todavía no ha sido validado. No se define aquí número, enlace `wa.me` ni mensaje predeterminado — se completarán únicamente cuando la parroquia confirme esta información.
- Nota: este botón no aparece en los PNG de [Referencias_Conceptuales/](Referencias_Conceptuales/) (artes anteriores a esta decisión). Por la jerarquía de fuentes de verdad (sección 2.3), esta decisión documental prevalece y debe incorporarse en la implementación aunque no esté dibujada en las referencias visuales.

## 8. Estado del diseño

Los siete diseños conceptuales listados en la sección 2.2 se consideran **APROBADOS/CONGELADOS** como referencia visual en esta etapa (ver [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md), entrada 2026-09-13). Esto significa que **no deben rediseñarse arbitrariamente** durante la implementación.

Podrán existir ajustes posteriores únicamente por:

- información real suministrada por la parroquia;
- necesidades responsive;
- accesibilidad;
- limitaciones técnicas justificadas;
- cambios explícitamente aprobados.

## 9. Estado

**Vigente.** Este documento refleja decisiones ya aprobadas, incluyendo la actualización del 2026-09-16 (navegación oficial definitiva, exclusión de "Buscar", botón flotante global de WhatsApp pendiente de número oficial, y precisión del alcance de la página Contacto). Se actualizará si estas decisiones cambian, y se referenciará desde los documentos formales de requerimientos, casos de uso y arquitectura una vez que ese trabajo se realice (ver nota de trazabilidad pendiente en [Alcance.md](../01_Gestion_Proyecto/Alcance.md) y [Requerimientos_Funcionales.md](../02_Analisis/Requerimientos_Funcionales.md)).

---

## Documentos relacionados

- [Guia_Estilos.md](Guia_Estilos.md)
- [Componentes_UI.md](Componentes_UI.md)
- [Wireframes.md](Wireframes.md)
- [Estructura_Proyecto.md](../03_Arquitectura/Estructura_Proyecto.md)
- [Integraciones.md](../03_Arquitectura/Integraciones.md)
- [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md)
