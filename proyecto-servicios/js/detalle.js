const contenedor = document.getElementById("detalle");

function cargarDetalle() {
  Promise.all([
    fetch("data/servicios.json").then(res => res.json()),
    JSON.parse(localStorage.getItem("extra")) || []
  ])
  .then(([base, extra]) => {
    const servicios = [...base, ...extra];

    const id = localStorage.getItem("detalle");
    const servicio = servicios.find(s => s.id == id);

    if (!servicio) {
      contenedor.innerHTML = "<p>Servicio no encontrado</p>";
      return;
    }

    contenedor.innerHTML = `
      <div class="card shadow">
        <img src="${servicio.imagen}" class="card-img-top">
        <div class="card-body">
          <h2>${servicio.nombre}</h2>
          <p>${servicio.detalle}</p>
          <button class="btn btn-secondary" onclick="volver()">Volver</button>
        </div>
      </div>
    `;
  });
}

function volver() {
  window.location.href = "servicios.html";
}

cargarDetalle();