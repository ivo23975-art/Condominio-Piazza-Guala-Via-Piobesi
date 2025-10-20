document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const tipo = document.getElementById("login-type").value;
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "" || pass === "" || tipo === "") {
    alert("Compila tutti i campi per accedere.");
    return;
  }

  // Simulazione login base (in futuro: backend o JSON)
  switch (tipo) {
    case "condomino":
      window.location.href = "dashboards/dashboard-condomino.html";
      break;
    case "admin-condominio":
      window.location.href = "dashboards/dashboard-admin-condominio.html";
      break;
    case "admin-sito":
      window.location.href = "dashboards/dashboard-admin-sito.html";
      break;
  }
});
