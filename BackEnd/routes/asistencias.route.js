import express from "express";
import {
  getAsistencias,
  createNewAsistencia,
} from "../controllers/asistenciaController.js";

const route = express.Router();

route.get("/asistencias", getAsistencias);
route.post("/asistencias", createNewAsistencia);

export default route;
