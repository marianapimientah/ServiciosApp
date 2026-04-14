/* =========================
   MAIN JS - GLOBAL APP
========================= */

// Cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  activarNav();
  console.log("🚀 App iniciada correctamente");
});

/* =========================
   NAV ACTIVA
========================= */
function activarNav() {
  const links = document.querySelectorAll(".nav-link");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (href === current) {
      link.classList.add("fw-bold", "text-primary");
    }
  });
}

/* =========================
   ALERTAS PRO (reemplazo alert)
========================= */
function mostrarAlerta(mensaje, tipo = "success") {

  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} position-fixed top-0 end-0 m-3 shadow`;
  alerta.style.zIndex = "9999";
  alerta.innerText = mensaje;

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 2500);
}

/* =========================
   LOCAL STORAGE HELPERS
========================= */

// Obtener
function getLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Guardar
function setLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* =========================
   DEBUG (opcional)
========================= */
function limpiarStorage() {
  localStorage.clear();
  mostrarAlerta("Storage limpiado", "warning");
}