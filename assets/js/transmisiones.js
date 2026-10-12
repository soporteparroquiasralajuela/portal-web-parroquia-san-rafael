// Transmisiones — estados del reproductor y estructura de "Últimas transmisiones".
//
// Fase 1: solo la parte visual. Este archivo NO realiza ninguna solicitud de red
// (no consulta YouTube ni ninguna otra API) y no simula transmisiones. La futura
// integración deberá obtener los datos y entregarlos a la página con estos
// eventos del documento (o llamando a las mismas funciones internas):
//
//   "transmisiones:estado"      detail: { estado: "comprobando" | "sin-transmision" | "error" }
//                               detail: { estado: "en-vivo", videoId, titulo }
//   "transmisiones:grabaciones" detail: { grabaciones: [{ videoId, titulo, publicadoEn }] }  (máx. 3)
//
// Seguridad: los textos se insertan siempre con textContent y los videoId se
// validan antes de construir cualquier URL.
(() => {
  const reproductor = document.getElementById("reproductor");
  if (!reproductor) return;

  const ESTADOS = ["comprobando", "en-vivo", "sin-transmision", "error"];
  const FORMATO_ID_VIDEO = /^[A-Za-z0-9_-]{11}$/;
  const MAX_TITULO = 100;
  const MAX_GRABACIONES = 3;
  const DURACION_AVISO_COPIADO_MS = 2500;

  // Se completará en la fase de integración con la ruta de la Netlify Function.
  const RUTA_CONSULTA = null;

  const MENSAJES_ANUNCIO = {
    comprobando: "Comprobando si hay una transmisión en este momento.",
    "sin-transmision": "En este momento no estamos transmitiendo.",
    error: "No fue posible comprobar si hay una transmisión en este momento.",
  };

  const contenedorVideo = reproductor.querySelector("[data-video]");
  const tituloTransmision = reproductor.querySelector("[data-titulo]");
  const anuncio = document.getElementById("transmision-anuncio");
  const botonYoutube = document.getElementById("btn-youtube");
  const botonCopiar = document.getElementById("btn-copiar");
  const textoCopiar = botonCopiar?.querySelector("[data-copiar-texto]");
  const avisoPestanaNueva = botonYoutube?.querySelector("[data-nueva-pestana]");
  const listaGrabaciones = document.getElementById("ultimas-lista");
  const mensajeVacio = document.getElementById("ultimas-vacio");
  const plantillaGrabacion = document.getElementById("plantilla-grabacion");

  // Destino del botón "Ver en YouTube" cuando no hay directo: el canal oficial, solo
  // si se configura un href en el HTML. Nunca se inventa una dirección.
  const urlCanal = botonYoutube?.getAttribute("href") ?? null;
  const textoCopiarInicial = textoCopiar?.textContent ?? "Copiar enlace";

  let videoIdActual = null;
  let urlCopiable = null;
  let temporizadorCopiado = null;

  const esVideoIdValido = (valor) => typeof valor === "string" && FORMATO_ID_VIDEO.test(valor);
  const urlDeVideo = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;

  function recortarTexto(valor, maximo) {
    if (typeof valor !== "string") return "";
    const texto = valor.replace(/\s+/g, " ").trim();
    return texto.length > maximo ? `${texto.slice(0, maximo).trimEnd()}…` : texto;
  }

  function anunciar(mensaje) {
    if (anuncio) anuncio.textContent = mensaje;
  }

  function configurarEnlaceYoutube(url) {
    if (!botonYoutube) return;

    if (url) {
      botonYoutube.setAttribute("href", url);
      botonYoutube.setAttribute("target", "_blank");
      botonYoutube.setAttribute("rel", "noopener noreferrer");
      botonYoutube.removeAttribute("role");
      botonYoutube.removeAttribute("aria-disabled");
      botonYoutube.removeAttribute("aria-describedby");
      if (avisoPestanaNueva) avisoPestanaNueva.hidden = false;
    } else {
      botonYoutube.removeAttribute("href");
      botonYoutube.removeAttribute("target");
      botonYoutube.removeAttribute("rel");
      botonYoutube.setAttribute("role", "link");
      botonYoutube.setAttribute("aria-disabled", "true");
      botonYoutube.setAttribute("aria-describedby", "acciones-ayuda");
      if (avisoPestanaNueva) avisoPestanaNueva.hidden = true;
    }
  }

  function configurarCopiar(url) {
    urlCopiable = url;
    if (!botonCopiar) return;

    if (url) {
      botonCopiar.removeAttribute("aria-disabled");
      botonCopiar.removeAttribute("aria-describedby");
    } else {
      botonCopiar.setAttribute("aria-disabled", "true");
      botonCopiar.setAttribute("aria-describedby", "acciones-ayuda");
    }
  }

  function retirarReproductor() {
    contenedorVideo?.replaceChildren();
    videoIdActual = null;
    if (tituloTransmision) tituloTransmision.textContent = "";
  }

  function insertarReproductor(videoId, titulo) {
    if (!contenedorVideo || videoIdActual === videoId) return;

    const marco = document.createElement("iframe");
    marco.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1`;
    marco.title = titulo ? `Transmisión en vivo: ${titulo}` : "Transmisión en vivo";
    marco.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    marco.referrerPolicy = "strict-origin-when-cross-origin";

    contenedorVideo.replaceChildren(marco);
    videoIdActual = videoId;
  }

  function mostrarEstado(estado, datos = {}) {
    let estadoFinal = ESTADOS.includes(estado) ? estado : "error";
    let titulo = "";

    if (estadoFinal === "en-vivo") {
      if (esVideoIdValido(datos.videoId)) {
        titulo = recortarTexto(datos.titulo, MAX_TITULO);
      } else {
        estadoFinal = "error";
      }
    }

    if (estadoFinal === "en-vivo") {
      insertarReproductor(datos.videoId, titulo);
      if (tituloTransmision) tituloTransmision.textContent = titulo;
      const urlDirecto = urlDeVideo(datos.videoId);
      configurarEnlaceYoutube(urlDirecto);
      configurarCopiar(urlDirecto);
      anunciar(titulo ? `Transmisión en vivo: ${titulo}.` : "Transmisión en vivo.");
    } else {
      retirarReproductor();
      configurarEnlaceYoutube(urlCanal);
      configurarCopiar(null);
      anunciar(MENSAJES_ANUNCIO[estadoFinal]);
    }

    reproductor.dataset.estado = estadoFinal;
    reproductor.setAttribute("aria-busy", estadoFinal === "comprobando" ? "true" : "false");
  }

  function restablecerTextoCopiar() {
    if (textoCopiar) textoCopiar.textContent = textoCopiarInicial;
    temporizadorCopiado = null;
  }

  function copiarConRespaldo(texto) {
    const campo = document.createElement("textarea");
    campo.value = texto;
    campo.setAttribute("readonly", "");
    campo.style.position = "fixed";
    campo.style.opacity = "0";
    document.body.appendChild(campo);
    campo.select();
    let copiado = false;
    try {
      copiado = document.execCommand("copy");
    } catch {
      copiado = false;
    }
    campo.remove();
    return copiado;
  }

  async function copiarEnlace() {
    if (!urlCopiable) return;

    let copiado = false;
    try {
      await navigator.clipboard.writeText(urlCopiable);
      copiado = true;
    } catch {
      copiado = copiarConRespaldo(urlCopiable);
    }

    if (temporizadorCopiado) clearTimeout(temporizadorCopiado);
    if (textoCopiar) textoCopiar.textContent = copiado ? "Enlace copiado" : "No se pudo copiar";
    anunciar(copiado ? "Enlace copiado." : "No se pudo copiar el enlace.");
    temporizadorCopiado = setTimeout(restablecerTextoCopiar, DURACION_AVISO_COPIADO_MS);
  }

  function mostrarGrabaciones(grabaciones) {
    if (!listaGrabaciones || !plantillaGrabacion) return;

    const validas = (Array.isArray(grabaciones) ? grabaciones : [])
      .filter((item) => item && esVideoIdValido(item.videoId) && recortarTexto(item.titulo, 1))
      .slice(0, MAX_GRABACIONES);

    const tarjetas = validas.map((item) => {
      const tarjeta = plantillaGrabacion.content.cloneNode(true);
      const titulo = recortarTexto(item.titulo, MAX_TITULO);
      const url = urlDeVideo(item.videoId);

      tarjeta.querySelector(".grabacion__imagen").src =
        `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
      tarjeta.querySelector(".grabacion__titulo").textContent = titulo;
      tarjeta.querySelector(".grabacion__enlace").href = url;

      const fecha = new Date(item.publicadoEn);
      const etiquetaFecha = tarjeta.querySelector(".grabacion__fecha");
      if (Number.isNaN(fecha.getTime())) {
        etiquetaFecha.remove();
      } else {
        const hora = etiquetaFecha.querySelector("time");
        hora.dateTime = fecha.toISOString();
        hora.textContent = new Intl.DateTimeFormat("es-CR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "America/Costa_Rica",
        }).format(fecha);
      }
      return tarjeta;
    });

    listaGrabaciones.replaceChildren(...tarjetas);
    listaGrabaciones.hidden = tarjetas.length === 0;
    if (mensajeVacio) mensajeVacio.hidden = tarjetas.length > 0;
  }

  botonCopiar?.addEventListener("click", copiarEnlace);

  document.addEventListener("transmisiones:estado", (evento) => {
    mostrarEstado(evento.detail?.estado, evento.detail);
  });

  document.addEventListener("transmisiones:grabaciones", (evento) => {
    mostrarGrabaciones(evento.detail?.grabaciones);
  });

  // Fase 1: sin origen de datos configurado no es posible comprobar la disponibilidad,
  // por lo que se informa como "error" y nunca como "sin transmisión".
  if (RUTA_CONSULTA === null) {
    mostrarEstado("error");
  }
})();
