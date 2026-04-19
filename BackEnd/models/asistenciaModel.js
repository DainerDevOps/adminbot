import database from "../config/database.js";

export const getAllAsistencias = async () => {
  const [rows] = await database.query("SELECT * FROM attendance");
  return rows;
};

export const createAsistencia = async (asistencia) => {
  const { id, student_id, attendance_date, status } = asistencia;

  await database.query(
    "INSERT INTO attendance (id, student_id, attendance_date, status) VALUES (?, ?, ?, ?)",
    [id, student_id, attendance_date, status],
  );
};
