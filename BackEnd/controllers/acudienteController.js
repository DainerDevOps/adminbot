import { getAllAcudientes, createAcudiente } from "../models/acudienteModel.js";
import { randomUUID } from "crypto";

export const getAcudientes = async (req, res) => {
  try {
    const data = await getAllAcudientes();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNewAcudiente = async (req, res) => {
  try {
    const newAcudiente = {
      id: randomUUID(),
      ...req.body,
    };

    await createAcudiente(newAcudiente);

    res.status(201).json({ message: "Acudiente creado" });
  } catch (error) {
    res.status(500).json(error);
  }
};
