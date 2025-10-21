// ==============================
// 🧠 CONTROLLO LOGIN
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");

  if (!loggedUser) {
    window.location.href = "../login.html";
    return;
  }

  console.log(`👤 Utente autenticato: ${loggedUser.username} (${loggedUser.role})`);
});

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Fade-in page
  window.addEventListener("load", () => document.body.classList.add("loaded"));

  // Logout / Exit
  const logoutBtn = document.getElementById("logout");
  const exitBtn = document.getElementById("exit-button");
  [logoutBtn, exitBtn].forEach(btn => {
    if (btn) btn.addEventListener("click", () => window.location.href = "../login.html");
  });

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
  setTimeout(() => loader.classList.add("hidden"), 1000);
  setTimeout(() => loader.remove(), 1800);

  // Toast dinamico
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => toast.classList.remove("show"), 3000);
    setTimeout(() => toast.remove(), 3500);
  }

  // Gestione contenuti (post)
  const publishBtn = document.getElementById("publishBtn");
  const newPost = document.getElementById("newPost");
  const postList = document.getElementById("postList");

  if (publishBtn && newPost && postList) {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    saved.forEach(t => addPost(t));

    publishBtn.addEventListener("click", () => {
      const text = newPost.value.trim();
      if (!text) return showToast("Scrivi qualcosa da pubblicare!");
      addPost(text);
      saved.unshift(text);
      localStorage.setItem("posts", JSON.stringify(saved));
      newPost.value = "";
      showToast("✅ Annuncio pubblicato!");
    });

    function addPost(text) {
      const li = document.createElement("li");
      li.innerHTML = `<i data-lucide="message-square"></i> ${text}`;
      postList.prepend(li);
      lucide.createIcons();
    }
  }

  // Upload documenti
  const uploadInput = document.getElementById("uploadFile");
  const fileList = document.getElementById("fileList");
  if (uploadInput && fileList) {
    uploadInput.addEventListener("change", (e) => {
      Array.from(e.target.files).forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<i data-lucide="file"></i> ${file.name} <span style="color:#00a8ff;">(caricato)</span>`;
        fileList.appendChild(li);
      });
      lucide.createIcons();
      showToast("📁 File caricati!");
    });
  }

  // Sidebar admin (solo admin)
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

  console.log("✅ Dashboard WOW attiva");
});
