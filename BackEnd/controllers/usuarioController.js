import { getAllUsuarios, createUsuario } from "../models/usuarioModel.js";
import { randomUUID } from "crypto";

export const getUsuarios = async (req, res) => {
  try {
    const data = await getAllUsuarios();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const createNewUsuario = async (req, res) => {
//   try {
//     const newUsuario = {
//       id: randomUUID(),
//       ...req.body,
//     };

//     await createUsuario(newUsuario);

//     res.status(201).json({ message: "Usuario creado" });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const createNewUsuario = async (req, res) => {
  try {
    console.log("🔥 CONTROLLER FUNCIONANDO");
    console.log("📥 Datos recibidos:", req.body);

    const newUsuario = {
      ...req.body,
    };

    await createUsuario(newUsuario);

    res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json(error);
  }
};
