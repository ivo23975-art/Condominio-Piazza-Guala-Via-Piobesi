// ===============================
// ✅ DASHBOARD UNIFICATA - VERSIONE STABILE
// ===============================

// Controllo caricamento
console.log("🔥 dashboard.js caricato correttamente");

// Tutto parte solo quando la pagina è pronta
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // 🔹 ICONS & NAVIGAZIONE
  // ===============================
  if (typeof lucide !== "undefined") lucide.createIcons();

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) logoutBtn.addEventListener("click", () => window.location.href = "../login.html");

  const exitBtn = document.getElementById("exit-button");
  if (exitBtn) exitBtn.addEventListener("click", () => window.location.href = "../login.html");

  // ===== BREADCRUMB DINAMICO =====
  const path = window.location.pathname;
  let pageName = "Dashboard";
  if (path.includes("condomino")) pageName = "Area Condòmino";
  if (path.includes("admin-condominio")) pageName = "Amministratore Condominio";
  if (path.includes("admin-sito")) pageName = "Amministratore Sito";
  const breadcrumb = document.getElementById("breadcrumb-path");
  if (breadcrumb) breadcrumb.innerHTML = `/ ${pageName}`;

  // ===============================
  // 🔹 GRAFICO STATISTICHE (solo per admin-sito)
  // ===============================
  const statsChart = document.getElementById("statsChart");
  if (statsChart && typeof Chart !== "undefined") {
    new Chart(statsChart, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
        datasets: [{
          label: "Visite giornaliere",
          data: [5, 7, 9, 14, 12, 15, 20],
          borderColor: "#00a8ff",
          tension: 0.4,
          fill: { target: "origin", above: "rgba(0,168,255,0.15)" }
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.2)" } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ===============================
  // 🔹 BACKUP SIMULATO (solo per admin-sito)
  // ===============================
  const backupBtn = document.getElementById("backupBtn");
  const progress = document.querySelector(".progress");
  const backupStatus = document.getElementById("backupStatus");

  if (backupBtn && progress && backupStatus) {
    backupBtn.addEventListener("click", () => {
      let val = 0;
      backupBtn.disabled = true;
      backupStatus.textContent = "🔄 Backup in corso...";
      progress.style.width = "0%";

      const timer = setInterval(() => {
        val += 5;
        progress.style.width = val + "%";
        if (val >= 100) {
          clearInterval(timer);
          backupStatus.textContent = "✅ Backup completato con successo!";
          backupBtn.disabled = false;
        }
      }, 150);
    });
  }

  // ===============================
  // 🔹 PUBBLICAZIONE CONTENUTI (per admin-sito)
  // ===============================
  const publishBtn = document.getElementById("publishBtn");
  const newPost = document.getElementById("newPost");
  const postList = document.getElementById("postList");

  if (publishBtn && newPost && postList) {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    savedPosts.forEach(text => addPost(text));

    publishBtn.addEventListener("click", () => {
      const text = newPost.value.trim();
      if (!text) return alert("Scrivi un messaggio prima di pubblicare!");
      addPost(text);
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
      if (typeof lucide !== "undefined") lucide.createIcons();
    }
  }

  // ===============================
  // 🔹 UPLOAD FILE (per admin-sito)
  // ===============================
  const uploadInput = document.getElementById("uploadFile");
  const fileList = document.getElementById("fileList");

  if (uploadInput && fileList) {
    uploadInput.addEventListener("change", (e) => {
      fileList.innerHTML = "";
      Array.from(e.target.files).forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<i data-lucide="file"></i> ${file.name} <span style="color:#00a8ff;">(caricato con successo)</span>`;
        li.style.padding = "6px";
        fileList.appendChild(li);
      });
      if (typeof lucide !== "undefined") lucide.createIcons();
    });
  }

  console.log("✅ dashboard.js attivo e funzionante su:", pageName);
});
