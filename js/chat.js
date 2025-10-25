document.addEventListener("DOMContentLoaded", () => {
  // Inizializza le icone
  if (window.lucide) lucide.createIcons();
  console.log("✅ chat.js attivo");

  const chatWindow = document.getElementById("chatWindow");
  const input = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!chatWindow || !input || !sendBtn) {
    console.error("❌ Elementi chat mancanti nella pagina");
    return;
  }

  const chatKey = document.body.dataset.chat || "chat-default";
  const saved = JSON.parse(localStorage.getItem(chatKey) || "[]");
  saved.forEach(msg => append(msg.text, msg.user, false));

  function append(text, user, save = true) {
    const msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML = `<strong>${user}</strong>: ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (save) {
      saved.push({ text, user });
      localStorage.setItem(chatKey, JSON.stringify(saved));
    }
  }

  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    append(text, "Tu");
    input.value = "";
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn.click();
    }
  });
});
