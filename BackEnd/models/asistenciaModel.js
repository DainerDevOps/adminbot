import database from "../config/database.js";

export const getAllAsistencias = async () => {
  const [rows] = await database.query("SELECT * FROM asistencias");
  return rows;
};

export const createAsistencia = async (asistencia) => {
  const { id, estudiante_id, fecha, estado } = asistencia;

  await database.query(
    "INSERT INTO asistencias (id, estudiante_id, fecha, estado) VALUES (?, ?, ?, ?)",
    [id, estudiante_id, fecha, estado],
  );
};
