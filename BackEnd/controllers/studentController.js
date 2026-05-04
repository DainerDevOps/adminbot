import { getAll, create } from "../models/studentModel.js";
import { randomUUID } from "crypto";

export const getStudent = async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Ocurrió algo", err: error });
  }
};

export const createStudent = async (req, res) => {
  try {
    console.log("🚀 Creando estudiante desde controlador...");
    const newStudent = {
      id: randomUUID(),
      ...req.body,
    };

    console.log("📤 Enviando a modelo:", newStudent);
    await create(newStudent);

    console.log("✅ Estudiante creado exitosamente");
    res.status(201).json({ message: "Student created", student: newStudent });
  } catch (error) {
    console.error("❌ Error en createStudent:", error.message);
    res.status(500).json({
      message: "Error al crear",
      error: error.message,
      details: error.sqlState
        ? `SQL State: ${error.sqlState}`
        : "Error desconocido",
    });
  }
};
