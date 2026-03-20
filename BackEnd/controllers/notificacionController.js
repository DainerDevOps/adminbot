import {
  getAllNotificaciones,
  createNotificacion,
} from "../models/notificacionModel.js";
import { randomUUID } from "crypto";

export const getNotificaciones = async (req, res) => {
  try {
    const data = await getAllNotificaciones();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createNewNotificacion = async (req, res) => {
  try {
    const newNoti = {
      id: randomUUID(),
      ...req.body,
    };

    await createNotificacion(newNoti);

    res.status(201).json({ message: "Notificación creada" });
  } catch (error) {
    res.status(500).json(error);
  }
};
