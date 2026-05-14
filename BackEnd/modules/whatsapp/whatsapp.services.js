import axios from "axios";

export const sendWhatsappMessage = async (phone, message) => {
  try {
    const url = `https://graph.facebook.com/v25.0/${process.env.PHONE_ID}/messages`;

    // BODY QUE SE ENVÍA A META
    const body = {
      messaging_product: "whatsapp",

      to: phone,

      type: "text",

      text: {
        body: message,
      },
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    };

    console.log("📤 Enviando mensaje a:", phone);

    console.log("📝 Mensaje:", message);

    const { data } = await axios.post(url, body, {
      headers,
    });

    console.log("✅ Mensaje enviado:", data);

    return data;
  } catch (error) {
    console.error("❌ Error WhatsApp:", error.response?.data || error.message);

    throw error;
  }
};
