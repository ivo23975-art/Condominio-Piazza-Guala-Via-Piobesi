// /js/login.js  (versione DEMO - accesso libero in base al ruolo)
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = document.getElementById("role").value;
    if (!role) {
      alert("Seleziona un ruolo per accedere.");
      return;
    }

    // Mostra il loader per effetto visivo
    if (loader) loader.classList.remove("hidden");

    setTimeout(() => {
      if (loader) loader.classList.add("hidden");

      // Reindirizza in base al ruolo scelto (demo)
      let redirect = "";
      if (role === "condomino") redirect = "dashboards/dashboard-condomino.html";
      if (role === "admin-condominio") redirect = "dashboards/dashboard-admin-condominio.html";
      if (role === "admin-sito") redirect = "dashboards/dashboard-admin-sito.html";

      // Simula sessione
      localStorage.setItem("loggedUser", JSON.stringify({ username: "Demo", role }));
      window.location.href = redirect;
    }, 800); // breve delay per vedere il loader
  });
});
