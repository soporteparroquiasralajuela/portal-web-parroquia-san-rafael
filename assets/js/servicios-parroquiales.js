// Formularios preliminares de la página Servicios parroquiales (fase de maquetación).
//
// - Esta fase NO envía nada: no hay integración con correo, almacenamiento de archivos ni pagos. Los formularios
//   (.solicitud-form) no tienen acción; el script valida los campos en el navegador y, como el envío aún no
//   existe, informa que la solicitud no se envió.
// - La ventana emergente «¡Solicitud recibida!» (#solicitudRecibida) solo se abre cuando enviarSolicitud()
//   confirma un envío exitoso. Si el envío falla o no está habilitado, nunca se muestra.
// - Para integrar el envío real basta sustituir enviarSolicitud(): debe resolverse únicamente cuando el servidor
//   confirme la recepción y rechazarse en cualquier otro caso. El resto del flujo no cambia.
// - Campos condicionales: un bloque con data-visible-si="campo=valor" solo se muestra (y sus controles solo se
//   habilitan y validan) cuando ese campo del formulario tiene ese valor; con data-anuncio-en="id" su mensaje
//   también se anuncia a los lectores de pantalla en la región indicada. Los límites de fecha y año se calculan
//   al cargar (data-max-hoy y data-max-anio-actual).
// - Ayuda de revisión visual: abrir la página con «?vista-previa=confirmacion» muestra la ventana emergente sin
//   enviar nada. Retirar esa ayuda (constante PARAMETRO_VISTA_PREVIA y su uso) al activar el envío real.
(() => {
  const formularios = document.querySelectorAll(".solicitud-form");
  const modalElemento = document.getElementById("solicitudRecibida");
  if (!formularios.length) return;

  const PARAMETRO_VISTA_PREVIA = "vista-previa";
  const MINIMO_DIGITOS_TELEFONO = 8;
  const ANIO_MINIMO = 1900;
  const ANIO_ACTUAL = new Date().getFullYear();
  const MENSAJE_RESUMEN = "Revisá los campos marcados antes de enviar la solicitud.";
  const MENSAJE_ENVIO_NO_HABILITADO =
    "El envío de solicitudes en línea todavía no está habilitado, por lo que esta solicitud no fue enviada. Podés comunicarte con la oficina parroquial para realizarla.";

  // Punto de integración del envío real (ver el comentario inicial).
  const enviarSolicitud = () => Promise.reject(new Error("envio-no-habilitado"));

  const mensajeDeError = (campo) => {
    const validez = campo.validity;
    if (campo.type === "checkbox") return "Debés aceptar para continuar.";
    if (validez.valueMissing) return campo.tagName === "SELECT" ? "Seleccioná una opción." : "Este campo es obligatorio.";
    if (validez.rangeUnderflow || validez.rangeOverflow || validez.badInput) {
      return campo.type === "date"
        ? "Ingresá una fecha válida que no sea futura."
        : `Ingresá un año válido, entre ${ANIO_MINIMO} y ${ANIO_ACTUAL}.`;
    }
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

  // Fija los límites que dependen de la fecha actual (nacimiento: hasta hoy; año de confirmación: hasta este año).
  const aplicarLimitesDinamicos = () => {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    document.querySelectorAll("[data-max-hoy]").forEach((campo) => campo.setAttribute("max", `${ANIO_ACTUAL}-${mes}-${dia}`));
    document.querySelectorAll("[data-max-anio-actual]").forEach((campo) => campo.setAttribute("max", String(ANIO_ACTUAL)));
  };

  // Muestra u oculta los bloques condicionales según el valor del campo del que dependen. Los controles de un
  // bloque oculto se deshabilitan: no se validan ni se incluyen en los datos.
  const actualizarCondicionales = (formulario) => {
    formulario.querySelectorAll("[data-visible-si]").forEach((bloque) => {
      const [nombre, valor] = bloque.dataset.visibleSi.split("=");
      const campo = formulario.elements[nombre];
      const visible = Boolean(campo) && campo.value === valor;
      const cambio = bloque.hidden === visible;
      bloque.hidden = !visible;
      bloque.querySelectorAll("input, select, textarea").forEach((control) => {
        control.disabled = !visible;
        if (!visible) marcarCampo(control, false);
      });
      const anuncio = document.getElementById(bloque.dataset.anuncioEn);
      if (anuncio && cambio) anuncio.textContent = visible ? bloque.querySelector("p:last-child").textContent.trim() : "";
    });
  };

  const abrirConfirmacion = () => {
    if (modalElemento && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalElemento).show();
  };

  const prepararFormulario = (formulario) => {
    const resumen = formulario.querySelector(".solicitud-form__resumen");
    const estado = formulario.querySelector(".solicitud-form__estado");
    const boton = formulario.querySelector('button[type="submit"]');
    const controlesNombrados = [...formulario.elements].filter((el) => el.name);
    // Se evalúan al enviar: los campos condicionales pueden haberse habilitado después de cargar la página.
    const controlesValidables = () => controlesNombrados.filter((el) => el.willValidate);

    const ocultarEstado = () => {
      estado.hidden = true;
      estado.querySelector("span").textContent = "";
    };

    // Al corregir un campo se limpia su error, sin esperar al siguiente envío.
    controlesNombrados.forEach((campo) => {
      campo.addEventListener("input", () => {
        if (campo.classList.contains("is-invalid")) marcarCampo(campo, esInvalido(campo));
      });
      campo.addEventListener("change", () => {
        if (campo.classList.contains("is-invalid")) marcarCampo(campo, esInvalido(campo));
      });
    });

    formulario.addEventListener("change", () => actualizarCondicionales(formulario));
    formulario.addEventListener("reset", () => setTimeout(() => actualizarCondicionales(formulario)));
    actualizarCondicionales(formulario);

    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      ocultarEstado();

      const invalidos = controlesValidables().filter((campo) => {
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

  aplicarLimitesDinamicos();
  formularios.forEach(prepararFormulario);

  if (new URLSearchParams(window.location.search).get(PARAMETRO_VISTA_PREVIA) === "confirmacion") {
    abrirConfirmacion();
  }
})();
