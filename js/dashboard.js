document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    window.location.href = "../login.html";
  });
});
