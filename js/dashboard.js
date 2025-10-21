document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Fade-in del body
  window.addEventListener("load", () => document.body.classList.add("loaded"));

  // Loader iniziale
  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);
  setTimeout(() => loader.classList.add("hidden"), 1000);
  setTimeout(() => loader.remove(), 1800);

  // Logout e uscita
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

  console.log(`✅ Dashboard caricata: ${pageName}`);
});
