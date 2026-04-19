import database from "../config/database.js";

export const getAllUsuarios = async () => {
  const [rows] = await database.query("SELECT * FROM users");
  return rows;
};

export const createUsuario = async (usuario) => {
  const { id, first_name, last_name, email, phone } = usuario;

  await database.query(
    "INSERT INTO users (id, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?)",
    [id, first_name, last_name, email, phone],
  );
};
