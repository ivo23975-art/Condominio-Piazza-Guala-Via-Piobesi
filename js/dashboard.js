document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // ===== LOGOUT =====
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) logoutBtn.addEventListener("click", () => window.location.href = "../login.html");

  const exitBtn = document.getElementById("exit-button");
  if (exitBtn) exitBtn.addEventListener("click", () => window.location.href = "../login.html");

  // ===== BREADCRUMB =====
  const path = window.location.pathname;
  let pageName = "Dashboard";
  if (path.includes("condomino")) pageName = "Area Condòmino";
  if (path.includes("admin-condominio")) pageName = "Amministratore Condominio";
  if (path.includes("admin-sito")) pageName = "Amministratore Sito";
  const breadcrumb = document.getElementById("breadcrumb-path");
  if (breadcrumb) breadcrumb.innerHTML = `/ ${pageName}`;

  // ===== PUBBLICAZIONE POST =====
  const publishBtn = document.getElementById("publishBtn");
  const newPost = document.getElementById("newPost");
  const postList = document.getElementById("postList");

  if (publishBtn && newPost && postList) {
    const saved = JSON.parse(localStorage.getItem("posts") || "[]");
    saved.forEach(text => addPost(text));

    publishBtn.addEventListener("click", () => {
      const text = newPost.value.trim();
      if (!text) return alert("Scrivi qualcosa da pubblicare!");
      addPost(text);
      saved.unshift(text);
      localStorage.setItem("posts", JSON.stringify(saved));
      newPost.value = "";
    });

    function addPost(text) {
      const li = document.createElement("li");
      li.innerHTML = `<i data-lucide="message-square"></i> ${text}`;
      postList.prepend(li);
      lucide.createIcons();
    }
  }

  // ===== UPLOAD DOCUMENTI =====
  const uploadInput = document.getElementById("uploadFile");
  const fileList = document.getElementById("fileList");
  if (uploadInput && fileList) {
    uploadInput.addEventListener("change", (e) => {
      Array.from(e.target.files).forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<i data-lucide="file"></i> ${file.name} <span style="color:#00a8ff;">(caricato con successo)</span>`;
        fileList.appendChild(li);
      });
      lucide.createIcons();
    });
  }

  console.log("✅ dashboard.js attivo e funzionante");
});
