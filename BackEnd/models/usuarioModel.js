import database from "../config/database.js";

export const getAllUsuarios = async () => {
  const [rows] = await database.query("SELECT * FROM usuarios");
  return rows;
};

export const createUsuario = async (usuario) => {
  const { nombres, apellidos, correo, telefono } = usuario;

  await database.query(
    "INSERT INTO usuarios (nombres, apellidos, correo, telefono) VALUES (?, ?, ?, ?)",
    [nombres, apellidos, correo, telefono],
  );
};
