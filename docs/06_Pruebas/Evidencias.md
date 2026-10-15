# Evidencias de Pruebas

| Campo | Valor |
|---|---|
| Documento | 06_Pruebas/Evidencias.md |
| Versión | 1.1 |
| Fecha de creación | 2026-08-05 |
| Última actualización | 2026-10-14 |
| Estado | **Parcial** — evidencia de la integración con YouTube; el resto de la funcionalidad sin evidencia formal |

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

## 4. Estado

**Parcial.** Existe evidencia, simulada y real, de la integración con YouTube, que cubre todo su alcance aprobado. El resto de la funcionalidad del portal no tiene evidencia formal registrada. Se seguirá completando conforme se ejecuten pruebas reales sobre funcionalidad implementada.

---

## Documentos relacionados

- [Plan_Pruebas.md](Plan_Pruebas.md)
- [Checklist_Calidad.md](Checklist_Calidad.md)
- [Integracion_YouTube.md](../03_Arquitectura/Integracion_YouTube.md)
