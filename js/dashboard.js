document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    window.location.href = "../login.html";
  });
});
// ===============================
// 🔹 LOADER ANIMATO INIZIALE
// ===============================
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.className = "loader-overlay";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);

  // Mostra per un attimo l'effetto
  setTimeout(() => loader.classList.add("hidden"), 1000);
  setTimeout(() => loader.remove(), 1800);
});
// ===============================
// 🔹 SEZIONE: Modale dinamica + simulazioni
// ===============================

// Crea un effetto interattivo sui pulsanti
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button, a.btn, a.button");
  buttons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const action = btn.textContent.trim();
      showModal(`Hai selezionato: <strong>${action}</strong><br>Simulazione in corso...`);
    });
  });

  // Crea la finestra modale
  const modal = document.createElement("div");
  modal.classList.add("modal-overlay");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <div id="modal-body"></div>
    </div>`;
  document.body.appendChild(modal);

  modal.querySelector(".modal-close").onclick = () => modal.classList.remove("active");

  function showModal(content) {
    document.getElementById("modal-body").innerHTML = content;
    modal.classList.add("active");
    setTimeout(() => modal.classList.remove("active"), 3500);
  }
});
// ===============================
// 🔹 SEZIONE NAVIGAZIONE DINAMICA
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  // Mostra breadcrumb dinamico in base alla pagina
  const path = window.location.pathname;
  let pageName = "Dashboard";

  if (path.includes("condomino")) pageName = "Area Condòmino";
  if (path.includes("admin-condominio")) pageName = "Amministratore Condominio";
  if (path.includes("admin-sito")) pageName = "Amministratore Sito";

  const breadcrumb = document.getElementById("breadcrumb-path");
  if (breadcrumb) breadcrumb.innerHTML = `/ ${pageName}`;

  // Pulsante Esci → torna al login
  const exitBtn = document.getElementById("exit-button");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      window.location.href = "../login.html";
    });
  }
});



