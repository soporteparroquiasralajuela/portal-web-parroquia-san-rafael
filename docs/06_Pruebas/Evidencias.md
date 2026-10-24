# Evidencias de Pruebas

| Campo | Valor |
|---|---|
| Documento | 06_Pruebas/Evidencias.md |
| Versión | 1.6 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-24 |
| Estado | **Parcial** — evidencia de la integración con YouTube y registro de validaciones visuales y responsive; el resto de la funcionalidad sin evidencia formal |

---

## 1. Objetivo del documento

Almacenar la evidencia (capturas, resultados, registros) de las pruebas ejecutadas sobre el portal.

## 2. Información disponible actualmente

Las pruebas registradas hasta ahora corresponden a la integración con YouTube de la página Transmisiones, ejecutadas el **2026-10-14**. Se distinguen dos tipos, que **no deben confundirse**:

| Tipo | Qué demuestra | Limitación |
|---|---|---|
| **Simulada** (local) | El comportamiento del código frente a respuestas fabricadas de la Function. Se ejecutó con un servidor de pruebas temporal que **no forma parte del repositorio** | No prueba la detección real ni la API de YouTube; no constituye evidencia formal del [Plan_Pruebas.md](Plan_Pruebas.md) |
| **Real** (producción) | El funcionamiento con YouTube y Netlify reales, confirmado por el equipo del proyecto | Las capturas o registros no se conservan en el repositorio |

Las validaciones de la integración con Google Calendar (también con scripts temporales, no versionados) se describen en [Integracion_Google_Calendar.md](../03_Arquitectura/Integracion_Google_Calendar.md), sección 15.

## 3. Pruebas registradas

### 3.1 Pruebas simuladas (2026-10-14)

| ID | Caso | Resultado |
|---|---|---|
| ES-01 | Transmisión activa incrustable | Estado «en vivo», iframe de `youtube-nocookie.com`, insignia y título; «Copiar enlace» habilitado — **Correcto** |
| ES-02 | Transmisión activa no incrustable, sin atributo `incrustable` o con valor inválido | Estado «en vivo» sin iframe, mensaje «Esta transmisión está disponible en YouTube»; «Ver en YouTube» y «Copiar enlace» con la URL del directo — **Correcto** |
| ES-03 | Ausencia de transmisión | Texto «No encontramos una transmisión activa en este momento»; «Copiar enlace» deshabilitado — **Correcto** |
| ES-04 | Canal sin videos | «Todavía no hay videos públicos para mostrar» — **Correcto** |
| ES-05 | Tres videos recientes y cinco videos con Shorts | Se muestran 3, por fecha descendente — **Correcto** |
| ES-06 | Consulta inicial en curso | Estado «comprobando»; sin mensaje sobre videos — **Correcto** |
| ES-07 | Error de API (cuota agotada, error de configuración, respuesta no válida, HTTP 404) y tiempo de espera de 8 s | Estado `error`; nunca «sin transmisión»; mensaje «No fue posible cargar los videos en este momento» si no hay videos — **Correcto** |
| ES-08 | Error después de cargar videos | Los videos cargados se conservan — **Correcto** |
| ES-09 | Recuperación posterior a un error (a «sin transmisión», lista vacía o directo) | El estado y la sección de videos se restablecen — **Correcto** |
| ES-10 | Directo mostrado seguido de respuestas sin directo o de fallas | Se retira tras 2 respuestas sin directo o 3 fallas seguidas — **Correcto** |
| ES-11 | Pestaña visible y oculta; respuesta lenta | Sin consultas con la pestaña oculta; una consulta inmediata al volver; nunca dos consultas simultáneas — **Correcto** |
| ES-12 | Anuncio accesible en consultas repetidas | Sin repeticiones mientras el estado no cambia — **Correcto** |
| ES-13 | Visualización a 375, 768 y 1280 px | Sin desbordamiento propio; mensajes dentro del reproductor — **Correcto** |
| ES-14 | Consola y red del navegador | Sin excepciones propias ni llamadas directas a YouTube Data API — **Correcto** |

### 3.2 Pruebas reales (2026-10-14, confirmadas por el equipo)

| ID | Caso | Resultado |
|---|---|---|
| ER-01 | Endpoint `/api/transmision-actual` en producción | Respuesta JSON válida con la API real de YouTube — **Correcto** |
| ER-02 | Detección de una transmisión pública real | La transmisión se detectó automáticamente — **Correcto** |
| ER-03 | Reproducción integrada de la transmisión | Se reprodujo tras habilitar «Permitir inserción» en YouTube Studio; sin esa opción se muestra el mensaje de transmisión no incrustable — **Correcto** (con ese requisito) |
| ER-04 | Título e indicador «EN VIVO» | Visualización correcta — **Correcto** |
| ER-05 | Retiro del estado «EN VIVO» al finalizar | Retiro automático — **Correcto** |
| ER-06 | Publicación de un video público normal («Banner Parroquia») | Aparece automáticamente en «Más de nuestra comunidad» — **Correcto** |
| ER-07 | Grabación de una transmisión ya finalizada en «Más de nuestra comunidad» | **No apareció** (antecedente). Se investigó técnicamente sin confirmar la causa (hipótesis: filtro de estado de carga de la Function) y se decidió no continuar: **fuera del alcance del TCU** por decisión definitiva del responsable del proyecto. No es un defecto pendiente (ver [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md), sección 10) |

### 3.3 Pruebas no realizadas

- **Pruebas de accesibilidad con lectores de pantalla reales:** no registradas; solo se verificó el contenido del anuncio accesible.
- **Pruebas en otros navegadores y en dispositivos físicos:** no registradas.
- **Transmisión pública real con cualquier otra configuración del canal:** no registrada.

### 3.4 Validaciones visuales y responsive (2026-10-18 a 2026-10-22)

Ejecutadas por el asistente con el navegador integrado del entorno de desarrollo (emulación de viewport) sobre un servidor estático local y, cuando se indica, sobre producción. Las capturas se conservan solo en una carpeta local no versionada.

| ID | Fecha | Prueba | Resultado |
|---|---|---|---|
| VR-01 | 2026-10-18 | Footers estandarizados y botón flotante de WhatsApp en las seis páginas (escritorio y móvil): íconos alineados, WhatsApp sin tapar texto | Correcto |
| VR-02 | 2026-10-21 | Navegación adaptable: seis páginas × 10 anchos (320 a 1280 px) × 2 modos (ancho de media query y ancho útil) = 120 casos; repetida en producción | Sin desbordamiento horizontal, marca completa y menú coherente; único hallazgo: desborde de ≈ 4 px en Contacto (VR-03) |
| VR-03 | 2026-10-21 | Contacto a 992, 998, 1000, 1024 y 1280 px con y sin barra de desplazamiento clásica, antes y después de la corrección; confirmado en producción | Sin desbordamiento tras la corrección; diseño idéntico fuera de 992–998 px |
| VR-04 | 2026-10-21/22 | Parroquia: Hero, historia, patrono y párroco a 320, 375, 390, 768, 1024, 1280 y 1440 px; variante WebP elegida, proporciones y carga | Correcto; variante de 1024 px con densidad ≥ 1,3 |
| VR-05 | 2026-10-22 | Hero de Inicio a 320, 375, 390, 768, 1024, 1280, 1440 y 1920 px: contraste medido del texto sobre la imagen (peor 5 % de cada zona), foco con teclado, una sola imagen descargada | Título y descripción entre 9 y 13; «Cómo llegar» 11 a 13; «Horarios de misa» 5,7; texto superior entre 4,5 y 5,1; sin desbordamiento |
| VR-06 | 2026-10-22 | Curva `.hero-wave` en las seis páginas a 375, 768, 1024 y 1440 px | Unión de 0 px con la sección siguiente, relleno igual al fondo (blanco en Grupos), trazo dorado de 2 px, margen de 34 a 69 px entre el texto y la curva, sin desbordamiento |
| VR-07 | 2026-10-22 | «Horarios de misa» de Inicio a 320, 375, 390, 768, 992, 1024 y 1440 px: carga de ambas imágenes, proporción, encuadre, desbordamiento horizontal | Las dos imágenes cargan sin deformarse; sin desbordamiento; se vieron ambas torres del templo y la torre y fachada de la Diaconía. Entre 768 y 991 px se pasó a imagen apilada por recorte excesivo en fila |
| VR-08 | 2026-10-22 | Alineación de «Cómo llegar» en las dos tarjetas a los mismos siete anchos | Botones a la misma altura con 25 px bajo ellos desde 768 px; en móvil, cada botón a 16 px de sus horarios y dentro de su tarjeta; sin superposiciones |
| VR-09 | 2026-10-22 | Carrusel de Inicio a 320, 375, 390, 768, 1024, 1440 y 1920 px; navegación con flechas, indicadores y teclado; ausencia de rotación automática; imágenes y consola | Las tres imágenes cargan sin deformarse ni dejar márgenes; sin desbordamiento horizontal; protagonistas y rostros visibles desde 320 px; el pie de móvil se redujo tras verificar que cubría a Tobías a 390 px; sin errores de imagen (los 404 de consola son del endpoint `/api/proximos-eventos`, inexistente en el servidor local). No se probó el deslizamiento táctil real ni la animación de transición (el navegador de pruebas tenía el movimiento reducido activo) |
| VR-10 | 2026-10-22 | Galería de Parroquia (mosaico) a 320, 375, 390, 768, 1024, 1440 y 1920 px: carga de las 12 fotografías, solapamientos, separación, recorte y desbordamiento | Sin solapamientos ni desbordamiento; separación de 12 px (móvil) y 14 px (desde 768 px); recorte máximo de 15 % (28 % en miniaturas móviles); las 12 cargan |
| VR-11 | 2026-10-22 | Visor ampliado de la galería: apertura, navegación con botones y ← →, circularidad, Tab (trampa de foco), Escape, retorno del foco y restauración del desplazamiento; botones táctiles a 390 px | Correcto; botones de 48×48 px; el foco vuelve a la miniatura de origen. No se probó el deslizamiento táctil real (no existe el gesto) ni el efecto de la carga diferida en una primera visita (imágenes ya en caché). En el navegador de pruebas algunas capturas salen con tiles aún sin pintar aunque las imágenes ya están cargadas |
| VR-12 | 2026-10-24 | Hero e introducción de Grupos a 320, 375, 390, 768, 1024, 1440 y 1920 px: carga de la variante WebP, encuadre del templo y las personas, curva inferior, desbordamiento horizontal y contraste del texto sobre la imagen (calculado con el degradado real) | Correcto; sin desbordamiento; contraste en el percentil 5 ≥ 6,2 (título), ≥ 8,1 (descripción) y ≥ 6,4 (cita); la mejora del degradado y la unión de 1 px entre la imagen y el fondo azul se corrigieron durante la revisión |
| VR-13 | 2026-10-24 | Formulario de Grupos en local con `fetch` simulado: formulario vacío, sin grupo, nombre incompleto, correo y teléfono inválidos, mensaje de 1001 caracteres, sin consentimiento, envío correcto con doble clic, respuestas 404, 429 y 500, tiempo agotado y red caída, reintento, campo trampa, `grupo-id`, `solicitud-id` estable en reintentos y `form-name` sin duplicar; teclado y foco; interruptor `data-estado`; responsive a 320–1920 px | Correcto en todos los escenarios; el éxito solo aparece con respuesta HTTP satisfactoria y los datos se conservan ante cualquier fallo. Con el servidor estático local el POST real devuelve 501, como se esperaba |
| VR-14 | 2026-10-24 | Formulario de Grupos en producción: HTML publicado con `solicitud-grupos` y todos sus campos, atributos de detección retirados por Netlify, selector con los diez grupos, formulario activo y sin recursos con error; envío de prueba, registro en *Verified submissions* y notificación por correo | HTML y recursos verificados por el asistente; el envío, el registro y la notificación fueron confirmados por el responsable del proyecto (el asistente no tiene acceso al panel de Netlify) |

**Limitaciones:** un solo motor de navegador (Chromium), sin dispositivos físicos ni otros navegadores; el contraste se calculó sobre la imagen y el degradado reales, sin considerar el pequeño sombreado del texto; las páginas con integración de servidor (`/api/*`) no se probaron en local (404 esperado).

## 4. Estado

**Parcial.** Existe evidencia, simulada y real, de la integración con YouTube, que cubre todo su alcance aprobado. Además se registran validaciones visuales y responsive (3.4); el resto de la funcionalidad del portal no tiene evidencia formal registrada. Se seguirá completando conforme se ejecuten pruebas reales sobre funcionalidad implementada.

---

## Documentos relacionados

- [Plan_Pruebas.md](Plan_Pruebas.md)
- [Checklist_Calidad.md](Checklist_Calidad.md)
- [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)
