// ==============================
// 🔐 LOGIN DEMO FUNZIONANTE
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Inizializza icone
  if (window.lucide) lucide.createIcons();

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  // Funzione toast
  const showToast = (msg) => {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      background: "linear-gradient(90deg,#00a8ff,#0074d9)",
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "bold",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      opacity: "0",
      transform: "translateY(20px)",
      transition: "all 0.4s ease",
      zIndex: 9999
    });
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 50);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => toast.remove(), 600);
    }, 3000);
  };

  // Gestione form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim() || "Demo";
    const role = document.getElementById("role").value;

    if (!role) {
      showToast("⚠️ Seleziona un ruolo per accedere");
      return;
    }

    // Mostra loader
    loader.classList.remove("hidden");

    // Effetto di caricamento
    setTimeout(() => {
      loader.classList.add("hidden");

      // Salva utente nel localStorage
      localStorage.setItem("loggedUser", JSON.stringify({ username, role }));

      // Mostra messaggio e reindirizza
      showToast(`✅ Accesso effettuato come ${role.replace("-", " ")}`);

      let redirect = "";
      if (role === "condomino") redirect = "dashboards/dashboard-condomino.html";
      if (role === "admin-condominio") redirect = "dashboards/dashboard-admin-condominio.html";
      if (role === "admin-sito") redirect = "dashboards/dashboard-admin-sito.html";

      setTimeout(() => {
        window.location.href = redirect;
      }, 1000);
    }, 1200);
  });
});
