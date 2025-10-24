// ✅ Inizializzazione icone Lucide
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
    console.log("✅ Lucide caricato correttamente");
  } else {
    console.error("❌ Errore: Lucide non disponibile");
  }
});

// ✅ Gestione del login
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ login.js attivo");

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value.trim();

    if (!username || !role || !password) {
      alert("⚠️ Compila tutti i campi per accedere.");
      return;
    }

    loader.classList.remove("hidden");

    // Simulazione autenticazione (solo client-side)
    setTimeout(() => {
      loader.classList.add("hidden");

      // Salvataggio dati base utente
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ username, role })
      );

      // Redirect in base al ruolo
      let redirect = "";
      switch (role) {
        case "condomino":
          redirect = "dashboards/dashboard-condomino.html";
          break;
        case "admin-condominio":
          redirect = "dashboards/dashboard-admin-condominio.html";
          break;
        case "admin-sito":
          redirect = "dashboards/dashboard-admin-sito.html";
          break;
        default:
          alert("Ruolo non riconosciuto.");
          return;
      }

      console.log(`➡️ Accesso effettuato come ${role}`);
      window.location.href = redirect;
    }, 1000);
  });
});
