import { getAllPagos, createPago } from "../models/pagoModel.js";
import { randomUUID } from "crypto";

export const getPagos = async (req, res) => {
  try {
    const data = await getAllPagos();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNewPago = async (req, res) => {
  try {
    const newPago = {
      id: randomUUID(),
      ...req.body,
    };

    await createPago(newPago);

    res.status(201).json({ message: "Pago registrado" });
  } catch (error) {
    res.status(500).json(error);
  }
};
