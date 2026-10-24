// Formulario de solicitud de información de la página Grupos (Netlify Forms).
//
// - El selector de grupos se construye a partir de la lista visible de grupos
//   (#gruposTab): al cambiar los nombres reales solo hay que editar la lista y la ficha.
//   Cada opción lleva el identificador estable del grupo (grupo-N), que se envía en el campo
//   oculto «grupo-id» junto al nombre elegido.
// - El envío es un POST url-encoded a "/" con el nombre del formulario (form-name), que es el
//   mecanismo documentado por Netlify para envíos con JavaScript. Sin JavaScript el formulario
//   se envía de forma nativa (Netlify muestra su página de confirmación).
// - El mensaje de éxito solo aparece si el servidor responde con un código HTTP satisfactorio.
//   Si no hay respuesta (tiempo agotado o red caída) no se sabe si la solicitud llegó: se avisa
//   de esa incertidumbre sin recomendar el reenvío. Cada solicitud lleva un identificador único
//   («solicitud-id») que se conserva en los reintentos, para detectar duplicados en el panel.
// - Interruptor: la sección .grupos-interes tiene data-estado="inactivo" mientras los nombres de
//   los grupos no estén confirmados. Con ?formulario=prueba el formulario se muestra solo en esa
//   visita, para probar el envío en producción.
// - Netlify solo recibe envíos en el sitio publicado: con un servidor estático local el POST
//   falla y se muestra el mensaje de error.
(() => {
  const form = document.getElementById("solicitud-grupos");
  if (!form) return;

  const TIEMPO_MAXIMO_MS = 15000;
  const MAXIMO_MENSAJE = 1000;
  const campos = {
    grupo: form.elements.grupo,
    nombre: form.elements.nombre,
    email: form.elements.email,
    telefono: form.elements.telefono,
    mensaje: form.elements.mensaje,
    consentimiento: form.elements.consentimiento,
  };
  const grupoId = form.elements["grupo-id"];
  const solicitudId = form.elements["solicitud-id"];
  const seccion = form.closest(".grupos-interes");
  const boton = form.querySelector("[data-enviar]");
  const textoBoton = boton.querySelector("[data-enviar-texto]");
  const textoOriginal = textoBoton.textContent;
  const mensajeExito = document.getElementById("interes-exito");
  const mensajeError = document.getElementById("interes-error");
  const mensajeIncierto = document.getElementById("interes-incierto");
  const resumen = document.getElementById("interes-resumen");
  const trampa = form.elements["campo-trampa"];

  let enviando = false;
  let enviado = false;

  // --- Interruptor de prueba (no activa el formulario para el resto de visitantes) ---
  if (
    seccion &&
    seccion.dataset.estado === "inactivo" &&
    new URLSearchParams(window.location.search).get("formulario") === "prueba"
  ) {
    seccion.dataset.estado = "prueba";
  }

  // --- Selector de grupos sincronizado con la lista de grupos de la página ---
  const poblarGrupos = () => {
    document.querySelectorAll('#gruposTab [role="tab"]').forEach((pestana) => {
      const nombre = pestana.querySelector(".grupos-lista__name");
      if (!nombre) return;
      const texto = nombre.textContent.trim();
      const opcion = new Option(texto, texto);
      opcion.dataset.grupoId = pestana.getAttribute("aria-controls") || "";
      campos.grupo.append(opcion);
    });
  };

  const sincronizarGrupoId = () => {
    const opcion = campos.grupo.selectedOptions[0];
    grupoId.value = (opcion && opcion.dataset.grupoId) || "";
  };

  // --- Identificador único de solicitud ---
  const generarIdSolicitud = () => {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  };

  // --- Validación ---
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const TELEFONO = /^\+?[0-9][0-9\s()-]{6,19}$/;

  const validadores = {
    grupo: (campo) => (campo.value ? "" : "Selecciona el grupo que te interesa."),
    nombre: (campo) => {
      const palabras = campo.value.trim().split(/\s+/).filter((p) => p.length >= 2);
      return palabras.length >= 2 ? "" : "Escribe tu nombre completo (nombre y apellido).";
    },
    email: (campo) => {
      const valor = campo.value.trim();
      if (!valor) return "Escribe tu correo electrónico.";
      return EMAIL.test(valor) ? "" : "Escribe un correo válido, por ejemplo nombre@dominio.com.";
    },
    telefono: (campo) => {
      const valor = campo.value.trim();
      return !valor || TELEFONO.test(valor)
        ? ""
        : "Escribe un teléfono válido (números, espacios, + o guiones) o déjalo en blanco.";
    },
    mensaje: (campo) =>
      campo.value.length <= MAXIMO_MENSAJE
        ? ""
        : `El mensaje no puede superar ${MAXIMO_MENSAJE} caracteres.`,
    consentimiento: (campo) =>
      campo.checked ? "" : "Debes aceptar para poder enviar tu solicitud.",
  };

  const errorDe = (campo) => document.getElementById(`${campo.id}-error`);

  const mostrarError = (campo, mensaje) => {
    const contenedor = errorDe(campo);
    if (!contenedor) return;
    contenedor.textContent = mensaje;
    campo.classList.toggle("is-invalid", Boolean(mensaje));
    if (mensaje) {
      campo.setAttribute("aria-invalid", "true");
    } else {
      campo.removeAttribute("aria-invalid");
    }
  };

  const validarCampo = (clave) => {
    const mensaje = validadores[clave](campos[clave]);
    mostrarError(campos[clave], mensaje);
    return mensaje === "";
  };

  const validarTodo = () => {
    const invalidos = Object.keys(campos).filter((clave) => !validarCampo(clave));
    return invalidos.map((clave) => campos[clave]);
  };

  // --- Estado visual del envío ---
  const ocultarMensajes = () => {
    mensajeExito.hidden = true;
    mensajeError.hidden = true;
    mensajeIncierto.hidden = true;
    resumen.hidden = true;
  };

  const marcarEnviando = (activo) => {
    enviando = activo;
    form.setAttribute("aria-busy", String(activo));
    boton.setAttribute("aria-disabled", String(activo || enviado));
    textoBoton.textContent = activo ? "Enviando…" : enviado ? "Solicitud enviada" : textoOriginal;
  };

  const mostrarExito = () => {
    enviado = true;
    form.reset();
    grupoId.value = "";
    solicitudId.value = generarIdSolicitud(); // la siguiente solicitud será otra
    Object.values(campos).forEach((campo) => mostrarError(campo, ""));
    marcarEnviando(false);
    ocultarMensajes();
    mensajeExito.hidden = false;
    mensajeExito.focus();
  };

  const mostrarMensaje = (mensaje) => {
    marcarEnviando(false);
    ocultarMensajes();
    mensaje.hidden = false;
    mensaje.focus();
  };

  // --- Envío ---
  // Netlify añade su propio campo form-name al publicar; se evita enviarlo duplicado.
  const construirCuerpo = () => {
    sincronizarGrupoId();
    const parametros = new URLSearchParams();
    new FormData(form).forEach((valor, clave) => {
      if (clave === "form-name" && parametros.has(clave)) return;
      parametros.append(clave, valor);
    });
    return parametros.toString();
  };

  const enviar = async () => {
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);
    let respuesta;
    try {
      respuesta = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: construirCuerpo(),
        signal: controlador.signal,
      });
    } catch {
      // Sin respuesta: la solicitud pudo haber llegado o no. No se recomienda reenviar.
      mostrarMensaje(mensajeIncierto);
      return;
    } finally {
      clearTimeout(temporizador);
    }

    if (respuesta.ok) {
      mostrarExito();
    } else {
      mostrarMensaje(mensajeError); // el servidor respondió y no aceptó la solicitud
    }
  };

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (enviando || enviado) return; // evita envíos duplicados accidentales

    ocultarMensajes();
    const invalidos = validarTodo();
    if (invalidos.length > 0) {
      resumen.textContent =
        invalidos.length === 1
          ? "Revisa el campo marcado antes de enviar."
          : `Revisa los ${invalidos.length} campos marcados antes de enviar.`;
      resumen.hidden = false;
      invalidos[0].focus();
      return;
    }

    // Campo trampa lleno: es un robot. Se simula el éxito sin enviar nada.
    if (trampa && trampa.value) {
      mostrarExito();
      return;
    }

    marcarEnviando(true);
    enviar();
  });

  // Validación al salir de cada campo y corrección en vivo de los errores ya mostrados.
  Object.entries(campos).forEach(([clave, campo]) => {
    const revalidar = () => {
      if (campo.classList.contains("is-invalid")) validarCampo(clave);
    };
    campo.addEventListener("blur", () => {
      if (campo.type === "checkbox" || campo.value !== "" || campo.required) validarCampo(clave);
    });
    campo.addEventListener("input", () => {
      revalidar();
      if (enviado) {
        // Si la persona vuelve a editar, se habilita un nuevo envío.
        enviado = false;
        mensajeExito.hidden = true;
        marcarEnviando(false);
      }
    });
    campo.addEventListener("change", () => {
      revalidar();
      if (clave === "grupo") sincronizarGrupoId();
    });
  });

  poblarGrupos();
  solicitudId.value = generarIdSolicitud();
  form.noValidate = true; // la validación nativa solo se desactiva cuando este script está activo
})();
