import db from "../config/database.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT id, first_name, last_name, password_hash FROM users WHERE email = ?",
    [email],
  );

  return rows[0]; // devuelve un solo usuario
};
