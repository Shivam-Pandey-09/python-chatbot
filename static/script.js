
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const messages = document.getElementById("messages");
    const sendBtn = document.getElementById("send-btn");

    function addMessage(text, type) {
      const div = document.createElement("div");
      div.className = `msg ${type}`;
      div.textContent = text; // textContent se HTML injection se bachav hota hai
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addMessage(text, "user");
      input.value = "";
      sendBtn.disabled = true;

      const loading = addMessage("Soch raha hoon...", "bot");

      try {
        const res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Kuch galat ho gaya");
        loading.textContent = data.reply;
      } catch (err) {
        loading.textContent = "Error: " + err.message;
        loading.classList.add("error");
      } finally {
        sendBtn.disabled = false;
        input.focus();
      }
    });

