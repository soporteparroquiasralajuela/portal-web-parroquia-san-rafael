// En pantallas menores a 992px la ficha queda debajo de la lista: al elegir un
// grupo con puntero o toque se lleva al usuario hasta ella. Con teclado no se
// desplaza la página, para no alejar el foco de la lista de grupos.
(() => {
  const gruposTabs = document.getElementById("gruposTab");
  if (!gruposTabs) return;

  const isStacked = window.matchMedia("(max-width: 991.98px)");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let selectedWithKeyboard = false;

  gruposTabs.addEventListener("keydown", () => {
    selectedWithKeyboard = true;
  });

  gruposTabs.addEventListener("pointerdown", () => {
    selectedWithKeyboard = false;
  });

  gruposTabs.addEventListener("shown.bs.tab", (event) => {
    if (!isStacked.matches || selectedWithKeyboard) return;

    const ficha = document.querySelector(event.target.dataset.bsTarget);
    ficha?.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
  });
})();
