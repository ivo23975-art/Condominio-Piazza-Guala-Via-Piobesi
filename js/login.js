document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    // Mostra loader
    loader.classList.remove("hidden");

    setTimeout(() => {
      loader.classList.add("hidden");

      // Controllo credenziali
      let redirect = "";
      if (username === "condomino1" && password === "condominio123" && role === "condomino") {
        redirect = "dashboards/dashboard-condomino.html";
      } 
      else if (username === "admincondominio" && password === "gestione2025" && role === "admin-condominio") {
        redirect = "dashboards/dashboard-admin-condominio.html";
      } 
      else if (username === "adminsito" && password === "webcontrol2025" && role === "admin-sito") {
        redirect = "dashboards/dashboard-admin-sito.html";
      } 
      else {
        alert("❌ Credenziali non valide. Controlla utente, ruolo e password.");
        return;
      }

      // Salva sessione
      localStorage.setItem("loggedUser", JSON.stringify({ username, role }));
      window.location.href = redirect;
    }, 800);
  });
});

