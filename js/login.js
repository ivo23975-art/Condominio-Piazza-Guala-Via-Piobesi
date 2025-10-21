document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const form = document.getElementById("loginForm");
  const loader = document.getElementById("loader");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    loader.classList.remove("hidden");

    setTimeout(() => {
      const role = document.getElementById("role").value;

      switch (role) {
        case "condomino":
          window.location.href = "./dashboards/dashboard-condomino.html";
          break;
        case "admin-condominio":
          window.location.href = "./dashboards/dashboard-admin-condominio.html";
          break;
        case "admin-sito":
          window.location.href = "./dashboards/dashboard-admin-sito.html";
          break;
        default:
          alert("Seleziona un ruolo valido!");
          loader.classList.add("hidden");
      }
    }, 1000);
  });
});
