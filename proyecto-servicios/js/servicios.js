const contenedor = document.getElementById("contenedor-servicios");

// Cargar servicios
function cargarServicios() {
  Promise.all([
    fetch("data/servicios.json").then(res => res.json()),
    JSON.parse(localStorage.getItem("extra")) || []
  ])
  .then(([base, extra]) => {
    const servicios = [...base, ...extra];
    renderServicios(servicios);
  });
}

function renderServicios(servicios) {
  contenedor.innerHTML = "";

  servicios.forEach(servicio => {
    contenedor.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card shadow">
          <img src="${servicio.imagen}" class="card-img-top">
          <div class="card-body">
            <h5>${servicio.nombre}</h5>
            <p>${servicio.descripcion}</p>

            <button class="btn btn-primary btn-sm" onclick="verDetalle(${servicio.id})">
              Ver más
            </button>

            <button class="btn btn-outline-danger btn-sm" onclick="toggleFavorito(${servicio.id})">
              ❤️
            </button>

            ${servicio.extra ? `<button class="btn btn-danger btn-sm" onclick="eliminarServicio(${servicio.id})">Eliminar</button>` : ""}
          </div>
        </div>
      </div>
    `;
  });
}

// Ver detalle
function verDetalle(id) {
  localStorage.setItem("detalle", id);
  window.location.href = "detalle.html";
}

// Favoritos
function toggleFavorito(id) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    alert("❌ Eliminado de favoritos");
  } else {
    favs.push(id);
    alert("❤️ Añadido a favoritos");
  }

  localStorage.setItem("favoritos", JSON.stringify(favs));
}

// Crear servicio (CRUD)
function crearServicio() {
  const input = document.getElementById("nuevoServicio");
  const nombre = input.value.trim();

  if (nombre === "") {
    alert("⚠️ Escribe un nombre");
    return;
  }

  let serviciosExtra = JSON.parse(localStorage.getItem("extra")) || [];

  const nuevo = {
    id: Date.now(),
    nombre: nombre,
    descripcion: "Servicio creado por el usuario",
    detalle: "Este servicio fue agregado dinámicamente",
    imagen: "https://via.placeholder.com/300",
    extra: true
  };

  serviciosExtra.push(nuevo);

  localStorage.setItem("extra", JSON.stringify(serviciosExtra));

  input.value = "";
  cargarServicios();
}

// Eliminar servicio
function eliminarServicio(id) {
  let serviciosExtra = JSON.parse(localStorage.getItem("extra")) || [];

  serviciosExtra = serviciosExtra.filter(s => s.id !== id);

  localStorage.setItem("extra", JSON.stringify(serviciosExtra));

  cargarServicios();
}

// INIT
cargarServicios();