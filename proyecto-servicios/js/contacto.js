document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || email === "" || mensaje === "") {
    alert("⚠️ Todos los campos son obligatorios");
    return;
  }

  if (!validarEmail(email)) {
    alert("❌ Email inválido");
    return;
  }

  alert("✅ Mensaje enviado correctamente");

  this.reset();
});

// Validación regex PRO
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}