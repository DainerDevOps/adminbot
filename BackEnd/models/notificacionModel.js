import database from "../config/database.js";

export const getAllNotificaciones = async () => {
  const [rows] = await database.query("SELECT * FROM whatsapp_notifications");
  return rows;
};

export const createNotificacion = async (noti) => {
  const { id, student_id, guardian_id, message } = noti;

  await database.query(
    "INSERT INTO whatsapp_notifications (id, student_id, guardian_id, message) VALUES (?, ?, ?, ?)",
    [id, student_id, guardian_id, message],
  );
};
