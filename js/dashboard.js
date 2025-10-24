document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Dashboard attiva");

  // Icone Lucide
  if (window.lucide) lucide.createIcons();

  // Gestione logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      window.location.href = "../login.html";
    });
  }

  // Breadcrumb dinamico
  const path = window.location.pathname;
  const breadcrumb = document.getElementById("breadcrumb-path");
  if (breadcrumb) {
    if (path.includes("condomino")) breadcrumb.textContent = "/ Area Condòmino";
    if (path.includes("admin-condominio")) breadcrumb.textContent = "/ Amministratore Condominio";
    if (path.includes("admin-sito")) breadcrumb.textContent = "/ Amministratore Sito";
  }

  // Backup demo per admin sito
  const backupBtn = document.getElementById("backupBtn");
  const progress = document.querySelector(".progress");
  if (backupBtn && progress) {
    backupBtn.addEventListener("click", () => {
      let width = 0;
      const interval = setInterval(() => {
        width += 5;
        progress.style.width = `${width}%`;
        if (width >= 100) clearInterval(interval);
      }, 100);
    });
  }

  // Statistiche demo
  const chartEl = document.getElementById("statsChart");
  if (chartEl) {
    new Chart(chartEl, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
        datasets: [{
          label: "Accessi al Portale",
          data: [5, 10, 8, 15, 20, 13, 18],
          borderColor: "#0074d9",
          fill: false,
          tension: 0.3
        }]
      }
    });
  }
});
