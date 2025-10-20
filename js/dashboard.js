document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    window.location.href = "../login.html";
  });
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

