import { getAllUsuarios, createUsuario } from "../models/usuarioModel.js";

// 🔹 GET - Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
  try {
    const data = await getAllUsuarios();
    res.status(200).json(data);
  } catch (error) {
    console.log("❌ ERROR GET:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// 🔹 POST - Crear nuevo usuario
export const createNewUsuario = async (req, res) => {
  try {
    console.log("🔥 CONTROLLER FUNCIONANDO");
    console.log("📥 Datos recibidos:", req.body);

    // 🔸 Validación básica
    const { nombres, apellidos, correo, telefono } = req.body;

    if (!nombres || !apellidos || !correo || !telefono) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    const newUsuario = {
      nombres,
      apellidos,
      correo,
      telefono,
    };

    await createUsuario(newUsuario);

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.log("❌ ERROR POST:", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};
