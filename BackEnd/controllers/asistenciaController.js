import {
  getAllAsistencias,
  createAsistencia,
} from "../models/asistenciaModel.js";
import { randomUUID } from "crypto";

export const getAsistencias = async (req, res) => {
  try {
    const data = await getAllAsistencias();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNewAsistencia = async (req, res) => {
  try {
    const newAsistencia = {
      id: randomUUID(),
      ...req.body,
    };

    await createAsistencia(newAsistencia);

    res.status(201).json({ message: "Asistencia registrada" });
  } catch (error) {
    res.status(500).json(error);
  }
};
