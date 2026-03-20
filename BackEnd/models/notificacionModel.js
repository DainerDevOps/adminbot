import database from "../config/database.js";

export const getAllNotificaciones = async () => {
  const [rows] = await database.query("SELECT * FROM notificaciones_whatsapp");
  return rows;
};

export const createNotificacion = async (noti) => {
  const { id, estudiante_id, acudiente_id, mensaje } = noti;

  await database.query(
    "INSERT INTO notificaciones_whatsapp (id, estudiante_id, acudiente_id, mensaje) VALUES (?, ?, ?, ?)",
    [id, estudiante_id, acudiente_id, mensaje],
  );
};
