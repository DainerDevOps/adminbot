import database from "../config/database.js";

export const getAll = async () => {
  const [rows] = await database.query("SELECT * FROM estudiantes");
  return rows;
};

export const create = async (student) => {
  const { id, nombres, apellidos } = student;

  await database.query(
    "INSERT INTO estudiantes (id, nombres, apellidos) VALUES (?, ?, ?)",
    [id, nombres, apellidos],
  );
};
