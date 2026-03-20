import express from "express";
import {
  getUsuarios,
  createNewUsuario,
} from "../controllers/usuarioController.js";

const route = express.Router();

route.get("/usuarios", getUsuarios);
route.post("/usuarios", createNewUsuario);

export default route;
