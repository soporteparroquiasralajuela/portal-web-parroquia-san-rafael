# Integración con YouTube

| Campo | Valor |
|---|---|
| Documento | 03_Arquitectura/Integracion_YouTube.md |
| Versión | 1.0 |
| Fecha de creación | 2026-10-14 |
| Última actualización | 2026-10-14 |
| Estado | **Vigente — implementada y funcional dentro del alcance aprobado**; validada con una transmisión pública real. La visualización automática de grabaciones de transmisiones finalizadas está **excluida del alcance** por decisión del proyecto (sección 10) |
| Fuente | Código del repositorio (`netlify/functions/transmision-actual.mjs`, `assets/js/transmisiones.js`, `pages/transmisiones.html`, `assets/css/transmisiones.css`) y pruebas confirmadas por el equipo del proyecto |

---

## 1. Objetivo y alcance

Mostrar en la página **Transmisiones** la transmisión en vivo del canal oficial de YouTube de la parroquia cuando exista, y en «Más de nuestra comunidad» los videos públicos normales más recientes del canal, sin que el navegador maneje credenciales y sin que la parroquia deba editar el sitio para publicar contenido.

| Elemento | Fuente |
|---|---|
| Estado de la transmisión (en vivo / sin transmisión / error) | Netlify Function `transmision-actual` → YouTube Data API v3 |
| Reproductor | Iframe de `youtube-nocookie.com`, solo si YouTube permite incrustar la transmisión |
| Hasta 3 videos públicos normales recientes | La misma Function (lista de subidas del canal) |
| Botón «Ver en YouTube» y «Explorar nuestro canal de YouTube» | Enlace al canal oficial (o al directo cuando está activo) |

### 1.1 Alcance aprobado

La integración queda **implementada y funcional** con estas características, confirmadas por el responsable del proyecto:

1. Detección automática de las transmisiones en vivo del canal parroquial.
2. Reproducción integrada cuando YouTube permite la inserción.
3. Acceso alternativo a YouTube cuando la transmisión no puede incrustarse.
4. Actualización automática del estado cuando finaliza una transmisión.
5. Visualización automática de videos públicos normales en «Más de nuestra comunidad».
6. Manejo de estados de carga, ausencia de contenido y errores.
7. Controles de navegación, accesibilidad y comportamiento responsive.

**Excluido del alcance:**
- La visualización automática de **grabaciones de transmisiones en vivo finalizadas** (decisión definitiva para la versión actual; sección 10).
- Publicar o administrar videos, comentarios, estadísticas y cualquier acceso autenticado (OAuth) a la cuenta de YouTube.

**Terminología:** un **video público normal** es un video subido al canal; una **grabación de transmisión finalizada** es el archivo que YouTube genera al terminar un directo. El portal garantiza mostrar los primeros; no garantiza ni ofrece mostrar las segundas.

## 2. Convención de certeza de la información

- **[Código]**: verificado en el repositorio.
- **[Equipo]**: confirmado por el equipo del proyecto; no es verificable desde el repositorio.
- **[Pendiente]**: no confirmado o no resuelto.

## 3. Arquitectura

```
Canal de YouTube → YouTube Data API v3 → Netlify Function (netlify/functions/transmision-actual.mjs)
→ /api/transmision-actual → assets/js/transmisiones.js → reproductor y «Más de nuestra comunidad»
```

- La clave de la API **vive solo en una variable de entorno secreta de Netlify**: nunca llega al navegador ni al repositorio, que es público. **[Código]**
- El navegador **no llama a YouTube Data API**: solo consulta `/api/transmision-actual`. **[Código]**
- Es la **segunda y última** Netlify Function autorizada (la otra es `proximos-eventos`). Constituye una excepción serverless a la arquitectura estática (CLAUDE.md, sección 29.8); toda Function adicional requiere autorización expresa. **[Código]**

## 4. Configuración

| Elemento | Detalle |
|---|---|
| Servicio de Google | YouTube Data API v3, habilitada en un proyecto de Google Cloud con la cuenta institucional de soporte **[Equipo]** |
| `YOUTUBE_API_KEY` | Clave de la API. **Secreta.** Solo existe como variable de entorno de Netlify. **[Código]** (se lee con `Netlify.env.get`) |
| `YOUTUBE_CHANNEL_ID` | Identificador del canal (`UC…`, 24 caracteres). No es secreto, pero tampoco se reproduce en la documentación. **[Código]** |
| `YOUTUBE_DETECCION_DIRECTO` | Opcional. Con el valor `busqueda` activa un segundo método de detección (sección 6). Sin definir, se usa `subidas`. **[Código]** |

**Nunca** se documentan, registran ni envían al navegador los valores de estas variables. La Function valida en cada instancia que el identificador configurado corresponda a un canal real (`channels.list`) y, si no coincide, responde `canal_no_valido`. **[Código]**

## 5. La Netlify Function

**Endpoint:** `GET /api/transmision-actual` (también `HEAD`). No admite parámetros: cualquier cadena de consulta se rechaza con `400 parametros_no_admitidos`, sin consultar a YouTube y sin caché, para que variar la dirección no genere consultas ni entradas en el CDN. **[Código]**

### 5.1 Contrato de respuesta

| Caso | HTTP | Cuerpo |
|---|---|---|
| Transmisión activa | 200 | `{ generadoEn, estado: "en_vivo", directo: { videoId, titulo, inicio, incrustable }, grabaciones: [...] }` |
| Sin transmisión activa | 200 | `{ generadoEn, estado: "sin_transmision", grabaciones: [...] }` (la lista puede estar vacía) |
| No se pudo comprobar | 5xx | `{ estado: "error", error: "<código>" }` |

Códigos de error: `cuota_agotada`, `servicio_no_disponible`, `respuesta_inesperada`, `canal_no_valido`, `integracion_no_configurada`, `no_encontrado` y `parametros_no_admitidos`. **Un error nunca equivale a «sin transmisión».** **[Código]**

Cada elemento de `grabaciones` contiene `videoId`, `titulo` y `publicadoEn` (máximo 3, del más reciente al más antiguo; videos convencionales y Shorts se tratan igual). **[Código]** El nombre del campo `grabaciones` se conserva por compatibilidad: contiene los **videos públicos normales** recientes; la visualización de grabaciones de transmisiones finalizadas no forma parte del alcance (sección 10).

### 5.2 Consultas a YouTube y cuota

| Paso | Recurso | Costo |
|---|---|---|
| Validar el canal y obtener la lista de subidas (se conserva 1 hora por instancia) | `channels.list` | 1 unidad |
| Obtener los 25 elementos más recientes de la lista de subidas | `playlistItems.list` | 1 unidad |
| Obtener detalles (`snippet`, `status`, `liveStreamingDetails`) | `videos.list` | 1 unidad |

Una consulta completa cuesta **3 unidades** la primera vez y **2** al renovarse. La cuota diaria predeterminada de YouTube Data API v3 es de 10 000 unidades. **[Código]**

### 5.3 Caché y protección de la cuota

| Capa | Duración |
|---|---|
| CDN de Netlify, respuesta correcta | 60 s (más 30 s de reutilización mientras se renueva) |
| CDN, error temporal | 30 s |
| CDN, cuota agotada o canal no válido | 300 s |
| Memoria de la instancia (resultado correcto) | 20 s; cuota agotada o canal no válido, 60 s |
| Solicitudes simultáneas | Comparten una sola consulta a YouTube |
| Tiempo máximo por consulta a YouTube | 8 s, con un reintento ante fallo de red o 5xx |

**Consecuencia operativa:** un cambio en YouTube puede tardar **hasta unos 2 minutos** en verse en el portal (caché del CDN más el sondeo del navegador). **[Código]**

## 6. Detección de la transmisión

| Método | Cómo funciona | Estado |
|---|---|---|
| `subidas` (por defecto) | La transmisión en curso figura en la lista de subidas del canal y `videos.list` informa `liveBroadcastContent: "live"`. Cuesta 2 unidades por consulta. | **Validado con una transmisión pública real** (2026-10-14): detectó la transmisión y la retiró al finalizar. **[Equipo]** |
| `busqueda` (opcional) | Además usa `search.list` con `eventType=live`. Documentado por YouTube, pero con un cupo de 100 llamadas por día; por eso la caché se amplía a 20 minutos. | No activado. Solo se considerará si `subidas` resultara insuficiente. |

**Salvaguarda:** que la lista de subidas no incluya una transmisión no garantiza que no exista. Por eso el mensaje es «No encontramos una transmisión activa en este momento» y el enlace al canal oficial permanece siempre visible. **[Código]**

Una transmisión solo cuenta como directo si es **pública** y tiene `liveBroadcastContent: "live"`. Las programadas y las finalizadas no cuentan como directo. **[Código]**

## 7. El frontend (`assets/js/transmisiones.js`)

### 7.1 Estados del reproductor

| Estado (`data-estado`) | Cuándo | Qué se muestra |
|---|---|---|
| `comprobando` | Al cargar la página y hasta la primera respuesta | Mensaje de comprobación |
| `en-vivo` | La Function responde `en_vivo` | Reproductor integrado, insignia «EN VIVO» y título |
| `sin-transmision` | La Function responde `sin_transmision` | «No encontramos una transmisión activa en este momento» y texto de apoyo |
| `error` | Error HTTP, tiempo agotado o respuesta inválida | «No fue posible comprobar si hay una transmisión en este momento» |

### 7.2 Transmisión que no permite incrustarse

La Function devuelve `incrustable`. El iframe **solo se carga cuando `incrustable === true`**. Con `false`, ausente o inválido, el estado sigue siendo «en vivo», no se carga el iframe y el reproductor muestra «Esta transmisión está disponible en YouTube» con el apoyo «Para verla en directo, utilizá el botón “Ver en YouTube”». «Ver en YouTube» y «Copiar enlace» usan la dirección del directo. **[Código]**

**Requisito operativo:** en YouTube Studio, la transmisión debe tener activada la opción **«Permitir inserción»**; de lo contrario se muestra el mensaje anterior en lugar del reproductor integrado. **[Equipo]**

### 7.3 Consulta periódica y protecciones

- Consulta cada **60 segundos** y **solo con la pestaña visible**; al ocultarse se cancela la consulta en curso y se descarta su respuesta.
- Nunca hay dos consultas simultáneas; ante fallas se espacia a 120, 240 y 300 s.
- Un directo ya mostrado **no se retira** por una falla aislada: se retira tras **2 respuestas seguidas sin directo** o **3 fallas seguidas**.
- Una consulta fallida muestra `error`; nunca «sin transmisión». **[Código]**

### 7.4 Botones

| Botón | Con transmisión activa | Sin transmisión activa |
|---|---|---|
| «Ver en YouTube» | Abre el directo | Abre el canal oficial |
| «Copiar enlace» | Copia el enlace del directo | **Deshabilitado de forma accesible** (`aria-disabled`); no actúa |

### 7.5 «Más de nuestra comunidad»

| Situación | Qué se muestra |
|---|---|
| Consulta inicial en curso | Ningún mensaje sobre videos |
| Videos disponibles | Hasta 3, ordenados por fecha (más reciente primero) |
| Respuesta correcta con lista vacía | «Todavía no hay videos públicos para mostrar» |
| Error y todavía no hay videos cargados | «No fue posible cargar los videos en este momento» |
| Error y ya hay videos cargados | Se conservan los videos |

El botón «Explorar nuestro canal de YouTube» permanece siempre disponible. **[Código]**

## 8. Seguridad

- La clave de la API no está en el repositorio, en el navegador, en la documentación ni en los registros. **[Código]**
- Los textos recibidos se insertan siempre con `textContent`, los `videoId` se validan con el formato de 11 caracteres antes de construir cualquier dirección y el reproductor usa `youtube-nocookie.com`. **[Código]**
- El navegador recibe solo los campos necesarios (`videoId`, título, fecha de inicio o publicación e `incrustable`). **[Código]**
- Si la clave se expusiera, debe revocarse y regenerarse en Google Cloud y actualizarse en Netlify; el repositorio no requiere cambios.

## 9. Validación realizada

### 9.1 Pruebas con respuestas simuladas (locales)

Ejecutadas el 2026-10-14 con un servidor de pruebas temporal **que no forma parte del repositorio**, por lo que no constituyen evidencia formal del [Plan_Pruebas.md](../06_Pruebas/Plan_Pruebas.md) (resumen en [Evidencias.md](../06_Pruebas/Evidencias.md)):

- Transmisión activa incrustable, no incrustable, sin el atributo `incrustable` y con atributo inválido.
- Ausencia de transmisión, canal sin videos, tres videos recientes y cinco videos con Shorts.
- Error de API, cuota agotada, respuesta inválida, tiempo de espera agotado y recuperación posterior.
- Pestaña visible y oculta, ausencia de consultas simultáneas y de repeticiones del anuncio accesible.
- Visualización a 375, 768 y 1280 px sin desbordamiento propio y consola sin excepciones propias.

### 9.2 Pruebas reales

Confirmadas por el equipo el 2026-10-14 **[Equipo]**:

- Detección automática de una transmisión pública real y reproducción integrada, tras habilitar «Permitir inserción» en YouTube Studio.
- Visualización correcta del título y de la insignia «EN VIVO».
- Retiro automático del estado «EN VIVO» al finalizar la transmisión.
- Publicación de un video público normal («Banner Parroquia») y aparición automática en «Más de nuestra comunidad».

## 10. Alcance excluido, decisión de alcance y datos pendientes

### 10.1 Grabaciones de transmisiones finalizadas: excluidas del alcance

**Decisión definitiva del responsable del proyecto para la versión actual:** la visualización automática de las grabaciones de transmisiones en vivo finalizadas **queda excluida del alcance del TCU**. No es un error pendiente ni una tarea obligatoria de corrección, y no se realizarán cambios de código para implementarla.

**Antecedente técnico (se conserva como registro):**

- Durante la prueba real del 2026-10-14, la grabación de la transmisión de prueba no apareció en «Más de nuestra comunidad», aunque YouTube Studio la mostraba como pública; un video normal sí apareció.
- Se revisó el código de la Function y se descartaron como causa el identificador del canal, el límite de 25 elementos y los filtros de privacidad, título y estado de la transmisión. La hipótesis más probable fue el filtro `status.uploadStatus === "processed"` (YouTube podría informar otro valor para el archivo de un directo), que no llegó a confirmarse.
- Posteriormente se decidió **no continuar** con esta funcionalidad, por lo que no se aplicó ninguna corrección y la causa exacta no se verificó.

**Qué sí se muestra:** los videos públicos normales del canal. Que una grabación de una transmisión finalizada aparezca o no depende de cómo YouTube la clasifique; no se garantiza, no se prueba y no forma parte de la funcionalidad aprobada. Los comentarios de código que mencionan «grabaciones de transmisiones finalizadas» son anteriores a esta decisión y no modifican el alcance.

### 10.2 Otros datos y condiciones

| Elemento | Estado |
|---|---|
| Contenido editorial y multimedia de la página (fotografía institucional, textos) | Provisional; pendiente de validación con la parroquia |
| Clave de la API: restricciones configuradas en Google Cloud | Dato de administración **[Pendiente]** de confirmar con el equipo; no condiciona el funcionamiento |
| Cuota diaria | Sin riesgo con el uso previsto (2 a 3 unidades por renovación); un agotamiento se muestra como `error`, no como «sin transmisión» |

## 11. Mantenimiento y diagnóstico

| Síntoma | Causa probable | Acción |
|---|---|---|
| La página muestra «No fue posible comprobar…» | Función sin configurar, cuota agotada o servicio no disponible | Abrir `/api/transmision-actual` y revisar el código `error` devuelto |
| `integracion_no_configurada` | Falta o es inválida una variable de entorno | Revisar los nombres de variables en Netlify (sección 4) |
| `canal_no_valido` | El identificador no corresponde a un canal | Corregir `YOUTUBE_CHANNEL_ID` y redesplegar |
| La transmisión no aparece | Caché (hasta ~2 min) o transmisión no pública | Esperar; comprobar en Studio que sea pública; el enlace al canal sigue disponible |
| Aparece el mensaje «disponible en YouTube» en lugar del reproductor | La transmisión no permite incrustarse | Activar «Permitir inserción» en YouTube Studio |
| La grabación de una transmisión finalizada no aparece en «Más de nuestra comunidad» | Comportamiento esperado: fuera del alcance (sección 10.1) | Ninguna; los videos públicos normales sí se muestran |

**Prueba rápida:** abrir `/api/transmision-actual` en el navegador; debe mostrar un JSON con `estado`. No se debe repetir con frecuencia (cada renovación consume cuota).

---

## Documentos relacionados

- [Integraciones.md](Integraciones.md)
- [Arquitectura_General.md](Arquitectura_General.md)
- [Integracion_Google_Calendar.md](Integracion_Google_Calendar.md)
- [Manual_Tecnico.md](../08_Manuales/Manual_Tecnico.md)
- [Evidencias.md](../06_Pruebas/Evidencias.md)
- [Netlify.md](../07_Despliegue/Netlify.md)
- [Bitacora.md](../01_Gestion_Proyecto/Bitacora.md)
- [Bitacora_Horas_TCU.md](../01_Gestion_Proyecto/Bitacora_Horas_TCU.md)
- [CLAUDE.md](../../CLAUDE.md)
