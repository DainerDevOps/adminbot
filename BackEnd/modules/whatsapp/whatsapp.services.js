import axios from "axios";

export const sendWhatsappMessage = async (phone) => {
  try {
    const url = `https://graph.facebook.com/v25.0/${process.env.PHONE_ID}/messages`;

    const body = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    };

    const { data } = await axios.post(url, body, { headers });

    console.log("✅ Mensaje enviado:", data);

    return data;
  } catch (error) {
    console.error("❌ Error WhatsApp:", error.response?.data || error.message);

    throw error;
  }
};
