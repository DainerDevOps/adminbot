const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");
const responseText = document.getElementById("response");

sendBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  if (!phone || !message) {
    responseText.textContent = "Completa todos los campos";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/whatsapp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        phone,
        message,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      responseText.textContent = "✅ Mensaje enviado correctamente";
    } else {
      responseText.textContent = "❌ Error enviando mensaje";
    }
  } catch (error) {
    console.error(error);

    responseText.textContent = "❌ Error del servidor";
  }
});
