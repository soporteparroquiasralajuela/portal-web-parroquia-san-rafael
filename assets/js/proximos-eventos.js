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

  // Año, mes, día, hora y minuto de un instante en la zona horaria del calendario.
  function obtenerPartesEnInstante(instante, zonaHoraria) {
    const partes = new Intl.DateTimeFormat("es-CR", {
      timeZone: zonaHoraria,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).formatToParts(instante);
    const valor = (tipo) => Number(partes.find((parte) => parte.type === tipo).value);

    return { anio: valor("year"), mes: valor("month"), dia: valor("day"), hora: valor("hour"), minuto: valor("minute") };
  }

  function obtenerFechaYHora(evento, zonaHoraria) {
    if (evento.todoElDia) {
      const [anio, mes, dia] = evento.inicio.slice(0, 10).split("-").map(Number);
      return { anio, mes, dia, hora: null, minuto: null };
    }

    return obtenerPartesEnInstante(new Date(evento.inicio), zonaHoraria);
  }

  // Espacio que no permite salto de línea: evita que "a. m." o "oct" queden solos en
  // una segunda línea cuando el horario se ajusta en pantallas pequeñas.
  const ESPACIO_FIJO = "\u00A0";

  function formatearHora(hora, minuto) {
    const hora12 = hora % 12 || 12;
    const sufijo = hora < 12 ? `a.${ESPACIO_FIJO}m.` : `p.${ESPACIO_FIJO}m.`;
    return `${hora12}:${String(minuto).padStart(2, "0")}${ESPACIO_FIJO}${sufijo}`;
  }

  function claveDeFecha({ anio, mes, dia }) {
    return anio * 10000 + mes * 100 + dia;
  }

  function desplazarDias({ anio, mes, dia }, cantidad) {
    const fecha = new Date(Date.UTC(anio, mes - 1, dia + cantidad));
    return { anio: fecha.getUTCFullYear(), mes: fecha.getUTCMonth() + 1, dia: fecha.getUTCDate() };
  }

  function formatearDiaYMes({ dia, mes }) {
    return `${dia}${ESPACIO_FIJO}${MESES_CORTOS[mes - 1]}`;
  }

  function formatearFechaLarga({ anio, mes, dia }) {
    return `${dia} de ${MESES[mes - 1]} de ${anio}`;
  }

  // Texto de la línea del reloj y, solo si el evento abarca varios días, su fecha final.
  function describirHorario(evento, inicio, zonaHoraria) {
    const instanteFin = new Date(evento.terminaEn);

    if (evento.todoElDia) {
      // Google entrega como fin la medianoche del día siguiente al último día del evento.
      const ultimoDia = desplazarDias(obtenerPartesEnInstante(instanteFin, zonaHoraria), -1);

      if (claveDeFecha(ultimoDia) <= claveDeFecha(inicio)) {
        return { hora: "Todo el día", fechaFinal: null };
      }
      return { hora: `Todo el día, hasta el ${formatearDiaYMes(ultimoDia)}`, fechaFinal: ultimoDia };
    }

    const horaInicio = formatearHora(inicio.hora, inicio.minuto);

    if (instanteFin <= new Date(evento.inicio)) {
      return { hora: horaInicio, fechaFinal: null };
    }

    const fin = obtenerPartesEnInstante(instanteFin, zonaHoraria);
    const horaFin = formatearHora(fin.hora, fin.minuto);
    const terminaALaMedianoche = fin.hora === 0 && fin.minuto === 0;
    const terminaElMismoDia =
      claveDeFecha(fin) === claveDeFecha(inicio) ||
      (terminaALaMedianoche && claveDeFecha(fin) === claveDeFecha(desplazarDias(inicio, 1)));

    if (terminaElMismoDia) {
      return { hora: `${horaInicio}${ESPACIO_FIJO}– ${horaFin}`, fechaFinal: null };
    }
    return { hora: `${horaInicio}${ESPACIO_FIJO}– ${formatearDiaYMes(fin)}, ${horaFin}`, fechaFinal: fin };
  }

  // Calcula todo el texto de una tarjeta antes de tocar el DOM.
  function prepararVista(evento, zonaHoraria) {
    const inicio = obtenerFechaYHora(evento, zonaHoraria);
    const { hora, fechaFinal } = describirHorario(evento, inicio, zonaHoraria);
    const hastaFechaFinal = fechaFinal ? ` Hasta el ${formatearFechaLarga(fechaFinal)}.` : "";

    return {
      dia: String(inicio.dia).padStart(2, "0"),
      mes: MESES_CORTOS[inicio.mes - 1],
      fechaAccesible: `Fecha: ${formatearFechaLarga(inicio)}.${hastaFechaFinal}`,
      titulo: evento.titulo,
      hora,
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
    fechaAccesible.textContent = vista.fechaAccesible;
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
