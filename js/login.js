document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();

    if (!role) {
      alert("⚠️ Seleziona un ruolo per accedere.");
      return;
    }

    // Mostra loader
    loader.classList.remove("hidden");

    setTimeout(() => {
      loader.classList.add("hidden");

      // Login demo: nessuna password richiesta
      localStorage.setItem("loggedUser", JSON.stringify({ username, role }));

      let redirect = "";
      switch (role) {
        case "condomino":
          redirect = "./dashboards/dashboard-condomino.html";
          break;
        case "admin-condominio":
          redirect = "./dashboards/dashboard-admin-condominio.html";
          break;
        case "admin-sito":
          redirect = "./dashboards/dashboard-admin-sito.html";
          break;
        default:
          redirect = "./login.html";
      }

      console.log(`✅ Accesso effettuato come ${role}`);
      window.location.href = redirect;
    }, 1000);
  });
});
