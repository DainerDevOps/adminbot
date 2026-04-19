import database from "../config/database.js";

export const getAllAcudientes = async () => {
  const [rows] = await database.query("SELECT * FROM guardians");
  return rows;
};

export const createAcudiente = async (acudiente) => {
  const { id, first_name, last_name, phone } = acudiente;

  await database.query(
    "INSERT INTO guardians (id, first_name, last_name, phone) VALUES (?, ?, ?, ?)",
    [id, first_name, last_name, phone],
  );
};
