import db from "../config/database.js";

export const FindUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT id, first_name, last_name, email, password_hash FROM users WHERE email = ?",
    [email],
  );

  return rows[0];
};
