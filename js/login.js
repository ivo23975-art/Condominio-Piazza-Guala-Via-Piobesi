// ===========================================
// 🔐 LOGIN DEMO FLUIDO – ACCESSO SENZA PASSWORD
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  // Effetto toast
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "25px";
    toast.style.right = "25px";
    toast.style.background = "linear-gradient(90deg,#00a8ff,#0074d9)";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "8px";
    toast.style.fontWeight = "bold";
    toast.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s, transform 0.4s";
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(-5px)";
    });
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 600);
    }, 3000);
  }

  // Evento submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim() || "Utente Demo";
    const role = document.getElementById("role").value;

    if (!role) {
      showToast("⚠️ Seleziona un ruolo per accedere");
      return;
    }

    // Mostra il loader per effetto visivo
    loader.classList.remove("hidden");

    setTimeout(() => {
      loader.classList.add("hidden");

      // Salva utente demo in localStorage
      localStorage.setItem("loggedUser", JSON.stringify({ username, role }));

      // Mostra messaggio di accesso
      showToast(`✅ Accesso come ${role.replace("-", " ")}`);

      // Reindirizza in base al ruolo scelto
      let redirect = "";
      if (role === "condomino") redirect = "dashboards/dashboard-condomino.html";
      if (role === "admin-condominio") redirect = "dashboards/dashboard-admin-condominio.html";
      if (role === "admin-sito") redirect = "dashboards/dashboard-admin-sito.html";

      setTimeout(() => (window.location.href = redirect), 1000);
    }, 1200);
  });
});
