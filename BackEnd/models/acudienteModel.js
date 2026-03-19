import database from "../config/database.js";

export const getAllAcudientes = async () => {
  const [rows] = await database.query("SELECT * FROM acudientes");
  return rows;
};

export const createAcudiente = async (acudiente) => {
  const { id, nombres, apellidos, telefono } = acudiente;

  await database.query(
    "INSERT INTO acudientes (id, nombres, apellidos, telefono) VALUES (?, ?, ?, ?)",
    [id, nombres, apellidos, telefono],
  );
};
