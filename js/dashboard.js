document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) logoutBtn.addEventListener("click", () => window.location.href = "../login.html");

  const exitBtn = document.getElementById("exit-button");
  if (exitBtn) exitBtn.addEventListener("click", () => window.location.href = "../login.html");

  // Breadcrumb dinamico
  const path = window.location.pathname;
  let pageName = "Dashboard";
  if (path.includes("condomino")) pageName = "Area Condòmino";
  if (path.includes("admin-condominio")) pageName = "Amministratore Condominio";
  if (path.includes("admin-sito")) pageName = "Amministratore Sito";
  const breadcrumb = document.getElementById("breadcrumb-path");
  if (breadcrumb) breadcrumb.innerHTML = `/ ${pageName}`;

  // Loader effetto iniziale
  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);
  setTimeout(() => loader.classList.add("hidden"), 800);
  setTimeout(() => loader.remove(), 1600);

  console.log("✅ Dashboard funzionante");
});
