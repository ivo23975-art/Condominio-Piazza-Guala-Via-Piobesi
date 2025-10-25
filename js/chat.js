document.addEventListener("DOMContentLoaded", () => {
  // Inizializza le icone (Lucide)
  if (window.lucide) lucide.createIcons();
  console.log("✅ chat.js attivo");

  // Prende gli elementi della pagina
  const chatWindow = document.getElementById("chatWindow");
  const input = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  // Legge il nome della chat dal body (es. chat-consiglieri-guala)
  const chatKey = document.body.dataset.chat || "chat-default";

  // Recupera eventuali messaggi salvati nel browser
  const saved = JSON.parse(localStorage.getItem(chatKey) || "[]");
  saved.forEach(msg => append(msg.text, msg.user, false));

  // Funzione che aggiunge messaggi nella chat
  function append(text, user, save = true) {
    const msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML = `<strong>${user}</strong>: ${text}`;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Salva nel localStorage se serve
    if (save) {
      saved.push({ text, user });
      localStorage.setItem(chatKey, JSON.stringify(saved));
    }
  }

  // Invia messaggio con il pulsante
  sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    append(text, "Tu");
    input.value = "";
  });

  // Invia messaggio anche con Enter
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendBtn.click();
    }
  });
});
