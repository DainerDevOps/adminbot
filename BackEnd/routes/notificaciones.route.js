import express from "express";
import {
  getNotificaciones,
  createNewNotificacion,
} from "../controllers/notificacionController.js";

const route = express.Router();

route.get("/notificaciones", getNotificaciones);
route.post("/notificaciones", createNewNotificacion);

export default route;
