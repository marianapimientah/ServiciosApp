const contenedor = document.getElementById("favoritos");

function cargarFavoritos() {
  Promise.all([
    fetch("data/servicios.json").then(res => res.json()),
    JSON.parse(localStorage.getItem("extra")) || []
  ])
  .then(([base, extra]) => {
    const servicios = [...base, ...extra];

    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

    const favoritos = servicios.filter(s => favs.includes(s.id));

    contenedor.innerHTML = "";

    if (favoritos.length === 0) {
      contenedor.innerHTML = "<p>No tienes favoritos aún</p>";
      return;
    }

    favoritos.forEach(s => {
      contenedor.innerHTML += `
        <div class="card mb-3 p-3 shadow">
          <h5>${s.nombre}</h5>
          <button class="btn btn-danger btn-sm" onclick="quitarFavorito(${s.id})">
            Quitar
          </button>
        </div>
      `;
    });
  });
}

function quitarFavorito(id) {
  let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

  favs = favs.filter(f => f !== id);

  localStorage.setItem("favoritos", JSON.stringify(favs));

  cargarFavoritos();
}

cargarFavoritos();