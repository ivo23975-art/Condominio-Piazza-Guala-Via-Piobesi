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
// ===============================
// 🔹 FASE 4 – Effetto comparsa pagina + card animate
// ===============================

// Quando la pagina è pronta, mostra transizione fade-in
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

// Aggiunge effetto di comparsa sequenziale alle card
document.querySelectorAll(".card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  setTimeout(() => {
    card.style.transition = "all 0.6s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 300 * (index + 1));
});
// ===== FIX: PUBBLICAZIONE AVVISI + UPLOAD FILE =====
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Gestione contenuti - PUBBLICAZIONE POST
  const publishBtn = document.getElementById("publishBtn");
  const postList = document.getElementById("postList");
  const postInput = document.getElementById("newPost");

  if (publishBtn && postInput && postList) {
    publishBtn.addEventListener("click", () => {
      const text = postInput.value.trim();
      if (!text) {
        alert("Scrivi qualcosa da pubblicare!");
        return;
      }

      const li = document.createElement("li");
      li.innerHTML = `<i data-lucide="message-square"></i> ${text}`;
      postList.prepend(li);
      lucide.createIcons();

      // salva localmente (persistenza)
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      posts.unshift(text);
      localStorage.setItem("posts", JSON.stringify(posts));

      postInput.value = "";
    });

    // Ricarica eventuali post salvati
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    saved.forEach(text => {
      const li = document.createElement("li");
      li.innerHTML = `<i data-lucide="message-square"></i> ${text}`;
      postList.appendChild(li);
    });
  }

  // Upload simulato documenti
  const uploadInput = document.getElementById("uploadFile");
  const fileList = document.getElementById("fileList");

  if (uploadInput && fileList) {
    uploadInput.addEventListener("change", e => {
      fileList.innerHTML = ""; // reset
      [...e.target.files].forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<i data-lucide="file"></i> ${file.name} <span style="color:#00a8ff;">(caricato con successo)</span>`;
        fileList.appendChild(li);
      });
      lucide.createIcons();
    });
  }
});
// ===============================
// ✅ FIX: Pubblicazione avvisi e caricamento file
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // === GESTIONE CONTENUTI E COMUNICAZIONI ===
  const publishBtn = document.getElementById("publishBtn");
  const postList = document.getElementById("postList");
  const newPost = document.getElementById("newPost");

  if (publishBtn && postList && newPost) {
    // Carica post salvati in locale
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    savedPosts.forEach(text => addPost(text));

    publishBtn.addEventListener("click", () => {
      const text = newPost.value.trim();
      if (!text) return alert("Scrivi un messaggio prima di pubblicare!");

      addPost(text);

      // Salvataggio locale
      savedPosts.unshift(text);
      localStorage.setItem("posts", JSON.stringify(savedPosts));

      newPost.value = "";
    });

    function addPost(text) {
      const li = document.createElement("li");
      li.innerHTML = `<i data-lucide="message-square"></i> ${text}`;
      li.style.padding = "8px";
      li.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
      postList.prepend(li);
      lucide.createIcons();
    }
  }

  // === UPLOAD FILE ===
  const uploadInput = document.getElementById("uploadFile");
  const fileList = document.getElementById("fileList");

  if (uploadInput && fileList) {
    uploadInput.addEventListener("change", (e) => {
      fileList.innerHTML = ""; // reset elenco

      Array.from(e.target.files).forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<i data-lucide="file"></i> ${file.name} <span style="color:#00a8ff;">(caricato con successo)</span>`;
        li.style.padding = "6px";
        fileList.appendChild(li);
      });

      lucide.createIcons();
    });
  }
});






