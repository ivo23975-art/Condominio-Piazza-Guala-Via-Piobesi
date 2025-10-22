document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Fade-in e loader
  window.addEventListener("load", () => document.body.classList.add("loaded"));
  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);
  setTimeout(() => loader.classList.add("hidden"), 1000);
  setTimeout(() => loader.remove(), 1800);

  // Logout / Exit
  const logoutBtn = document.getElementById("logout");
  const exitBtn = document.getElementById("exit-button");
  [logoutBtn, exitBtn].forEach(btn => {
    if (btn) btn.addEventListener("click", () => {
      localStorage.removeItem("loggedUser");
      window.location.href = "../login.html";
    });
  });

  // Breadcrumb dinamico
  const path = window.location.pathname;
  let pageName = "Dashboard";
  if (path.includes("condomino")) pageName = "Area Condòmino";
  if (path.includes("admin-condominio")) pageName = "Amministratore Condominio";
  if (path.includes("admin-sito")) pageName = "Amministratore Sito";
  const breadcrumb = document.getElementById("breadcrumb-path");
  if (breadcrumb) breadcrumb.textContent = `/ ${pageName}`;

  // Toast
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => toast.classList.remove("show"), 3000);
    setTimeout(() => toast.remove(), 3500);
  }

  // Sidebar (solo admin)
  if (document.body.classList.contains("admin-condominio") || document.body.classList.contains("admin-sito")) {
    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";
    sidebar.innerHTML = `
      <i data-lucide="home"></i>
      <i data-lucide="users"></i>
      <i data-lucide="file-text"></i>
      <i data-lucide="bell-ring"></i>
      <i data-lucide="settings"></i>
    `;
    document.body.appendChild(sidebar);
    lucide.createIcons();
  }

  // Backup simulato
  const backupBtn = document.getElementById("backupBtn");
  const progress = document.querySelector(".progress");
  const backupStatus = document.getElementById("backupStatus");
  if (backupBtn && progress && backupStatus) {
    backupBtn.addEventListener("click", () => {
      let val = 0;
      backupBtn.disabled = true;
      progress.style.width = "0%";
      backupStatus.textContent = "🔄 Backup in corso...";
      showToast("💾 Backup avviato...");

      const timer = setInterval(() => {
        val += 5;
        progress.style.width = `${val}%`;

        if (val >= 100) {
          clearInterval(timer);
          backupStatus.textContent = "✅ Backup completato con successo!";
          showToast("✅ Backup completato!");
          backupBtn.disabled = false;
        }
      }, 150);
    });
  }

  console.log("✅ Dashboard v2.2 operativa");
});
