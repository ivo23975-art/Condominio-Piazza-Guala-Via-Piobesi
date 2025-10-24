document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Dashboard attiva e stile caricato");

  // Fade-in all’avvio
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });

  // Inizializza icone
  if (window.lucide) {
    lucide.createIcons();
  } else {
    console.warn("⚠️ Lucide non caricato");
  }

  // Logout
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
    else if (path.includes("admin-condominio")) breadcrumb.textContent = "/ Amministratore Condominio";
    else if (path.includes("admin-sito")) breadcrumb.textContent = "/ Amministratore Sito";
  }

  // Backup simulato
  const backupBtn = document.getElementById("backupBtn");
  const progress = document.querySelector(".progress");
  const statusText = document.querySelector(".status");
  if (backupBtn && progress) {
    backupBtn.addEventListener("click", () => {
      progress.style.width = "0%";
      let percent = 0;
      const interval = setInterval(() => {
        percent += 10;
        progress.style.width = percent + "%";
        if (statusText) statusText.textContent = `Backup al ${percent}%`;
        if (percent >= 100) {
          clearInterval(interval);
          showToast("✅ Backup completato con successo!");
          if (statusText) statusText.textContent = "Backup completato ✅";
        }
      }, 300);
    });
  }

  // Toast animato
  function showToast(msg) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Loader d’ingresso
  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);
  setTimeout(() => loader.classList.add("hidden"), 1200);
  setTimeout(() => loader.remove(), 1800);
});
