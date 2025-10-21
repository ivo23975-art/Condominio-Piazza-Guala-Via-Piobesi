document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const user = users.find(
      (u) => u.username === username && u.password === password && u.role === role
    );

    if (!user) {
      alert("❌ Credenziali o ruolo non validi. Riprova.");
      return;
    }

    loader.classList.remove("hidden");

    setTimeout(() => {
      localStorage.setItem("loggedUser", JSON.stringify(user));

      switch (user.role) {
        case "condomino":
          window.location.href = "./dashboards/dashboard-condomino.html";
          break;
        case "admin-condominio":
          window.location.href = "./dashboards/dashboard-admin-condominio.html";
          break;
        case "admin-sito":
          window.location.href = "./dashboards/dashboard-admin-sito.html";
          break;
      }
    }, 1200);
  });
});

