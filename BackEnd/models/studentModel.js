import database from "../config/database.js";

export const getAll = async () => {
  const [rows] = await database.query("SELECT * FROM students");
  return rows;
};

export const create = async (student) => {
  const { id, first_name, last_name } = student;

  await database.query(
    "INSERT INTO students (id, first_name, last_name) VALUES (?, ?, ?)",
    [id, first_name, last_name],
  );
};
