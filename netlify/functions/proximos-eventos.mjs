// Próximos eventos de Inicio.
// Consulta Google Calendar API desde el servidor y devuelve al navegador solo los
// campos públicos necesarios para las tarjetas. La clave y el ID del calendario se
// leen exclusivamente de las variables de entorno de Netlify
// (GOOGLE_CALENDAR_API_KEY y GOOGLE_CALENDAR_ID): nunca se escriben en el código,
// ni se envían al navegador, ni se registran en logs.

const API_BASE = "https://www.googleapis.com/calendar/v3/calendars";
const ZONA_HORARIA = "America/Costa_Rica";
// Se piden más eventos de los que se muestran (3) para que el navegador pueda
// descartar los que terminen mientras la respuesta sigue en caché.
const EVENTOS_EN_BUFFER = 10;
const TIEMPO_MAXIMO_MS = 8000;

const CACHE_VIGENTE = "public, s-maxage=21600"; // 6 horas, bajo demanda
const CACHE_ERROR_TEMPORAL = "public, s-maxage=60";
const SIN_CACHE = "no-store";

const MAX_TITULO = 100;
const MAX_LUGAR = 100;
const MAX_DESCRIPCION = 140;

export const config = { path: "/api/proximos-eventos" };

const ENTIDADES_HTML = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };

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

// Google Calendar puede entregar HTML en las descripciones: se reduce a texto plano.
function aTextoPlano(valor, maximo) {
  if (typeof valor !== "string") return null;

  const texto = valor
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li)>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, entidad) => ENTIDADES_HTML[entidad])
    .replace(/\s+/g, " ")
    .trim();

  if (!texto) return null;
  if (texto.length <= maximo) return texto;

  const recorte = texto.slice(0, maximo);
  const enPalabra = recorte.replace(/\s+\S*$/, "");
  return `${(enPalabra || recorte).trimEnd()}…`;
}

// Instante en que empieza el día `fecha` (AAAA-MM-DD) en la zona horaria indicada.
function inicioDelDia(fecha, zona) {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const medianocheUtc = Date.UTC(anio, mes - 1, dia);
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: zona,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(new Date(medianocheUtc));
  const valor = (tipo) => Number(partes.find((parte) => parte.type === tipo).value);
  const mismaHoraComoUtc = Date.UTC(
    valor("year"),
    valor("month") - 1,
    valor("day"),
    valor("hour"),
    valor("minute"),
    valor("second"),
  );
  return new Date(medianocheUtc - (mismaHoraComoUtc - medianocheUtc));
}

const FORMATO_FECHA = /^\d{4}-\d{2}-\d{2}/;

// Conserva únicamente los campos que necesitan las tarjetas.
function normalizarEvento(elemento) {
  if (!elemento || elemento.status === "cancelled") return null;

  const titulo = aTextoPlano(elemento.summary, MAX_TITULO);
  const todoElDia = Boolean(elemento.start?.date) && !elemento.start?.dateTime;
  const inicio = elemento.start?.dateTime ?? elemento.start?.date;
  const fin = elemento.end?.dateTime ?? elemento.end?.date;

  if (!titulo || !FORMATO_FECHA.test(inicio ?? "") || !FORMATO_FECHA.test(fin ?? "")) {
    return null;
  }

  // En eventos de todo el día, Google entrega como fin el día siguiente (exclusivo).
  const terminaEn = todoElDia ? inicioDelDia(fin, ZONA_HORARIA) : new Date(fin);
  if (Number.isNaN(terminaEn.getTime())) return null;

  return {
    titulo,
    inicio,
    terminaEn: terminaEn.toISOString(),
    todoElDia,
    lugar: aTextoPlano(elemento.location, MAX_LUGAR),
    descripcion: aTextoPlano(elemento.description, MAX_DESCRIPCION),
  };
}

function razonDeError(datos) {
  const razon = datos?.error?.errors?.[0]?.reason ?? datos?.error?.status;
  return typeof razon === "string" && /^[A-Za-z0-9_]+$/.test(razon) ? razon : "desconocida";
}

export default async (peticion) => {
  if (peticion.method !== "GET" && peticion.method !== "HEAD") {
    return responderJson({ error: "metodo_no_permitido" }, 405, SIN_CACHE, { Allow: "GET, HEAD" });
  }

  const claveApi = Netlify.env.get("GOOGLE_CALENDAR_API_KEY");
  const idCalendario = Netlify.env.get("GOOGLE_CALENDAR_ID");

  if (!claveApi || !idCalendario) {
    console.error(
      `Falta configurar: ${[
        !claveApi && "GOOGLE_CALENDAR_API_KEY",
        !idCalendario && "GOOGLE_CALENDAR_ID",
      ]
        .filter(Boolean)
        .join(", ")}`,
    );
    return responderJson({ error: "integracion_no_configurada" }, 500, SIN_CACHE);
  }

  const direccion = new URL(`${API_BASE}/${encodeURIComponent(idCalendario)}/events`);
  direccion.search = new URLSearchParams({
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: new Date().toISOString(),
    maxResults: String(EVENTOS_EN_BUFFER),
    timeZone: ZONA_HORARIA,
    fields: "items(summary,start,end,location,description,status)",
  }).toString();

  let respuestaGoogle;
  try {
    respuestaGoogle = await fetch(direccion, {
      headers: { "x-goog-api-key": claveApi, Accept: "application/json" },
      signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
    });
  } catch (error) {
    console.error(`No se pudo contactar a Google Calendar API (${error?.name ?? "error"})`);
    return responderJson({ error: "calendario_no_disponible" }, 502, CACHE_ERROR_TEMPORAL);
  }

  const datos = await respuestaGoogle.json().catch(() => null);

  if (!respuestaGoogle.ok) {
    console.error(
      `Google Calendar API respondió ${respuestaGoogle.status} (${razonDeError(datos)})`,
    );
    return responderJson({ error: "calendario_no_disponible" }, 502, CACHE_ERROR_TEMPORAL);
  }

  const eventos = (Array.isArray(datos?.items) ? datos.items : [])
    .map(normalizarEvento)
    .filter(Boolean);

  return responderJson(
    { generadoEn: new Date().toISOString(), zonaHoraria: ZONA_HORARIA, eventos },
    200,
    CACHE_VIGENTE,
  );
};
