import { sendWhatsappMessage } from "./whatsapp.services.js";

export const sendMessage = async (req, res) => {
  const { phone } = req.body;

  try {
    const data = await sendWhatsappMessage(phone);

    return res.status(200).json({
      ok: true,
      message: "Mensaje enviado correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error enviando mensaje",
      error: error.response?.data || error.message,
    });
  }
};
