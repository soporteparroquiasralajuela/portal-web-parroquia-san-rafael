// Transmisión actual y videos recientes del canal oficial de YouTube.
// Consulta YouTube Data API v3 desde el servidor y devuelve al navegador solo lo necesario
// para la página Transmisiones. La clave y el identificador del canal se leen únicamente de
// las variables de entorno de Netlify (YOUTUBE_API_KEY y YOUTUBE_CHANNEL_ID): nunca se
// escriben en el código, no se envían al navegador y no se registran en logs.
//
// Respuesta:
//   200 { generadoEn, estado: "en_vivo" | "sin_transmision", directo?, grabaciones: [...] }
//   5xx { estado: "error", error: "<código>" }   (no se pudo comprobar: no es «sin transmisión»)
//   400 { estado: "error", error: "parametros_no_admitidos" }  (el endpoint no admite parámetros)
//
// Detección del directo (YOUTUBE_DETECCION_DIRECTO):
//   "subidas" (por defecto): lista de subidas + videos.list. Cuesta 2 unidades por consulta,
//       pero que la lista de subidas incluya un directo en curso NO está documentado por
//       YouTube: debe validarse con un directo público real antes de conectar la página.
//   "busqueda": además usa search.list (eventType=live), método documentado pero con un cupo
//       de 100 llamadas por día; por eso la caché se amplía a 20 minutos.

const API_BASE = "https://www.googleapis.com/youtube/v3";
const TIEMPO_MAXIMO_MS = 8000;
const REINTENTOS = 1;
const VIDEOS_CONSULTADOS = 25;
// Reutilización en memoria de la instancia: evita repetir consultas idénticas (por ejemplo,
// solicitudes simultáneas que la caché del CDN todavía no absorbió).
const REUTILIZACION_MS = 20 * 1000;
const REUTILIZACION_CUOTA_MS = 60 * 1000;
const MAX_GRABACIONES = 3;
const MAX_TITULO = 100;
const VIGENCIA_SUBIDAS_MS = 60 * 60 * 1000;
const VIGENCIA_SIN_SUBIDAS_MS = 5 * 60 * 1000;

const FORMATO_ID_VIDEO = /^[A-Za-z0-9_-]{11}$/;
const FORMATO_ID_CANAL = /^UC[A-Za-z0-9_-]{22}$/;

const CACHE_VIGENTE = "public, s-maxage=60, stale-while-revalidate=30";
const CACHE_VIGENTE_BUSQUEDA = "public, s-maxage=1200";
const CACHE_ERROR_TEMPORAL = "public, s-maxage=30";
const CACHE_LARGA = "public, s-maxage=300";
const SIN_CACHE = "no-store";

export const config = { path: "/api/transmision-actual" };

class ErrorYouTube extends Error {
  constructor(codigo, estadoHttp, cache) {
    super(codigo);
    this.codigo = codigo;
    this.estadoHttp = estadoHttp;
    this.cache = cache;
  }
}

// Se conservan mientras la instancia siga activa: evitan repetir channels.list en cada consulta
// y repetir consultas completas idénticas (resultado reciente y consulta en curso).
let subidasEnMemoria = null;
let resultadoReciente = null;
let consultaEnCurso = null;

function responderJson(cuerpo, estado, cacheCdn, cabecerasExtra = {}) {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Netlify-CDN-Cache-Control": cacheCdn,
      "X-Content-Type-Options": "nosniff",
      ...cabecerasExtra,
    },
  });
}

function responderError(error) {
  return responderJson({ estado: "error", error: error.codigo }, error.estadoHttp, error.cache);
}

function razonDeError(datos) {
  const razon = datos?.error?.errors?.[0]?.reason ?? datos?.error?.status;
  return typeof razon === "string" && /^[A-Za-z0-9_]+$/.test(razon) ? razon : "desconocida";
}

function errorDeRespuesta(estadoHttp, razon) {
  if (estadoHttp === 403 && /quota|limit/i.test(razon)) {
    return new ErrorYouTube("cuota_agotada", 502, CACHE_LARGA);
  }
  if (estadoHttp === 404) {
    return new ErrorYouTube("no_encontrado", 502, CACHE_ERROR_TEMPORAL);
  }
  if (estadoHttp >= 400 && estadoHttp < 500) {
    return new ErrorYouTube("integracion_no_configurada", 500, CACHE_ERROR_TEMPORAL);
  }
  return new ErrorYouTube("servicio_no_disponible", 502, CACHE_ERROR_TEMPORAL);
}

// Solicita un recurso de la API con tiempo máximo y un reintento ante fallos de red o 5xx.
async function solicitar(recurso, parametros, claveApi) {
  const direccion = new URL(`${API_BASE}/${recurso}`);
  direccion.search = new URLSearchParams(parametros).toString();

  let ultimoError = new ErrorYouTube("servicio_no_disponible", 502, CACHE_ERROR_TEMPORAL);

  for (let intento = 0; intento <= REINTENTOS; intento++) {
    let respuesta;
    try {
      respuesta = await fetch(direccion, {
        headers: { "x-goog-api-key": claveApi, Accept: "application/json" },
        signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
      });
    } catch (error) {
      console.error(`No se pudo contactar a YouTube Data API en ${recurso} (${error?.name ?? "error"})`);
      continue;
    }

    const datos = await respuesta.json().catch(() => null);

    if (respuesta.ok) {
      if (datos === null || typeof datos !== "object") {
        throw new ErrorYouTube("respuesta_inesperada", 502, CACHE_ERROR_TEMPORAL);
      }
      return datos;
    }

    const razon = razonDeError(datos);
    console.error(`YouTube Data API respondió ${respuesta.status} (${razon}) en ${recurso}`);
    ultimoError = errorDeRespuesta(respuesta.status, razon);
    if (respuesta.status < 500) {
      ultimoError.razon = razon;
      throw ultimoError;
    }
  }

  throw ultimoError;
}

// Valida que el identificador configurado corresponda al canal y obtiene su lista de subidas.
async function obtenerListaDeSubidas(idCanal, claveApi) {
  if (
    subidasEnMemoria &&
    subidasEnMemoria.idCanal === idCanal &&
    subidasEnMemoria.expiraEn > Date.now()
  ) {
    return subidasEnMemoria.listaDeSubidas;
  }

  const datos = await solicitar(
    "channels",
    {
      part: "id,contentDetails",
      id: idCanal,
      fields: "items(id,contentDetails(relatedPlaylists(uploads)))",
    },
    claveApi,
  );

  const canal = Array.isArray(datos.items) ? datos.items[0] : null;
  if (!canal || canal.id !== idCanal) {
    throw new ErrorYouTube("canal_no_valido", 502, CACHE_LARGA);
  }

  // Si todavía no existe la lista de subidas (canal sin videos), se vuelve a consultar pronto.
  const listaDeSubidas = canal.contentDetails?.relatedPlaylists?.uploads ?? null;
  const vigenciaMs = listaDeSubidas ? VIGENCIA_SUBIDAS_MS : VIGENCIA_SIN_SUBIDAS_MS;
  subidasEnMemoria = { idCanal, listaDeSubidas, expiraEn: Date.now() + vigenciaMs };
  return listaDeSubidas;
}

async function obtenerIdsRecientes(listaDeSubidas, claveApi) {
  if (!listaDeSubidas) return [];

  try {
    const datos = await solicitar(
      "playlistItems",
      {
        part: "contentDetails",
        playlistId: listaDeSubidas,
        maxResults: String(VIDEOS_CONSULTADOS),
        fields: "items(contentDetails(videoId))",
      },
      claveApi,
    );
    return (Array.isArray(datos.items) ? datos.items : [])
      .map((item) => item?.contentDetails?.videoId)
      .filter((id) => typeof id === "string" && FORMATO_ID_VIDEO.test(id))
      .slice(0, VIDEOS_CONSULTADOS);
  } catch (error) {
    // El canal ya fue validado: una lista de subidas inexistente equivale a un canal sin videos.
    if (error instanceof ErrorYouTube && error.codigo === "no_encontrado") return [];
    throw error;
  }
}

async function buscarDirectoActivo(idCanal, claveApi) {
  const datos = await solicitar(
    "search",
    {
      part: "id",
      channelId: idCanal,
      type: "video",
      eventType: "live",
      maxResults: "1",
      fields: "items(id(videoId))",
    },
    claveApi,
  );
  const id = Array.isArray(datos.items) ? datos.items[0]?.id?.videoId : null;
  return typeof id === "string" && FORMATO_ID_VIDEO.test(id) ? id : null;
}

async function obtenerDetalles(ids, claveApi) {
  if (ids.length === 0) return [];

  const datos = await solicitar(
    "videos",
    {
      part: "snippet,status,liveStreamingDetails",
      id: ids.join(","),
      fields:
        "items(id,snippet(title,publishedAt,liveBroadcastContent)," +
        "status(privacyStatus,uploadStatus,embeddable)," +
        "liveStreamingDetails(actualStartTime,actualEndTime))",
    },
    claveApi,
  );
  return Array.isArray(datos.items) ? datos.items : [];
}

function aTextoPlano(valor, maximo) {
  if (typeof valor !== "string") return "";
  const texto = valor.replace(/\s+/g, " ").trim();
  if (texto.length <= maximo) return texto;
  const recorte = texto.slice(0, maximo);
  const enPalabra = recorte.replace(/\s+\S*$/, "");
  return `${(enPalabra || recorte).trimEnd()}…`;
}

function marcaDeTiempo(valor) {
  const tiempo = Date.parse(valor);
  return Number.isNaN(tiempo) ? null : tiempo;
}

function esPublicoYValido(video) {
  return (
    video &&
    typeof video.id === "string" &&
    FORMATO_ID_VIDEO.test(video.id) &&
    video.status?.privacyStatus === "public" &&
    aTextoPlano(video.snippet?.title, MAX_TITULO) !== ""
  );
}

// Un directo activo: público y con transmisión en curso. Programados y finalizados no cuentan.
function elegirDirecto(videos) {
  const activos = videos.filter(
    (video) => esPublicoYValido(video) && video.snippet?.liveBroadcastContent === "live",
  );
  if (activos.length === 0) return null;

  activos.sort(
    (a, b) =>
      (marcaDeTiempo(b.liveStreamingDetails?.actualStartTime) ?? 0) -
      (marcaDeTiempo(a.liveStreamingDetails?.actualStartTime) ?? 0),
  );
  const video = activos[0];

  return {
    videoId: video.id,
    titulo: aTextoPlano(video.snippet.title, MAX_TITULO),
    inicio: video.liveStreamingDetails?.actualStartTime ?? null,
    incrustable: video.status?.embeddable !== false,
  };
}

// Videos convencionales y grabaciones de transmisiones finalizadas, del más reciente al más antiguo.
function elegirRecientes(videos) {
  return videos
    .filter(
      (video) =>
        esPublicoYValido(video) &&
        video.snippet?.liveBroadcastContent === "none" &&
        video.status?.uploadStatus === "processed" &&
        marcaDeTiempo(video.snippet?.publishedAt) !== null,
    )
    .sort((a, b) => marcaDeTiempo(b.snippet.publishedAt) - marcaDeTiempo(a.snippet.publishedAt))
    .slice(0, MAX_GRABACIONES)
    .map((video) => ({
      videoId: video.id,
      titulo: aTextoPlano(video.snippet.title, MAX_TITULO),
      publicadoEn: new Date(video.snippet.publishedAt).toISOString(),
    }));
}

// Ejecuta la consulta completa y devuelve un resultado listo para responder (éxito o error).
async function ejecutarConsulta(idCanal, claveApi, usaBusqueda) {
  try {
    const listaDeSubidas = await obtenerListaDeSubidas(idCanal, claveApi);
    const ids = await obtenerIdsRecientes(listaDeSubidas, claveApi);

    if (usaBusqueda) {
      const idDirecto = await buscarDirectoActivo(idCanal, claveApi);
      if (idDirecto && !ids.includes(idDirecto)) ids.push(idDirecto);
    }

    const videos = await obtenerDetalles(ids, claveApi);
    const directo = elegirDirecto(videos);
    const grabaciones = elegirRecientes(videos);

    return {
      estadoHttp: 200,
      cuerpo: {
        generadoEn: new Date().toISOString(),
        estado: directo ? "en_vivo" : "sin_transmision",
        ...(directo ? { directo } : {}),
        grabaciones,
      },
      cache: usaBusqueda ? CACHE_VIGENTE_BUSQUEDA : CACHE_VIGENTE,
      reutilizarMs: REUTILIZACION_MS,
    };
  } catch (error) {
    let falla = error;
    if (!(falla instanceof ErrorYouTube)) {
      console.error(`Error inesperado al consultar YouTube (${error?.name ?? "error"})`);
      falla = new ErrorYouTube("servicio_no_disponible", 502, CACHE_ERROR_TEMPORAL);
    }
    const agotada = falla.codigo === "cuota_agotada" || falla.codigo === "canal_no_valido";
    return {
      estadoHttp: falla.estadoHttp,
      cuerpo: { estado: "error", error: falla.codigo },
      cache: falla.cache,
      reutilizarMs: agotada ? REUTILIZACION_CUOTA_MS : 0,
    };
  }
}

// Las solicitudes simultáneas comparten una sola consulta a YouTube y un resultado reciente se
// reutiliza unos segundos. Es una protección por instancia: complementa la caché del CDN, no
// la sustituye (cada instancia y cada región tienen su propia memoria).
function consultarConReutilizacion(idCanal, claveApi, usaBusqueda) {
  const clave = `${idCanal}|${usaBusqueda}`;

  if (resultadoReciente?.clave === clave && resultadoReciente.expiraEn > Date.now()) {
    return Promise.resolve(resultadoReciente.resultado);
  }
  if (consultaEnCurso?.clave === clave) return consultaEnCurso.promesa;

  const promesa = ejecutarConsulta(idCanal, claveApi, usaBusqueda)
    .then((resultado) => {
      if (resultado.reutilizarMs > 0) {
        resultadoReciente = { clave, expiraEn: Date.now() + resultado.reutilizarMs, resultado };
      }
      return resultado;
    })
    .finally(() => {
      consultaEnCurso = null;
    });

  consultaEnCurso = { clave, promesa };
  return promesa;
}

export default async (peticion) => {
  if (peticion.method !== "GET" && peticion.method !== "HEAD") {
    return responderJson({ estado: "error", error: "metodo_no_permitido" }, 405, SIN_CACHE, {
      Allow: "GET, HEAD",
    });
  }

  // El endpoint no admite parámetros: se rechazan antes de consultar a YouTube y sin caché, para
  // que variar la dirección no genere consultas nuevas ni entradas en la caché del CDN.
  if (new URL(peticion.url).search !== "") {
    return responderJson({ estado: "error", error: "parametros_no_admitidos" }, 400, SIN_CACHE);
  }

  const claveApi = Netlify.env.get("YOUTUBE_API_KEY");
  const idCanal = Netlify.env.get("YOUTUBE_CHANNEL_ID");

  if (!claveApi || !idCanal || !FORMATO_ID_CANAL.test(idCanal)) {
    console.error(
      `Falta configurar o es inválido: ${[
        !claveApi && "YOUTUBE_API_KEY",
        (!idCanal || !FORMATO_ID_CANAL.test(idCanal)) && "YOUTUBE_CHANNEL_ID",
      ]
        .filter(Boolean)
        .join(", ")}`,
    );
    return responderJson({ estado: "error", error: "integracion_no_configurada" }, 500, SIN_CACHE);
  }

  const usaBusqueda = Netlify.env.get("YOUTUBE_DETECCION_DIRECTO") === "busqueda";
  const resultado = await consultarConReutilizacion(idCanal, claveApi, usaBusqueda);
  return responderJson(resultado.cuerpo, resultado.estadoHttp, resultado.cache);
};
