// Formularios preliminares de la página Servicios parroquiales (fase de maquetación).
//
// - Esta fase NO envía nada: no hay integración con correo, almacenamiento de archivos ni pagos. Los formularios
//   (.solicitud-form) no tienen acción; el script valida los campos en el navegador y, como el envío aún no
//   existe, informa que la solicitud no se envió.
// - La ventana emergente «¡Solicitud recibida!» (#solicitudRecibida) solo se abre cuando enviarSolicitud()
//   confirma un envío exitoso. Si el envío falla o no está habilitado, nunca se muestra.
// - Para integrar el envío real basta sustituir enviarSolicitud(): debe resolverse únicamente cuando el servidor
//   confirme la recepción y rechazarse en cualquier otro caso. El resto del flujo no cambia.
// - Ayuda de revisión visual: abrir la página con «?vista-previa=confirmacion» muestra la ventana emergente sin
//   enviar nada. Retirar esa ayuda (constante PARAMETRO_VISTA_PREVIA y su uso) al activar el envío real.
(() => {
  const formularios = document.querySelectorAll(".solicitud-form");
  const modalElemento = document.getElementById("solicitudRecibida");
  if (!formularios.length) return;

  const PARAMETRO_VISTA_PREVIA = "vista-previa";
  const MINIMO_DIGITOS_TELEFONO = 8;
  const MENSAJE_RESUMEN = "Revisá los campos marcados antes de enviar la solicitud.";
  const MENSAJE_ENVIO_NO_HABILITADO =
    "Esta es una versión de revisión: el envío en línea todavía no está habilitado, por lo que la solicitud no fue enviada.";

  // Punto de integración del envío real (ver el comentario inicial).
  const enviarSolicitud = () => Promise.reject(new Error("envio-no-habilitado"));

  const mensajeDeError = (campo) => {
    const validez = campo.validity;
    if (campo.type === "checkbox") return "Debés aceptar para continuar.";
    if (validez.valueMissing) return "Este campo es obligatorio.";
    if (validez.typeMismatch && campo.type === "email") return "Ingresá un correo electrónico válido.";
    if (campo.type === "tel" && campo.value.replace(/\D/g, "").length < MINIMO_DIGITOS_TELEFONO) {
      return "Ingresá un número de teléfono válido.";
    }
    return "Revisá este campo.";
  };

  const esInvalido = (campo) => {
    if (!campo.checkValidity()) return true;
    return campo.type === "tel" && campo.value.trim() !== "" && campo.value.replace(/\D/g, "").length < MINIMO_DIGITOS_TELEFONO;
  };

  const marcarCampo = (campo, invalido) => {
    const mensaje = document.getElementById(`${campo.id}-error`);
    campo.classList.toggle("is-invalid", invalido);
    if (invalido) {
      campo.setAttribute("aria-invalid", "true");
    } else {
      campo.removeAttribute("aria-invalid");
    }
    if (mensaje) mensaje.textContent = invalido ? mensajeDeError(campo) : "";
  };

  const abrirConfirmacion = () => {
    if (modalElemento && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalElemento).show();
  };

  const prepararFormulario = (formulario) => {
    const resumen = formulario.querySelector(".solicitud-form__resumen");
    const estado = formulario.querySelector(".solicitud-form__estado");
    const boton = formulario.querySelector('button[type="submit"]');
    const controles = [...formulario.elements].filter((el) => el.willValidate && el.name);

    const ocultarEstado = () => {
      estado.hidden = true;
      estado.querySelector("span").textContent = "";
    };

    // Al corregir un campo se limpia su error, sin esperar al siguiente envío.
    controles.forEach((campo) => {
      campo.addEventListener("input", () => {
        if (campo.classList.contains("is-invalid")) marcarCampo(campo, esInvalido(campo));
      });
      campo.addEventListener("change", () => {
        if (campo.classList.contains("is-invalid")) marcarCampo(campo, esInvalido(campo));
      });
    });

    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      ocultarEstado();

      const invalidos = controles.filter((campo) => {
        const invalido = esInvalido(campo);
        marcarCampo(campo, invalido);
        return invalido;
      });

      resumen.hidden = invalidos.length === 0;
      resumen.textContent = invalidos.length ? MENSAJE_RESUMEN : "";
      if (invalidos.length) {
        invalidos[0].focus();
        return;
      }

      boton.disabled = true;
      try {
        await enviarSolicitud(new FormData(formulario));
      } catch (error) {
        boton.disabled = false;
        estado.querySelector("span").textContent = MENSAJE_ENVIO_NO_HABILITADO;
        estado.hidden = false;
        return;
      }
      boton.disabled = false;
      formulario.reset();
      abrirConfirmacion();
    });
  };

  formularios.forEach(prepararFormulario);

  if (new URLSearchParams(window.location.search).get(PARAMETRO_VISTA_PREVIA) === "confirmacion") {
    abrirConfirmacion();
  }
})();
