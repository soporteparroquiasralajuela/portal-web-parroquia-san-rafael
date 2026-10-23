// Visor ampliado de la galería de Parroquia. Usa el Modal de Bootstrap (ya cargado en la
// página), que aporta el cierre con Escape, el bloqueo del desplazamiento y la trampa de
// foco; aquí solo se añade la navegación entre las fotografías y la gestión del foco.
(() => {
  const visor = document.getElementById("parroquiaVisor");
  const miniaturas = [...document.querySelectorAll("[data-visor-src]")];
  if (!visor || !window.bootstrap || miniaturas.length === 0) return;

  const modal = bootstrap.Modal.getOrCreateInstance(visor);
  const imagen = visor.querySelector("[data-visor-img]");
  const leyenda = visor.querySelector("[data-visor-leyenda]");
  const contador = visor.querySelector("[data-visor-contador]");
  const estado = visor.querySelector("[data-visor-estado]");
  const total = miniaturas.length;

  let actual = 0;
  let origen = null;

  const mostrar = (indice) => {
    actual = (indice + total) % total;
    const { dataset } = miniaturas[actual];
    const titulo = dataset.visorTitulo;

    imagen.sizes = "(min-width: 992px) 85vw, 100vw";
    imagen.srcset = dataset.visorSrcset;
    imagen.src = dataset.visorSrc;
    imagen.width = Number(dataset.visorAncho);
    imagen.height = Number(dataset.visorAlto);
    imagen.alt = miniaturas[actual].querySelector("img").alt;

    leyenda.textContent = titulo;
    contador.textContent = `${actual + 1} de ${total}`;
    estado.textContent = `Fotografía ${actual + 1} de ${total}: ${titulo}`;
  };

  miniaturas.forEach((boton, indice) => {
    boton.addEventListener("click", () => {
      origen = boton;
      mostrar(indice);
      modal.show();
    });
  });

  visor.querySelector("[data-visor-anterior]").addEventListener("click", () => mostrar(actual - 1));
  visor.querySelector("[data-visor-siguiente]").addEventListener("click", () => mostrar(actual + 1));

  visor.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      mostrar(actual - 1);
    } else if (evento.key === "ArrowRight") {
      evento.preventDefault();
      mostrar(actual + 1);
    }
  });

  // Al cerrar, el foco vuelve a la miniatura desde la que se abrió el visor.
  visor.addEventListener("hidden.bs.modal", () => {
    origen?.focus();
  });
})();
