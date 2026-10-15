// Transmisiones — estados del reproductor y sección «Más de nuestra comunidad».
//
// Consulta la Netlify Function /api/transmision-actual (que a su vez consulta YouTube Data
// API v3 desde el servidor: el navegador nunca llama a YouTube ni maneja credenciales) y
// refleja el resultado en los estados del reproductor y en «Más de nuestra comunidad».
//
// Respuesta de la Function:
//   200 { estado: "en_vivo", directo: { videoId, titulo, incrustable, ... }, grabaciones: [...] }
//   200 { estado: "sin_transmision", grabaciones: [...] }
//   cualquier otra cosa (HTTP de error, tiempo agotado, JSON inválido) = no se pudo comprobar
//
// Una consulta fallida NUNCA se muestra como «sin transmisión». Además, que la lista de
// subidas de YouTube no incluya un directo no garantiza que no exista: el enlace al canal
// oficial permanece siempre disponible.
//
// Las mismas funciones pueden alimentarse con estos eventos del documento:
//
//   "transmisiones:estado"      detail: { estado: "comprobando" | "sin-transmision" | "error" }
//                               detail: { estado: "en-vivo", videoId, titulo, incrustable }
//       Solo con incrustable === true se inserta el iframe; con false, ausente o inválido el
//       estado sigue siendo «en vivo» pero sin reproductor: «Ver en YouTube» abre el directo.
//   "transmisiones:grabaciones" detail: { grabaciones: [{ videoId, titulo, publicadoEn }] }
//       Videos públicos recientes del canal: convencionales o grabaciones de transmisiones
//       finalizadas. Se ordenan por publicadoEn (el más reciente primero) y se muestran
//       máximo 3. El nombre del evento se conserva por compatibilidad.
//
// «Más de nuestra comunidad»: el mensaje «Todavía no hay videos públicos para mostrar» solo
// aparece cuando la Function respondió correctamente con una lista vacía. Mientras se consulta
// la primera vez no se muestra ningún mensaje, y si la consulta falla sin videos cargados se
// muestra un aviso de error. Los videos ya cargados se conservan ante errores posteriores.
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

  const RUTA_CONSULTA = "/api/transmision-actual";
  const INTERVALO_MS = 60 * 1000;
  const ESPERA_MAXIMA_MS = 5 * 60 * 1000;
  const TIEMPO_MAXIMO_MS = 8000;
  // Un directo mostrado no se retira por una falla aislada ni por una sola respuesta sin directo.
  const FALLAS_PARA_RETIRAR_DIRECTO = 3;
  const CONFIRMACIONES_PARA_RETIRAR_DIRECTO = 2;

  const MENSAJE_NO_INCRUSTABLE = "Esta transmisión está disponible en YouTube";

  const MENSAJES_ANUNCIO = {
    comprobando: "Comprobando si hay una transmisión en este momento.",
    "sin-transmision": "No encontramos una transmisión activa en este momento.",
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

  // Destino del botón "Ver en YouTube" cuando no hay directo: el canal oficial, tomado del
  // href del HTML. Nunca se inventa una dirección.
  const urlCanal = botonYoutube?.getAttribute("href") ?? null;
  const textoCopiarInicial = textoCopiar?.textContent ?? "Copiar enlace";

  // Mensajes de la sección de videos: el texto de lista vacía es el del HTML.
  const TEXTO_SIN_VIDEOS = mensajeVacio?.textContent ?? "";
  const TEXTO_ERROR_VIDEOS = "No fue posible cargar los videos en este momento";

  let videoIdActual = null;
  let claveDirectoMostrado = null; // «videoId:incrustable» del directo en pantalla
  let urlCopiable = null;
  let temporizadorCopiado = null;

  const esVideoIdValido = (valor) => typeof valor === "string" && FORMATO_ID_VIDEO.test(valor);
  const urlDeVideo = (videoId) => `https://www.youtube.com/watch?v=${videoId}`;
  const claveDeDirecto = (videoId, incrustable) => `${videoId}:${incrustable}`;

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

  function quitarMarcoVideo() {
    contenedorVideo?.replaceChildren();
    videoIdActual = null;
  }

  function retirarReproductor() {
    quitarMarcoVideo();
    claveDirectoMostrado = null;
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
      // Solo se incrusta con incrustable === true; en cualquier otro caso no se carga un iframe
      // que YouTube podría no reproducir, y el directo se abre con «Ver en YouTube».
      const incrustable = datos.incrustable === true;
      if (incrustable) insertarReproductor(datos.videoId, titulo);
      else quitarMarcoVideo();
      claveDirectoMostrado = claveDeDirecto(datos.videoId, incrustable);
      reproductor.dataset.incrustable = String(incrustable);
      if (tituloTransmision) tituloTransmision.textContent = titulo;
      const urlDirecto = urlDeVideo(datos.videoId);
      configurarEnlaceYoutube(urlDirecto);
      configurarCopiar(urlDirecto);
      const anuncioDirecto = titulo ? `Transmisión en vivo: ${titulo}.` : "Transmisión en vivo.";
      anunciar(incrustable ? anuncioDirecto : `${anuncioDirecto} ${MENSAJE_NO_INCRUSTABLE}.`);
    } else {
      delete reproductor.dataset.incrustable;
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

    // Los elementos sin fecha válida quedan al final; con fechas iguales se conserva el orden recibido.
    const marcaDeTiempo = (item) => {
      const tiempo = Date.parse(item.publicadoEn);
      return Number.isNaN(tiempo) ? Number.NEGATIVE_INFINITY : tiempo;
    };

    const validas = (Array.isArray(grabaciones) ? grabaciones : [])
      .filter((item) => item && esVideoIdValido(item.videoId) && recortarTexto(item.titulo, 1))
      .sort((a, b) => {
        const ta = marcaDeTiempo(a);
        const tb = marcaDeTiempo(b);
        return ta === tb ? 0 : tb > ta ? 1 : -1;
      })
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
    if (mensajeVacio) {
      mensajeVacio.textContent = TEXTO_SIN_VIDEOS;
      mensajeVacio.hidden = tarjetas.length > 0;
    }
  }

  // No se pudo obtener la lista: sin videos cargados se avisa del error (nunca como «lista
  // vacía»); con videos ya cargados se conservan.
  function mostrarErrorVideos() {
    if (!mensajeVacio || !listaGrabaciones || !listaGrabaciones.hidden) return;
    mensajeVacio.textContent = TEXTO_ERROR_VIDEOS;
    mensajeVacio.hidden = false;
    huellaGrabaciones = null; // la próxima respuesta correcta debe volver a dibujarse
  }

  botonCopiar?.addEventListener("click", copiarEnlace);

  document.addEventListener("transmisiones:estado", (evento) => {
    mostrarEstado(evento.detail?.estado, evento.detail);
  });

  document.addEventListener("transmisiones:grabaciones", (evento) => {
    mostrarGrabaciones(evento.detail?.grabaciones);
  });

  // ---- Consulta periódica a la Netlify Function ----

  let consultaEnCurso = false;
  let controlador = null;
  let temporizador = null;
  let generacion = 0; // cambia cuando la pestaña se oculta: descarta las respuestas atrasadas
  let ultimaConsultaFin = 0;
  let fallasSeguidas = 0;
  let sinDirectoSeguidas = 0;
  let huellaGrabaciones = null;

  const estaVisible = () => document.visibilityState === "visible";

  // Devuelve null si la respuesta no tiene el formato esperado (se trata como falla).
  function interpretarRespuesta(datos) {
    if (!datos || typeof datos !== "object") return null;
    // null = la lista no vino en la respuesta: no se interpreta como «sin videos».
    const grabaciones = Array.isArray(datos.grabaciones) ? datos.grabaciones : null;

    if (datos.estado === "en_vivo") {
      const directo = datos.directo;
      if (!directo || !esVideoIdValido(directo.videoId)) return null;
      return {
        estado: "en-vivo",
        videoId: directo.videoId,
        titulo: directo.titulo,
        incrustable: directo.incrustable === true,
        grabaciones,
      };
    }
    if (datos.estado === "sin_transmision") return { estado: "sin-transmision", grabaciones };
    return null;
  }

  async function solicitarEstado() {
    controlador = new AbortController();
    const limite = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);
    try {
      const respuesta = await fetch(RUTA_CONSULTA, {
        headers: { Accept: "application/json" },
        signal: controlador.signal,
      });
      if (!respuesta.ok) throw new Error("Respuesta no válida");
      return await respuesta.json();
    } finally {
      clearTimeout(limite);
    }
  }

  function mostrarGrabacionesSiCambian(grabaciones) {
    const huella = JSON.stringify(
      grabaciones.map((item) => [item?.videoId, item?.titulo, item?.publicadoEn]),
    );
    if (huella === huellaGrabaciones) return;
    huellaGrabaciones = huella;
    mostrarGrabaciones(grabaciones);
  }

  function aplicarResultado(resultado) {
    fallasSeguidas = 0;
    if (resultado.grabaciones) mostrarGrabacionesSiCambian(resultado.grabaciones);
    else mostrarErrorVideos();

    if (resultado.estado === "en-vivo") {
      sinDirectoSeguidas = 0;
      const titulo = recortarTexto(resultado.titulo, MAX_TITULO);
      const cambio =
        reproductor.dataset.estado !== "en-vivo" ||
        claveDirectoMostrado !== claveDeDirecto(resultado.videoId, resultado.incrustable) ||
        tituloTransmision?.textContent !== titulo;
      if (cambio) {
        mostrarEstado("en-vivo", {
          videoId: resultado.videoId,
          titulo,
          incrustable: resultado.incrustable,
        });
      }
      return;
    }

    // Sin directo: un directo en pantalla solo se retira tras varias respuestas seguidas.
    if (reproductor.dataset.estado === "en-vivo") {
      sinDirectoSeguidas += 1;
      if (sinDirectoSeguidas < CONFIRMACIONES_PARA_RETIRAR_DIRECTO) return;
    }
    sinDirectoSeguidas = 0;
    if (reproductor.dataset.estado !== "sin-transmision") mostrarEstado("sin-transmision");
  }

  // No se pudo comprobar: nunca se muestra como «sin transmisión». Un directo ya mostrado se
  // conserva durante las primeras fallas; los videos recientes también se conservan.
  function registrarFalla() {
    fallasSeguidas += 1;
    mostrarErrorVideos();
    if (reproductor.dataset.estado === "en-vivo" && fallasSeguidas < FALLAS_PARA_RETIRAR_DIRECTO) {
      return;
    }
    if (reproductor.dataset.estado !== "error") mostrarEstado("error");
  }

  function esperaHastaSiguiente() {
    if (fallasSeguidas === 0) return INTERVALO_MS;
    return Math.min(INTERVALO_MS * 2 ** Math.min(fallasSeguidas, 3), ESPERA_MAXIMA_MS);
  }

  function programarConsulta(retardoMs) {
    clearTimeout(temporizador);
    temporizador = null;
    if (!estaVisible()) return;
    temporizador = setTimeout(consultar, retardoMs);
  }

  async function consultar() {
    temporizador = null;
    // Si ya hay una consulta en curso, esa misma programará la siguiente al terminar.
    if (consultaEnCurso || !estaVisible()) return;

    consultaEnCurso = true;
    const generacionInicial = generacion;
    let resultado = null;
    try {
      resultado = interpretarRespuesta(await solicitarEstado());
    } catch {
      resultado = null;
    }
    consultaEnCurso = false;

    // La pestaña se ocultó durante la consulta: se descarta y se reanuda al volver a ser visible.
    if (generacionInicial !== generacion) {
      if (estaVisible()) programarConsulta(0);
      return;
    }

    ultimaConsultaFin = Date.now();
    if (resultado) aplicarResultado(resultado);
    else registrarFalla();
    programarConsulta(esperaHastaSiguiente());
  }

  document.addEventListener("visibilitychange", () => {
    if (!estaVisible()) {
      generacion += 1;
      clearTimeout(temporizador);
      temporizador = null;
      controlador?.abort();
      return;
    }
    const transcurrido = Date.now() - ultimaConsultaFin;
    programarConsulta(transcurrido >= INTERVALO_MS ? 0 : INTERVALO_MS - transcurrido);
  });

  // Hasta la primera respuesta no se afirma nada sobre los videos.
  if (mensajeVacio) mensajeVacio.hidden = true;
  mostrarEstado("comprobando");
  programarConsulta(0);
})();
