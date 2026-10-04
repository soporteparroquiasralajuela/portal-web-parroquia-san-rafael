// Rellena las 3 tarjetas existentes de "Próximos eventos" de Inicio con los datos
// de /api/proximos-eventos (Netlify Function que consulta Google Calendar). No
// crea tarjetas ni cambia el diseño: solo actualiza el texto de las existentes y
// usa textContent, nunca innerHTML. Las tarjetas permanecen ocultas hasta tener
// datos reales, para no mostrar contenido de ejemplo.
(() => {
  const ENDPOINT = "/api/proximos-eventos";
  const MAX_TARJETAS = 3;
  const TIEMPO_MAXIMO_MS = 8000;

  const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const MESES = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const MENSAJES = {
    cargando: "Cargando próximos eventos…",
    sinEventos: "Por ahora no hay próximos eventos programados.",
    error:
      "No pudimos cargar los próximos eventos en este momento. Puedes consultarlos en el calendario completo.",
  };

  const columnas = Array.from(document.querySelectorAll(".eventos .row > .col-12")).filter((columna) =>
    columna.querySelector(".event-card"),
  );
  const contenedorEstado = document.getElementById("eventos-estado-contenedor");
  const textoEstado = document.getElementById("eventos-estado");

  if (columnas.length === 0 || !contenedorEstado || !textoEstado) return;

  function mostrarEstado(mensaje) {
    textoEstado.textContent = mensaje;
    contenedorEstado.hidden = false;
  }

  async function solicitarEventos() {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);

    try {
      const respuesta = await fetch(ENDPOINT, {
        headers: { Accept: "application/json" },
        signal: controlador.signal,
      });
      if (!respuesta.ok) throw new Error("Respuesta no válida");
      return await respuesta.json();
    } finally {
      clearTimeout(temporizador);
    }
  }

  function esEventoValido(evento) {
    return (
      evento &&
      typeof evento.titulo === "string" &&
      typeof evento.inicio === "string" &&
      typeof evento.terminaEn === "string" &&
      Number.isFinite(Date.parse(evento.terminaEn))
    );
  }

  // Descarta los eventos que ya terminaron (la respuesta puede venir de la caché de
  // hasta 6 horas); los que están en curso siguen apareciendo hasta que terminan.
  function seleccionarVigentes(datos) {
    if (!Array.isArray(datos?.eventos) || typeof datos.zonaHoraria !== "string") {
      throw new Error("Datos no válidos");
    }
    const ahora = Date.now();
    return datos.eventos
      .filter(esEventoValido)
      .filter((evento) => Date.parse(evento.terminaEn) > ahora)
      .slice(0, MAX_TARJETAS);
  }

  function obtenerFechaYHora(evento, zonaHoraria) {
    if (evento.todoElDia) {
      const [anio, mes, dia] = evento.inicio.slice(0, 10).split("-").map(Number);
      return { anio, mes, dia, hora: null, minuto: null };
    }

    const partes = new Intl.DateTimeFormat("es-CR", {
      timeZone: zonaHoraria,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).formatToParts(new Date(evento.inicio));
    const valor = (tipo) => Number(partes.find((parte) => parte.type === tipo).value);

    return { anio: valor("year"), mes: valor("month"), dia: valor("day"), hora: valor("hour"), minuto: valor("minute") };
  }

  function formatearHora(hora, minuto) {
    const hora12 = hora % 12 || 12;
    const sufijo = hora < 12 ? "a. m." : "p. m.";
    return `${hora12}:${String(minuto).padStart(2, "0")} ${sufijo}`;
  }

  // Calcula todo el texto de una tarjeta antes de tocar el DOM.
  function prepararVista(evento, zonaHoraria) {
    const { anio, mes, dia, hora, minuto } = obtenerFechaYHora(evento, zonaHoraria);
    const fechaCompleta = `${dia} de ${MESES[mes - 1]} de ${anio}`;

    return {
      dia: String(dia).padStart(2, "0"),
      mes: MESES_CORTOS[mes - 1],
      fechaCompleta,
      titulo: evento.titulo,
      hora: evento.todoElDia ? "Todo el día" : formatearHora(hora, minuto),
      lugar: evento.lugar || null,
      descripcion: evento.descripcion || null,
    };
  }

  function establecerTextoTrasIcono(contenedor, texto) {
    const icono = contenedor.querySelector("i");
    const nodoTexto = icono ? icono.nextSibling : contenedor.firstChild;

    if (nodoTexto && nodoTexto.nodeType === Node.TEXT_NODE) {
      nodoTexto.nodeValue = ` ${texto}`;
    } else {
      contenedor.append(document.createTextNode(` ${texto}`));
    }
  }

  function rellenarTarjeta(columna, vista) {
    const tarjeta = columna.querySelector(".event-card");
    const meta = tarjeta.querySelector(".event-card__meta");
    const [spanHora, spanLugar] = meta.querySelectorAll(":scope > span");
    const descripcion = tarjeta.querySelector(".event-card__description");

    tarjeta.querySelector(".event-card__date strong").textContent = vista.dia;
    tarjeta.querySelector(".event-card__date span").textContent = vista.mes;
    tarjeta.querySelector(".event-card__body h3").textContent = vista.titulo;

    establecerTextoTrasIcono(spanHora, vista.hora);

    if (vista.lugar) {
      establecerTextoTrasIcono(spanLugar, vista.lugar);
    }
    spanLugar.hidden = !vista.lugar;

    if (vista.descripcion) {
      descripcion.textContent = vista.descripcion;
    }
    descripcion.hidden = !vista.descripcion;

    // El bloque visual de la fecha está oculto a lectores de pantalla (aria-hidden):
    // se añade la fecha como texto accesible, sin cambiar lo que se ve.
    const fechaAccesible = document.createElement("span");
    fechaAccesible.className = "visually-hidden";
    fechaAccesible.textContent = `Fecha: ${vista.fechaCompleta}.`;
    meta.prepend(fechaAccesible);
  }

  async function cargarProximosEventos() {
    mostrarEstado(MENSAJES.cargando);

    try {
      const datos = await solicitarEventos();
      const eventos = seleccionarVigentes(datos);

      if (eventos.length === 0) {
        mostrarEstado(MENSAJES.sinEventos);
        return;
      }

      const vistas = eventos.map((evento) => prepararVista(evento, datos.zonaHoraria));

      columnas.forEach((columna, indice) => {
        if (vistas[indice]) rellenarTarjeta(columna, vistas[indice]);
        columna.hidden = !vistas[indice];
      });
      contenedorEstado.hidden = true;
    } catch {
      mostrarEstado(MENSAJES.error);
    }
  }

  cargarProximosEventos();
})();
